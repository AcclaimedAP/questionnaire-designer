import { Form } from "@/types/models/form";
import { FormField } from "@/types/models/form";
import { FormFieldType } from "@/types/models/form";
import { TextInput, MultiInput } from "@/components/ui/Input";

import { Button } from "@/components/ui/Button";


export const FormRenderer = ({ form }: { form: Form }) => {



  return (
    <div className="flex flex-col gap-4">
      <h1>{form.title}</h1>
      <form className="flex flex-col gap-4">
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
    return <div>
      <TextInput type={field.type} label={field.label} value={field.label} onChange={() => { }} />
    </div>
  }
  return <div>
    <MultiInput type={field.type} label={field.label} options={field.options || []} value={[]} onChange={() => { }} />
  </div>
}

