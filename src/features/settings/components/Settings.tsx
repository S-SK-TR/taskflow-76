import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings as SettingsIcon, Bell, Moon, Sun } from 'lucide-react'

interface SettingsState {
  notifications: boolean
  darkMode: boolean
}

export function Settings() {
  const [settings, setSettings] = useState<SettingsState>({
    notifications: true,
    darkMode: true
  })

  const toggleSetting = (key: keyof SettingsState) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <div className="glass-card p-6 rounded-xl">
      <h1 className="text-2xl font-bold mb-6">Ayarlar</h1>

      <div className="space-y-4">
        <div className="glass-morphism p-4 rounded-lg flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bell className="h-5 w-5 text-blue-400" />
            <span>Bildirimler</span>
          </div>
          <button
            onClick={() => toggleSetting('notifications')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.notifications ? 'bg-blue-500' : 'bg-gray-600'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.notifications ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>

        <div className="glass-morphism p-4 rounded-lg flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {settings.darkMode ? (
              <Moon className="h-5 w-5 text-blue-400" />
            ) : (
              <Sun className="h-5 w-5 text-yellow-400" />
            )}
            <span>Karanlık Mod</span>
          </div>
          <button
            onClick={() => toggleSetting('darkMode')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.darkMode ? 'bg-blue-500' : 'bg-gray-600'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.darkMode ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>
      </div>
    </div>
  )
}
