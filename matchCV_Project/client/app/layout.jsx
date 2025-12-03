'use client'
'use client'
import { ThemeProvider } from '@/contexts/ThemeContext'
import '../src/index.css'
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

