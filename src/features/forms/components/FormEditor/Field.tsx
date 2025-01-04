import { FormField, FormFieldSettings, FormFieldType, FreeTextSettings } from "@/types/models/form";
import { Dropdown, Input } from "@/components/ui/Input";
import { useCallback } from "react";
import { FieldOptions } from "./FieldOptions";
import { MoveControls } from "./controls/MoveControls";
import { RemoveButton } from "./controls/RemoveButton";
import { FieldSettings } from "./FieldSettings";

interface FieldProps {
  field: FormField;
  index: number;
  maxIndex: number;
  updateField: (index: number, field: FormField) => void;
  removeField: (index: number) => void;
  moveField: (index: number, direction: "up" | "down") => void;
}

export const Field = ({
  field,
  index,
  maxIndex,
  updateField,
  removeField,
  moveField
}: FieldProps) => {
  const handleLabelChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateField(index, { ...field, label: e.target.value });
  }, [field, index, updateField]);

  const handleTypeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    updateField(index, { ...field, type: e.target.value as FormFieldType });
  }, [field, index, updateField]);

  const updateFieldSettings = useCallback((settings: FormFieldSettings | FreeTextSettings) => {
    updateField(index, { ...field, settings });
  }, [field, index, updateField]);

  return (
    <div className="flex flex-col gap-4 justify-between border-2 border-border rounded-md p-4">
      <div className="flex flex-row gap-4 justify-between items-center">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-row gap-2 justify-between">
            <label className="text-lg font-bold">
              {field.type.toString().charAt(0).toUpperCase() + field.type.toString().slice(1)} Input
            </label>
            <div className="flex flex-row gap-2">
              <Dropdown
                className="bg-background text-foreground border-2 border-border p-1"
                options={Object.values(FormFieldType).map(type => type.toString())}
                value={field.type.toString()}
                onChange={handleTypeChange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-between">
            <Input
              type="textarea"
              className="bg-background text-foreground border-2 border-border placeholder:text-foreground/50 p-1"
              value={field.label}
              onChange={handleLabelChange}
              placeholder="Form label"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <RemoveButton HandleClick={() => removeField(index)} />
          <MoveControls handleMove={moveField} index={index} maxIndex={maxIndex} />
        </div>
      </div>
      <FieldSettings type={field.type} settings={field.settings} updateSettings={updateFieldSettings} />

      {(field.type === FormFieldType.RADIO ||
        field.type === FormFieldType.CHECKBOX ||
        field.type === FormFieldType.DROPDOWN) && (
          <FieldOptions
            field={field}
            updateField={(updatedField) => updateField(index, updatedField)}
          />
        )}
    </div>
  );
}; 