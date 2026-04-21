import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../../context/ThemeContext'

export default function CustomCursor() {
  const { theme } = useTheme()
  const dotRef   = useRef(null)
  const ringRef  = useRef(null)
  const pos      = useRef({ x: -200, y: -200 })
  const ringPos  = useRef({ x: -200, y: -200 })
  const rafRef   = useRef(null)
  const visibleRef = useRef(false)
  const [visible,  setVisible]  = useState(false)
  const [clicking, setClicking] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    /* Detect touch-only devices */
    if (window.matchMedia('(hover: none)').matches) return

    document.documentElement.classList.add('custom-cursor-active')

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (!visibleRef.current) {
        visibleRef.current = true
        setVisible(true)
      }
    }
    const onLeave  = () => { visibleRef.current = false; setVisible(false) }
    const onEnter  = () => { visibleRef.current = true; setVisible(true) }
    const onDown   = () => setClicking(true)
    const onUp     = () => setClicking(false)

    // Using mouseover (which bubbles) instead of expensive mousemove elementFromPoint
    const onMouseOver = (e) => {
      const el = e.target
      if (!el) return
      const closest = el.closest ? el.closest('a, button, input, select, [role="button"], .cursor-pointer') : null
      if (closest) {
        setHovering(true)
        return
      }
      // Fallback for custom components that set cursor pointer dynamically via inline styles
      try {
        const computed = window.getComputedStyle(el).cursor
        setHovering(computed === 'pointer' || computed === 'grab')
      } catch (err) {
        setHovering(false)
      }
    }

    document.addEventListener('mousemove',  onMove,     { passive: true })
    document.addEventListener('mouseover',  onMouseOver, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mousedown',  onDown)
    document.addEventListener('mouseup',    onUp)

    const lerp = (a, b, t) => a + (b - a) * t

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate)
      if (!dotRef.current || !ringRef.current) return

      const { x, y } = pos.current

      /* Dot follows instantly */
      dotRef.current.style.transform   = `translate(${x}px,${y}px)`

      /* Ring follows with smooth lag */
      ringPos.current.x = lerp(ringPos.current.x, x, 0.14)
      ringPos.current.y = lerp(ringPos.current.y, y, 0.14)
      ringRef.current.style.transform  = `translate(${ringPos.current.x}px,${ringPos.current.y}px)`
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      document.documentElement.classList.remove('custom-cursor-active')
      document.removeEventListener('mousemove',  onMove)
      document.removeEventListener('mouseover',  onMouseOver)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mousedown',  onDown)
      document.removeEventListener('mouseup',    onUp)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  const dotSize  = clicking ? 4  : 6
  const ringSize = hovering ? 44 : clicking ? 24 : 32
  const ringOff  = ringSize / 2

  // Light pages get a dark cursor; dark pages get the white+difference blend
  const isLight = theme === 'light'
  const dotColor   = isLight ? '#111111' : '#ffffff'
  const ringColor  = isLight
    ? (hovering ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.50)')
    : (hovering ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.55)')
  const blendMode  = isLight ? 'normal' : 'difference'

  return (
    <div
      aria-hidden
      style={{
        position:      'fixed',
        inset:         0,
        pointerEvents: 'none',
        zIndex:        99999,
        overflow:      'hidden',
      }}
    >
      {/* Sharp centre dot */}
      <span
        ref={dotRef}
        style={{
          position:     'absolute',
          top:          -(dotSize / 2),
          left:         -(dotSize / 2),
          width:        dotSize,
          height:       dotSize,
          borderRadius: '50%',
          background:   dotColor,
          mixBlendMode: blendMode,
          opacity:      visible ? 1 : 0,
          transition:   'opacity .2s, width .18s, height .18s, top .18s, left .18s, background .2s',
          willChange:   'transform',
        }}
      />

      {/* Lagging ring */}
      <span
        ref={ringRef}
        style={{
          position:     'absolute',
          top:          -ringOff,
          left:         -ringOff,
          width:        ringSize,
          height:       ringSize,
          borderRadius: '50%',
          border:       `1.5px solid ${ringColor}`,
          mixBlendMode: blendMode,
          opacity:      visible ? 1 : 0,
          transition:   'opacity .25s, width .25s, height .25s, top .25s, left .25s, border-color .2s',
          willChange:   'transform',
          background:   clicking ? (isLight ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.08)') : 'transparent',
        }}
      />
    </div>
  )
}
