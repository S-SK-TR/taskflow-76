import { useState, useEffect } from 'react'
import { Link, useLocation, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, HelpCircle, Repeat, Target, Settings, Menu, X } from 'lucide-react'
import { cn } from '@/core/utils'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { name: 'Ana Sayfa', path: '/', icon: Home },
    { name: 'Görevler', path: '/tasks', icon: HelpCircle },
    { name: 'Rutinler', path: '/routines', icon: Repeat },
    { name: 'Hedefler', path: '/goals', icon: Target },
    { name: 'Ayarlar', path: '/settings', icon: Settings }
  ]

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-base)]">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 w-full backdrop-blur-md bg-[var(--glass-bg)]/80 border-b border-[var(--glass-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-[var(--brand-500)] flex items-center justify-center">
                  <Target size={16} className="text-white" />
                </div>
                <span className="font-semibold text-lg">Daily Plan</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2",
                      location.pathname === item.path
                        ? "text-[var(--brand-500)] bg-[var(--glass-bg)]"
                        : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)]"
                    )}
                  >
                    <item.icon size={16} />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--brand-500)]"
              >
                {isMobileMenuOpen ? (
                  <X size={20} />
                ) : (
                  <Menu size={20} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2",
                    location.pathname === item.path
                      ? "text-[var(--brand-500)] bg-[var(--glass-bg)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--glass-bg)]"
                  )}
                >
                  <item.icon size={16} />
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="backdrop-blur-md bg-[var(--glass-bg)]/80 border-t border-[var(--glass-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-[var(--text-muted)]">© {new Date().getFullYear()} Daily Plan. Tüm hakları saklıdır.</p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <Link to="/privacy" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]">Gizlilik Politikası</Link>
              <Link to="/terms" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]">Kullanım Koşulları</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}