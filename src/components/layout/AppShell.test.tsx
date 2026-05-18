import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppShell } from './AppShell'
import { StoreProvider } from '@/core/store'

jest.mock('@/core/store', () => ({
  useStore: jest.fn()
}))

const mockUseStore = require('@/core/store').useStore

describe('AppShell', () => {
  beforeEach(() => {
    mockUseStore.mockImplementation((selector) => selector({
      ui: {
        sidebarOpen: false,
        theme: 'dark',
        notificationsOpen: false
      },
      setUi: jest.fn()
    }))
  })

  it('renders navigation items', () => {
    render(
      <MemoryRouter>
        <StoreProvider>
          <AppShell />
        </StoreProvider>
      </MemoryRouter>
    )
    expect(screen.getByText('Görevler')).toBeInTheDocument()
    expect(screen.getByText('Rutinler')).toBeInTheDocument()
    expect(screen.getByText('Hedefler')).toBeInTheDocument()
    expect(screen.getByText('Ayarlar')).toBeInTheDocument()
  })

  it('toggles sidebar on mobile', () => {
    const setUiMock = jest.fn()
    mockUseStore.mockImplementation((selector) => selector({
      ui: {
        sidebarOpen: false,
        theme: 'dark',
        notificationsOpen: false
      },
      setUi: setUiMock
    }))

    render(
      <MemoryRouter>
        <StoreProvider>
          <AppShell />
        </StoreProvider>
      </MemoryRouter>
    )

    const menuButton = screen.getByRole('button', { name: /menu/i })
    fireEvent.click(menuButton)
    expect(setUiMock).toHaveBeenCalledWith({ sidebarOpen: true })
  })
})
