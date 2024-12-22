
import { HtmlHTMLAttributes } from "react";


export const MultiInput = ({ type, label, options, value, onChange, ...props }: { type: string, label: string, options: string[], value: string[], onChange: (e: React.ChangeEvent<HTMLInputElement>) => void } & HtmlHTMLAttributes<HTMLDivElement>) => {
  return <div>
    <label>{label}</label>
    {options.map((option, index) => {
      return (
        <div key={index}>
          <label>{option}</label>
          <input type={type} value={option} name={label} onChange={onChange} {...props} />
        </div>
      )
    })}
  </div>
}

