
export interface Form {
  id: number;
  title: string;
  fields: FormField[];
}

export enum FormFieldType {
  TEXT = 'text',
  CHECKBOX = 'checkbox',
  DROPDOWN = 'dropdown',
  RADIO = 'radio',
  DATE_PICKER = 'date_picker'
}

export interface FormField {
  type: FormFieldType;
  label: string;
  options?: string[];
}
