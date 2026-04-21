import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { useTheme } from '../../context/ThemeContext'

const tabs = [
  { label: 'ORIGIN',    to: '/' },
  { label: 'INSECONDS', to: '/inseconds' },
  { label: 'LAB',       to: '/labs' },
  { label: 'BRANDING',  to: '/branding' },
  { label: 'CONTACT',   to: '/contact' },
]

export default function FloatingTabNav() {
  const { pathname } = useLocation()
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  // Floating tabs ONLY on homepage; sub-pages get a Back button instead
  if (pathname !== '/') return null

  return (
    <div
      className="floating-tab-nav"
      style={{
        position:       'fixed',
        bottom:         '2rem',
        right:          '2rem',
        zIndex:         8000,
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'flex-end',
        gap:            '0.35rem',
        pointerEvents:  'none',
      }}
    >
      {/* Decorative vertical label */}
      <div
        style={{
          writingMode:    'vertical-rl',
          transform:      'rotate(180deg)',
          fontFamily:     '"Barlow", sans-serif',
          fontSize:       '8px',
          letterSpacing:  '0.25em',
          textTransform:  'uppercase',
          color:          isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)',
          marginBottom:   '0.5rem',
          alignSelf:      'flex-end',
          textShadow:     isDark ? '0 1px 4px rgba(0,0,0,0.5)' : '0 1px 4px rgba(0,0,0,0.1)',
        }}
      >
        Navigate
      </div>

      {tabs.map((tab) => {
        const isActive = pathname === tab.to

        return (
          <Link
            key={tab.to}
            to={tab.to}
            style={{
              pointerEvents:  'all',
              textDecoration: 'none',
              display:        'flex',
              alignItems:     'center',
              gap:            '8px',
              padding:        '4px 0',
            }}
          >
            {/* "active" italic tag */}
            <AnimatePresence mode="popLayout">
              {isActive && (
                <motion.span
                  key="active-tag"
                  initial={{ opacity: 0, x: 10, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0,  scale: 1  }}
                  exit={{   opacity: 0, x: 10,  scale: 0.8 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontFamily:  '"Barlow", sans-serif',
                    fontSize:    '9px',
                    fontStyle:   'italic',
                    fontWeight:  600,
                    color:       '#f97316',
                    letterSpacing: '0.04em',
                    textShadow: isDark ? '0 0 8px rgba(249,115,22,0.4)' : '0 0 4px rgba(249,115,22,0.2)',
                  }}
                >
                  active
                </motion.span>
              )}
            </AnimatePresence>

            {/* Tab name */}
            <motion.span
              animate={{
                opacity: isActive ? 1 : 0.35,
                scale:   isActive ? 1 : 0.92,
                color:   isActive ? (isDark ? '#ffffff' : 'var(--theme-text)') : (isDark ? 'rgba(255,255,255,0.35)' : 'var(--theme-text-muted)'),
              }}
              transition={{ duration: 0.3 }}
              style={{
                fontFamily:    '"Instrument Serif", serif',
                fontSize:      isActive ? '1rem' : '0.875rem',
                fontStyle:     'italic',
                letterSpacing: '0.06em',
                display:       'block',
                lineHeight:    1,
                textShadow:    isDark ? '0 1px 6px rgba(0,0,0,0.6)' : '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              {tab.label}
            </motion.span>

            {/* Active bar */}
            <AnimatePresence>
              {isActive && (
                <motion.span
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  exit={{   scaleY: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    display:         'block',
                    width:           '2px',
                    height:          '14px',
                    borderRadius:    '2px',
                    background:      'linear-gradient(to bottom, #f97316, #fb923c)',
                    transformOrigin: 'center',
                    flexShrink:      0,
                    boxShadow:       isDark ? '0 0 8px rgba(249,115,22,0.6)' : '0 0 6px rgba(249,115,22,0.4)',
                  }}
                />
              )}
            </AnimatePresence>
          </Link>
        )
      })}
    </div>
  )
}
