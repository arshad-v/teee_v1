import type { Metadata, Viewport } from 'next'
import { Anton, DM_Sans } from 'next/font/google'
import './globals.css'
import { CafeMobileNavigation } from '@/components/cafe-header'

const heading = Anton({ subsets: ['latin'], weight: '400', variable: '--font-heading', display: 'swap' })
const body = DM_Sans({ subsets: ['latin'], variable: '--font-body', display: 'swap' })

export const metadata: Metadata = {
  title: 'Tea Time UAE — Big Bites. Fresh Sips. Good Times.',
  description: 'Your everyday happy place. Discover burgers, fresh juices, signature tea and coffee at Tea Time UAE. Born in Kerala in 1988, loved in Abu Dhabi.',
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#3d271e',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable} light`}>
      <body className="antialiased">
        {children}
        <CafeMobileNavigation />
      </body>
    </html>
  )
}
