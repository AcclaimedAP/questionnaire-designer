export interface Form {
  id: number;
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
  inputType: "text" | "textarea" | "number" | "tel" | "email" | "password" | "url";
  rows: number | null;
  minLength: number | null;
  maxLength: number | null;
}

// ===================================
// Type Unions
// ===================================
export type FormFields = FormField | TextFormField;
