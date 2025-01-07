import { Form } from "@/types/models/form";
import { FormRenderer } from "./FormRenderer";
import { memo } from 'react';

export const FormPreview = memo(({ form }: { form: Form }) => {
  return (
    <div className="flex flex-col gap-4 w-full p-4">
      <FormRenderer form={form} isPreview={true} />
    </div>
  );
});


