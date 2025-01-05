import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FormEditor } from '@/features/forms/components/FormEditor/FormEditor'
import { FormFieldType } from '@/types/models/form'

describe('FormEditor', () => {
  const mockForm = {
    id: 1,
    title: 'Test Form',
    fields: []
  }

  const mockUpdateForm = vi.fn()

  it('renders form title input', () => {
    render(<FormEditor form={mockForm} updateForm={mockUpdateForm} />)

    const titleInput = screen.getByPlaceholderText('Form title')
    expect(titleInput).toBeInTheDocument()
    expect(titleInput).toHaveValue('Test Form')
  })

  it('handles adding new field', () => {
    render(<FormEditor form={mockForm} updateForm={mockUpdateForm} />)

    const addButton = screen.getByText('Add Field')
    fireEvent.click(addButton)

    expect(mockUpdateForm).toHaveBeenCalledWith(expect.objectContaining({
      fields: expect.arrayContaining([
        expect.objectContaining({
          type: FormFieldType.TEXT
        })
      ])
    }))
  })

  it('updates form title', () => {
    render(<FormEditor form={mockForm} updateForm={mockUpdateForm} />)

    const titleInput = screen.getByPlaceholderText('Form title')
    fireEvent.change(titleInput, { target: { value: 'New Title' } })

    expect(mockUpdateForm).toHaveBeenCalledWith(expect.objectContaining({
      title: 'New Title'
    }))
  })
}) 