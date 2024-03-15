import { Nunito } from 'next/font/google'
import { MainNavBar } from './components/NavBar'
import type { Metadata } from 'next'
import mainStyles from '@/theme/css/main.module.scss'

import '@/theme/css/global.scss'

const nunito = Nunito({
  subsets: ['latin'],
  display: 'auto',
  variable: '--font-nunito',
  fallback: ['system-ui', 'arial'],
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={nunito.className}>
        <MainNavBar />
        <div className={mainStyles.wrapper}>
          <div className={mainStyles.container}>{children}</div>
        </div>
      </body>
    </html>
  )
}
