import { Form } from "@/types/models/form";
import { FormField } from "@/types/models/form";
import { FormFieldType } from "@/types/models/form";
import { TextInput, MultiInput, Dropdown } from "@/components/ui/Input";

import { Button } from "@/components/ui/Button";


export const FormRenderer = ({ form }: { form: Form }) => {



  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">{form.title}</h1>
      <form className="flex flex-col gap-4 divide-y-2 divide-border">
        {form.fields.map((field, index) => {
          return <FormFieldRenderer field={field} key={index} />
        })}
        <Button type="submit">Submit</Button>
      </form>
    </div>
  )
}

const FormFieldRenderer = ({ field }: { field: FormField }) => {
  if (field.type === FormFieldType.TEXT) {
    return <InputContainer>
      <label>{field.label}</label>
      <TextInput type={field.type} value={field.label} onChange={() => { }} placeholder={field.label} className="bg-background text-foreground border-2 border-border p-2" />
    </InputContainer>
  } else if (field.type === FormFieldType.DROPDOWN) {
    return <InputContainer>
      <label>{field.label}</label>
      <Dropdown
        options={field.options || []}
        value={""}
        onChange={() => { }}
        className="bg-background text-foreground border-2 border-border p-2"
      />
    </InputContainer>
  }
  return <InputContainer>
    <MultiInput type={field.type} label={field.label} options={field.options || []} value={[]} onChange={() => { }} />
  </InputContainer>
}

const InputContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col gap-2 p-4">
    {children}
  </div>
}
