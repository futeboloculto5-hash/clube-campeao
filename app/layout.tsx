import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Saira } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const saira = Saira({
  subsets: ['latin'],
  variable: '--font-saira',
  weight: ['500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Clube Campeão World — Gestão de Futebol',
  description:
    'Assuma a presidência do seu clube: finanças, elenco, transferências e patrocínios em um jogo de gestão de futebol.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0b1324',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${geist.variable} ${saira.variable} bg-background`}>
      <body className="antialiased">
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster
          theme="dark"
          position="top-center"
          toastOptions={{ classNames: { toast: 'cn-toast !font-sans', description: '!text-muted-foreground' } }}
        />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
