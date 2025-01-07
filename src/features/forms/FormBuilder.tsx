import { Form } from "@/types/models/form";
import { FormEditor } from "./components/FormEditor/FormEditor";
import { FormPreview } from "./components/FormPreview";
import { useState, useCallback, useEffect } from "react";
import { FormFactory } from "@/mocks/formFactory";
import { useParams } from "react-router";
import api from "@/lib/api";
import { LoadSpinner } from '@/components/ui/Loader';
import { useNavigate } from "react-router";


export const FormBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const updateForm = useCallback((form: Form) => {
    setFormData(form);
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      setIsSaving(true);
      console.log(formData);
      const response = await handleSave();
      console.log(response);
      navigate(`/form/${id}`);
    } catch (error) {
      console.error(error);
      setError('Failed to save form');
    } finally {
      setIsSaving(false);
    }
  }, [formData]);

  const handleSave = useCallback(async () => {
    try {
      if (id) {
        return await api.put(`/api/forms/${id}`, formData);
      } else {
        return await api.post(`/api/forms`, formData);
      }
    } catch (error) {
      console.error(error);
      setError('Failed to save form');
    }
  }, [formData, id]);

  useEffect(() => {
    const fetchFormData = async () => {
      if (formData) return;
      if (!id) {
        const formFactory = new FormFactory();
        setFormData(formFactory.setRandomTitle().build());
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const form = await api.get<Form>(`/api/forms/${id}`);
        setFormData(form.data);
      } catch (error) {
        console.error(error);
        setError('No form with this id found');
      } finally {
        setLoading(false);
      }
    }
    fetchFormData();
  }, [id]);

  return (<>
    <div className="flex flex-col gap-4 justify-center items-center">
      {formData ? <>
        <div className="flex flex-row justify-between items-start gap-4 w-full p-4 divide-x-2 divide-border fade-in">
          <FormEditor form={formData} updateForm={updateForm} />
          <FormPreview form={formData} />
        </div>
        <div>
          <button disabled={isSaving} onClick={() => handleSubmit()}
            className="bg-primary text-white px-4 py-2 rounded-md m-4 disabled:bg-primary/50 disabled:text-white/50"
          >{isSaving ? 'Saving...' : 'Save'}</button>
        </div>
      </> : error ? <div className="text-red-500">{error}</div> : null}
    </div>
    {loading && <div className="flex flex-col gap-4 items-center justify-center inset-0 bg-background/50 w-screen h-screen fixed z-50"><LoadSpinner /></div>}
  </>
  );
};
