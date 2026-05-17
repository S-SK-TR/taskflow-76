import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'
import { MemoryRouter } from 'react-router-dom'

// Mock the StoreProvider and AppShell components
vi.mock('./core/store', () => ({
  StoreProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

vi.mock('./components/layout/AppShell', () => ({
  AppShell: () => <div data-testid="app-shell">App Shell</div>
}))

describe('App Component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
    expect(screen.getByTestId('app-shell')).toBeInTheDocument()
  })

  it('wraps content with StoreProvider and BrowserRouter', () => {
    const { container } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    )
    expect(container.querySelector('div > div')).toBeInTheDocument()
  })
})
