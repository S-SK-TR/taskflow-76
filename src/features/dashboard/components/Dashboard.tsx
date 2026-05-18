import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '@/core/store'
import { cn } from '@/core/utils'
import { Link } from 'react-router-dom'
import { Target, Repeat, HelpCircle, CheckCircle, Calendar } from 'lucide-react'

interface StatCardProps {
  title: string
  value: number
  icon: React.ReactNode
  color: string
  link: string
}

function StatCard({ title, value, icon, color, link }: StatCardProps) {
  return (
    <Link to={link} className="block">
      <motion.div
        whileHover={{ y: -2, transition: { duration: 0.2 } }}
        className={cn(
          "glass-card p-4 rounded-xl space-y-2 shadow-md hover:shadow-lg transition-shadow",
          `border-l-4 border-${color}-500`
        )}
      >
        <div className="flex items-center justify-between">
          <div className={`h-8 w-8 rounded-lg bg-${color}-500/10 flex items-center justify-center`}>
            {icon}
          </div>
          <span className={`text-${color}-500 font-medium text-sm`}>{title}</span>
        </div>
        <div className="text-2xl font-bold">{value}</div>
      </motion.div>
    </Link>
  )
}

export function Dashboard() {
  const { tasks, routines, goals } = useStore((state) => ({
    tasks: state.tasks.items,
    routines: state.routines.items,
    goals: state.goals.items
  }))

  const completedTasks = tasks.filter(task => task.status === 'completed').length
  const activeRoutines = routines.filter(routine => routine.completed).length
  const completedGoals = goals.filter(goal => goal.completed).length

  return (
    <div className="space-y-6">
      <div className="glass-card p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-semibold">Günlük Planlama</h1>
        <p className="text-[var(--text-muted)] mt-1">Bugünün hedeflerinizi yönetin ve ilerlemenizi takip edin.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard
          title="Tamamlanan Görevler"
          value={completedTasks}
          icon={<HelpCircle size={16} className="text-blue-500" />}
          color="blue"
          link="/tasks"
        />

        <StatCard
          title="Tamamlanan Rutinler"
          value={activeRoutines}
          icon={<Repeat size={16} className="text-green-500" />}
          color="green"
          link="/routines"
        />

        <StatCard
          title="Tamamlanan Hedefler"
          value={completedGoals}
          icon={<Target size={16} className="text-purple-500" />}
          color="purple"
          link="/goals"
        />
      </div>

      <div className="glass-card p-6 rounded-xl shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Calendar size={18} className="text-[var(--text-muted)]" />
          <h2 className="text-lg font-medium">Bugünkü Görevler</h2>
        </div>

        <div className="space-y-3">
          {tasks.filter(task => task.status !== 'completed').slice(0, 3).map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="glass-card p-3 rounded-lg flex items-center gap-3"
            >
              <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${task.category === 'work' ? 'border-blue-500' : task.category === 'personal' ? 'border-purple-500' : task.category === 'health' ? 'border-green-500' : task.category === 'education' ? 'border-yellow-500' : 'border-pink-500'}`}>
                {task.status === 'completed' && <CheckCircle size={12} className="text-green-500" />}
              </div>
              <div>
                <h3 className="font-medium">{task.title}</h3>
                {task.description && (
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{task.description}</p>
                )}
              </div>
            </motion.div>
          ))}

          {tasks.filter(task => task.status !== 'completed').length === 0 && (
            <div className="text-center py-6 text-[var(--text-muted)]">
              Bugün için henüz görev yok.
            </div>
          )}
        </div>

        {tasks.filter(task => task.status !== 'completed').length > 3 && (
          <div className="mt-4 text-center">
            <Link to="/tasks" className="text-sm text-blue-500 hover:underline">Tüm görevleri gör</Link>
          </div>
        )}
      </div>
    </div>
  )
}