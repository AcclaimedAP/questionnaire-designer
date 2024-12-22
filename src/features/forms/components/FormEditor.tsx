import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/Input";
import { Form, FormField, FormFieldType } from "@/types/models/form";
import { useState } from "react";
import { Dropdown } from "@/components/ui/Input";
import { MultiInput } from "@/components/ui/Input";

export const FormEditor = ({ form, updateForm }: { form: Form, updateForm: (form: Form) => void }) => {
  const [title, setTitle] = useState(form?.title || '');
  const [fields, setFields] = useState(form?.fields || []);

  const addField = () => {
    const newField = {
      label: 'New Field',
      type: FormFieldType.TEXT,
      options: []
    }
    setFields([...fields, newField]);
    updateForm({ ...form, fields: [...fields, newField] });
  }

  const updateField = (index: number, field: FormField) => {
    const newFields = fields.map((f, i) => i === index ? field : f);
    setFields(newFields);
    updateForm({ ...form, fields: newFields });
  }

  const removeField = (index: number) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
    updateForm({ ...form, fields: newFields });
  }

  return (
    <div className="flex flex-col gap-4 border-2 border-green-400 w-full p-4">
      <h1>Form Editor</h1>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          {fields.map((field, index) => {
            return <div key={index} className="flex flex-row gap-4">
              <EditField field={field} index={index} updateField={updateField} />
              <Button onClick={() => { removeField(index) }}>Remove Field</Button>
            </div>
          })}
        </div>
        <Button onClick={addField}>Add Field</Button>
      </div>
    </div>
  )
}

const EditField = ({ field, index, updateField }: { field: FormField, index: number, updateField: (index: number, field: FormField) => void }) => {
  const [label, setLabel] = useState(field.label);
  const [type, setType] = useState(field.type);
  const [options, setOptions] = useState(field.options || []);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value as FormFieldType);
    updateField(index, { ...field, type: e.target.value as FormFieldType });
  }

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
    updateField(index, { ...field, label: e.target.value });
  }

  const handleOptionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOptions = e.target.value.split(',');
    setOptions(newOptions);
    updateField(index, { ...field, options: newOptions });
  }

  const addOption = () => {
    setOptions([...options, 'New Option']);
    updateField(index, { ...field, options: [...options, 'New Option'] });
  }

  const updateOption = (index: number, option: string) => {
    const newOptions = options.map((o, i) => i === index ? option : o);
    setOptions(newOptions);
    updateField(index, { ...field, options: newOptions });
  }

  const removeOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    updateField(index, { ...field, options: newOptions });
  }



  return <div>
    <Dropdown options={Object.values(FormFieldType)} value={type} onChange={handleTypeChange} className="bg-background" />
    <TextInput type={FormFieldType.TEXT} label={field.type.toString()} value={label} onChange={handleLabelChange} />
    {field.type === FormFieldType.CHECKBOX || field.type === FormFieldType.RADIO ?
      <div>
        {options.map((option, index) => {
          return <EditOption key={index} option={option} index={index} updateOption={updateOption} removeOption={removeOption} />
        })}
        <Button onClick={addOption}>Add Option</Button>
      </div>

      : null}
  </div>
}

const EditOption = ({ option, index, updateOption, removeOption }: { option: string, index: number, updateOption: (index: number, option: string) => void, removeOption: (index: number) => void }) => {
  const [optionValue, setOptionValue] = useState(option);

  const handleOptionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptionValue(e.target.value);
    updateOption(index, e.target.value);
  }

  return <div>
    <TextInput type={FormFieldType.TEXT} label={option} value={optionValue} onChange={handleOptionsChange} />
    <Button onClick={() => { removeOption(index) }}>Remove Option</Button>
  </div>
}
