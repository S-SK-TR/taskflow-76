import { renderHook, act } from '@testing-library/react'
import { useStore, StoreProvider } from './index'

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <StoreProvider>{children}</StoreProvider>
)

describe('Store', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useStore((state) => state), { wrapper })
    expect(result.current.ui.theme).toBe('dark')
    expect(result.current.notifications.items).toEqual([])
    expect(result.current.tasks.items).toEqual([])
  })

  it('should add a notification', () => {
    const { result } = renderHook(() => useStore((state) => state), { wrapper })
    act(() => {
      result.current.addNotification({
        title: 'Test Notification',
        message: 'This is a test',
        type: 'info'
      })
    })
    expect(result.current.notifications.items.length).toBe(1)
    expect(result.current.notifications.items[0].title).toBe('Test Notification')
  })

  it('should toggle task completion', () => {
    const { result } = renderHook(() => useStore((state) => state), { wrapper })
    act(() => {
      result.current.addTask({
        title: 'Test Task',
        description: 'Test description',
        dueTime: '12:00',
        category: 'work'
      })
    })
    const taskId = result.current.tasks.items[0].id
    act(() => {
      result.current.toggleTask(taskId)
    })
    expect(result.current.tasks.items[0].completed).toBe(true)
  })
})
