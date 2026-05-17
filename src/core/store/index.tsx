import { createContext, useContext } from 'react'
import { createStore, useStore as useZustandStore } from 'zustand'

interface StoreState {
  ui: {
    sidebarOpen: boolean
    theme: 'dark' | 'light'
  }
  tasks: {
    items: Task[]
    loading: boolean
  }
  routines: {
    items: Routine[]
    loading: boolean
  }
  goals: {
    items: Goal[]
    loading: boolean
  }
}

interface StoreActions {
  setUi: (ui: Partial<StoreState['ui']>) => void
  setTasks: (tasks: Partial<StoreState['tasks']>) => void
  setRoutines: (routines: Partial<StoreState['routines']>) => void
  setGoals: (goals: Partial<StoreState['goals']>) => void
  resetStore: () => void
}

type Store = StoreState & StoreActions

const StoreContext = createContext<ReturnType<typeof createStore<Store>> | null>(null)

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const store = createStore<Store>((set) => ({
    ui: {
      sidebarOpen: false,
      theme: 'dark'
    },
    tasks: {
      items: [],
      loading: false
    },
    routines: {
      items: [],
      loading: false
    },
    goals: {
      items: [],
      loading: false
    },
    setUi: (ui) => set((state) => ({ ui: { ...state.ui, ...ui } })),
    setTasks: (tasks) => set((state) => ({ tasks: { ...state.tasks, ...tasks } })),
    setRoutines: (routines) => set((state) => ({ routines: { ...state.routines, ...routines } })),
    setGoals: (goals) => set((state) => ({ goals: { ...state.goals, ...goals } })),
    resetStore: () => set(initialState)
  }))

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export const useStore = <T,>(selector: (state: Store) => T) => {
  const store = useContext(StoreContext)
  if (!store) throw new Error('StoreProvider missing')
  return useZustandStore(store, selector)
}

export const initialState: StoreState = {
  ui: {
    sidebarOpen: false,
    theme: 'dark'
  },
  tasks: {
    items: [],
    loading: false
  },
  routines: {
    items: [],
    loading: false
  },
  goals: {
    items: [],
    loading: false
  }
}