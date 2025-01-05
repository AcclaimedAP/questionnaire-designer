import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { FormBuilder } from '@/features/forms/FormBuilder'
import { renderWithRouter } from '@/__tests__/utils/test-utils'
import api from '@/lib/api'
import { MemoryRouter, Route, Routes } from 'react-router'

vi.mock('@/lib/api')

describe('FormBuilder', () => {
  it('renders form editor and preview', () => {
    renderWithRouter(<FormBuilder />)

    expect(screen.getByText('Form Editor')).toBeInTheDocument()
    expect(screen.getByText('Save')).toBeInTheDocument()
  })

  it('handles form save', async () => {
    vi.spyOn(api, 'post').mockResolvedValue({ data: {}, error: null })

    renderWithRouter(<FormBuilder />)

    const saveButton = screen.getByText('Save')
    fireEvent.click(saveButton)

    expect(api.post).toHaveBeenCalled()
  })

  it('loads existing form when id is provided in URL', async () => {
    const mockForm = {
      id: 1,
      title: 'Test Form',
      fields: []
    }

    vi.spyOn(api, 'get').mockResolvedValue({ data: mockForm, error: null })

    render(
      <MemoryRouter initialEntries={['/form/1']}>
        <Routes>
          <Route path="/form/:id" element={<FormBuilder />} />
        </Routes>
      </MemoryRouter>
    )

    expect(api.get).toHaveBeenCalledWith('/api/forms/1')
    expect(await screen.findByText('Test Form')).toBeInTheDocument()
  })
}) 