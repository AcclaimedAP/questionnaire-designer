import { Checkbox } from "@/components/ui/Input"
import { FormFieldType, FormFieldSettings, FreeTextSettings } from "@/types/models/form";
import { Input, Dropdown } from "@/components/ui/Input";

type FieldSettingsProps = {
  type: FormFieldType;
  settings: FormFieldSettings | FreeTextSettings;
  updateSettings: (settings: FormFieldSettings | FreeTextSettings) => void;
}

export const FieldSettings = ({ type, settings, updateSettings }: FieldSettingsProps) => {
  const handleRequiredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({ ...settings, required: e.target.checked });
  };

  const handlePlaceholderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({ ...settings, placeholder: e.target.value });
  };

  const handleMinLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === FormFieldType.TEXT) {
      updateSettings({
        ...settings,
        min: e.target.value || null
      } as FreeTextSettings);
    }
  };

  const handleMaxLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({
      ...settings,
      max: e.target.value || null
    } as FreeTextSettings);
  };

  const handleInputTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSettings({
      ...settings,
      inputType: e.target.value as "text" | "textarea" | "number" | "tel" | "email" | "password" | "search" | "url"
    } as FreeTextSettings);
  };

  const handleRowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSettings({
      ...settings,
      rows: e.target.value || null
    } as FreeTextSettings);
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-bold">Field Settings</h3>
      <div className="flex flex-row gap-2 items-center">
        <Checkbox
          name="required"
          checked={settings.required}
          onChange={handleRequiredChange}
        />
        <label className="text-sm" htmlFor="required">Mandatory?</label>
      </div>
      {type !== FormFieldType.CHECKBOX && <div className="flex flex-col gap-2">
        <label className="text-sm" htmlFor="placeholder">Placeholder</label>
        <Input
          type="text"
          value={settings.placeholder}
          onChange={handlePlaceholderChange}
          placeholder="Input a placeholder"
          className="bg-background text-foreground border-2 border-border placeholder:text-foreground/50 p-1"
        />
      </div>}
      {type === FormFieldType.TEXT && (
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 items-center justify-between">
            <div className="flex flex-col gap-2 items-center">
              <label className="text-sm" htmlFor="inputType">Input Type</label>
              <Dropdown
                className="bg-background text-foreground border-2 border-border p-1"
                options={["text", "textarea", "number", "tel", "email", "password", "search", "url"]}
                value={(settings as FreeTextSettings).inputType}
                onChange={handleInputTypeChange}
              />
            </div>
            {(settings as FreeTextSettings).inputType === "textarea" && <div className="flex flex-col gap-2 items-center">
              <label className="text-sm" htmlFor="rows">Rows</label>
              <Input
                type="number"
                value={(settings as FreeTextSettings).rows}
                onChange={handleRowsChange}
                placeholder="rows"
                className="w-20 bg-background text-foreground border-2 border-border placeholder:text-foreground/50 p-1"
              />
            </div>}
            <div className="flex flex-col gap-2 items-center">
              <label className="text-sm">Is between</label>
              <div className="flex flex-row gap-2 items-center">
                <Input
                  type="number"
                  value={(settings as FreeTextSettings).min}
                  onChange={handleMinLengthChange}
                  placeholder="min"
                  className="w-20 bg-background text-foreground border-2 border-border placeholder:text-foreground/50 p-1"
                />
                <span className="text-sm">and</span>
                <Input
                  type="number"
                  value={(settings as FreeTextSettings).max}
                  onChange={handleMaxLengthChange}
                  placeholder="max"
                  className="w-20 bg-background text-foreground border-2 border-border placeholder:text-foreground/50 p-1"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
