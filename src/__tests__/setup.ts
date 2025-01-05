import { beforeAll } from 'vitest'
import '@testing-library/jest-dom/vitest'

beforeAll(() => {
  // Mock import.meta.env
  Object.defineProperty(import.meta, 'env', {
    value: {
      MODE: 'test',
      PROD: false,
      DEV: true,
      API_URL: 'http://localhost:5173',
      DISABLE_MOCKS: false,
      MOCK_DELAY: 0
    }
  })
})
