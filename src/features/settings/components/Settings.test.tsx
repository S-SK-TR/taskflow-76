import { render, screen, fireEvent } from '@testing-library/react'
import { Settings } from './Settings'
import { StoreProvider } from '@/core/store'

jest.mock('@/core/store', () => ({
  useStore: jest.fn()
}))

const mockUseStore = require('@/core/store').useStore

describe('Settings', () => {
  beforeEach(() => {
    mockUseStore.mockImplementation((selector) => selector({
      ui: {
        theme: 'dark'
      },
      setUi: jest.fn()
    }))
  })

  it('renders settings panel', () => {
    render(
      <StoreProvider>
        <Settings />
      </StoreProvider>
    )
    expect(screen.getByText('Tema Ayarları')).toBeInTheDocument()
    expect(screen.getByText('Koyu Mod')).toBeInTheDocument()
    expect(screen.getByText('Açık Mod')).toBeInTheDocument()
  })

  it('changes theme when selected', () => {
    const setUiMock = jest.fn()
    mockUseStore.mockImplementation((selector) => selector({
      ui: {
        theme: 'dark'
      },
      setUi: setUiMock
    }))

    render(
      <StoreProvider>
        <Settings />
      </StoreProvider>
    )

    fireEvent.click(screen.getByText('Açık Mod'))
    expect(setUiMock).toHaveBeenCalledWith({ theme: 'light' })
  })
})
