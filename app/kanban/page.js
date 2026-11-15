'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  RiAddLine,
  RiDeleteBin6Line,
  RiSearchLine,
} from 'react-icons/ri'

const initialTasks = [
  {
    id: 'NF-101',
    title: 'Design Next.js 16 App Router Authentication Middleware',
    tag: 'Architecture',
    priority: 'High',
    points: 5,
    status: 'done',
  },
  {
    id: 'NF-102',
    title: 'Optimize PostgreSQL Indexing for Order History Queries',
    tag: 'Database',
    priority: 'High',
    points: 8,
    status: 'review',
  },
  {
    id: 'NF-103',
    title: 'Build Real-Time WebSocket Notification Toast System',
    tag: 'Frontend',
    priority: 'Medium',
    points: 5,
    status: 'progress',
  },
  {
    id: 'NF-104',
    title: 'Implement Role-Based Access Control (RBAC) in Laravel API',
    tag: 'Backend',
    priority: 'High',
    points: 8,
    status: 'progress',
  },
  {
    id: 'NF-105',
    title: 'Add Automated End-to-End Checkout Flow Tests',
    tag: 'QA / Testing',
    priority: 'Medium',
    points: 3,
    status: 'backlog',
  },
]

const columns = [
  { id: 'backlog', title: 'Backlog', accent: 'border-gray-500/40', dot: 'bg-gray-400' },
  { id: 'progress', title: 'In Progress', accent: 'border-blue-500/40', dot: 'bg-blue-400' },
  { id: 'review', title: 'Code Review', accent: 'border-amber-500/40', dot: 'bg-amber-400' },
  { id: 'done', title: 'Completed', accent: 'border-emerald-500/40', dot: 'bg-emerald-400' },
]

const statusOrder = ['backlog', 'progress', 'review', 'done']

export default function KanbanPage() {
  const [tasks, setTasks] = useState(initialTasks)
  const [search, setSearch] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newPriority, setNewPriority] = useState('High')
  const [newPoints, setNewPoints] = useState(5)

  const handleAddTask = (e) => {
    e.preventDefault()
    if (!newTitle.trim()) return
    const nextNum = 106 + tasks.length
    setTasks([
      {
        id: `NF-${nextNum}`,
        title: newTitle.trim(),
        tag: 'Full-Stack',
        priority: newPriority,
        points: Number(newPoints),
        status: 'backlog',
      },
      ...tasks,
    ])
    setNewTitle('')
  }

  const moveTask = (id, direction) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t
        const idx = statusOrder.indexOf(t.status)
        const nextIdx = Math.min(statusOrder.length - 1, Math.max(0, idx + direction))
        return { ...t, status: statusOrder[nextIdx] }
      })
    )
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const filteredTasks = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase())
  )

  const totalPoints = tasks.reduce((acc, t) => acc + t.points, 0)
  const completedPoints = tasks
    .filter((t) => t.status === 'done')
    .reduce((acc, t) => acc + t.points, 0)
  const velocityPercent =
    totalPoints > 0 ? Math.round((completedPoints / totalPoints) * 100) : 0

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-violet-400">
            Module 02 • Agile Sprint Management
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mt-1">
            Sprint <span className="text-gradient">Kanban Workspace</span>
          </h1>
        </div>

        <div className="px-4 py-2 rounded-xl glass-panel text-xs font-mono">
          Sprint Velocity:{' '}
          <strong className="text-emerald-400">
            {completedPoints} / {totalPoints} pts ({velocityPercent}%)
          </strong>
        </div>
      </div>

      {/* Add Ticket Form + Search */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-8">
        <form
          onSubmit={handleAddTask}
          className="lg:col-span-8 p-4 rounded-2xl glass-panel flex flex-wrap sm:flex-nowrap items-center gap-3"
        >
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Create new sprint ticket..."
            className="flex-1 min-w-[180px] px-3.5 py-2.5 rounded-xl bg-gray-950 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none"
          />
          <select
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-gray-950 border border-white/10 text-xs font-mono text-gray-300"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select
            value={newPoints}
            onChange={(e) => setNewPoints(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-gray-950 border border-white/10 text-xs font-mono text-gray-300"
          >
            <option value={3}>3 pts</option>
            <option value={5}>5 pts</option>
            <option value={8}>8 pts</option>
          </select>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-indigo-600 text-white text-xs font-semibold whitespace-nowrap"
          >
            <RiAddLine className="text-base" /> Add Ticket
          </button>
        </form>

        <div className="lg:col-span-4 p-4 rounded-2xl glass-panel flex items-center">
          <div className="relative w-full">
            <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search sprint tickets..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-gray-950 border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {columns.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.status === col.id)
          return (
            <div
              key={col.id}
              className={`rounded-2xl glass-panel border ${col.accent} p-4 flex flex-col min-h-[420px]`}
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${col.dot}`} />
                  <h2 className="font-display font-bold text-sm text-white">
                    {col.title}
                  </h2>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-white/5 text-gray-400">
                  {colTasks.length}
                </span>
              </div>

              <div className="space-y-3 flex-1">
                <AnimatePresence>
                  {colTasks.map((task) => (
                    <motion.div
                      layout
                      key={task.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="p-4 rounded-xl bg-gray-950/90 border border-white/10 hover:border-rose-500/40 transition-all"
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono mb-2">
                        <span className="text-rose-400 font-semibold">{task.id}</span>
                        <span className="px-2 py-0.5 rounded bg-white/5 text-gray-300">
                          {task.priority}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-white mb-3">
                        {task.title}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-white/5">
                        <span className="text-[10px] font-mono text-gray-400">
                          {task.points} pts
                        </span>
                        <div className="flex items-center gap-1">
                          {task.status !== 'backlog' && (
                            <button
                              onClick={() => moveTask(task.id, -1)}
                              className="p-1 rounded bg-white/5 hover:bg-white/15 text-gray-300 text-xs"
                            >
                              ←
                            </button>
                          )}
                          {task.status !== 'done' && (
                            <button
                              onClick={() => moveTask(task.id, 1)}
                              className="px-2 py-1 rounded bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white text-xs font-mono"
                            >
                              Next →
                            </button>
                          )}
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="p-1 rounded hover:bg-rose-500/20 text-gray-500 hover:text-rose-400"
                          >
                            <RiDeleteBin6Line className="text-xs" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
