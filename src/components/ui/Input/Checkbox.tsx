import { HtmlHTMLAttributes } from "react";


export const Checkbox = ({ checked, onChange, name, ...props }: { checked: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, name: string } & HtmlHTMLAttributes<HTMLInputElement>) => {
  return <input name={name} type="checkbox" checked={checked} onChange={onChange} {...props} />
}