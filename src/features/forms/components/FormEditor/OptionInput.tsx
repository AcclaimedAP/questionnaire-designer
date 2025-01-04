import { Input } from "@/components/ui/Input";
import { MoveControls } from "./controls/MoveControls";
import { RemoveButton } from "./controls/RemoveButton";

interface OptionInputProps {
  option: string;
  index: number;
  maxIndex: number;
  onChange: (index: number, label: string) => void;
  removeOption: (index: number) => void;
  moveOption: (index: number, direction: "up" | "down") => void;
}

export const OptionInput = ({
  option,
  index,
  maxIndex,
  onChange,
  removeOption,
  moveOption
}: OptionInputProps) => {
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(index, e.target.value);
  };

  return (
    <div className="flex flex-row gap-4 items-center w-full">
      <Input
        type="text"
        className="bg-background w-full text-foreground border-2 border-border placeholder:text-foreground/50 p-1"
        value={option}
        onChange={handleOptionChange}
        placeholder={`Option ${index + 1}`}
      />
      <MoveControls handleMove={moveOption} index={index} maxIndex={maxIndex} />
      <RemoveButton HandleClick={() => removeOption(index)} />
    </div>
  );
};