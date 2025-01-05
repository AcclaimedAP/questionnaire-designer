import { describe, it, expect, vi } from 'vitest'
import { Api } from '@/lib/api'
import type { Form } from '@/types/models/form'
import { FormFieldType } from '@/types/models/form'

describe('API Form Integration', () => {
  it('should fetch and type check a form', async () => {
    const apiInstance = new Api({
      baseUrl: 'http://test.com',
      headers: {},
      timeout: 1000
    })

    const mockForm: Form = {
      id: 1,
      title: 'Test Form',
      fields: [{
        label: 'Name',
        type: FormFieldType.TEXT,
        settings: {
          required: true,
          placeholder: 'Enter your name'
        }
      }]
    }

    vi.spyOn(apiInstance as any, 'fetch').mockImplementation(async () => ({
      ok: true,
      json: async () => ({ data: mockForm, error: null })
    }))

    const response = await apiInstance.get<Form>('/forms/1')
    
    expect(response.data).toEqual(mockForm)
    expect(response.data.fields[0].type).toBe(FormFieldType.TEXT)
    expect(response.data.fields[0].settings.required).toBe(true)
  })
}) 