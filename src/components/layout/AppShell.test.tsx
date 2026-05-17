import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { AppShell } from './AppShell'
import { MemoryRouter } from 'react-router-dom'
import { StoreProvider } from '@/core/store'

// Mock the useStore hook
vi.mock('@/core/store', async (importOriginal) => {
  const original = await importOriginal()
  return {
    ...original,
    useStore: vi.fn().mockImplementation((selector) => {
      const state = {
        ui: { sidebarOpen: false, theme: 'dark' },
        setUi: vi.fn()
      }
      return selector(state)
    })
  }
})

describe('AppShell Component', () => {
  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <StoreProvider>
          <AppShell />
        </StoreProvider>
      </MemoryRouter>
    )
    expect(screen.getByText('TaskFlow')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
  })

  it('toggles sidebar when menu button is clicked', () => {
    const mockSetUi = vi.fn()
    vi.mocked(useStore).mockImplementation((selector) => {
      const state = {
        ui: { sidebarOpen: false, theme: 'dark' },
        setUi: mockSetUi
      }
      return selector(state)
    })

    render(
      <MemoryRouter>
        <StoreProvider>
          <AppShell />
        </StoreProvider>
      </MemoryRouter>
    )

    const menuButton = screen.getByRole('button', { name: /menu/i })
    fireEvent.click(menuButton)
    expect(mockSetUi).toHaveBeenCalledWith({ sidebarOpen: true })
  })

  it('applies dark theme class to document element', () => {
    render(
      <MemoryRouter>
        <StoreProvider>
          <AppShell />
        </StoreProvider>
      </MemoryRouter>
    )
    expect(document.documentElement.classList.contains('dark')).toBe(true)
  })

  it('renders all navigation items', () => {
    render(
      <MemoryRouter>
        <StoreProvider>
          <AppShell />
        </StoreProvider>
      </MemoryRouter>
    )
    expect(screen.getByText('Tasks')).toBeInTheDocument()
    expect(screen.getByText('Routines')).toBeInTheDocument()
    expect(screen.getByText('Goals')).toBeInTheDocument()
    expect(screen.getByText('Settings')).toBeInTheDocument()
  })
})
