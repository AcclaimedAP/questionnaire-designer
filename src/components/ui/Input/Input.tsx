import { TextInput, TextInputProps } from "./TextInput";
import { NumberInput, NumberInputProps } from "./NumberInput";
import { TextArea, TextAreaProps } from "./TextArea";

export type InputProps =
  | ({ type: "number" } & NumberInputProps)
  | ({ type: "text" } & TextInputProps)
  | ({ type: "textarea" } & TextAreaProps);

export const Input = (props: InputProps) => {
  if (props.type === "number") {
    return <NumberInput {...props} />;
  }
  if (props.type === "textarea") {
    return <TextArea {...props} />;
  }
  return <TextInput {...props} />;
}
