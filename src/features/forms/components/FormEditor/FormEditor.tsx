import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Form, FormField, FormFieldType } from "@/types/models/form";
import { useState, useCallback, useEffect, useRef } from "react";
import { Field } from "./Field";

export const FormEditor = ({ form, updateForm }: { form: Form, updateForm: (form: Form) => void }) => {
  const [title, setTitle] = useState(form?.title || '');
  const [fields, setFields] = useState<FormField[]>(form?.fields || []);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    updateForm({ ...form, title, fields });
  }, [title, fields]);

  const addField = useCallback(() => {
    const newField: FormField = {
      label: '',
      type: FormFieldType.TEXT,
      settings: {
        required: false,
        placeholder: ''
      },
      options: []
    }
    setFields(prev => [...prev, newField]);
  }, []);

  const updateField = useCallback((index: number, field: FormField) => {
    setFields(prev => {
      const newFields = prev.map((f, i) => i === index ? field : f);
      return newFields;
    });
  }, []);

  const removeField = useCallback((index: number) => {
    setFields(prev => prev.filter((_, i) => i !== index));
  }, []);

  const moveField = useCallback((index: number, direction: "up" | "down") => {
    if (index === 0 && direction === "up") return;

    setFields(prev => {
      if (index === prev.length - 1 && direction === "down") return prev;

      const newFields = [...prev];
      const temp = newFields[index];
      const targetIndex = index + (direction === "up" ? -1 : 1);
      newFields[index] = newFields[targetIndex];
      newFields[targetIndex] = temp;
      return newFields;
    });
  }, []);

  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full p-4">
      <h1 className="text-2xl font-bold">Form Editor</h1>
      <div className="flex flex-col gap-4">
        <Input
          type="textarea"
          className="bg-background text-foreground text-xl border-2 border-border placeholder:text-foreground/50"
          value={title}
          onChange={handleTitleChange}
          placeholder="Form title"
        />
        <div className="flex flex-col gap-4">
          {fields.map((field, index) => (
            <Field
              key={index}
              field={field}
              index={index}
              maxIndex={fields.length - 1}
              updateField={updateField}
              removeField={removeField}
              moveField={moveField}
            />
          ))}
        </div>
        <Button
          onClick={addField}
          className="bg-primary text-primary-foreground hover:bg-primary-hover"
        >
          Add Field
        </Button>
      </div>
    </div>
  );
};
