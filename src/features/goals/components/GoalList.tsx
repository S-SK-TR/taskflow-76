import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Target } from 'lucide-react'

interface Goal {
  id: string
  title: string
  progress: number
}

export function GoalList() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [newGoal, setNewGoal] = useState('')

  const addGoal = () => {
    if (newGoal.trim()) {
      setGoals([
        ...goals,
        { id: Date.now().toString(), title: newGoal, progress: 0 }
      ])
      setNewGoal('')
    }
  }

  const updateProgress = (id: string, progress: number) => {
    setGoals(goals.map(goal =>
      goal.id === id ? { ...goal, progress } : goal
    ))
  }

  return (
    <div className="glass-card p-6 rounded-xl">
      <h1 className="text-2xl font-bold mb-6">Hedefler</h1>

      <div className="flex mb-6">
        <input
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addGoal()}
          placeholder="Yeni hedef ekle..."
          className="flex-1 glass-morphism px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addGoal}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg transition-colors"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-4">
        {goals.length === 0 ? (
          <p className="text-gray-400 text-center">Henüz hedef yok. Yeni bir hedef ekleyin.</p>
        ) : (
          goals.map((goal) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-morphism p-4 rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-blue-400" />
                  <span>{goal.title}</span>
                </div>
                <span className="text-gray-400">{goal.progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2">
                {[0, 25, 50, 75, 100].map((value) => (
                  <button
                    key={value}
                    onClick={() => updateProgress(goal.id, value)}
                    className={`text-xs px-2 py-1 rounded-full transition-colors ${
                      goal.progress === value ? 'bg-blue-500 text-white' : 'text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {value}%
                  </button>
                ))}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
