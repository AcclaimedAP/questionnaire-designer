import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Field } from '@/features/forms/components/FormEditor/Field'
import { FormFieldType } from '@/types/models/form'

describe('Field', () => {
  const mockField = {
    label: 'Test Field',
    type: FormFieldType.TEXT,
    settings: {
      required: false,
      placeholder: ''
    }
  }

  const mockProps = {
    field: mockField,
    index: 0,
    maxIndex: 1,
    updateField: vi.fn(),
    removeField: vi.fn(),
    moveField: vi.fn()
  }

  it('renders field with correct type and label', () => {
    render(<Field {...mockProps} />)

    expect(screen.getByText('Text Input')).toBeInTheDocument()
    expect(screen.getByDisplayValue('Test Field')).toBeInTheDocument()
  })

  it('handles field type change', () => {
    render(<Field {...mockProps} />)

    const typeSelect = screen.getAllByRole('combobox')[0]
    fireEvent.change(typeSelect, { target: { value: FormFieldType.CHECKBOX } })

    expect(mockProps.updateField).toHaveBeenCalledWith(0, expect.objectContaining({
      type: FormFieldType.CHECKBOX
    }))
  })

  it('handles field removal', () => {
    render(<Field {...mockProps} />)

    const removeButton = screen.getByAltText('Remove')
    fireEvent.click(removeButton)

    expect(mockProps.removeField).toHaveBeenCalledWith(0)
  })
}) 