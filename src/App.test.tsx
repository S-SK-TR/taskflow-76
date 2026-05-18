import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from './App'
import { StoreProvider } from './core/store'

jest.mock('./components/layout/AppShell', () => ({
  AppShell: () => <div data-testid="app-shell">Mock AppShell</div>
}))

describe('App', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <StoreProvider>
          <App />
        </StoreProvider>
      </MemoryRouter>
    )
    expect(screen.getByTestId('app-shell')).toBeInTheDocument()
  })
})
