import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AppShell } from '@/components/layout/AppShell'
import { Dashboard } from '@/features/dashboard/components/Dashboard'
import { TaskList } from '@/features/tasks/components/TaskList'
import { TaskDetail } from '@/features/tasks/components/TaskDetail'
import { RoutineList } from '@/features/routines/components/RoutineList'
import { GoalList } from '@/features/goals/components/GoalList'
import { Settings } from '@/features/settings/components/Settings'
import { StoreProvider } from '@/core/store'

function App() {
  return (
    <StoreProvider>
      <Router>
        <AppShell>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/tasks/:id" element={<TaskDetail />} />
            <Route path="/routines" element={<RoutineList />} />
            <Route path="/goals" element={<GoalList />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </AppShell>
      </Router>
    </StoreProvider>
  )
}

export default App
