import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FieldSettings } from '@/features/forms/components/FormEditor/FieldSettings'
import { FormFieldType, FreeTextSettings } from '@/types/models/form'

describe('FieldSettings', () => {
  const mockSettings = {
    required: false,
    placeholder: 'Test placeholder'
  }

  const mockUpdateSettings = vi.fn()

  it('renders basic settings for all field types', () => {
    render(
      <FieldSettings
        type={FormFieldType.TEXT}
        settings={mockSettings}
        updateSettings={mockUpdateSettings}
      />
    )

    expect(screen.getByText('Field Settings')).toBeInTheDocument()
    expect(screen.getByText('Mandatory?')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Input a placeholder')).toBeInTheDocument()
  })

  it('handles required checkbox change', () => {
    render(
      <FieldSettings
        type={FormFieldType.TEXT}
        settings={mockSettings}
        updateSettings={mockUpdateSettings}
      />
    )

    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)

    expect(mockUpdateSettings).toHaveBeenCalledWith(expect.objectContaining({
      required: true
    }))
  })

  it('shows additional settings for text fields', () => {
    render(
      <FieldSettings
        type={FormFieldType.TEXT}
        settings={{
          ...mockSettings,
          inputType: 'text' as FreeTextSettings['inputType'],
          min: null,
          max: null
        }}
        updateSettings={mockUpdateSettings}
      />
    )

    expect(screen.getByText('Input Type')).toBeInTheDocument()
    expect(screen.getByText('Is between')).toBeInTheDocument()
  })
}) 