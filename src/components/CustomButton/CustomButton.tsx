import { FC } from "react";
import state from "../../store";
import { useSnapshot } from "valtio";
import { getContrastingColor } from "../../config/helpers.ts";

interface CustomButtonProps {
  type: "filled" | "outline";
  title: string;
  handleClick?: () => void;
  customStyles?: string;
}

const CustomButton: FC<CustomButtonProps> = ({
  type,
  title,
  handleClick,
  customStyles,
}) => {
  const snap = useSnapshot(state);
  const generateStyle = (type: string) => {
    if (type === "filled") {
      return {
        backgroundColor: snap.color,
        color: getContrastingColor(snap.color),
      };
    }
    if (type === "outline") {
      return {
        borderWidth: "1px",
        borderColor: snap.color,
        color: snap.color,
      };
    }
  };

  return (
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
