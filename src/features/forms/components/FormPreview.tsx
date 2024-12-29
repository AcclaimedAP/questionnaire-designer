import { Form } from "@/types/models/form";
import { FormRenderer } from "./FormRenderer";

export const FormPreview = ({ form }: { form: Form }) => {
  return (
    <div className="flex flex-col gap-4 w-full p-4">
      <FormRenderer form={form} />
    </div>
  )
}

