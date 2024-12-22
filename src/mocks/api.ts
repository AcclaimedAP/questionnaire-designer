import { Form } from '@/types/models/form';
import { FormFactory } from './formFactory';

const formFactory = new FormFactory();

const forms = (count: number) => {
  const forms: Form[] = [];
  for (let i = 0; i < count; i++) {
    forms.push(formFactory.setRandomTitle().addTextField('Name').addCheckboxField('Checkbox').addDropdownField('Dropdown', ['Option 1', 'Option 2', 'Option 3']).addRadioField('Radio', ['Option 1', 'Option 2', 'Option 3']).addDatePickerField('Date Picker').build());
  }
  return forms;
}

const mockApi = async (route: string) => {
  if (import.meta.env.PROD) {
    throw new Error('Mock API is only available in development and test environments')
  }
  const delay = () => new Promise(resolve => setTimeout(resolve, import.meta.env.MOCK_DELAY || 1000));
  await delay();
  switch (route) {
    case '/api/ping':
      return new Response(JSON.stringify({
        data: {
          message: 'pong'
        }
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    case '/api/forms':
      return new Response(JSON.stringify({
        data: {
          forms: forms(10)
        }
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    default:
      return new Response(JSON.stringify({
        error: 'Not found'
      }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json'
        }
      })
  }
}



export default mockApi;