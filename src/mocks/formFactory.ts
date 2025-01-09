import { Form, FormFieldType, FormFieldSettings, FreeTextSettings, FormFields, FreeTextSettingsInputType } from '@/types/models/form';

export class FormFactory {
  private form: Form;
  constructor() {
    this.form = {
      id: null,
      title: 'Test Form',
      published: false,
      fields: [],
      createdAt: null,
      updatedAt: null
    }
  }

  public setTitle(title: string) {
    this.form.title = title;
    return this;
  }

  public setRandomTitle() {
    this.form.title = this.randomTitle();
    return this;
  }

  public addTextField(label: string, settings: FreeTextSettings = {
    required: false,
    placeholder: "Input a placeholder",
    inputType: FreeTextSettingsInputType.TEXT,
    rows: null,
    min: null,
    max: null
  }) {
    this.addField({
      type: FormFieldType.TEXT,
      label,
      settings
    });
    return this;
  }

  public addCheckboxField(label: string, options: string[], settings: FormFieldSettings = {
    required: false,
    placeholder: "Select an option"
  }) {
    this.addField({
      type: FormFieldType.CHECKBOX,
      label,
      options,
      settings
    });
    return this;
  }

  public addDropdownField(label: string, options: string[], settings: FormFieldSettings = {
    required: false,
    placeholder: "Select an option"
  }) {
    this.addField({
      type: FormFieldType.DROPDOWN,
      label,
      options,
      settings
    });
    return this;
  }

  public addRadioField(label: string, options: string[], settings: FormFieldSettings = {
    required: false,
    placeholder: "Select an option"
  }) {
    this.addField({
      type: FormFieldType.RADIO,
      label,
      options,
      settings
    });
    return this;
  }

  public addDatePickerField(label: string, settings: FormFieldSettings = {
    required: false,
    placeholder: "Select a date"
  }) {
    this.addField({
      type: FormFieldType.DATE_PICKER,
      label,
      settings
    });
    return this;
  }

  public setId(id: number | null) {
    this.form.id = id;
    return this;
  }

  public build(): Form {
    const builtForm = this.form;
    builtForm.createdAt = new Date();
    builtForm.updatedAt ?? new Date();
    this.resetForm();
    return builtForm;
  }

  private addField(field: FormFields) {
    this.form.fields.push(field);
  }

  public setPublished(published: boolean) {
    this.form.published = published;
    return this;
  }

  private resetForm() {
    this.form = {
      id: null,
      title: 'Test Form',
      published: false,
      createdAt: null,
      updatedAt: null,
      fields: []
    }
  }

  private randomTitle = () => {
    const titles = [
      'Test form',
      'Employee survey',
      'Customer feedback',
      'Product survey',
      'Employee survey',
      'Customer feedback',
      'Product survey',
    ]
    return titles[Math.floor(Math.random() * titles.length)];
  }

}

