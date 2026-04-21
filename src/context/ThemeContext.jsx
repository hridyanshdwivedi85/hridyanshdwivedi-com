import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

/**
 * Dark-mode-only build.
 * useTheme() always returns { theme: 'dark', toggleTheme: noop } so existing
 * `isDark` checks throughout the app keep working without edits.
 */
export function ThemeProvider({ children }) {
  const [splashConfig, setSplashConfig] = useState({ rainbow: true, color: '#c69603' })

  useEffect(() => {
    const root = document.documentElement
    root.classList.add('dark')
    root.classList.remove('light')
    root.setAttribute('data-theme', 'dark')
    try { localStorage.setItem('theme', 'dark') } catch { /* ignore */ }
  }, [])

  const value = { theme: 'dark', toggleTheme: () => {}, splashConfig, setSplashConfig }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
