import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { TaskList } from './TaskList'
import { StoreProvider } from '@/core/store'

// Mock the useStore hook
vi.mock('@/core/store', async (importOriginal) => {
  const original = await importOriginal()
  return {
    ...original,
    useStore: vi.fn().mockImplementation((selector) => {
      const state = {
        tasks: {
          items: [
            { id: '1', title: 'Test task', status: 'pending' }
          ]
        },
        setTasks: vi.fn()
      }
      return selector(state)
    })
  }
})

describe('TaskList Component', () => {
  it('renders existing tasks', () => {
    render(
      <StoreProvider>
        <TaskList />
      </StoreProvider>
    )
    expect(screen.getByText('Test task')).toBeInTheDocument()
  })

  it('adds a new task when form is submitted', () => {
    const mockSetTasks = vi.fn()
    vi.mocked(useStore).mockImplementation((selector) => {
      const state = {
        tasks: {
          items: []
        },
        setTasks: mockSetTasks
      }
      return selector(state)
    })

    render(
      <StoreProvider>
        <TaskList />
      </StoreProvider>
    )

    const input = screen.getByPlaceholderText('Add a new task...')
    const addButton = screen.getByText('Add')

    fireEvent.change(input, { target: { value: 'New task' } })
    fireEvent.click(addButton)

    expect(mockSetTasks).toHaveBeenCalledWith({
      items: [
        expect.objectContaining({
          title: 'New task',
          status: 'pending'
        })
      ]
    })
  })

  it('updates task status when checkbox is clicked', () => {
    const mockSetTasks = vi.fn()
    vi.mocked(useStore).mockImplementation((selector) => {
      const state = {
        tasks: {
          items: [
            { id: '1', title: 'Test task', status: 'pending' }
          ]
        },
        setTasks: mockSetTasks
      }
      return selector(state)
    })

    render(
      <StoreProvider>
        <TaskList />
      </StoreProvider>
    )

    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)

    expect(mockSetTasks).toHaveBeenCalledWith({
      items: [
        expect.objectContaining({
          id: '1',
          status: 'completed'
        })
      ]
    })
  })

  it('deletes a task when delete button is clicked', () => {
    const mockSetTasks = vi.fn()
    vi.mocked(useStore).mockImplementation((selector) => {
      const state = {
        tasks: {
          items: [
            { id: '1', title: 'Test task', status: 'pending' }
          ]
        },
        setTasks: mockSetTasks
      }
      return selector(state)
    })

    render(
      <StoreProvider>
        <TaskList />
      </StoreProvider>
    )

    const deleteButton = screen.getByRole('button', { name: /delete/i })
    fireEvent.click(deleteButton)

    expect(mockSetTasks).toHaveBeenCalledWith({
      items: []
    })
  })
})
