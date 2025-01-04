import { HtmlHTMLAttributes } from "react";

export type TextAreaProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  rows?: number;
} & HtmlHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = ({ value, onChange, placeholder, rows = 3, ...props }: TextAreaProps) => {
  return <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows} {...props} />
}
