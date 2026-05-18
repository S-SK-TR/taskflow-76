import { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings as SettingsIcon, Moon, Sun, Bell, User, Save, Check } from 'lucide-react'
import { cn } from '@/core/utils'

interface SettingsSectionProps {
  title: string
  description: string
  children: React.ReactNode
}

function SettingsSection({ title, description, children }: SettingsSectionProps) {
  return (
    <div className="glass-card p-6 rounded-xl space-y-4 shadow-md">
      <div>
        <h2 className="text-lg font-medium">{title}</h2>
        <p className="text-sm text-[var(--text-muted)] mt-1">{description}</p>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

export function Settings() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [notifications, setNotifications] = useState(true)
  const [accountName, setAccountName] = useState('Kullanıcı')
  const [isSaved, setIsSaved] = useState(false)

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  const handleSave = () => {
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6 rounded-xl shadow-md">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-[var(--brand-500)]/10 flex items-center justify-center">
            <SettingsIcon size={20} className="text-[var(--brand-500)]" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Ayarlar</h1>
            <p className="text-[var(--text-muted)] mt-1">Uygulama tercihlerinizi yönetin.</p>
          </div>
        </div>
      </div>

      <SettingsSection
        title="Görünüm"
        description="Uygulama temasını ve görünümünü ayarlayın"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
            <span>Tema</span>
          </div>
          <button
            onClick={toggleTheme}
            className={cn(
              "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
              theme === 'dark' ? "bg-[var(--brand-500)]" : "bg-gray-300"
            )}
          >
            <span
              className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                theme === 'dark' ? "translate-x-6" : "translate-x-1"
              )}
            />
          </button>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Bildirimler"
        description="Bildirim tercihlerinizi yönetin"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell size={18} />
            <span>Bildirimler</span>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={cn(
              "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
              notifications ? "bg-[var(--brand-500)]" : "bg-gray-300"
            )}
          >
            <span
              className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                notifications ? "translate-x-6" : "translate-x-1"
              )}
            />
          </button>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Hesap"
        description="Hesap bilgilerinizi güncelleyin"
      >
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Adınız</label>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-500)]"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="btn btn-primary w-full flex items-center justify-center gap-2"
          >
            {isSaved ? (
              <>
                <Check size={16} />
                <span>Kaydedildi</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Değişiklikleri Kaydet</span>
              </>
            )}
          </motion.button>
        </div>
      </SettingsSection>
    </div>
  )
}