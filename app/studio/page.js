'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  RiCpuLine,
  RiBugLine,
  RiShieldCheckLine,
  RiSpeedUpLine,
  RiCodeSSlashLine,
  RiPlayFill,
  RiCheckLine,
  RiFileCopyLine,
  RiSparkling2Fill,
  RiAlertLine,
  RiCheckboxCircleFill,
} from 'react-icons/ri'

const samplePresets = {
  react: {
    name: 'React UserList.jsx (N+1 & Re-render Bug)',
    language: 'JavaScript / React',
    code: `import { useState, useEffect } from 'react';

export default function UserList({ teamId }) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/users?team=' + teamId)
      .then(res => res.json())
      .then(data => setUsers(data));
  }); // ⚠️ Missing dependency array!

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input value={search} onChange={e => setSearch(e.target.value)} />
      {filtered.map((user, index) => (
        <div key={index}>{user.name}</div>
      ))}
    </div>
  );
}`,
    score: 64,
    optimizedScore: 98,
    metrics: {
      complexity: 'O(n) Memoized Hook',
      security: 'Safe Client Fetch',
      maintainability: '98/100',
    },
    issues: [
      {
        severity: 'critical',
        title: 'Infinite Network Loop in useEffect',
        detail:
          'useEffect has no dependency array, causing /api/users to fire on every single keystroke and state update.',
      },
      {
        severity: 'warning',
        title: 'Unmemoized Filter Calculation',
        detail:
          'Filtering large arrays on every render without useMemo degrades input responsiveness.',
      },
      {
        severity: 'info',
        title: 'Array Index Used as React Key',
        detail:
          'Using key={index} on dynamic filtered lists causes reconciliation bugs; use key={user.id}.',
      },
    ],
    optimizedCode: `import { useState, useEffect, useMemo } from 'react';

export default function UserList({ teamId }) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    fetch(\`/api/users?team=\${encodeURIComponent(teamId)}\`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => {
        if (err.name !== 'AbortError') console.error(err);
      });

    return () => controller.abort();
  }, [teamId]); // ✅ Proper dependency array + AbortController cleanup

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) => u.name.toLowerCase().includes(q));
  }, [users, search]); // ✅ Memoized O(n) filter

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search team members..."
      />
      {filtered.map((user) => (
        <div key={user.id}>{user.name}</div> // ✅ Stable unique ID key
      ))}
    </div>
  );
}`,
  },
  laravel: {
    name: 'Laravel OrderController.php (SQLi & N+1)',
    language: 'PHP / Laravel',
    code: `<?php
namespace App\\Http\\Controllers;
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\DB;

class OrderController extends Controller {
    public function index(Request $request) {
        $status = $request->input('status');
        // ⚠️ Raw unparameterized query + N+1 lookup
        $orders = DB::select("SELECT * FROM orders WHERE status = '$status'");
        return response()->json($orders);
    }
}`,
    score: 48,
    optimizedScore: 99,
    metrics: {
      complexity: 'O(1) Indexed Eloquent',
      security: 'SQLi Eliminated',
      maintainability: '99/100',
    },
    issues: [
      {
        severity: 'critical',
        title: 'SQL Injection Vulnerability',
        detail:
          'Direct string interpolation of $status inside DB::select exposes the database to SQL injection attacks.',
      },
      {
        severity: 'warning',
        title: 'Missing Eager Loading (N+1 Problem)',
        detail:
          'Use Eloquent with("customer", "items") and pagination to prevent memory exhaustion.',
      },
    ],
    optimizedCode: `<?php
namespace App\\Http\\Controllers;

use App\\Models\\Order;
use Illuminate\\Http\\JsonResponse;
use Illuminate\\Http\\Request;

class OrderController extends Controller {
    public function index(Request $request): JsonResponse {
        $validated = $request->validate([
            'status' => 'nullable|string|in:pending,processing,completed,cancelled',
        ]);

        // ✅ Parameterized Eloquent query + Eager Loading + Pagination
        $orders = Order::with(['customer:id,name,email', 'items'])
            ->when($validated['status'] ?? null, function ($query, $status) {
                $query->where('status', $status);
            })
            ->latest()
            ->paginate(20);

        return response()->json($orders);
    }
}`,
  },
  sql: {
    name: 'MySQL Analytics Query (Full Table Scan)',
    language: 'SQL / MySQL',
    code: `SELECT *
FROM bookings b, users u
WHERE b.user_id = u.id
AND YEAR(b.created_at) = 2026
AND LOWER(u.city) = 'jaffna'
ORDER BY b.created_at DESC;`,
    score: 58,
    optimizedScore: 97,
    metrics: {
      complexity: 'B-Tree Range Scan',
      security: 'Read-Only Projection',
      maintainability: '97/100',
    },
    issues: [
      {
        severity: 'critical',
        title: 'Non-SARGable Predicate Blocks Index Usage',
        detail:
          'Wrapping created_at in YEAR() and city in LOWER() forces MySQL to perform a full table scan instead of using B-Tree indexes.',
      },
      {
        severity: 'warning',
        title: 'SELECT * Over-Fetches Columns',
        detail:
          'Explicitly project only required columns to reduce I/O and enable covering indexes.',
      },
    ],
    optimizedCode: `-- ✅ Recommended Composite Index:
-- CREATE INDEX idx_bookings_created_user ON bookings (created_at DESC, user_id);

SELECT 
    b.id AS booking_id,
    b.pickup_location,
    b.dropoff_location,
    b.fare_amount,
    b.created_at,
    u.name AS passenger_name
FROM bookings b
INNER JOIN users u ON u.id = b.user_id
WHERE b.created_at >= '2026-01-01 00:00:00'
  AND b.created_at <  '2027-01-01 00:00:00'
  AND u.city = 'Jaffna'
ORDER BY b.created_at DESC
LIMIT 100;`,
  },
}

