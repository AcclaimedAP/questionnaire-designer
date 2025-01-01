import { Form } from "@/types/models/form";
import { FormEditor } from "./components/FormEditor/FormEditor";
import { FormPreview } from "./components/FormPreview";
import { useState, useCallback, useMemo } from "react";
import { FormFactory } from "@/mocks/formFactory";

export const FormBuilder = () => {
  const initialForm = useMemo(() => {
    const formFactory = new FormFactory();
    return formFactory.setRandomTitle().build();
  }, []);

  const [formData, setFormData] = useState<Form>(initialForm);

  const updateForm = useCallback((form: Form) => {
    setFormData(form);
  }, []);

  return (
    <div className="flex flex-row justify-between items-start gap-4 w-full p-4 divide-x-2 divide-border">
      <FormEditor form={formData} updateForm={updateForm} />
      <FormPreview form={formData} />
    </div>
  );
};
