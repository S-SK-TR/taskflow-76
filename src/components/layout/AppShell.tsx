import { useState, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { LayoutDashboard, Calendar, Target, Settings, Menu, X, LogOut } from 'lucide-react'
import { useStore } from '@/core/store'
import { cn } from '@/core/utils'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/tasks', icon: Calendar, label: 'Tasks' },
  { to: '/routines', icon: Calendar, label: 'Routines' },
  { to: '/goals', icon: Target, label: 'Goals' },
  { to: '/settings', icon: Settings, label: 'Settings' }
]

export function AppShell() {
  const location = useLocation()
  const { ui, setUi } = useStore((state) => ({ ui: state.ui, setUi: state.setUi }))

  useEffect(() => {
    if (ui.theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [ui.theme])

  return (
    <div className="flex h-dvh bg-[var(--bg-base)] text-[var(--text-primary)]">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 border-r border-[var(--border)] bg-[var(--bg-surface)] transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
        ui.sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[var(--border)]">
          <h1 className="text-xl font-bold font-display">TaskFlow</h1>
          <button
            onClick={() => setUi({ sidebarOpen: false })}
            className="md:hidden p-1 rounded-lg hover:bg-[var(--glass-bg)]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-2 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-[var(--text-muted)] hover:bg-[var(--glass-bg)] hover:text-[var(--text-primary)]"
              )}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-4 left-0 right-0 p-2">
          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-[var(--text-muted)] hover:bg-[var(--glass-bg)] hover:text-[var(--text-primary)]">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-4 border-b border-[var(--border)]">
          <button
            onClick={() => setUi({ sidebarOpen: !ui.sidebarOpen })}
            className="md:hidden p-1 rounded-lg hover:bg-[var(--glass-bg)]"
          >
            <Menu size={20} />
          </button>
          <h2 className="text-lg font-semibold font-display">Dashboard</h2>
          <div className="w-8"></div>
        </header>

        {/* Page Content */}
        <div className="p-4 h-[calc(100dvh-4rem)] overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<div>Dashboard Content</div>} />
                <Route path="/tasks" element={<div>Tasks Content</div>} />
                <Route path="/routines" element={<div>Routines Content</div>} />
                <Route path="/goals" element={<div>Goals Content</div>} />
                <Route path="/settings" element={<div>Settings Content</div>} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}