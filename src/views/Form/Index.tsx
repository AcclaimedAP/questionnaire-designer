import api from '@/lib/api';
import { Form } from '@/types/models/form';
import { useEffect, useState } from 'react';
import { type Column, Table } from '@/components/ui/Table';
import { Link } from 'react-router';
/**
 * Form index page.
 * Fetches all forms and displays them in a list.
 * 
 */

export const FormIndex = () => {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchForms = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get<{ forms: Form[] }>('/api/forms');
        setForms(response.data.forms);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch forms');
      } finally {
        setLoading(false);
      }
    }

    fetchForms();
  }, []);

  const columns: Column[] = [
    { label: 'Id', key: 'id', width: '100px' },
    { label: 'Title', key: 'title', width: 'max' },
    {
      label: 'Actions', key: 'actions', render: (form: Form) => {
        return (
          <>
            <Link className='border-2 border-border rounded-md px-2 py-1 hover:bg-border' to={`/form/${form.id}`}>View</Link>
            <Link className='border-2 border-border rounded-md px-2 py-1 hover:bg-border' to={`/form/${form.id}/edit`}>Edit</Link>
          </>
        )
      },
      width: 'min',
      cellClassName: 'flex gap-2 justify-center',
      align: 'center',
    }
  ];

  return (
    <>
      <div>
        <h1>All forms</h1>
      </div>
      <Table columns={columns} data={forms} hover={true} loading={loading} error={error} />
    </>
  )
}
