import { render, screen, fireEvent } from '@testing-library/react'
import { GoalList } from './GoalList'
import { StoreProvider } from '@/core/store'

jest.mock('@/core/store', () => ({
  useStore: jest.fn()
}))

const mockUseStore = require('@/core/store').useStore

describe('GoalList', () => {
  beforeEach(() => {
    mockUseStore.mockImplementation((selector) => selector({
      goals: {
        items: [
          {
            id: '1',
            title: 'Test Goal',
            target: 100,
            progress: 50,
            deadline: '2023-12-31',
            completed: false
          }
        ]
      },
      addGoal: jest.fn(),
      updateGoal: jest.fn(),
      deleteGoal: jest.fn(),
      updateGoalProgress: jest.fn(),
      addNotification: jest.fn()
    }))
  })

  it('renders goal list', () => {
    render(
      <StoreProvider>
        <GoalList />
      </StoreProvider>
    )
    expect(screen.getByText('Test Goal')).toBeInTheDocument()
    expect(screen.getByText('50%')).toBeInTheDocument()
    expect(screen.getByText('15 Eki 2023')).toBeInTheDocument()
  })

  it('can add a new goal', () => {
    const addGoalMock = jest.fn()
    mockUseStore.mockImplementation((selector) => selector({
      goals: {
        items: []
      },
      addGoal: addGoalMock,
      addNotification: jest.fn()
    }))

    render(
      <StoreProvider>
        <GoalList />
      </StoreProvider>
    )

    fireEvent.change(screen.getByPlaceholderText('Hedef başlığı'), {
      target: { value: 'New Goal' }
    })
    fireEvent.click(screen.getByText('Hedef Ekle'))
    expect(addGoalMock).toHaveBeenCalledWith({
      title: 'New Goal',
      target: 100,
      progress: 0,
      deadline: '',
      completed: false
    })
  })
})
