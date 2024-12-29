import { Form } from "@/types/models/form";
import { FormEditor } from "./FormEditor";
import { FormPreview } from "./FormPreview";
import { useState } from "react";
import { FormFactory } from "@/mocks/formFactory";

export const FormBuilder = () => {
  const formFactory = new FormFactory();
  const form = formFactory
    .setRandomTitle()
    .build();

  const [formData, setFormData] = useState<Form>(form);

  const updateForm = (form: Form) => {
    setFormData(form);
  }

  return (
    <>
      <div className="flex flex-row justify-between items-start gap-4 w-full p-4 divide-x-2 divide-border">
        <FormEditor form={formData} updateForm={updateForm} />
        <FormPreview form={formData} />
      </div>
    </>
  )
}
