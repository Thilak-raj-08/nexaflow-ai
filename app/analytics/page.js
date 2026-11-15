'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  RiWallet3Fill,
  RiArrowUpCircleFill,
  RiArrowDownCircleFill,
  RiAddCircleLine,
  RiDeleteBin6Line,
} from 'react-icons/ri'

const initialEntries = [
  {
    id: 1,
    title: 'Enterprise SaaS Annual Subscription Revenue',
    category: 'Subscription',
    type: 'income',
    amount: 4200,
    date: '2026-11-12',
  },
  {
    id: 2,
    title: 'AWS EKS Kubernetes Cluster & RDS Multi-AZ',
    category: 'Cloud Infra',
    type: 'expense',
    amount: 640,
    date: '2026-11-10',
  },
  {
    id: 3,
    title: 'Custom AI Code Audit API Usage Credits',
    category: 'Subscription',
    type: 'income',
    amount: 1850,
    date: '2026-11-08',
  },
  {
    id: 4,
    title: 'Vercel Enterprise Edge Bandwidth & CDN',
    category: 'Edge Network',
    type: 'expense',
    amount: 290,
    date: '2026-11-04',
  },
]

export default function AnalyticsPage() {
  const [entries, setEntries] = useState(initialEntries)
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense')
  const [category, setCategory] = useState('Cloud Infra')

  const stats = useMemo(() => {
    const revenue = entries
      .filter((e) => e.type === 'income')
      .reduce((acc, e) => acc + e.amount, 0)
    const spend = entries
      .filter((e) => e.type === 'expense')
      .reduce((acc, e) => acc + e.amount, 0)
    const net = revenue - spend
    const margin = revenue > 0 ? Math.round((net / revenue) * 100) : 0
    return { revenue, spend, net, margin }
  }, [entries])

  const handleAdd = (e) => {
    e.preventDefault()
    if (!title.trim() || !amount || Number(amount) <= 0) return
    setEntries([
      {
        id: Date.now(),
        title: title.trim(),
        category: type === 'income' ? 'Subscription' : category,
        type,
        amount: Number(amount),
        date: new Date().toISOString().slice(0, 10),
      },
      ...entries,
    ])
    setTitle('')
    setAmount('')
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
            Module 03 • Cloud FinOps & Telemetry
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mt-1">
            Cloud Spend & <span className="text-gradient">Margin Analytics</span>
          </h1>
        </div>

        <div className="px-4 py-2 rounded-xl glass-panel text-xs font-mono text-cyan-300">
          Gross Cloud Margin: <strong>{stats.margin}%</strong>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <div className="p-6 rounded-2xl glass-panel flex items-center justify-between">
          <div>
            <p className="text-xs font-mono uppercase text-gray-400">Net Cloud Margin</p>
            <p className="text-3xl font-display font-bold text-white mt-1">
              ${stats.net.toLocaleString()}
            </p>
          </div>
          <RiWallet3Fill className="text-3xl text-cyan-400" />
        </div>

        <div className="p-6 rounded-2xl glass-panel flex items-center justify-between">
          <div>
            <p className="text-xs font-mono uppercase text-emerald-400">Platform Revenue</p>
            <p className="text-3xl font-display font-bold text-white mt-1">
              +${stats.revenue.toLocaleString()}
            </p>
          </div>
          <RiArrowUpCircleFill className="text-3xl text-emerald-400" />
        </div>

        <div className="p-6 rounded-2xl glass-panel flex items-center justify-between">
          <div>
            <p className="text-xs font-mono uppercase text-rose-400">Cloud Infrastructure Spend</p>
            <p className="text-3xl font-display font-bold text-white mt-1">
              -${stats.spend.toLocaleString()}
            </p>
          </div>
          <RiArrowDownCircleFill className="text-3xl text-rose-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          <form onSubmit={handleAdd} className="p-6 rounded-2xl glass-panel space-y-4">
            <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
              <RiAddCircleLine className="text-cyan-400" /> Log FinOps Entry
            </h2>

            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-gray-950 border border-white/10">
              <button
                type="button"
                onClick={() => setType('expense')}
                className={`py-2 rounded-lg text-xs font-semibold ${
                  type === 'expense' ? 'bg-rose-500 text-white' : 'text-gray-400'
                }`}
              >
                Cloud Cost (-)
              </button>
              <button
                type="button"
                onClick={() => setType('income')}
                className={`py-2 rounded-lg text-xs font-semibold ${
                  type === 'income' ? 'bg-emerald-500 text-white' : 'text-gray-400'
                }`}
              >
                Revenue (+)
              </button>
            </div>

            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Entry description (e.g., PostgreSQL Read Replica)"
              className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none"
            />

            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                required
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount (USD)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-950 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={type === 'income'}
                className="w-full px-3 py-2.5 rounded-xl bg-gray-950 border border-white/10 text-sm text-gray-200 disabled:opacity-50"
              >
                <option value="Cloud Infra">Cloud Infra</option>
                <option value="Edge Network">Edge Network</option>
                <option value="AI Compute">AI Compute</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-indigo-600 text-white font-semibold text-sm"
            >
              Record Entry
            </button>
          </form>
        </div>

        <div className="lg:col-span-7">
          <div className="p-6 rounded-2xl glass-panel space-y-3">
            <h2 className="text-lg font-display font-bold text-white mb-2">
              Real-Time Telemetry Ledger ({entries.length})
            </h2>
            <AnimatePresence>
              {entries.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-4 rounded-xl bg-gray-950/90 border border-white/10 flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/5 text-gray-300">
                        {item.category}
                      </span>
                      <span className="text-xs font-mono text-gray-500">{item.date}</span>
                    </div>
                    <p className="text-sm font-semibold text-white mt-1">{item.title}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`font-mono font-bold text-sm ${
                        item.type === 'income' ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {item.type === 'income' ? '+' : '-'}${item.amount}
                    </span>
                    <button
                      onClick={() =>
                        setEntries((prev) => prev.filter((e) => e.id !== item.id))
                      }
                      className="p-1.5 rounded-lg hover:bg-rose-500/20 text-gray-500 hover:text-rose-400"
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
