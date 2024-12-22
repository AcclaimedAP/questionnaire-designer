import api from '@/lib/api';
import { Form } from '@/types/models/form';
import { useEffect, useState } from 'react';
/**
 * Form index page.
 * Fetches all forms and displays them in a list.
 * 
 */

export const FormIndex = () => {
  const [forms, setForms] = useState<Form[]>([]);

  useEffect(() => {
    api.get<{ forms: Form[] }>('/api/forms').then((response) => {
      setForms(response.data.forms);
    });
  }, []);

  return (
    <>
      <div>
        <h1>All forms</h1>
        <p>{forms.length}</p>
      </div>
    </>
  )
}
