import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Dashboard } from './Dashboard'
import { StoreProvider } from '@/core/store'

// Mock the useStore hook
vi.mock('@/core/store', async (importOriginal) => {
  const original = await importOriginal()
  return {
    ...original,
    useStore: vi.fn().mockImplementation((selector) => {
      const state = {
        tasks: { items: [] },
        routines: { items: [] },
        goals: { items: [] }
      }
      return selector(state)
    })
  }
})

describe('Dashboard Component', () => {
  it('renders correctly with demo data when store is empty', () => {
    render(
      <StoreProvider>
        <Dashboard />
      </StoreProvider>
    )

    // Check for demo tasks
    expect(screen.getByText('Complete project proposal')).toBeInTheDocument()
    expect(screen.getByText('Review code changes')).toBeInTheDocument()

    // Check for demo routines
    expect(screen.getByText('Morning exercise')).toBeInTheDocument()
    expect(screen.getByText('Weekly review')).toBeInTheDocument()

    // Check for demo goals
    expect(screen.getByText('Finish project')).toBeInTheDocument()
    expect(screen.getByText('Improve coding skills')).toBeInTheDocument()
  })

  it('displays progress bars for goals', () => {
    render(
      <StoreProvider>
        <Dashboard />
      </StoreProvider>
    )

    // Check progress bars
    const progressBars = screen.getAllByRole('progressbar')
    expect(progressBars).toHaveLength(2)
    expect(progressBars[0]).toHaveStyle('width: 65%')
    expect(progressBars[1]).toHaveStyle('width: 30%')
  })

  it('renders quick action buttons', () => {
    render(
      <StoreProvider>
        <Dashboard />
      </StoreProvider>
    )

    expect(screen.getByText('Add Task')).toBeInTheDocument()
    expect(screen.getByText('Add Routine')).toBeInTheDocument()
    expect(screen.getByText('Add Goal')).toBeInTheDocument()
  })
})
