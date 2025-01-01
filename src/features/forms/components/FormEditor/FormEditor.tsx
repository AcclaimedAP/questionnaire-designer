import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/Input";
import { Form, FormField, FormFieldType } from "@/types/models/form";
import { useState } from "react";
import { Dropdown } from "@/components/ui/Input";
import XMarkIcon from "@/assets/icons/xmark.svg";
import PlusIcon from "@/assets/icons/plusmark.svg";
import UpArrowIcon from "@/assets/icons/up.svg";
import DownArrowIcon from "@/assets/icons/down.svg";

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

  const moveField = (index: number, direction: "up" | "down") => {
    if (index === 0 && direction === "up") return;
    if (index === fields.length - 1 && direction === "down") return;
    const newFields = [...fields];
    const temp = newFields[index];
    newFields[index] = newFields[index + (direction === "up" ? -1 : 1)];
    newFields[index + (direction === "up" ? -1 : 1)] = temp;
    setFields(newFields);
    updateForm({ ...form, fields: newFields });
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    updateForm({ ...form, title: e.target.value });
  }

  return (
    <div className="flex flex-col gap-4 w-full p-4">
      <h1 className="text-2xl font-bold" onClick={() => { console.log(fields) }}>Form Editor</h1>
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
            return <Field field={field} index={index} maxIndex={fields.length - 1} key={index} updateField={updateField} removeField={removeField} moveField={moveField} />
          })}
        </div>
        <Button onClick={addField} className="bg-primary text-primary-foreground hover:bg-primary-hover">Add Field</Button>
      </div>
    </div>
  )
}

const Field = ({ field, index, maxIndex, updateField, removeField, moveField }: { field: FormField, index: number, maxIndex: number, updateField: (index: number, field: FormField) => void, removeField: (index: number) => void, moveField: (index: number, direction: "up" | "down") => void }) => {

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

  return <div className="flex flex-row gap-4 justify-between border-2 border-border rounded-md p-4">
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-row gap-2 justify-between">
        <label className="text-lg font-bold">
          {type.toString().charAt(0).toUpperCase() + type.toString().slice(1)} Input index:{index}
        </label>
        <div className="flex flex-row gap-2">
          <Dropdown
            className="bg-background text-foreground border-2 border-border"
            options={Object.values(FormFieldType).map(type => type.toString())}
            value={type.toString()}
            onChange={handleTypeChange}
          />
          <Button
            className="w-8 h-8 p-0 flex items-center justify-center bg-error hover:bg-error-hover"
            onClick={() => { removeField(index) }}
          >
            <img src={XMarkIcon} alt="Close" className="w-4 h-4" />
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
            <label className="text-lg">Options</label>
            {options.map((option, index) => {
              return <OptionInput key={index} label={option} value={option} index={index} onChange={handleOptionsChange} removeOption={removeOption} />
            })}
            <Button
              className="w-8 h-8 p-0 flex items-center justify-center bg-primary hover:bg-primary-hover"
              onClick={addOption}>
              <img src={PlusIcon} alt="Add" className="w-4 h-4" />
            </Button>
          </div>
        }
      </div>
    </div>
    <MoveControls moveField={moveField} index={index} maxIndex={maxIndex} />
  </div>
}

const OptionInput = ({ label, value, index, onChange, removeOption }: { label: string, value: string, index: number, onChange: (index: number, label: string) => void, removeOption: (index: number) => void }) => {
  const [option, setOption] = useState(value);

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption(e.target.value);
    onChange(index, e.target.value);
  }


  return <div className="flex flex-row gap-2">
    <TextInput
      className="bg-background w-full text-foreground border-2 border-border placeholder:text-foreground/50"
      type={"text"} value={option} onChange={handleOptionChange} placeholder={label} />
    <Button
      className="w-8 h-8 p-0 flex items-center justify-center bg-error hover:bg-error-hover"
      onClick={() => { removeOption(index) }}
    >
      <img src={XMarkIcon} alt="Close" className="w-4 h-4" />
    </Button>
  </div>
}


const MoveControls = ({ moveField, index, maxIndex }: { moveField: (index: number, direction: "up" | "down") => void, index: number, maxIndex: number }) => {
  const buttonClass = "w-8 h-8 p-0 flex items-center justify-center bg-secondary hover:bg-secondary-hover disabled:bg-secondary-disabled disabled:hover:bg-secondary-disabled disabled:cursor-not-allowed";
  return <>
    <div className="flex flex-col gap-2">
      <Button
        disabled={index === 0}
        className={buttonClass}
        onClick={() => { moveField(index, "up") }}
      >
        <img src={UpArrowIcon} alt="Up" className="w-4 h-4" />
      </Button>
      <Button
        disabled={index === maxIndex}
        className={buttonClass}
        onClick={() => { moveField(index, "down") }}
      >
        <img src={DownArrowIcon} alt="Down" className="w-4 h-4" />
      </Button>
    </div>
  </>
}