import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Clock } from 'lucide-react'

interface Routine {
  id: string
  title: string
  time: string
}

export function RoutineList() {
  const [routines, setRoutines] = useState<Routine[]>([])
  const [newRoutine, setNewRoutine] = useState('')
  const [newTime, setNewTime] = useState('')

  const addRoutine = () => {
    if (newRoutine.trim() && newTime.trim()) {
      setRoutines([
        ...routines,
        { id: Date.now().toString(), title: newRoutine, time: newTime }
      ])
      setNewRoutine('')
      setNewTime('')
    }
  }

  return (
    <div className="glass-card p-6 rounded-xl">
      <h1 className="text-2xl font-bold mb-6">Rutinler</h1>

      <div className="flex mb-6 space-x-2">
        <input
          type="text"
          value={newRoutine}
          onChange={(e) => setNewRoutine(e.target.value)}
          placeholder="Yeni rutin ekle..."
          className="flex-1 glass-morphism px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="time"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
          className="glass-morphism px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addRoutine}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-3">
        {routines.length === 0 ? (
          <p className="text-gray-400 text-center">Henüz rutin yok. Yeni bir rutin ekleyin.</p>
        ) : (
          routines.map((routine) => (
            <motion.div
              key={routine.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-morphism p-4 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-blue-400" />
                <span>{routine.title}</span>
              </div>
              <span className="text-gray-400">{routine.time}</span>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}
