import { FormBuilder } from "@/features/forms/FormBuilder";

/**
 * Form create page.
 * Allows the user to create a new form.
 */

export const FormCreate = () => {
  return (
    <div className="border-2 border-gray-400">
      <FormBuilder />
    </div>
  )
}

export default FormCreate;
