import { Form } from "@/types/models/form";
import { FormEditor } from "./FormEditor";
import { FormPreview } from "./FormPreview";
import { useState } from "react";
import { FormFactory } from "@/mocks/formFactory";
export const FormBuilder = () => {
  const formFactory = new FormFactory();
  const form = formFactory
    .setRandomTitle()
    .addTextField("Test field")
    .addTextField("Test field 2")
    .addCheckboxField("Test checkbox", ["Option 1", "Option 2", "Option 3"])
    .addRadioField("Test radio", ["Option 1", "Option 2", "Option 3"])
    .build();

  const [formData, setFormData] = useState<Form>(form);

  const updateForm = (form: Form) => {
    setFormData(form);
  }

  return (
    <div className="flex flex-row justify-between items-start gap-4 border-2 border-red-400 w-full p-4">
      <button onClick={() => { console.log(formData) }}>test</button>
      <FormEditor form={formData} updateForm={updateForm} />
      <FormPreview form={formData} />
    </div>
  )
}

