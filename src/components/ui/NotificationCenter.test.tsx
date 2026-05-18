import { render, screen, fireEvent } from '@testing-library/react'
import { NotificationCenter } from './NotificationCenter'
import { StoreProvider } from '@/core/store'

jest.mock('@/core/store', () => ({
  useStore: jest.fn()
}))

const mockUseStore = require('@/core/store').useStore

describe('NotificationCenter', () => {
  beforeEach(() => {
    mockUseStore.mockImplementation((selector) => selector({
      notifications: {
        items: [
          {
            id: '1',
            title: 'Test Notification',
            message: 'This is a test notification',
            createdAt: new Date().toISOString(),
            read: false,
            type: 'info'
          }
        ]
      },
      ui: {
        notificationsOpen: false
      },
      markNotificationAsRead: jest.fn(),
      deleteNotification: jest.fn(),
      clearNotifications: jest.fn(),
      setUi: jest.fn()
    }))
  })

  it('renders notification center', () => {
    render(
      <StoreProvider>
        <NotificationCenter />
      </StoreProvider>
    )
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('opens notification panel when clicked', () => {
    const setUiMock = jest.fn()
    mockUseStore.mockImplementation((selector) => selector({
      notifications: {
        items: []
      },
      ui: {
        notificationsOpen: false
      },
      setUi: setUiMock
    }))

    render(
      <StoreProvider>
        <NotificationCenter />
      </StoreProvider>
    )

    fireEvent.click(screen.getByRole('button'))
    expect(setUiMock).toHaveBeenCalledWith({ notificationsOpen: true })
  })
})
