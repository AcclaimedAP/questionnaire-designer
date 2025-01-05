import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Input } from '@/components/ui/Input'
import { useState } from 'react'
import type { TextInputProps } from '@/components/ui/Input/TextInput'

const InputComponent = ({ inputType, placeholder, initialValue }: { inputType: TextInputProps['inputType'], placeholder: string, initialValue: string }) => {
  const [value, setValue] = useState(initialValue)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  return <>
    <Input type="text" inputType={inputType} value={value} onChange={handleChange} placeholder={placeholder} />
    <p data-testid="input-value">{value}</p>
  </>
}

const NumberInputComponent = ({ initialValue }: { initialValue: number }) => {
  const [value, setValue] = useState(initialValue.toString())
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  return <>
    <Input type="number" value={value} onChange={handleChange} placeholder="Enter number" />
    <p data-testid="input-value">{value}</p>
  </>
}

const TextAreaComponent = ({ initialValue }: { initialValue: string }) => {
  const [value, setValue] = useState(initialValue)
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
  }
  return <>
    <Input type="textarea" value={value} onChange={handleChange} placeholder="Enter text" />
    <p data-testid="input-value">{value}</p>
  </>
}

describe('Input', () => {
  describe('TextInput', () => {
    it('renders text input with correct props', () => {
      const handleChange = vi.fn()
      render(
        <Input
          type="text"
          value="test"
          onChange={handleChange}
          placeholder="Enter text"
        />
      )

      const input = screen.getByPlaceholderText('Enter text')
      expect(input).toHaveValue('test')
      expect(input).toHaveAttribute('type', 'text')
    })

    it('handles text input changes with correct event value', () => {

      const initialValue = 'test'
      const newValue = 'new value'


      render(<InputComponent inputType="text" placeholder="Enter text" initialValue={initialValue} />)
      const input = screen.getByPlaceholderText('Enter text')
      const inputValue = screen.getByTestId('input-value')
      expect(input).toHaveValue(initialValue)
      expect(inputValue).toHaveTextContent(initialValue)

      fireEvent.change(input, {
        target: { value: newValue }
      })

      expect(inputValue).toHaveTextContent(newValue)
      expect(input).toHaveValue(newValue)

      fireEvent.change(input, {
        target: { value: '' }
      })

      expect(input).toHaveValue('')
      expect(inputValue).toHaveTextContent('')
    })
  })

  describe('NumberInput', () => {
    it('handles number input changes with correct event value', () => {
      const initialValue = 123
      const newValue = 456

      render(<NumberInputComponent initialValue={initialValue} />)
      const input = screen.getByPlaceholderText('Enter number')
      const inputValue = screen.getByTestId('input-value')
      expect(input).toHaveValue(initialValue)
      expect(inputValue).toHaveTextContent(initialValue.toString())

      fireEvent.change(input, {
        target: { value: newValue.toString() }
      })

      expect(inputValue).toHaveTextContent(newValue.toString())
      expect(input).toHaveValue(newValue)
    })

    it('should return null on non-numeric value', () => {
      const initialValue = 123
      render(<NumberInputComponent initialValue={initialValue} />)
      const input = screen.getByPlaceholderText('Enter number')
      fireEvent.change(input, {
        target: { value: 'abc' }
      })
      expect(input).toHaveValue(null)
    })
  })

  describe('TextArea', () => {
    it('handles text area changes with correct event value', () => {
      const initialValue = 'test'
      const newValue = 'new value'

      render(<TextAreaComponent initialValue={initialValue} />)
      const input = screen.getByPlaceholderText('Enter text')
      const inputValue = screen.getByTestId('input-value')
      expect(input).toHaveAttribute('type', 'textarea')
      expect(input).toHaveValue(initialValue)
      expect(inputValue).toHaveTextContent(initialValue)

      fireEvent.change(input, {
        target: { value: newValue }
      })

      expect(inputValue).toHaveTextContent(newValue)
      expect(input).toHaveValue(newValue)
    })
  })
}) 