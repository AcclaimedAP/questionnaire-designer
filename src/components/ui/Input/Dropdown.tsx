import { HtmlHTMLAttributes } from "react";

export const Dropdown = ({ options, value, onChange, ...props }: { options: string[], value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void } & HtmlHTMLAttributes<HTMLSelectElement>) => {
  return <select value={value} onChange={onChange} {...props}>
    {options.map((option, index) => {
      return <option key={index} value={option}>{option}</option>
    })}
  </select>
}

