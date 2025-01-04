import { HtmlHTMLAttributes } from "react";
export type NumberInputProps = {
  value: number | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
} & HtmlHTMLAttributes<HTMLInputElement>;

export const NumberInput = ({ value = null, onChange, placeholder, ...props }: NumberInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (isNaN(value)) {
      e.target.value = "";
    }
    onChange(e);
  }

  return <input type="number" value={value || ""} onChange={handleChange} placeholder={placeholder} {...props} />
}
