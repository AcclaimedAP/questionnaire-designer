import { Button } from "@/components/ui/Button";
import XMarkIcon from "@/assets/icons/xmark.svg";

interface RemoveButtonProps {
  HandleClick: () => void;
}

export const RemoveButton = ({ HandleClick }: RemoveButtonProps) => {
  return (
    <Button
      className="w-8 h-8 p-0 flex items-center justify-center bg-error hover:bg-error-hover"
      onClick={HandleClick}
    >
      <img src={XMarkIcon} alt="Remove" className="w-4 h-4" />
    </Button>
  );
}; 