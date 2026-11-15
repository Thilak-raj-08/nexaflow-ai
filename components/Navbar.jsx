'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  RiCpuLine,
  RiMenu4Line,
  RiCloseLine,
  RiGithubFill,
  RiArrowRightUpLine,
} from 'react-icons/ri'

const navItems = [
  { name: 'Overview', href: '/' },
  { name: 'AI Code Studio', href: '/studio' },
  { name: 'Sprint Kanban', href: '/kanban' },
  { name: 'Cloud FinOps', href: '/analytics' },
  { name: 'Pricing', href: '/pricing' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#060913]/85 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 via-fuchsia-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-rose-500/25 group-hover:scale-105 transition-transform">
            <RiCpuLine className="text-lg" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-lg leading-none text-white">
              NexaFlow<span className="text-rose-500">.ai</span>
            </span>
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
              Developer Cloud OS
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-gray-900/90 border border-white/10">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-colors ${
                  isActive ? 'text-white' : 'text-gray-300 hover:text-rose-400'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nexaflowNavPill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-500 to-indigo-600 shadow-md shadow-rose-500/25 z-0"
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/Thilak-raj-08/nexaflow-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-gray-900 hover:bg-gray-800 border border-white/10 text-gray-300 hover:text-white transition-colors"
            title="GitHub Repository"
          >
            <RiGithubFill className="text-lg" />
          </a>
          <Link
            href="/studio"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-rose-500/25 transition-all"
          >
            <span>Launch Studio</span>
            <RiArrowRightUpLine className="text-base" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-xl bg-gray-900 border border-white/10 text-gray-200"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <RiCloseLine className="text-xl" /> : <RiMenu4Line className="text-xl" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#060913] px-4 py-4 space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive
                    ? 'bg-gradient-to-r from-rose-500 to-indigo-600 text-white'
                    : 'text-gray-300 hover:bg-gray-900'
                }`}
              >
                {item.name}
              </Link>
            )
          })}
        </div>
      )}
    </header>
  )
}
