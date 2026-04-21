import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const CREAM = '#E1E0CC'

const MESSAGES = [
  { text: "Hello Stranger.", sub: "" },
  { text: "Thanks for stopping by.", sub: "(Did your scroll wheel finally give up?)" },
  { text: "Wanna go to my world?", sub: "(That glowing button up there? Yeah, that one.)" }
]

export default function HumorousGreeting({ onAtLastMessage }) {
  const [index, setIndex] = useState(0)
  const [isDone, setIsDone] = useState(false)
  const lastScrollTime = useRef(0)
  const touchStartY = useRef(0)
  const containerRef = useRef(null)
  const [isInView, setIsInView] = useState(true)

  // Notify parent when last message is shown/hidden (for the glow button)
  useEffect(() => {
    if (onAtLastMessage) {
      onAtLastMessage(index === MESSAGES.length - 1)
    }
  }, [index, onAtLastMessage])

  // Track if hero is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )
    if (containerRef.current) {
      observer.observe(containerRef.current)
    }
    return () => observer.disconnect()
  }, [])

  // Dedicated effect for scroll locking to prevent overflow styling flashing
  useEffect(() => {
    if (!isDone && isInView) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isDone, isInView])

  // Scroll & Touch Event Listeners
  useEffect(() => {
    const handleWheel = (e) => {
      if (isDone || !isInView) return
      
      if (e.deltaY < 0 && index === 0) return

      e.preventDefault()

      const now = Date.now()
      if (now - lastScrollTime.current < 900) return

      if (e.deltaY > 15) {
        if (index < MESSAGES.length - 1) {
          setIndex(prev => prev + 1)
          lastScrollTime.current = now
        } else {
          setIsDone(true)
        }
      } else if (e.deltaY < -15) {
        if (index > 0) {
          setIndex(prev => prev - 1)
          lastScrollTime.current = now
        }
      }
    }

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e) => {
      if (isDone || !isInView) return
      
      const deltaY = touchStartY.current - e.touches[0].clientY
      if (deltaY < 0 && index === 0) return

      e.preventDefault()

      const now = Date.now()
      if (now - lastScrollTime.current < 1000) return

      if (Math.abs(deltaY) > 30) {
        if (deltaY > 0) {
          if (index < MESSAGES.length - 1) {
            setIndex(prev => prev + 1)
            lastScrollTime.current = now
          } else {
            setIsDone(true)
          }
        } else {
          if (index > 0) {
            setIndex(prev => prev - 1)
            lastScrollTime.current = now
          }
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('touchstart', handleTouchStart, { passive: false })
    window.addEventListener('touchmove', handleTouchMove, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [index, isDone, isInView])

  // Auto-finish sequence when we reach the last message to allow natural scrolling
  useEffect(() => {
    let timer;
    if (index === MESSAGES.length - 1 && !isDone) {
      timer = setTimeout(() => {
        setIsDone(true)
      }, 1200) // 1.2s delay absorbs any immediate trackpad momentum
    }
    return () => clearTimeout(timer)
  }, [index, isDone])

  return (
    <>
      <style>{`
        .hg-title {
          font-family: 'Almarai', sans-serif !important;
          font-weight: 500 !important;
          line-height: 0.88 !important;
          letter-spacing: -0.05em !important;
          color: ${CREAM} !important;
          font-size: 11vw;
        }
        @media (min-width: 640px)  { .hg-title { font-size: 9.5vw; } }
        @media (min-width: 768px)  { .hg-title { font-size: 8.5vw; } }
        @media (min-width: 1024px) { .hg-title { font-size: 7.8vw; } }
        @media (min-width: 1280px) { .hg-title { font-size: 7.2vw; } }
        @media (min-width: 1536px) { .hg-title { font-size: 6.6vw; } }

        .hg-sub {
          font-family: 'Almarai', sans-serif !important;
          font-weight: 400 !important;
          font-size: 2.8vw;
          line-height: 1.2 !important;
          letter-spacing: 0.04em !important;
          color: rgba(225, 224, 204, 0.45) !important;
          text-transform: none !important;
          font-style: italic;
          display: inline-block;
        }
        @media (min-width: 640px)  { .hg-sub { font-size: 2.2vw; } }
        @media (min-width: 768px)  { .hg-sub { font-size: 1.8vw; } }
        @media (min-width: 1024px) { .hg-sub { font-size: 1.5vw; } }
        @media (min-width: 1280px) { .hg-sub { font-size: 1.3vw; } }
        @media (min-width: 1536px) { .hg-sub { font-size: 1.1vw; } }

        .hg-container {
          display: flex;
          flex-direction: column;
        }

        /* Message 1 (index 1) - Inline bracketed text */
        .hg-container-1 {
          flex-direction: row !important;
          align-items: baseline !important;
          flex-wrap: wrap !important;
          gap: 0.5em !important;
        }
      `}</style>

      <div ref={containerRef} style={{ minHeight: '1.2em', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`hg-container hg-container-${index}`}
          >
            <span className="hg-title">{MESSAGES[index].text}</span>
            {MESSAGES[index].sub && (
              <motion.span
                className="hg-sub"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  marginTop: index === 1 ? '0' : '0.4em',
                }}
              >
                {MESSAGES[index].sub}
              </motion.span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  )
}
