// Mock Database using local storage
import { Form, FormFieldType, FormFieldSettings, FreeTextSettings, FreeTextSettingsInputType } from '@/types/models/form';

interface dbForm extends Form {
  id: number;
}

interface MockDb {
  forms: {
    records: dbForm[] | [];
  }
}

interface MockDbTable {
  [key: string]: {
    records: any[];
  }
}

class MockDb {

  private db: MockDbTable;
  constructor() {
    this.db = this.database();
  }

  public where(table: string, query?: { id?: number, title?: string }) {
    const databaseTable = this.db[table as keyof MockDbTable] || [];
    if (!databaseTable) throw new Error(`Table ${table} not found`);
    console.log(databaseTable.records);
    if (!query) return databaseTable.records;
    return databaseTable.records.filter((item) => {
      if (query.id && item.id === query.id) return true;
      if (query.title && item.title === query.title) return true;
      return false;
    });
  }

  public find(table: string, id: number) {
    const databaseTable = this.db[table as keyof MockDbTable] || [];
    if (!databaseTable) throw new Error(`Table ${table} not found`);
    return databaseTable.records.find((item) => item.id === id);
  }

  public create(table: string, item: any) {
    const databaseTable = this.db[table as keyof MockDbTable] || [];
    if (!databaseTable) throw new Error(`Table ${table} not found`);
    const validatedItem = this.validate(table, JSON.parse(item || '{}'));
    if (!validatedItem) throw new Error(`Item ${item} is not valid`);
    const newItem = { ...validatedItem as any, id: databaseTable.records.length + 1 };
    databaseTable.records.push(newItem);
    this.db[table as keyof MockDbTable] = databaseTable;
    this.saveDatabase();
    return newItem;
  }

  public update(table: string, id: number, item: any) {
    const databaseTable = this.db[table as keyof MockDbTable] || [];
    if (!databaseTable) throw new Error(`Table ${table} not found`);
    const index = databaseTable.records.findIndex((item) => item.id === id);
    if (index === -1) throw new Error(`Item with id ${id} not found`);
    databaseTable.records[index] = item;
    this.db[table as keyof MockDbTable] = databaseTable;
    this.saveDatabase();
    return item;
  }

  public delete(table: string, id: number) {
    const databaseTable = this.db[table as keyof MockDbTable] || [];
    if (!databaseTable) throw new Error(`Table ${table} not found`);
    const index = databaseTable.records.findIndex((item) => item.id === id);
    if (index === -1) throw new Error(`Item with id ${id} not found`);
    databaseTable.records.splice(index, 1);
    this.db[table as keyof MockDbTable] = databaseTable;
    this.saveDatabase();
  }

  private database() {
    const db = localStorage.getItem('mock-db');
    if (!db) {
      localStorage.setItem('mock-db', JSON.stringify(this.defaultDatabase()));
      return this.defaultDatabase();
    }
    return JSON.parse(db);
  }

  private saveDatabase() {
    localStorage.setItem('mock-db', JSON.stringify(this.db));
  }

  private defaultDatabase() {
    return {
      forms: {
        records: []
      }
    } as MockDb;
  }

  private validate(table: string, item: any) {
    const databaseTable = this.db[table as keyof MockDbTable] || [];
    if (!databaseTable) throw new Error(`Table ${table} not found`);
    switch (table) {
      case 'forms':
        return formValidation(item);
      default:
        return false;
    }
  }
}

/**
 * Handles validation and cleanup of form data
 * 
 * Extremely crude validation and cleanup of form data
 * 
 * It:
 * Validates the values of the form fields and returns false if any of the fields are invalid
 * Cleans the form data of any invalid or unnecessary fields
 */

const formValidation = (form: Form): (false | Form)=> {
  const { title, fields } = form;
  if (!title) return false;
  if (!fields || fields.length === 0) return false;
  const cleanedForm: Form = { ...form, fields: [] };
  for (const field of fields) {
    if (!field.label) return false;
    if (!Object.values(FormFieldType).includes(field.type)) return false;
    if (!field.settings) return false;
    if (field.type === FormFieldType.TEXT) {
      const settings = field.settings as FreeTextSettings;
      const fieldSettings: FreeTextSettings = {
        required: settings.required || false,
        placeholder: settings.placeholder || "",
        inputType: settings.inputType || FreeTextSettingsInputType.TEXT,
        rows: (settings.inputType !== FreeTextSettingsInputType.TEXTAREA && isNumber(settings.rows)) ? settings.rows : null,
        min: isNumber(settings.min) ? settings.min : null,
        max: isNumber(settings.max) ? settings.max : null
      };
      const validInputTypes = Object.values(FreeTextSettingsInputType);
      if (!validInputTypes.includes(fieldSettings.inputType)) return false;
      if (fieldSettings.min && fieldSettings.max && fieldSettings.min > fieldSettings.max) return false;
      cleanedForm.fields.push({
        label: field.label,
        type: field.type,
        settings: fieldSettings
      });
      continue;
    }
    if ([FormFieldType.CHECKBOX, FormFieldType.DROPDOWN, FormFieldType.RADIO].includes(field.type)) {
      if (!field.options || field.options.length === 0) return false;
      for (const option of field.options) {
        if (option === '') return false;
      }
      const settings: FormFieldSettings = {
        required: field.settings.required || false,
        placeholder: field.settings.placeholder || "",
      };
      cleanedForm.fields.push({
        label: field.label,
        type: field.type,
        options: field.options,
        settings
      });
      continue;
    }
  }
  return form;
}

const isNumber = (value: any) => {
  // Check if null or undefined
  if (value === null || value === undefined) return false;
  // attempt to parse as number
  const parsed = parseFloat(value);
  return !isNaN(parsed) && isFinite(parsed);
}

export default MockDb;
