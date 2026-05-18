import { render, screen } from '@testing-library/react'
import { Dashboard } from './Dashboard'
import { StoreProvider } from '@/core/store'

jest.mock('@/core/store', () => ({
  useStore: jest.fn()
}))

const mockUseStore = require('@/core/store').useStore

describe('Dashboard', () => {
  beforeEach(() => {
    mockUseStore.mockImplementation((selector) => selector({
      tasks: {
        items: [
          { id: '1', title: 'Task 1', completed: false },
          { id: '2', title: 'Task 2', completed: true }
        ]
      },
      routines: {
        items: [
          { id: '1', title: 'Routine 1', days: ['monday'], time: '08:00', completed: false }
        ]
      },
      goals: {
        items: [
          { id: '1', title: 'Goal 1', target: 100, progress: 50, deadline: '2023-12-31', completed: false }
        ]
      }
    }))
  })

  it('renders dashboard with task, routine and goal summaries', () => {
    render(
      <StoreProvider>
        <Dashboard />
      </StoreProvider>
    )
    expect(screen.getByText('Görevler')).toBeInTheDocument()
    expect(screen.getByText('Rutinler')).toBeInTheDocument()
    expect(screen.getByText('Hedefler')).toBeInTheDocument()
  })
})
