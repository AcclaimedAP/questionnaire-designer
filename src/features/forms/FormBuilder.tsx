import { Form } from "@/types/models/form";
import { FormEditor } from "./components/FormEditor/FormEditor";
import { FormPreview } from "./components/FormPreview";
import { useState, useCallback, useEffect, useRef } from "react";
import { FormFactory } from "@/mocks/formFactory";
import { useParams } from "react-router";
import api from "@/lib/api";
import { LoadSpinner } from '@/components/ui/Loader';
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/Button";
import XMarkIcon from "@/assets/icons/xmark.svg";
import { cn } from "@/utils/cn";

export const FormBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleSubmit = useCallback(async () => {
    try {
      setIsSaving(true);
      const response = await handleSave(true);
      if (response?.data)
        await navigate(`/form/${response.data.id}`);
    } catch (error) {
      console.error(error);
      setError('Failed to save form');
    } finally {
      setIsSaving(false);
    }
  }, [formData]);

  const handleSave = useCallback(async (manualSave: boolean = false) => {
    if (!formData) return;
    if (!formData.title && !formData.fields) return;
    if (id) {
      return await api.put<Form>(`/api/forms/${formData.id || id}`, { ...formData, args: { manualSave } });
    } else {
      return await api.post<Form>(`/api/forms`, { ...formData, args: { manualSave } });
    }
  }, [formData, id]);

  const updateForm = useCallback((form: Form) => {
    setFormData(prev => { return { ...prev, ...form } });

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(async () => {
      try {
        const response = await handleSave();
        if (response?.data) {
          setFormData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }, 2000);
  }, [handleSave]);


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

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return (<>
    <div className="flex flex-col gap-4 justify-center items-center overflow-x-hidden">
      {error && <div className="text-red-500">{error}</div>}
      {formData ? <>
        <div className="flex flex-row justify-between items-start gap-4 w-full p-4 divide-x-2 divide-border fade-in">
          <FormEditor form={formData} updateForm={updateForm} />
          <FormPreview form={formData} isOpen={isPreviewOpen} />
        </div>
        <div>
          <button disabled={isSaving} onClick={() => handleSubmit()}
            className="bg-primary text-white px-4 py-2 rounded-md m-4 disabled:bg-primary/50 disabled:text-white/50"
          >{isSaving ? 'Saving...' : 'Save'}</button>
        </div>
      </> : null}
    </div>
    {loading && <div className="flex flex-col gap-4 items-center justify-center inset-0 bg-background/50 w-screen h-screen fixed z-50"><LoadSpinner /></div>}

    <div className="fixed sm:hidden bottom-0 z-50">
      <Button
        onClick={() => setIsPreviewOpen(!isPreviewOpen)}
        className={cn("fixed bg-primary hover:bg-primary-hover transition-all duration-300 text-white z-50 rounded-full p-2 active:bg-primary-active sm:hidden bottom-4 shadow-md", isPreviewOpen ? 'left-4 w-10 h-10' : 'left-[calc(100%-6rem)] w-20 h-10')}
      >{isPreviewOpen ? <img src={XMarkIcon} alt="Close" width={24} height={24} /> : 'Preview'}</Button>
    </div>
  </>
  );
};
