import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowLeft } from 'lucide-react'

/**
 * Premium back button — fixed top-left.
 * Use on every non-home page. Routes back to "/" by default.
 */
export default function BackButton({
  to = '/',
  label = 'Home',
  state = null,
  position = { top: '1.25rem', left: '1.25rem' },
  centered = false,
}) {
  const wrapperStyle = centered
    ? {
        position: 'fixed',
        top: '50%',
        left: '1.25rem',
        transform: 'translateY(-50%)',
        zIndex: 9000,
      }
    : {
        position: 'fixed',
        top: position.top,
        left: position.left,
        zIndex: 9000,
      }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={wrapperStyle}
    >
      <Link
        to={to}
        state={state}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 14px 8px 10px',
          borderRadius: 999,
          background: 'rgba(15, 15, 20, 0.65)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          color: 'rgba(255, 255, 255, 0.92)',
          textDecoration: 'none',
          fontFamily: '"Barlow", sans-serif',
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          backdropFilter: 'blur(14px) saturate(140%)',
          WebkitBackdropFilter: 'blur(14px) saturate(140%)',
          boxShadow:
            '0 6px 18px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.06)',
          transition: 'all 0.25s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(249, 115, 22, 0.18)'
          e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.45)'
          e.currentTarget.style.transform = 'translateX(-2px)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(15, 15, 20, 0.65)'
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'
          e.currentTarget.style.transform = 'translateX(0)'
        }}
      >
        <span
          style={{
            width: 22,
            height: 22,
            borderRadius: '50%',
            display: 'grid',
            placeItems: 'center',
            background: 'rgba(249, 115, 22, 0.18)',
            border: '1px solid rgba(249, 115, 22, 0.35)',
          }}
        >
          <ArrowLeft size={12} strokeWidth={2.5} color="#f97316" />
        </span>
        {label}
      </Link>
    </motion.div>
  )
}
