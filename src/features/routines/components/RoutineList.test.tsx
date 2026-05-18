import { render, screen, fireEvent } from '@testing-library/react'
import { RoutineList } from './RoutineList'
import { StoreProvider } from '@/core/store'

jest.mock('@/core/store', () => ({
  useStore: jest.fn()
}))

const mockUseStore = require('@/core/store').useStore

describe('RoutineList', () => {
  beforeEach(() => {
    mockUseStore.mockImplementation((selector) => selector({
      routines: {
        items: [
          {
            id: '1',
            title: 'Test Routine',
            days: ['monday'],
            time: '08:00',
            completed: false
          }
        ]
      },
      addRoutine: jest.fn(),
      updateRoutine: jest.fn(),
      deleteRoutine: jest.fn(),
      addNotification: jest.fn()
    }))
  })

  it('renders routine list', () => {
    render(
      <StoreProvider>
        <RoutineList />
      </StoreProvider>
    )
    expect(screen.getByText('Test Routine')).toBeInTheDocument()
    expect(screen.getByText('Pazartesi')).toBeInTheDocument()
    expect(screen.getByText('08:00')).toBeInTheDocument()
  })

  it('can add a new routine', () => {
    const addRoutineMock = jest.fn()
    mockUseStore.mockImplementation((selector) => selector({
      routines: {
        items: []
      },
      addRoutine: addRoutineMock,
      addNotification: jest.fn()
    }))

    render(
      <StoreProvider>
        <RoutineList />
      </StoreProvider>
    )

    fireEvent.change(screen.getByPlaceholderText('Rutin başlığı'), {
      target: { value: 'New Routine' }
    })
    fireEvent.click(screen.getByText('Rutin Ekle'))
    expect(addRoutineMock).toHaveBeenCalledWith({
      title: 'New Routine',
      days: [],
      time: '',
      completed: false
    })
  })
})
