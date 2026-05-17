import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2 } from 'lucide-react'
import { useStore } from '@/core/store'

interface Routine {
  id: string
  title: string
  frequency: 'Daily' | 'Weekly' | 'Monthly'
}

export function RoutineList() {
  const { routines, setRoutines } = useStore((state) => ({
    routines: state.routines.items,
    setRoutines: state.setRoutines
  }))

  const [newRoutine, setNewRoutine] = useState({
    title: '',
    frequency: 'Daily' as const
  })

  const addRoutine = () => {
    if (!newRoutine.title.trim()) return

    const routine: Routine = {
      id: Date.now().toString(),
      title: newRoutine.title,
      frequency: newRoutine.frequency
    }

    setRoutines({ items: [...routines, routine] })
    setNewRoutine({ title: '', frequency: 'Daily' })
  }

  const deleteRoutine = (id: string) => {
    setRoutines({ items: routines.filter((routine) => routine.id !== id) })
  }

  return (
    <div className="space-y-4">
      {/* Add Routine Form */}
      <div className="glass-card p-4 rounded-xl">
        <div className="space-y-3">
          <input
            type="text"
            value={newRoutine.title}
            onChange={(e) => setNewRoutine({ ...newRoutine, title: e.target.value })}
            placeholder="Routine title..."
            className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <div className="flex gap-2">
            <select
              value={newRoutine.frequency}
              onChange={(e) => setNewRoutine({ ...newRoutine, frequency: e.target.value as any })}
              className="flex-1 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>

            <button
              onClick={addRoutine}
              className="btn btn-primary flex items-center gap-2"
            >
              <Plus size={16} />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Routine List */}
      <div className="space-y-3">
        <AnimatePresence>
          {routines.map((routine) => (
            <motion.div
              key={routine.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="glass-card p-4 rounded-xl flex items-center gap-3"
            >
              <div className="flex-1">
                <h4 className="font-medium">{routine.title}</h4>
                <p className="text-xs text-[var(--text-muted)]">
                  {routine.frequency}
                </p>
              </div>

              <button
                onClick={() => deleteRoutine(routine.id)}
                className="p-1 rounded-lg hover:bg-[var(--glass-bg)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                <Trash2 size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}