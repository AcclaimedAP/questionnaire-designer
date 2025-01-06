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

  if (field.type === FormFieldType.CHECKBOX) {
    return <MultiInputField field={field} />
  }

  return <SingleInputField field={field} />
});

const SingleInputField = memo(({ field }: { field: FormField }) => {
  const [value, setValue] = useState<string>("");
  const classes = "bg-background border-2 border-border p-2";
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (<>
    <InputContainer>
      <label className="text-lg">{field.label}</label>
      {field.type === FormFieldType.TEXT && <Input
        type={field.type}
        value={value}
        onChange={handleChange}
        placeholder={field.settings.placeholder}
        className={cn(classes, "text-foreground")}
      />}
      {field.type === FormFieldType.DROPDOWN && <Dropdown
        options={field.options || []}
        value={value}
        placeholder={field.settings.placeholder}
        onChange={handleChange as unknown as React.ChangeEventHandler<HTMLSelectElement>}
        className={cn(classes, value === "" ? "text-text/50" : "text-text")}
      />}
      {field.type === FormFieldType.RADIO && <MultiInput
        type={field.type}
        label={field.label}
        options={field.options || []}
        value={value}
        onChange={handleChange}
      />}
    </InputContainer>
  </>
  )
});

const MultiInputField = memo(({ field }: { field: FormField }) => {
  const [value, setValue] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setValue(prev => [...prev, e.target.value]);
    } else {
      setValue(prev => prev.filter(v => v !== e.target.value));
    }
  };

  return (
    <InputContainer>
      <label className="text-lg">{field.label}</label>
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
  <div className="flex flex-col gap-4 p-2 py-4">
    {children}
  </div>
));