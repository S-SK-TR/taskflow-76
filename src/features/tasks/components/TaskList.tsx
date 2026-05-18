import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, CheckCircle, Circle } from 'lucide-react'

interface Task {
  id: string
  title: string
  completed: boolean
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState('')

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now().toString(), title: newTask, completed: false }
      ])
      setNewTask('')
    }
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  return (
    <div className="glass-card p-6 rounded-xl">
      <h1 className="text-2xl font-bold mb-6">Görevler</h1>

      <div className="flex mb-6">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
          placeholder="Yeni görev ekle..."
          className="flex-1 glass-morphism px-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg transition-colors"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-gray-400 text-center">Henüz görev yok. Yeni bir görev ekleyin.</p>
        ) : (
          tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`glass-morphism p-4 rounded-lg flex items-center justify-between transition-colors ${
                task.completed ? 'opacity-70' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`p-1 rounded-full transition-colors ${
                    task.completed ? 'text-green-400' : 'text-gray-400 hover:text-green-400'
                  }`}
                >
                  {task.completed ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Circle className="h-5 w-5" />
                  )}
                </button>
                <span className={task.completed ? 'line-through text-gray-400' : ''}>{
                  task.title
                }</span>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
