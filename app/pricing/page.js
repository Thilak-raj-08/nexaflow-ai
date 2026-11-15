'use client'

import { useState } from 'react'
import Link from 'next/link'
import { RiCheckLine, RiSparkling2Fill } from 'react-icons/ri'

const plans = [
  {
    name: 'Developer',
    description: 'For individual engineers & open-source creators',
    monthly: 0,
    annual: 0,
    features: [
      'Unlimited AST React & SQL Code Audits',
      'Personal Agile Kanban Board (Up to 50 tickets)',
      'Community GitHub Integration',
      'Standard Edge Telemetry',
    ],
    cta: 'Start Free Forever',
    highlighted: false,
  },
  {
    name: 'Pro Engineering Team',
    description: 'For high-velocity startups & product teams',
    monthly: 29,
    annual: 24,
    features: [
      'Everything in Developer + Unlimited Sprints',
      'Automated PR Security & SQLi Gatekeeper',
      'Real-Time Cloud FinOps Margin Alerts',
      'Role-Based Access Control (RBAC)',
      'Priority 24/7 Engineering Support',
    ],
    cta: 'Launch Pro Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise Cloud',
    description: 'Dedicated self-hosted or VPC cloud deployment',
    monthly: 99,
    annual: 79,
    features: [
      'Custom AST Rulesets & Private LLM Models',
      'Unlimited Multi-Team Kanban Workspaces',
      'SOC2 / ISO27001 Compliance Audit Logs',
      'Dedicated Solutions Architect',
    ],
    cta: 'Contact Enterprise Sales',
    highlighted: false,
  },
]

export default function PricingPage() {
  const [annual, setAnnual] = useState(true)

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-rose-400">
          Transparent Cloud Pricing
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-bold text-white mt-2 mb-4">
          Scale Your <span className="text-gradient">Engineering Velocity</span>
        </h1>

        {/* Billing Toggle */}
        <div className="inline-flex items-center gap-3 p-1.5 rounded-full glass-panel mt-4">
          <button
            onClick={() => setAnnual(false)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              !annual ? 'bg-rose-500 text-white' : 'text-gray-400'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              annual ? 'bg-rose-500 text-white' : 'text-gray-400'
            }`}
          >
            Annual Billing (Save 20%)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => {
          const price = annual ? plan.annual : plan.monthly
          return (
            <div
              key={idx}
              className={`rounded-3xl p-8 flex flex-col justify-between ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-rose-500/20 via-indigo-500/15 to-gray-900 border-2 border-rose-500 shadow-2xl shadow-rose-500/15'
                  : 'glass-panel'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-display font-bold text-white">
                    {plan.name}
                  </h2>
                  {plan.highlighted && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-mono uppercase font-bold">
                      <RiSparkling2Fill /> Most Popular
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mb-6">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-display font-extrabold text-white">
                    ${price}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    {' '}
                    / developer / mo
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                      <RiCheckLine className="text-emerald-400 text-lg flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/studio"
                className={`block w-full py-3.5 rounded-xl font-display font-bold text-center text-sm transition-all ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-rose-500 to-indigo-600 text-white shadow-lg shadow-rose-500/25'
                    : 'bg-white/10 hover:bg-white/15 text-white'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