export default function StudioPage() {
  const [activeKey, setActiveKey] = useState('react')
  const [customCode, setCustomCode] = useState(samplePresets.react.code)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [copied, setCopied] = useState(false)

  const currentPreset = samplePresets[activeKey]

  const handleSelectPreset = (key) => {
    setActiveKey(key)
    setCustomCode(samplePresets[key].code)
    setIsAnalyzing(true)
    setTimeout(() => setIsAnalyzing(false), 550)
  }

  const handleRunAudit = () => {
    setIsAnalyzing(true)
    setTimeout(() => setIsAnalyzing(false), 650)
  }

  const handleCopyOptimized = () => {
    navigator.clipboard.writeText(currentPreset.optimizedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-rose-400">
            Module 01 • Automated Code Auditor
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mt-1">
            AI Code & SQL <span className="text-gradient">Security Studio</span>
          </h1>
        </div>

        <button
          onClick={handleRunAudit}
          disabled={isAnalyzing}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-rose-500/25 transition-all"
        >
          <RiPlayFill className="text-base" />
          {isAnalyzing ? 'Scanning AST...' : 'Run Deep Security Audit'}
        </button>
      </div>

      {/* Preset Selector */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        {Object.entries(samplePresets).map(([key, item]) => (
          <button
            key={key}
            onClick={() => handleSelectPreset(key)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeKey === key
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25'
                : 'glass-panel text-gray-300 hover:text-white'
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-2xl glass-panel overflow-hidden">
            <div className="px-4 py-3 bg-gray-950/90 border-b border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-gray-400">
                Source Input ({currentPreset.language})
              </span>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-rose-500/15 text-rose-400">
                Initial Score: {currentPreset.score}/100
              </span>
            </div>
            <textarea
              value={customCode}
              onChange={(e) => setCustomCode(e.target.value)}
              rows={14}
              spellCheck={false}
              className="w-full p-4 bg-gray-950/80 text-gray-200 font-mono text-xs sm:text-sm leading-relaxed focus:outline-none resize-none"
            />
          </div>

          <div className="rounded-2xl glass-panel p-5">
            <h2 className="text-sm font-mono uppercase tracking-wider text-rose-400 font-semibold mb-4 flex items-center gap-2">
              <RiBugLine className="text-lg" /> Detected Issues ({currentPreset.issues.length})
            </h2>
            <div className="space-y-3">
              {currentPreset.issues.map((issue, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-gray-950/80 border border-white/10 flex items-start gap-3"
                >
                  <RiAlertLine className="text-lg text-rose-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-white">{issue.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">{issue.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <AnimatePresence mode="wait">
            {isAnalyzing ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-96 rounded-2xl glass-panel flex flex-col items-center justify-center p-8 text-center"
              >
                <div className="w-11 h-11 border-3 border-rose-500/30 border-t-rose-500 rounded-full animate-spin mb-4" />
                <p className="font-display font-bold text-white">
                  Synthesizing Refactored Patch...
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="output"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-4 rounded-2xl glass-panel border-emerald-500/30">
                    <p className="text-xs font-mono text-emerald-400">Optimized Score</p>
                    <p className="text-2xl font-display font-bold text-white mt-1">
                      {currentPreset.optimizedScore}/100
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl glass-panel">
                    <p className="text-xs font-mono text-cyan-400">Complexity</p>
                    <p className="text-xs sm:text-sm font-bold text-white mt-1.5">
                      {currentPreset.metrics.complexity}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl glass-panel">
                    <p className="text-xs font-mono text-purple-400">Security</p>
                    <p className="text-xs sm:text-sm font-bold text-white mt-1.5">
                      {currentPreset.metrics.security}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl glass-panel overflow-hidden">
                  <div className="px-4 py-3 bg-gray-950/90 border-b border-white/10 flex items-center justify-between">
                    <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
                      <RiSparkling2Fill /> Refactored Production Code
                    </span>
                    <button
                      onClick={handleCopyOptimized}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-mono text-white"
                    >
                      {copied ? (
                        <>
                          <RiCheckLine className="text-emerald-400" /> Copied
                        </>
                      ) : (
                        <>
                          <RiFileCopyLine /> Copy Patch
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 bg-gray-950/90 text-emerald-300 font-mono text-xs sm:text-sm overflow-x-auto leading-relaxed">
                    <code>{currentPreset.optimizedCode}</code>
                  </pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
