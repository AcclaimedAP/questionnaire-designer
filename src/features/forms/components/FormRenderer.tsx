import { Form, FormField, FormFieldType, FreeTextSettings, FreeTextSettingsInputType } from "@/types/models/form";
import { Input, MultiInput, Dropdown } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { memo, useEffect, useMemo, useState } from 'react';
import { cn } from "@/utils/cn";
import { Validator } from "@/lib/validator";

export const FormRenderer = memo(({ form, isPreview }: { form: Form, isPreview: boolean }) => {

  const isDisabled = useMemo(() => {
    return isPreview;
  }, [isPreview]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">{form.title}</h1>
      <form className="flex flex-col gap-4 divide-y-2 divide-border">
        {form.fields.map((field, index) => (
          <FormFieldRenderer field={field} key={index} />
        ))}
        <Button type="submit" className="w-full border-2 border-border rounded-md hover:bg-border disabled:bg-border disabled:text-text/50" disabled={isDisabled}>Submit</Button>
      </form>
    </div>
  );
});


const FormFieldRenderer = memo(({ field }: { field: FormField }) => {
  if (field.type === FormFieldType.CHECKBOX) {
    return <MultiInputField field={field} />
  }
  const validatorConfig: Validator.Types.Configuration = {
    required: field.settings.required,
    char: "any",
    type: "string",
    min: undefined,
    max: undefined
  }
  if (field.type === FormFieldType.TEXT) {
    const settings = field.settings as FreeTextSettings;
    validatorConfig.type = settings.inputType === FreeTextSettingsInputType.NUMBER ? "number" : "string";
    validatorConfig.min = settings.min ?? undefined;
    validatorConfig.max = settings.max ?? undefined;
  }
  const validator = new Validator.Class(validatorConfig);
  return <SingleInputField field={field} validator={validator} />
});

const SingleInputField = memo(({ field, validator }: { field: FormField, validator: Validator.Class }) => {
  const [value, setValue] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const classes = "bg-background border-2 border-border p-2";
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    const result = validator.validate(value);
    setIsValid(result.isValid);
    setMessage(result.message);
  };


  return (<>
    <InputContainer>
      <label className="text-lg">{field.label}</label>
      {field.type === FormFieldType.TEXT && <Input
        type={field.type}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={field.settings.placeholder}
        className={cn(classes, "text-foreground", !isValid && "border-red-500")}
      />}
      {field.type === FormFieldType.DROPDOWN && <Dropdown
        options={field.options || []}
        value={value}
        placeholder={field.settings.placeholder}
        onChange={handleChange as unknown as React.ChangeEventHandler<HTMLSelectElement>}
        onBlur={handleBlur}
        className={cn(classes, "text-foreground", !isValid && "border-red-500")}
      />}
      {field.type === FormFieldType.RADIO && <MultiInput
        type={field.type}
        label={field.label || field.settings.placeholder || "Radio field"}
        options={field.options || []}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={cn(classes, "text-foreground", !isValid && "border-red-500")}
      />}
      {!isValid && <p className="text-red-500">{message}</p>}
    </InputContainer>

  </>
  )
});

const MultiInputField = memo(({ field }: { field: FormField }) => {
  const [value, setValue] = useState<string[]>([]);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setValue(prev => [...prev, e.target.value]);
    } else {
      setValue(prev => prev.filter(v => v !== e.target.value));
    }
  };

  const validate = () => {
    if (field.settings.required && value.length === 0) {
      setIsValid(false);
      setMessage("Has to be selected");
    } else {
      setIsValid(true);
      setMessage("");
    }
  };

  useEffect(() => {
    validate();
  }, [value]);

  return (
    <InputContainer>
      <label className="text-lg">{field.label}</label>
      <MultiInput
        type={field.type}
        label={field.label || field.settings.placeholder || "Checkbox field"}
        options={field.options || []}
        value={value}
        onChange={handleChange}
      />
      {!isValid && <p className="text-red-500">{message}</p>}
    </InputContainer>
  );
});



const InputContainer = memo(({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col gap-4 p-2 py-4">
    {children}
  </div>
));