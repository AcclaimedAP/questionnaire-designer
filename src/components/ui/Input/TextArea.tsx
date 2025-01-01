import { HtmlHTMLAttributes } from "react";

export const TextArea = ({ value, onChange, placeholder, rows = 3, ...props }: { value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, placeholder: string, rows?: number } & HtmlHTMLAttributes<HTMLTextAreaElement>) => {
  return <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows} {...props} />
}
