import Link from 'next/link'
import { RiCpuLine, RiGithubFill, RiLinkedinBoxFill, RiHeartFill } from 'react-icons/ri'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#04060d] text-gray-400 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-indigo-600 flex items-center justify-center text-white">
                <RiCpuLine />
              </div>
              <span className="font-display font-bold text-white text-lg">
                NexaFlow<span className="text-rose-500">.ai</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 max-w-md leading-relaxed">
              Next-generation multi-page developer platform unifying AST Code Auditing, Agile Sprint Kanban Workflows, and Cloud FinOps Telemetry.
            </p>
          </div>

          <div>
            <h3 className="text-white font-display font-bold text-xs uppercase tracking-wider mb-3">
              Platform Modules
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-rose-400">Platform Overview</Link></li>
              <li><Link href="/studio" className="hover:text-rose-400">AI Code & SQL Studio</Link></li>
              <li><Link href="/kanban" className="hover:text-rose-400">Agile Sprint Kanban</Link></li>
              <li><Link href="/analytics" className="hover:text-rose-400">Cloud FinOps Telemetry</Link></li>
              <li><Link href="/pricing" className="hover:text-rose-400">Enterprise Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-display font-bold text-xs uppercase tracking-wider mb-3">
              Engineered By
            </h3>
            <p className="text-sm text-white font-semibold mb-1">Jeyarajan Thilakraj</p>
            <p className="text-xs text-gray-400 mb-3">
              BSc (Hons) Software Engineering Graduate • Jaffna, Sri Lanka
            </p>
            <div className="flex gap-2.5">
              <a
                href="https://github.com/Thilak-raj-08"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-900 border border-white/10 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors"
              >
                <RiGithubFill />
              </a>
              <a
                href="https://www.linkedin.com/in/jeyarajan-thilakraj-46b510404"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-gray-900 border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
              >
                <RiLinkedinBoxFill />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs">
          <p>© {new Date().getFullYear()} NexaFlow AI • Built by Jeyarajan Thilakraj</p>
          <p className="flex items-center gap-1 mt-2 sm:mt-0">
            Crafted with <RiHeartFill className="text-rose-500" /> using Next.js 16, React 19 & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
