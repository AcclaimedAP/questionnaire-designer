import { Button } from "@/components/ui/Button";
import { TextArea } from "@/components/ui/Input";
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
    updateForm({ ...form, fields: newFields });
    setFields(newFields);
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    updateForm({ ...form, title: e.target.value });
  }

  return (
    <div className="flex flex-col gap-4 w-full p-4">
      <h1 className="text-2xl font-bold" onClick={() => { console.log(fields) }}>Form Editor</h1>
      <div className="flex flex-col gap-4">
        <TextArea
          className="bg-background text-foreground text-xl border-2 border-border placeholder:text-foreground/50"
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
  const handleLabelChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateField(index, { ...field, label: e.target.value });
  }

  const addOption = () => {
    updateField(index, { ...field, options: [...(field.options || []), ''] });
  }

  const removeOption = (optionIndex: number) => {
    const newOptions = field.options?.filter((_, i) => i !== optionIndex) || [];
    updateField(index, { ...field, options: newOptions });
  }

  const handleOptionsChange = (optionIndex: number, label: string) => {
    const newOptions = field.options?.map((option, i) => i === optionIndex ? label : option) || [];
    updateField(index, { ...field, options: newOptions });
  }

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateField(index, { ...field, type: e.target.value as FormFieldType });
  }

  const moveOption = (optionIndex: number, direction: "up" | "down") => {
    if (!field.options) return;
    if (optionIndex === 0 && direction === "up") return;
    if (optionIndex === field.options.length - 1 && direction === "down") return;

    const newOptions = [...field.options];
    const temp = newOptions[optionIndex];
    newOptions[optionIndex] = newOptions[optionIndex + (direction === "up" ? -1 : 1)];
    newOptions[optionIndex + (direction === "up" ? -1 : 1)] = temp;
    updateField(index, { ...field, options: newOptions });
  }

  return <>
    <div className="flex flex-col gap-4 justify-between border-2 border-border rounded-md p-4">
      <div className="flex flex-row gap-4 justify-between items-center">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-row gap-2 justify-between">
            <label className="text-lg font-bold">
              {field.type.toString().charAt(0).toUpperCase() + field.type.toString().slice(1)} Input
            </label>
            <div className="flex flex-row gap-2">
              <Dropdown
                className="bg-background text-foreground border-2 border-border"
                options={Object.values(FormFieldType).map(type => type.toString())}
                value={field.type.toString()}
                onChange={handleTypeChange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-between">
            <TextArea
              className="bg-background text-foreground border-2 border-border placeholder:text-foreground/50"
              value={field.label}
              onChange={handleLabelChange}
              placeholder="Form label"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <RemoveButton HandleClick={() => { removeField(index) }} />
          <MoveControls handleMove={moveField} index={index} maxIndex={maxIndex} />
        </div>
      </div>

      {(field.type === FormFieldType.RADIO || field.type === FormFieldType.CHECKBOX || field.type === FormFieldType.DROPDOWN) &&
        <div className="flex flex-col gap-2">
          <label className="text-lg">Options</label>
          {field.options && field.options.map((option, index) => {
            return <OptionInput key={index} option={option} index={index} maxIndex={field.options ? field.options.length - 1 : 0} onChange={handleOptionsChange} removeOption={removeOption} moveOption={moveOption} />
          })}
          <Button
            className="w-8 h-8 p-0 flex items-center justify-center bg-primary hover:bg-primary-hover"
            onClick={addOption}>
            <img src={PlusIcon} alt="Add" className="w-4 h-4" />
          </Button>
        </div>
      }
    </div>
  </>
}

const OptionInput = ({ option, index, maxIndex, onChange, removeOption, moveOption }: { option: string, index: number, maxIndex: number, onChange: (index: number, label: string) => void, removeOption: (index: number) => void, moveOption: (index: number, direction: "up" | "down") => void }) => {

  const handleOptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(index, e.target.value);
  }

  return <div className="flex flex-row gap-4 items-center w-full">
    <TextArea
      className="bg-background w-full text-foreground border-2 border-border placeholder:text-foreground/50"
      value={option}
      rows={3}
      onChange={handleOptionChange}
      placeholder={`Option ${index + 1}`}
    />
    <MoveControls handleMove={moveOption} index={index} maxIndex={maxIndex} />
    <RemoveButton HandleClick={() => { removeOption(index) }} />
  </div>
}


const MoveControls = ({ handleMove, index, maxIndex }: { handleMove: (index: number, direction: "up" | "down") => void, index: number, maxIndex: number }) => {
  const buttonClass = "w-8 h-8 p-0 flex items-center justify-center bg-secondary hover:bg-secondary-hover disabled:bg-secondary-disabled disabled:hover:bg-secondary-disabled disabled:cursor-not-allowed active:bg-secondary-active";
  return <>
    <div className="flex flex-col gap-2">
      <Button
        disabled={index === 0}
        className={buttonClass}
        onClick={() => { handleMove(index, "up") }}
      >
        <img src={UpArrowIcon} alt="Up" className="w-4 h-4" />
      </Button>
      <Button
        disabled={index === maxIndex}
        className={buttonClass}
        onClick={() => { handleMove(index, "down") }}
      >
        <img src={DownArrowIcon} alt="Down" className="w-4 h-4" />
      </Button>
    </div>
  </>
}

const RemoveButton = ({ HandleClick }: { HandleClick: () => void }) => {
  return <Button
    className="w-8 h-8 p-0 flex items-center justify-center bg-error hover:bg-error-hover"
    onClick={() => { HandleClick() }}
  >
    <img src={XMarkIcon} alt="Remove" className="w-4 h-4" />
  </Button>
}
