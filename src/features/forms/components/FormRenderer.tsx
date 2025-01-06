import { Form, FormField, FormFieldType } from "@/types/models/form";
import { Input, MultiInput, Dropdown } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { memo, useState } from 'react';
import { cn } from "@/utils/cn";

export const FormRenderer = memo(({ form }: { form: Form }) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">{form.title}</h1>
      <form className="flex flex-col gap-4 divide-y-2 divide-border">
        {form.fields.map((field, index) => (
          <FormFieldRenderer field={field} key={index} />
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
});


const FormFieldRenderer = memo(({ field }: { field: FormField }) => {
  const [value, setValue] = useState("");
  const classes = "bg-background border-2 border-border p-2";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  if (field.type === FormFieldType.TEXT) {
    return (
      <InputContainer>
        <label>{field.label}</label>
        <Input
          type={field.type}
          value={value}
          onChange={handleChange}
          placeholder={field.settings.placeholder}
          className={cn(classes, "text-foreground")}
        />
      </InputContainer>
    );
  }

  if (field.type === FormFieldType.DROPDOWN) {
    return (
      <InputContainer>
        <label>{field.label}</label>
        <Dropdown
          options={field.options || []}
          value={value}
          placeholder={field.settings.placeholder}
          onChange={handleChange as unknown as React.ChangeEventHandler<HTMLSelectElement>}
          className={cn(classes, value === "" ? "text-text/50" : "text-text")}
        />
      </InputContainer>
    );
  }

  return (
    <InputContainer>
      <MultiInput
        type={field.type}
        label={field.label}
        options={field.options || []}
        value={value}
        onChange={handleChange}
      />
    </InputContainer>
  );
});


const InputContainer = memo(({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col gap-2 p-4">
    {children}
  </div>
));