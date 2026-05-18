import { render, screen, fireEvent } from '@testing-library/react'
import { TaskList } from './TaskList'
import { StoreProvider } from '@/core/store'

jest.mock('@/core/store', () => ({
  useStore: jest.fn()
}))

const mockUseStore = require('@/core/store').useStore

describe('TaskList', () => {
  beforeEach(() => {
    mockUseStore.mockImplementation((selector) => selector({
      tasks: {
        items: [
          {
            id: '1',
            title: 'Test Task',
            description: 'Test Description',
            dueTime: '12:00',
            category: 'work',
            completed: false
          }
        ]
      },
      addTask: jest.fn(),
      updateTask: jest.fn(),
      deleteTask: jest.fn(),
      toggleTask: jest.fn(),
      addNotification: jest.fn()
    }))
  })

  it('renders task list', () => {
    render(
      <StoreProvider>
        <TaskList />
      </StoreProvider>
    )
    expect(screen.getByText('Test Task')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('can add a new task', () => {
    const addTaskMock = jest.fn()
    mockUseStore.mockImplementation((selector) => selector({
      tasks: {
        items: []
      },
      addTask: addTaskMock,
      addNotification: jest.fn()
    }))

    render(
      <StoreProvider>
        <TaskList />
      </StoreProvider>
    )

    fireEvent.change(screen.getByPlaceholderText('Görev başlığı'), {
      target: { value: 'New Task' }
    })
    fireEvent.click(screen.getByText('Görev Ekle'))
    expect(addTaskMock).toHaveBeenCalledWith({
      title: 'New Task',
      description: '',
      dueTime: '',
      category: 'work'
    })
  })
})
