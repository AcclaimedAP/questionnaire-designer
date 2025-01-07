import api from '@/lib/api';
import { Form } from '@/types/models/form';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { LoadSpinner } from '@/components/ui/Loader';
/**
 * Form show page.
 * Should get the form by the id, and then display it.
 */

export const FormShow = () => {
  const { id } = useParams();
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForm = async () => {
      if (form) return;
      try {
        setLoading(true);
        setError(null);
        const response = await api.get<Form>(`/forms/${id}`);
        setForm(response.data);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch form');
      } finally {
        setLoading(false);
      }
    }
    fetchForm();
  }, [id]);

  return (
    <div className='flex flex-col gap-4 justify-center items-center'>
      {loading ? <LoadSpinner /> :
        <>
          {error && <div className='text-red-500'>{error}</div>}
          {form && <Content form={form} />}
        </>
      }

    </div>
  )
}

const Content = ({ form }: { form: Form }) => {
  return (
    <>

      <div className='flex flex-col gap-8 items-center justify-center w-full border-2 border-border rounded-md p-2 relative'>
        <h1 className='text-2xl font-bold w-full text-center m-4'>{form.title}</h1>
        <span className='text-sm absolute top-2 right-4'>#{form.id}</span>
        <div className='flex flex-row gap-2 items-center justify-center w-full'>
          <div className='flex flex-col gap-2 items-center justify-center w-full'>
            <span>Submitted answers: 0</span>
            <span>Last submitted: -</span>
          </div>
          <div className='flex flex-col gap-2 items-center justify-center w-full'>
            <span>Created at: {form.createdAt ? new Date(form.createdAt).toLocaleString() : "-"}</span>
            <span>Updated at: {form.updatedAt ? new Date(form.updatedAt).toLocaleString() : "-"}</span>
          </div>
        </div>
        <div className='flex flex-row gap-2 items-center justify-end w-full'>
          <Link to={`/questionnaire/${form.id}`} className='border-2 border-border rounded-md px-2 py-1 hover:bg-border min-w-20 text-center'>View</Link>
          <Link to={`/form/${form.id}/edit`} className='border-2 border-border rounded-md px-2 py-1 hover:bg-border min-w-20 text-center'>Edit</Link>
          <Link to={`/form/${form.id}/delete`} className='border-2 border-error rounded-md px-2 py-1 hover:bg-error min-w-20 text-center'>Delete</Link>

        </div>
      </div>
    </>
  )
}
