import { BrowserRouter } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { StoreProvider } from './core/store'

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </StoreProvider>
  )
}

export default App