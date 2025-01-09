
import { HtmlHTMLAttributes } from "react";

export const MultiInput = ({ type, label, options, value, onChange, ...props }: { type: string, label: string, options: string[], value: string | string[], onChange: (e: React.ChangeEvent<HTMLInputElement>) => void } & HtmlHTMLAttributes<HTMLDivElement>) => {
  return <div className="flex flex-col gap-2">
    {(type === "checkbox" && Array.isArray(value)) && <CheckboxInput type={type} label={label} options={options} value={value} onChange={onChange} {...props} />}
    {(type === "radio" && !Array.isArray(value)) && <RadioInput type={type} label={label} options={options} value={value} onChange={onChange} {...props} />}
  </div>
}

const RadioInput = ({ type, label, options, value, onChange, ...props }: { type: string, label: string, options: string[], value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void } & HtmlHTMLAttributes<HTMLDivElement>) => {
  return options.map((option, index) => {
    return <div key={index} className="flex flex-row gap-2">
      <input type={type} value={option} name={label} onChange={onChange} checked={value === option} {...props} />
      <label htmlFor={label}>{option}</label>
    </div>
  })
}

const CheckboxInput = ({ type, label, options, value, onChange, ...props }: { type: string, label: string, options: string[], value: string[], onChange: (e: React.ChangeEvent<HTMLInputElement>) => void } & HtmlHTMLAttributes<HTMLDivElement>) => {
  return options.map((option, index) => {
    return <div key={index} className="flex flex-row gap-2">
      <input type={type} name={option} value={option} checked={value.includes(option)} onChange={onChange} {...props} />
      <label htmlFor={label}>{option}</label>
    </div>
  })
}

