import { Form } from "@/types/models/form";
import { FormEditor } from "./components/FormEditor/FormEditor";
import { FormPreview } from "./components/FormPreview";
import { useState, useCallback, useMemo, useEffect } from "react";
import { FormFactory } from "@/mocks/formFactory";
import { useParams } from "react-router";
import api from "@/lib/api";

export const FormBuilder = () => {
  const { id } = useParams();
  const initialForm = useMemo(() => {
    const formFactory = new FormFactory();
    return formFactory.setRandomTitle().build();
  }, []);

  const [formData, setFormData] = useState<Form>(initialForm);

  const updateForm = useCallback((form: Form) => {
    setFormData(form);
  }, []);

  const handleSave = useCallback(() => {
    if (id) {
      api.put(`/api/forms/${id}`, formData);
    } else {
      api.post(`/api/forms`, formData);
    }
  }, [formData, id]);

  useEffect(() => {
    if (id) {
      api.get<Form>(`/api/forms/${id}`).then((form) => {
        console.log(form);
        setFormData(form.data);
      });
    }
  }, [id]);

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <div className="flex flex-row justify-between items-start gap-4 w-full p-4 divide-x-2 divide-border">
        <FormEditor form={formData} updateForm={updateForm} />
        <FormPreview form={formData} />
      </div>
      <div>
        <button onClick={() => handleSave()}
          className="bg-primary text-white px-4 py-2 rounded-md m-4"
        >Save</button>
      </div>
    </div>
  );
};
