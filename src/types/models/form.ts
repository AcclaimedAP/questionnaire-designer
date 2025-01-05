export interface Form {
  id: number | null;
  title: string;
  fields: FormField[];
}

// ===================================
// Base Form Field Types
// ===================================
export interface FormField {
  label: string;
  options?: string[];
  type: FormFieldType;
  settings: FormFieldSettings;
}

export interface FormFieldSettings {
  required: boolean;
  placeholder: string;
}

// ===================================
// Field Type Enum
// ===================================
export enum FormFieldType {
  TEXT = 'text',
  CHECKBOX = 'checkbox',
  DROPDOWN = 'dropdown',
  RADIO = 'radio',
  DATE_PICKER = 'date_picker'
}

// ===================================
// Specific Field Types
// ===================================

// ===================================
// Free Text Field Settings
// ===================================
export interface TextFormField extends Omit<FormField, 'settings'> {
  type: FormFieldType.TEXT;
  settings: FreeTextSettings;
}

export interface FreeTextSettings extends FormFieldSettings {
  inputType: FreeTextSettingsInputType;
  rows: number | null;
  min: number | null;
  max: number | null;
}

export enum FreeTextSettingsInputType {
  TEXT = 'text',
  TEXTAREA = 'textarea',
  NUMBER = 'number',
  TEL = 'tel',
  EMAIL = 'email',
  PASSWORD = 'password',
  URL = 'url'
}

// ===================================
// Type Unions
// ===================================
export type FormFields = FormField | TextFormField;
