import { motion } from 'framer-motion'
import { useStore } from '@/core/store'
import { cn } from '@/core/utils'

const DEMO_TASKS = [
  { id: '1', title: 'Complete project proposal', status: 'in-progress' },
  { id: '2', title: 'Review code changes', status: 'completed' },
  { id: '3', title: 'Schedule team meeting', status: 'pending' }
]

const DEMO_ROUTINES = [
  { id: '1', title: 'Morning exercise', frequency: 'Daily' },
  { id: '2', title: 'Weekly review', frequency: 'Weekly' }
]

const DEMO_GOALS = [
  { id: '1', title: 'Finish project', progress: 65 },
  { id: '2', title: 'Improve coding skills', progress: 30 }
]

export function Dashboard() {
  const { tasks, routines, goals } = useStore((state) => ({
    tasks: state.tasks.items.length > 0 ? state.tasks.items : DEMO_TASKS,
    routines: state.routines.items.length > 0 ? state.routines.items : DEMO_ROUTINES,
    goals: state.goals.items.length > 0 ? state.goals.items : DEMO_GOALS
  }))

  return (
    <div className="space-y-6">
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Tasks Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-4 rounded-xl"
        >
          <h3 className="text-lg font-semibold mb-4">Tasks</h3>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center gap-3">
                <div className={cn(
                  "h-2 w-2 rounded-full",
                  task.status === 'completed' && "bg-green-500",
                  task.status === 'in-progress' && "bg-yellow-500",
                  task.status === 'pending' && "bg-gray-500"
                )} />
                <span className="text-sm">{task.title}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Routines Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-4 rounded-xl"
        >
          <h3 className="text-lg font-semibold mb-4">Routines</h3>
          <div className="space-y-3">
            {routines.map((routine) => (
              <div key={routine.id} className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <span className="text-sm">{routine.title}</span>
                <span className="ml-auto text-xs text-[var(--text-muted)]">
                  {routine.frequency}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Goals Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card p-4 rounded-xl"
        >
          <h3 className="text-lg font-semibold mb-4">Goals</h3>
          <div className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.id}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">{goal.title}</span>
                  <span className="text-xs text-[var(--text-muted)]">{goal.progress}%</span>
                </div>
                <div className="h-2 bg-[var(--glass-bg)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-4 rounded-xl"
      >
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button className="btn btn-primary">Add Task</button>
          <button className="btn btn-secondary">Add Routine</button>
          <button className="btn bg-accent text-white hover:bg-accent/90">Add Goal</button>
        </div>
      </motion.div>
    </div>
  )
}