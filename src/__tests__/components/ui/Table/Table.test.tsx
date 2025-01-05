import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Table } from '@/components/ui/Table'

describe('Table', () => {
  const mockColumns = [
    { label: 'Name', key: 'name' },
    { label: 'Age', key: 'age' },
    {
      label: 'Status',
      key: 'status',
      render: (row: any) => row.status ? 'Active' : 'Inactive'
    }
  ]

  const mockData = [
    { name: 'John', age: 30, status: true },
    { name: 'Jane', age: 25, status: false }
  ]

  it('renders table structure correctly', () => {
    render(<Table columns={mockColumns} data={mockData} />)

    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Age')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
  })

  it('renders data correctly', () => {
    render(<Table columns={mockColumns} data={mockData} />)

    expect(screen.getByText('John')).toBeInTheDocument()
    expect(screen.getByText('30')).toBeInTheDocument()
    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('handles custom column rendering', () => {
    render(<Table columns={mockColumns} data={mockData} />)

    expect(screen.getByText('Active')).toBeInTheDocument()
    expect(screen.getByText('Inactive')).toBeInTheDocument()
  })

  it('shows loading state', () => {
    render(<Table columns={mockColumns} data={[]} loading={true} />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('shows error state', () => {
    const errorMessage = 'Failed to load data'
    render(
      <Table
        columns={mockColumns}
        data={[]}
        error={errorMessage}
      />
    )
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })
}) 