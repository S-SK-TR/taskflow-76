import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { StoreProvider, useStore, initialState } from './index'
import { ReactNode } from 'react'

const wrapper = ({ children }: { children: ReactNode }) => (
  <StoreProvider>{children}</StoreProvider>
)

describe('Store', () => {
  describe('useStore hook', () => {
    it('throws error when used outside StoreProvider', () => {
      const { result } = renderHook(() => useStore((state) => state.ui))
      expect(result.error).toEqual(new Error('StoreProvider missing'))
    })

    it('returns initial state when used within StoreProvider', () => {
      const { result } = renderHook(() => useStore((state) => state), { wrapper })
      expect(result.current).toEqual(initialState)
    })
  })

  describe('Store actions', () => {
    it('updates UI state correctly', () => {
      const { result } = renderHook(() => useStore((state) => state), { wrapper })

      act(() => {
        result.current.setUi({ sidebarOpen: true, theme: 'light' })
      })

      expect(result.current.ui).toEqual({
        sidebarOpen: true,
        theme: 'light'
      })
    })

    it('updates tasks state correctly', () => {
      const { result } = renderHook(() => useStore((state) => state), { wrapper })

      act(() => {
        result.current.setTasks({
          items: [{ id: '1', title: 'Test task', status: 'pending' }],
          loading: true
        })
      })

      expect(result.current.tasks).toEqual({
        items: [{ id: '1', title: 'Test task', status: 'pending' }],
        loading: true
      })
    })

    it('resets store to initial state', () => {
      const { result } = renderHook(() => useStore((state) => state), { wrapper })

      act(() => {
        result.current.setUi({ sidebarOpen: true, theme: 'light' })
        result.current.resetStore()
      })

      expect(result.current).toEqual(initialState)
    })
  })
})
