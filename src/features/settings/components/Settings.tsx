import { useStore } from '@/core/store'
import { motion } from 'framer-motion'

const themeOptions = [
  { value: 'dark', label: 'Dark' },
  { value: 'light', label: 'Light' }
]

export function Settings() {
  const { ui, setUi } = useStore((state) => ({ ui: state.ui, setUi: state.setUi }))

  return (
    <div className="space-y-6">
      {/* Theme Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-4 rounded-xl"
      >
        <h3 className="text-lg font-semibold mb-4">Theme</h3>
        <div className="space-y-2">
          {themeOptions.map((option) => (
            <label key={option.value} className="flex items-center gap-3">
              <input
                type="radio"
                name="theme"
                value={option.value}
                checked={ui.theme === option.value}
                onChange={() => setUi({ theme: option.value as any })}
                className="h-4 w-4 text-primary focus:ring-primary"
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </motion.div>

      {/* Account Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-4 rounded-xl"
      >
        <h3 className="text-lg font-semibold mb-4">Account</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="your@email.com"
            />
          </div>

          <button className="btn btn-primary">Save Changes</button>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-4 rounded-xl"
      >
        <h3 className="text-lg font-semibold mb-4">Notifications</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary"
            />
            <span>Email notifications</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary"
            />
            <span>Push notifications</span>
          </label>
        </div>
      </motion.div>
    </div>
  )
}