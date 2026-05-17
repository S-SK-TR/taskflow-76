import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Check, Trash2 } from 'lucide-react'
import { useStore } from '@/core/store'
import { cn } from '@/core/utils'

interface Task {
  id: string
  title: string
  status: 'pending' | 'in-progress' | 'completed'
  dueDate?: string
}

export function TaskList() {
  const { tasks, setTasks } = useStore((state) => ({
    tasks: state.tasks.items,
    setTasks: state.setTasks
  }))

  const [newTaskTitle, setNewTaskTitle] = useState('')

  const addTask = () => {
    if (!newTaskTitle.trim()) return

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      status: 'pending'
    }

    setTasks({ items: [...tasks, newTask] })
    setNewTaskTitle('')
  }

  const updateTaskStatus = (id: string, status: Task['status']) => {
    setTasks({
      items: tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    })
  }

  const deleteTask = (id: string) => {
    setTasks({ items: tasks.filter((task) => task.id !== id) })
  }

  return (
    <div className="space-y-4">
      {/* Add Task Form */}
      <div className="glass-card p-4 rounded-xl">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
          />
          <button
            onClick={addTask}
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus size={16} />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        <AnimatePresence>
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="glass-card p-4 rounded-xl flex items-center gap-3"
            >
              <button
                onClick={() =>
                  updateTaskStatus(
                    task.id,
                    task.status === 'completed' ? 'pending' : 'completed'
                  )
                }
                className={cn(
                  "h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                  task.status === 'completed' && "bg-green-500 border-green-500",
                  task.status !== 'completed' && "border-[var(--text-muted)]"
                )}
              >
                {task.status === 'completed' && <Check size={12} className="text-white" />}
              </button>

              <span
                className={cn(
                  "flex-1 text-sm",
                  task.status === 'completed' && "line-through text-[var(--text-muted)]"
                )}
              >
                {task.title}
              </span>

              <button
                onClick={() => deleteTask(task.id)}
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