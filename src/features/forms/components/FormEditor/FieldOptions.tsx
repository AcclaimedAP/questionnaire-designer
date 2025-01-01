import { FormField } from "@/types/models/form";
import { Button } from "@/components/ui/Button";
import { OptionInput } from "./OptionInput";
import PlusIcon from "@/assets/icons/plusmark.svg";

interface FieldOptionsProps {
  field: FormField;
  updateField: (field: FormField) => void;
}

export const FieldOptions = ({ field, updateField }: FieldOptionsProps) => {
  const addOption = () => {
    updateField({ ...field, options: [...(field.options || []), ''] });
  };

  const removeOption = (optionIndex: number) => {
    const newOptions = field.options?.filter((_, i) => i !== optionIndex) || [];
    updateField({ ...field, options: newOptions });
  };

  const handleOptionsChange = (optionIndex: number, label: string) => {
    const newOptions = field.options?.map((option, i) => i === optionIndex ? label : option) || [];
    updateField({ ...field, options: newOptions });
  };

  const moveOption = (optionIndex: number, direction: "up" | "down") => {
    if (!field.options) return;
    if (optionIndex === 0 && direction === "up") return;
    if (optionIndex === field.options.length - 1 && direction === "down") return;

    const newOptions = [...field.options];
    const temp = newOptions[optionIndex];
    const targetIndex = optionIndex + (direction === "up" ? -1 : 1);
    newOptions[optionIndex] = newOptions[targetIndex];
    newOptions[targetIndex] = temp;
    updateField({ ...field, options: newOptions });
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-lg">Options</label>
      {field.options?.map((option, index) => (
        <OptionInput
          key={index}
          option={option}
          index={index}
          maxIndex={field.options ? field.options.length - 1 : 0}
          onChange={handleOptionsChange}
          removeOption={removeOption}
          moveOption={moveOption}
        />
      ))}
      <Button
        className="w-8 h-8 p-0 flex items-center justify-center bg-primary hover:bg-primary-hover"
        onClick={addOption}>
        <img src={PlusIcon} alt="Add" className="w-4 h-4" />
      </Button>
    </div>
  );
}; 