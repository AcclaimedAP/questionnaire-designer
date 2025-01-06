import { HtmlHTMLAttributes } from "react";

export const Dropdown = ({ options, value, placeholder, onChange, ...props }: { options: string[], value: string, placeholder?: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void } & HtmlHTMLAttributes<HTMLSelectElement>) => {
  return <select value={value} onChange={onChange} {...props}>
    {(placeholder && value === "") && <option value="" disabled>{placeholder}</option>}
    {options.map((option, index) => {
      return <option key={index} value={option}>{option}</option>
    })}
  </select>
}

