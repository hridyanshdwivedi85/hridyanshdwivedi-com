/**
 * Lightweight ambient background — three slow-floating colored orbs + soft grain.
 * Uses CSS @keyframes (not JS animation) so blurred divs never trigger per-frame
 * blur recalculation — keeps scroll/animation performance smooth.
 * Mobile: reduced blur + no animation to preserve GPU performance.
 */
import { useState, useEffect } from 'react'

export default function AmbientBackground({ variant = 'default' }) {
  const palettes = {
    default: ['rgba(249,115,22,0.18)', 'rgba(139,92,246,0.14)', 'rgba(34,211,238,0.10)'],
    warm:    ['rgba(249,115,22,0.22)', 'rgba(251,191,36,0.16)', 'rgba(236,72,153,0.10)'],
    cool:    ['rgba(96,165,250,0.18)', 'rgba(139,92,246,0.16)', 'rgba(34,211,238,0.12)'],
    brand:   ['rgba(124,58,237,0.18)', 'rgba(239,68,68,0.10)',  'rgba(245,158,11,0.10)'],
  }
  const colors = palettes[variant] || palettes.default
  const id = variant

  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // On mobile, render a single simplified static gradient instead
  if (isMobile) {
    return (
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-10%', left: '-5%',
            width: '60%', height: '60%',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${colors[0]} 0%, transparent 65%)`,
            filter: 'blur(50px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-10%', right: '-5%',
            width: '50%', height: '50%',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${colors[1]} 0%, transparent 65%)`,
            filter: 'blur(50px)',
          }}
        />
      </div>
    )
  }

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <style>{`
        @keyframes amb-orb1-${id} {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(60px,-40px) scale(1.15); }
          66%      { transform: translate(-40px,30px) scale(0.95); }
        }
        @keyframes amb-orb2-${id} {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(-50px,40px) scale(0.9); }
          66%      { transform: translate(30px,-20px) scale(1.1); }
        }
        @keyframes amb-orb3-${id} {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(80px,-60px) scale(1.2); }
          66%      { transform: translate(-30px,50px) scale(0.85); }
        }
      `}</style>

      {/* Orb 1 — top-left */}
      <div
        style={{
          position: 'absolute',
          top: '-15%', left: '-10%',
          width: '55%', height: '55%',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors[0]} 0%, transparent 65%)`,
          filter: 'blur(80px)',
          willChange: 'transform',
          animation: `amb-orb1-${id} 22s ease-in-out infinite`,
        }}
      />

      {/* Orb 2 — bottom-right */}
      <div
        style={{
          position: 'absolute',
          bottom: '-15%', right: '-10%',
          width: '50%', height: '50%',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors[1]} 0%, transparent 65%)`,
          filter: 'blur(90px)',
          willChange: 'transform',
          animation: `amb-orb2-${id} 28s ease-in-out infinite 2s`,
        }}
      />

      {/* Orb 3 — center, smaller */}
      <div
        style={{
          position: 'absolute',
          top: '40%', left: '40%',
          width: '35%', height: '35%',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${colors[2]} 0%, transparent 65%)`,
          filter: 'blur(70px)',
          willChange: 'transform',
          animation: `amb-orb3-${id} 18s ease-in-out infinite 5s`,
        }}
      />

      {/* Subtle grain overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.4,
          mixBlendMode: 'overlay',
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: '160px 160px',
        }}
      />
    </div>
  )
}
