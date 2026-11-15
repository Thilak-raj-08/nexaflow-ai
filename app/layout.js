import './globals.css'
import { Inter, Poppins, JetBrains_Mono } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata = {
  title: 'NexaFlow AI | Multi-Page Developer Cloud & Agile SaaS Platform',
  description:
    'AI Code Review Studio, Agile Kanban Sprint Workspace, and Cloud FinOps Telemetry Platform engineered by Jeyarajan Thilakraj.',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} ${jetbrains.variable} dark`}
    >
      <body className="min-h-screen bg-[#060913] text-gray-100 font-sans antialiased flex flex-col relative overflow-x-hidden">
        <div className="pointer-events-none fixed inset-0 bg-grid opacity-80 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_20%,#000_50%,transparent_100%)] z-0" />
        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
