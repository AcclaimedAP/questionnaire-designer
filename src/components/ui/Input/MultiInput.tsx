
import { HtmlHTMLAttributes } from "react";


export const MultiInput = ({ type, label, options, value, onChange, ...props }: { type: string, label: string, options: string[], value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void } & HtmlHTMLAttributes<HTMLDivElement>) => {
  return <div className="flex flex-col gap-2">
    <label>{label}</label>
    {options.map((option, index) => {
      return (
        <div key={index} className="flex flex-row gap-2">
          <input type={type} value={option} name={label} onChange={onChange} {...props} />
          <label htmlFor={label}>{option}</label>
        </div>
      )
    })}
  </div>
}

