import React, { useRef, useEffect, useCallback } from 'react'
import Galaxy from './Galaxy'

/* Colour palette for particles */
const PALETTE = [
  { r: 249, g: 115, b: 22 },  // orange
  { r: 139, g: 92, b: 246 },  // violet
  { r: 34,  g: 211, b: 238 }, // cyan
  { r: 236, g: 72, b: 153 },  // pink
  { r: 255, g: 255, b: 255 }, // white
  { r: 250, g: 204, b: 21 },  // yellow
]

function makeParticle(W, H) {
  const c = PALETTE[Math.floor(Math.random() * PALETTE.length)]
  return {
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 1.8,
    vy: (Math.random() - 0.5) * 1.8,
    radius: 1 + Math.random() * 2.5,
    r: c.r, g: c.g, b: c.b,
    alpha: 0.6 + Math.random() * 0.4,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.03,
  }
}

export default function EntropyCremaCanvas({ active, fullscreen }) {
  const canvasRef = useRef(null)
  const stateRef = useRef({ particles: [], mouse: { x: -2000, y: -2000 }, W: 0, H: 0 })

  const init = useCallback((canvas) => {
    const W = canvas.width = canvas.offsetWidth
    const H = canvas.height = canvas.offsetHeight
    const count = fullscreen
      ? Math.min(300, Math.floor((W * H) / 4000))
      : window.innerWidth < 768 ? 80 : 180
    const particles = Array.from({ length: count }, () => makeParticle(W, H))
    stateRef.current = { particles, mouse: { x: -2000, y: -2000 }, W, H }
  }, [fullscreen])

  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let rafId

    init(canvas)

    /* ── Draw loop ── */
    const draw = () => {
      const { particles, mouse, W, H } = stateRef.current
      ctx.clearRect(0, 0, W, H)

      /* Subtle vignette */
      const vignette = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.85)
      vignette.addColorStop(0, 'rgba(0,0,0,0)')
      vignette.addColorStop(1, 'rgba(0,0,0,0.45)')
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, W, H)

      const mx = mouse.x, my = mouse.y

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        /* Physics */
        const dxM = mx - p.x, dyM = my - p.y
        const distM = Math.sqrt(dxM * dxM + dyM * dyM)
        if (distM < 350 && distM > 15) {
          p.vx += (dxM / distM) * 0.07
          p.vy += (dyM / distM) * 0.07
        }

        /* Soft repulsion near mouse */
        if (distM < 80) {
          p.vx -= (dxM / distM) * 0.18
          p.vy -= (dyM / distM) * 0.18
        }

        p.vx *= 0.975
        p.vy *= 0.975
        p.vx += (Math.random() - 0.5) * 0.18
        p.vy += (Math.random() - 0.5) * 0.18

        /* Speed cap */
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (spd > 4) { p.vx *= 4 / spd; p.vy *= 4 / spd }

        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) { p.x = 0; p.vx *= -1 }
        if (p.x > W) { p.x = W; p.vx *= -1 }
        if (p.y < 0) { p.y = 0; p.vy *= -1 }
        if (p.y > H) { p.y = H; p.vy *= -1 }

        /* Pulse size */
        p.pulse += p.pulseSpeed
        const r = p.radius + Math.sin(p.pulse) * 0.6

        /* Glow */
        ctx.save()
        ctx.shadowBlur = 10 + Math.sin(p.pulse) * 4
        ctx.shadowColor = `rgba(${p.r},${p.g},${p.b},0.8)`
        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.alpha})`
        ctx.fill()
        ctx.restore()

        /* Connection lines to nearby particles */
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p2.x - p.x, dy = p2.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 110) {
            const str = 1 - dist / 110
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${p.r},${p.g},${p.b},${str * 0.22})`
            ctx.lineWidth = str * 1.2
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }

        /* Line to mouse */
        if (distM < 180) {
          const str = 1 - distM / 180
          ctx.beginPath()
          ctx.strokeStyle = `rgba(${p.r},${p.g},${p.b},${str * 0.55})`
          ctx.lineWidth = str * 1.5
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mx, my)
          ctx.stroke()
        }
      }

      /* Crosshair cursor */
      if (mx > 0 && my > 0 && mx < W && my < H) {
        ctx.save()
        ctx.strokeStyle = 'rgba(255,255,255,0.5)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(mx - 14, my); ctx.lineTo(mx + 14, my)
        ctx.moveTo(mx, my - 14); ctx.lineTo(mx, my + 14)
        ctx.stroke()
        ctx.strokeStyle = 'rgba(255,255,255,0.15)'
        ctx.beginPath()
        ctx.arc(mx, my, 22, 0, Math.PI * 2)
        ctx.stroke()
        /* Inner dot glow */
        ctx.shadowBlur = 12
        ctx.shadowColor = 'rgba(255,255,255,0.8)'
        ctx.fillStyle = 'rgba(255,255,255,0.7)'
        ctx.beginPath()
        ctx.arc(mx, my, 2.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      rafId = requestAnimationFrame(draw)
    }

    draw()

    /* Event helpers */
    const getPos = (canvas, cx, cy) => {
      const rect = canvas.getBoundingClientRect()
      return { x: cx - rect.left, y: cy - rect.top }
    }

    const onMouseMove = (e) => {
      const pos = getPos(canvas, e.clientX, e.clientY)
      stateRef.current.mouse = pos
    }
    const onMouseLeave = () => { stateRef.current.mouse = { x: -2000, y: -2000 } }
    const onTouchMove = (e) => {
      e.preventDefault()
      const t = e.touches[0]
      stateRef.current.mouse = getPos(canvas, t.clientX, t.clientY)
    }
    const onTouchEnd = () => { stateRef.current.mouse = { x: -2000, y: -2000 } }

    /* Click → burst */
    const onClick = (e) => {
      const pos = getPos(canvas, e.clientX, e.clientY)
      const { particles, W, H } = stateRef.current
      /* Spawn 15 burst particles at click */
      for (let k = 0; k < 15; k++) {
        const bp = makeParticle(W, H)
        bp.x = pos.x + (Math.random() - 0.5) * 20
        bp.y = pos.y + (Math.random() - 0.5) * 20
        const angle = Math.random() * Math.PI * 2
        const spd = 2 + Math.random() * 4
        bp.vx = Math.cos(angle) * spd
        bp.vy = Math.sin(angle) * spd
        particles.push(bp)
      }
      /* Cap total */
      while (particles.length > 400) particles.shift()
    }

    const onResize = () => {
      init(canvas)
    }

    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)
    canvas.addEventListener('touchmove', onTouchMove, { passive: false })
    canvas.addEventListener('touchend', onTouchEnd)
    canvas.addEventListener('click', onClick)
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(rafId)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      canvas.removeEventListener('touchmove', onTouchMove)
      canvas.removeEventListener('touchend', onTouchEnd)
      canvas.removeEventListener('click', onClick)
      window.removeEventListener('resize', onResize)
    }
  }, [active, init])

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: '#000',
        overflow: 'hidden',
        cursor: 'none',
      }}
    >
      {/* Galaxy WebGL background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Galaxy
          focal={[0.5, 0.5]}
          rotation={[1.0, 0.0]}
          starSpeed={0.5}
          density={1}
          hueShift={140}
          speed={1.0}
          mouseInteraction={true}
          glowIntensity={0.3}
          saturation={0.0}
          mouseRepulsion={true}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          transparent={false}
        />
      </div>

      {/* Vignette over galaxy for legibility */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 90%)',
        }}
      />

      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 2 }}
      />

      {/* Typography overlay */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          textAlign: 'center',
          pointerEvents: 'none',
          width: '90%',
          maxWidth: '860px',
        }}
      >
        <h1
          style={{
            fontFamily: '"Instrument Serif", serif',
            fontSize: 'clamp(2.5rem, 9vw, 7.5rem)',
            color: 'rgba(229,229,229,0.12)',
            margin: 0,
            letterSpacing: '-3px',
            lineHeight: 1,
            fontWeight: 400,
          }}
        >
          Coding means
        </h1>
        <h2
          style={{
            fontFamily: '"Instrument Serif", serif',
            fontStyle: 'italic',
            fontSize: 'clamp(2.5rem, 9vw, 7.5rem)',
            color: 'rgba(249,115,22,0.18)',
            margin: 0,
            letterSpacing: '-1px',
            lineHeight: 1,
          }}
        >
          creativity.
        </h2>

        <p
          style={{
            fontFamily: '"Barlow", sans-serif',
            fontSize: '11px',
            color: 'rgba(255,255,255,0.2)',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginTop: '28px',
            maxWidth: '400px',
            margin: '28px auto 0',
          }}
        >
          Move your cursor to attract particles · Click to burst
        </p>
      </div>

      {/* Corner hint */}
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          right: 24,
          fontFamily: '"Barlow", monospace',
          fontSize: '10px',
          color: 'rgba(139,92,246,0.5)',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      >
        ENTROPY ENGINE
      </div>
    </div>
  )
}
