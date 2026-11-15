'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  RiSparkling2Fill,
  RiCpuLine,
  RiKanbanView,
  RiPieChart2Fill,
  RiShieldCheckLine,
  RiArrowRightUpLine,
  RiSpeedUpLine,
  RiCodeSSlashLine,
  RiCheckboxCircleFill,
  RiTerminalBoxLine,
} from 'react-icons/ri'

const modules = [
  {
    title: 'AI Code & SQL Studio',
    tag: 'AST Static Analysis',
    description:
      'Audit React hooks, Laravel controllers, and MySQL queries in real time. Automatically detect SQL injection, N+1 queries, and render bottlenecks.',
    href: '/studio',
    icon: RiCpuLine,
    color: 'from-rose-500 to-pink-600',
    cta: 'Open Code Studio →',
  },
  {
    title: 'Agile Sprint Kanban',
    tag: 'Real-Time Workflow',
    description:
      'Manage engineering tickets across Backlog, In Progress, Code Review, and Completed columns with automated Story Point velocity calculation.',
    href: '/kanban',
    icon: RiKanbanView,
    color: 'from-violet-500 to-indigo-600',
    cta: 'Open Kanban Board →',
  },
  {
    title: 'Cloud FinOps & Telemetry',
    tag: 'Cost & Latency Intelligence',
    description:
      'Monitor cloud infrastructure budgets, API p99 latency, and real-time operational expenses with interactive financial ledger controls.',
    href: '/analytics',
    icon: RiPieChart2Fill,
    color: 'from-cyan-500 to-blue-600',
    cta: 'Explore Analytics →',
  },
]

export default function HomePage() {
  const [teamSize, setTeamSize] = useState(12)
  const [prsPerWeek, setPrsPerWeek] = useState(35)

  const hoursSavedMonthly = Math.round(teamSize * 6.5 + prsPerWeek * 1.4)
  const costSavedYearly = (hoursSavedMonthly * 12 * 65).toLocaleString()

  return (
    <div className="space-y-24 pt-12 pb-12">
      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs font-mono uppercase tracking-widest mb-6"
          >
            <RiSparkling2Fill /> NexaFlow Cloud OS v3.4 • Multi-Page SaaS
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight leading-[1.08] mb-6"
          >
            Ship Safer Code &{' '}
            <span className="text-gradient">Accelerate Sprints</span> in One Cloud.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-gray-400 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10"
          >
            NexaFlow unifies automated AST code auditing, agile Kanban sprint management, and cloud FinOps telemetry into a single developer platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/studio"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-fuchsia-600 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 text-white font-semibold text-sm shadow-xl shadow-rose-500/25 transition-all hover:-translate-y-0.5"
            >
              <span>Launch AI Code Studio</span>
              <RiArrowRightUpLine className="text-lg" />
            </Link>
            <Link
              href="/kanban"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl glass-panel hover:border-rose-500/40 text-white font-semibold text-sm transition-all hover:-translate-y-0.5"
            >
              <RiKanbanView className="text-lg text-violet-400" />
              <span>Try Live Sprint Kanban</span>
            </Link>
          </motion.div>
        </div>

        {/* Hero KPI Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
          {[
            { value: '99.4%', label: 'SQLi & Bug Detection', sub: 'Automated AST Scanner' },
            { value: '3.2x', label: 'Faster Code Reviews', sub: 'Instant Refactoring Patches' },
            { value: '42%', label: 'Cloud FinOps Savings', sub: 'Real-Time Spend Alerts' },
            { value: '<18ms', label: 'Global Edge Latency', sub: 'Distributed Architecture' },
          ].map((stat, idx) => (
            <div key={idx} className="glass-panel rounded-2xl p-5 text-center sm:text-left">
              <p className="text-2xl sm:text-3xl font-display font-bold text-gradient">
                {stat.value}
              </p>
              <p className="text-sm font-semibold text-white mt-1">{stat.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3 Interactive Platform Modules */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-mono uppercase tracking-widest text-rose-400 mb-2">
            Multi-Page Ecosystem
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold">
            Explore Interactive <span className="text-gradient">Platform Modules</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modules.map((mod, idx) => {
            const Icon = mod.icon
            return (
              <div
                key={idx}
                className="glass-panel rounded-3xl p-7 flex flex-col justify-between hover:border-rose-500/40 transition-all duration-300 hover:-translate-y-1.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-13 h-13 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center text-white shadow-lg`}
                    >
                      <Icon className="text-2xl" />
                    </div>
                    <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10">
                      {mod.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-white mb-2">
                    {mod.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-6">
                    {mod.description}
                  </p>
                </div>

                <Link
                  href={mod.href}
                  className="inline-flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 hover:bg-rose-500 text-sm font-semibold text-white transition-colors"
                >
                  <span>{mod.cta}</span>
                  <RiArrowRightUpLine />
                </Link>
              </div>
            )
          })}
        </div>
      </section>

      {/* Interactive Engineering ROI Calculator */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-rose-500/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-mono uppercase tracking-widest text-rose-400">
                Interactive Velocity Estimator
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-bold">
                Calculate Your Team&apos;s <span className="text-gradient">Engineering ROI</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-400">
                Adjust the sliders below to estimate how much review time and cloud overhead NexaFlow saves your engineering organization.
              </p>

              <div className="space-y-5 pt-2">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300 font-medium">Engineering Team Size</span>
                    <span className="font-mono font-bold text-rose-400">{teamSize} Developers</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="100"
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-300 font-medium">Pull Requests Merged / Week</span>
                    <span className="font-mono font-bold text-indigo-400">{prsPerWeek} PRs / wk</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="200"
                    value={prsPerWeek}
                    onChange={(e) => setPrsPerWeek(Number(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-2xl bg-gradient-to-br from-rose-500/15 via-purple-500/15 to-indigo-500/15 border border-white/15 p-6 sm:p-8 space-y-6">
              <div>
                <p className="text-xs font-mono uppercase text-gray-400">
                  Estimated Engineering Hours Saved
                </p>
                <p className="text-4xl font-display font-extrabold text-white mt-1">
                  {hoursSavedMonthly} hrs <span className="text-sm font-normal text-rose-400">/ month</span>
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-xs font-mono uppercase text-gray-400">
                  Annual Productivity Savings
                </p>
                <p className="text-3xl font-display font-bold text-emerald-400 mt-1">
                  ${costSavedYearly} <span className="text-xs font-normal text-gray-400">USD / year</span>
                </p>
              </div>

              <Link
                href="/pricing"
                className="block w-full py-3.5 rounded-xl bg-white text-gray-950 font-display font-bold text-center text-sm hover:bg-gray-200 transition-colors"
              >
                Compare Plans & Pricing →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
