import { HtmlHTMLAttributes } from "react";

export const TextInput = ({ type, label, value, onChange, ...props }: { type: string, label: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void } & HtmlHTMLAttributes<HTMLInputElement>) => {
  return <>
    <label>{label}</label>
    <input type={type} value={value} onChange={onChange} {...props} />
  </>
}
