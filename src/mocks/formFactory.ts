import { Form, FormField, FormFieldType } from '@/types/models/form';

export class FormFactory {
  private form: Form;
  private id: number;
  constructor() {
    this.id = 0;
    this.form = {
      id: this.id,
      title: 'Test Form',
      fields: []
    }
  }

  public setTitle(title: string) {
    this.form.title = title;
    return this;
  }

  public addTextField(label: string) {
    this.addField({
      type: FormFieldType.TEXT,
      label
    });
    return this;
  }

  public addCheckboxField(label: string) {
    this.addField({
      type: FormFieldType.CHECKBOX,
      label
    });
    return this;
  }

  public addDropdownField(label: string, options: string[]) {
    this.addField({
      type: FormFieldType.DROPDOWN,
      label,
      options
    });
    return this;
  }

  public addRadioField(label: string, options: string[]) {
    this.addField({
      type: FormFieldType.RADIO,
      label,
      options
    });
    return this;
  }

  public addDatePickerField(label: string) {
    this.addField({
      type: FormFieldType.DATE_PICKER,
      label
    });
    return this;
  }

  public build(): Form {
    this.id++;
    this.form.id = this.id;
    return this.form;
  }

  private addField(field: FormField) {
    this.form.fields.push(field);
  }
}
