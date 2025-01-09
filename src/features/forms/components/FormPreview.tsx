import { Form } from "@/types/models/form";
import { FormRenderer } from "./FormRenderer";
import { memo } from 'react';
import { cn } from "@/utils/cn";

export const FormPreview = memo(({ form, isOpen }: { form: Form, isOpen: boolean }) => {
  return (
    <div className={cn("fixed sm:static w-full h-full top-0 left-0 right-0 bottom-0 z-30 transition-all duration-300 overflow-x-hidden overflow-y-auto", isOpen ? 'translate-x-0' : 'translate-x-full', "sm:translate-x-0")}>
      <div className={cn("flex flex-col gap-4 w-full p-4 bg-background/95 h-full")}>
        <FormRenderer form={form} isPreview={true} />
      </div>
    </div>
  );
});


