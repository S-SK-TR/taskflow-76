import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2 } from 'lucide-react'
import { useStore } from '@/core/store'

interface Goal {
  id: string
  title: string
  progress: number
}

export function GoalList() {
  const { goals, setGoals } = useStore((state) => ({
    goals: state.goals.items,
    setGoals: state.setGoals
  }))

  const [newGoal, setNewGoal] = useState({
    title: '',
    progress: 0
  })

  const addGoal = () => {
    if (!newGoal.title.trim()) return

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      progress: newGoal.progress
    }

    setGoals({ items: [...goals, goal] })
    setNewGoal({ title: '', progress: 0 })
  }

  const updateProgress = (id: string, progress: number) => {
    setGoals({
      items: goals.map((goal) =>
        goal.id === id ? { ...goal, progress } : goal
      )
    })
  }

  const deleteGoal = (id: string) => {
    setGoals({ items: goals.filter((goal) => goal.id !== id) })
  }

  return (
    <div className="space-y-4">
      {/* Add Goal Form */}
      <div className="glass-card p-4 rounded-xl">
        <div className="space-y-3">
          <input
            type="text"
            value={newGoal.title}
            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
            placeholder="Goal title..."
            className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <div className="flex gap-2">
            <input
              type="number"
              value={newGoal.progress}
              onChange={(e) => setNewGoal({ ...newGoal, progress: Number(e.target.value) })}
              placeholder="Progress"
              min="0"
              max="100"
              className="w-20 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />

            <button
              onClick={addGoal}
              className="btn btn-primary flex items-center gap-2 ml-auto"
            >
              <Plus size={16} />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Goal List */}
      <div className="space-y-3">
        <AnimatePresence>
          {goals.map((goal) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="glass-card p-4 rounded-xl"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{goal.title}</h4>
                <button
                  onClick={() => deleteGoal(goal.id)}
                  className="p-1 rounded-lg hover:bg-[var(--glass-bg)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-[var(--text-muted)]">
                  <span>Progress</span>
                  <span>{goal.progress}%</span>
                </div>

                <div className="h-2 bg-[var(--glass-bg)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={goal.progress}
                  onChange={(e) => updateProgress(goal.id, Number(e.target.value))}
                  className="w-full h-1 bg-transparent appearance-none cursor-pointer rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}