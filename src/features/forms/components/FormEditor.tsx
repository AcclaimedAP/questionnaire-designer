import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/Input";
import { Form, FormField, FormFieldType } from "@/types/models/form";
import { useState } from "react";
import { Dropdown } from "@/components/ui/Input";

export const FormEditor = ({ form, updateForm }: { form: Form, updateForm: (form: Form) => void }) => {
  const [title, setTitle] = useState(form?.title || '');
  const [fields, setFields] = useState(form?.fields || []);

  const addField = () => {
    const newField = {
      label: '',
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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    updateForm({ ...form, title: e.target.value });
  }

  return (
    <div className="flex flex-col gap-4 w-full p-4">
      <h1 className="text-2xl font-bold">Form Editor</h1>
      <div className="flex flex-col gap-4">
        <TextInput
          className="bg-background text-foreground text-xl border-2 border-border placeholder:text-foreground/50"
          type={"text"}
          value={title}
          onChange={handleTitleChange}
          placeholder="Form title"
        />
        <div className="flex flex-col gap-4">
          {fields.map((field, index) => {
            return <Field field={field} index={index} key={index} updateField={updateField} removeField={removeField} />
          })}
        </div>
        <Button onClick={addField}>Add Field</Button>
      </div>
    </div>
  )
}

const Field = ({ field, index, updateField, removeField }: { field: FormField, index: number, updateField: (index: number, field: FormField) => void, removeField: (index: number) => void }) => {

  const [label, setLabel] = useState(field.label);
  const [type, setType] = useState(field.type);
  const [options, setOptions] = useState(field.options || []);

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
    updateField(index, { ...field, label: e.target.value });
  }

  const addOption = () => {
    setOptions([...options, '']);
    updateField(index, { ...field, options: [...options, ''] });
  }

  const removeOption = (optionIndex: number) => {
    const newOptions = options.filter((_, i) => i !== optionIndex);
    setOptions(newOptions);
    updateField(index, { ...field, options: newOptions });
  }

  const handleOptionsChange = (optionIndex: number, label: string) => {
    const newOptions = options.map((option, i) => i === optionIndex ? label : option);
    setOptions(newOptions);
    updateField(index, { ...field, options: newOptions });
  }

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value as FormFieldType);
    updateField(index, { ...field, type: e.target.value as FormFieldType });
  }

  return <div className="flex flex-col gap-4 justify-between border-2 border-border rounded-md p-4">
    <div className="flex flex-row gap-2 justify-between">
      <label>
        {type.toString().charAt(0).toUpperCase() + type.toString().slice(1)} Input
      </label>
      <div className="flex flex-row gap-2">
        <Dropdown
          className="bg-background text-foreground border-2 border-border"
          options={Object.values(FormFieldType).map(type => type.toString())}
          value={type.toString()}
          onChange={handleTypeChange}
        />
        <Button
          className="w-8 h-8 p-0"
          onClick={() => { removeField(index) }}
        >
          <div className="text-lg">x</div>
        </Button>
      </div>
    </div>
    <div className="flex flex-col gap-2 justify-between">
      <TextInput
        className="bg-background text-foreground border-2 border-border placeholder:text-foreground/50"
        type={"text"}
        value={label}
        onChange={handleLabelChange}
        placeholder="Form label"
      />
      {(type === FormFieldType.RADIO || type === FormFieldType.CHECKBOX || type === FormFieldType.DROPDOWN) &&
        <div className="flex flex-col gap-2">
          {options.map((option, index) => {
            return <OptionInput key={index} label={option} value={option} index={index} onChange={handleOptionsChange} removeOption={removeOption} />
          })}
          <Button
            className="w-8 h-8 p-0"
            onClick={addOption}>+</Button>
        </div>
      }

    </div>
  </div>
}

const OptionInput = ({ label, value, index, onChange, removeOption }: { label: string, value: string, index: number, onChange: (index: number, label: string) => void, removeOption: (index: number) => void }) => {
  const [option, setOption] = useState(value);

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption(e.target.value);
    onChange(index, e.target.value);
  }


  return <div className="flex flex-row gap-2 w-full">
    <TextInput
      className="bg-background w-full text-foreground border-2 border-border placeholder:text-foreground/50"
      type={"text"} value={option} onChange={handleOptionChange} placeholder={label} />
    <Button
      className="w-8 h-8 p-0"
      onClick={() => { removeOption(index) }}
    >
      <div className="text-lg">x</div>
    </Button>
  </div>
}
