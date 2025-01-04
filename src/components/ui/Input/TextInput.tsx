import { HtmlHTMLAttributes } from "react";

export type TextInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  inputType?: "text" | "password" | "email" | "tel" | "url";
} & HtmlHTMLAttributes<HTMLInputElement>;

export const TextInput = ({ inputType = "text", value, onChange, placeholder, ...props }: TextInputProps) => {
  return <input type={inputType} value={value} onChange={onChange} placeholder={placeholder} {...props} />
}
