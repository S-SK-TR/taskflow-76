import { createContext, useContext } from 'react'
import { createStore, useStore as useZustandStore } from 'zustand'

interface StoreState {
  // State tanımları burada
}

const StoreContext = createContext<ReturnType<typeof createStore<StoreState>> | null>(null)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const store = createStore<StoreState>(() => ({
    // Başlangıç state'i burada
  }))

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore<T>(selector: (state: StoreState) => T): T {
  const store = useContext(StoreContext)
  if (!store) throw new Error('StoreProvider içinde kullanın')
  return useZustandStore(store, selector)
}
