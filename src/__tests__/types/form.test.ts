import { describe, it, expect } from 'vitest'
import { FormFieldType, FreeTextSettingsInputType } from '@/types/models/form'
import type { 
  Form, 
  FormField, 
  TextFormField, 
  FreeTextSettings 
} from '@/types/models/form'

describe('Form Types', () => {
  it('should correctly type a basic form', () => {
    const form: Form = {
      id: 1,
      title: 'Test Form',
      fields: []
    }
    
    expect(form.id).toBe(1)
    expect(form.title).toBe('Test Form')
    expect(Array.isArray(form.fields)).toBe(true)
  })

  it('should correctly type a text form field', () => {
    const textField: TextFormField = {
      label: 'Name',
      type: FormFieldType.TEXT,
      settings: {
        required: true,
        placeholder: 'Enter your name',
        inputType: FreeTextSettingsInputType.TEXT,
        rows: null,
        min: null,
        max: null
      }
    }

    expect(textField.type).toBe(FormFieldType.TEXT)
    expect(textField.settings.inputType).toBe(FreeTextSettingsInputType.TEXT)
  })

  it('should enforce required settings properties', () => {
    const field: FormField = {
      label: 'Test',
      type: FormFieldType.CHECKBOX,
      settings: {
        required: false,
        placeholder: ''
      }
    }

    expect(field.settings).toHaveProperty('required')
    expect(field.settings).toHaveProperty('placeholder')
  })

  describe('FreeTextSettings', () => {
    it('should correctly type text field settings', () => {
      const settings: FreeTextSettings = {
        required: true,
        placeholder: 'Enter text',
        inputType: FreeTextSettingsInputType.TEXT,
        rows: null,
        min: null,
        max: null
      }

      expect(settings.inputType).toBe(FreeTextSettingsInputType.TEXT)
      expect(settings.required).toBe(true)
      expect(settings.rows).toBeNull()
    })

    it('should support textarea configuration', () => {
      const settings: FreeTextSettings = {
        required: false,
        placeholder: 'Enter long text',
        inputType: FreeTextSettingsInputType.TEXTAREA,
        rows: 5,
        min: 10,
        max: 1000
      }

      expect(settings.inputType).toBe(FreeTextSettingsInputType.TEXTAREA)
      expect(settings.rows).toBe(5)
      expect(settings.min).toBe(10)
      expect(settings.max).toBe(1000)
    })
  })
}) 