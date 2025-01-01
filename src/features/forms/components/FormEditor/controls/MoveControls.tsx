import { Button } from "@/components/ui/Button";
import UpArrowIcon from "@/assets/icons/up.svg";
import DownArrowIcon from "@/assets/icons/down.svg";

interface MoveControlsProps {
  handleMove: (index: number, direction: "up" | "down") => void;
  index: number;
  maxIndex: number;
}

export const MoveControls = ({ handleMove, index, maxIndex }: MoveControlsProps) => {
  const buttonClass = "w-8 h-8 p-0 flex items-center justify-center bg-secondary hover:bg-secondary-hover disabled:bg-secondary-disabled disabled:hover:bg-secondary-disabled disabled:cursor-not-allowed active:bg-secondary-active";

  return (
    <div className="flex flex-col gap-2">
      <Button
        disabled={index === 0}
        className={buttonClass}
        onClick={() => handleMove(index, "up")}
      >
        <img src={UpArrowIcon} alt="Up" className="w-4 h-4" />
      </Button>
      <Button
        disabled={index === maxIndex}
        className={buttonClass}
        onClick={() => handleMove(index, "down")}
      >
        <img src={DownArrowIcon} alt="Down" className="w-4 h-4" />
      </Button>
    </div>
  );
}; 