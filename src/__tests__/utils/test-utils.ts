import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router'

export const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter })
} 