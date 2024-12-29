import { HtmlHTMLAttributes } from "react";

export const TextInput = ({ type, value, onChange, placeholder, ...props }: { type: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder: string } & HtmlHTMLAttributes<HTMLInputElement>) => {
  return <input type={type} value={value} onChange={onChange} placeholder={placeholder} {...props} />
}
