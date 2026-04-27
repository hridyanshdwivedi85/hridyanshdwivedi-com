import { useRef, useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Volume2, VolumeX, Play, Pause } from 'lucide-react'
import BackButton from '../components/ui/BackButton'

/* ─── Brand ─── */
const RED   = '#EE3F2C'
const RED_D = '#c8331f'

/* Clip-path: diagonal cut top-right + bottom-left */
const CLIP = 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
const CLIP_SM = 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'

const STATS = [
  { k: '50,000+', l: 'Leads Handled' },
  { k: '12',      l: 'Power Features' },
  { k: '0',       l: 'Third-party APIs' },
  { k: '∞',       l: 'Gmail Accounts' },
]

const FEATURES = [
  { icon: '📨', title: 'Bulk Email Sending',      body: 'Fire off up to 3,000 personalised emails in one click, straight from Gmail — no API, no middleman.',                                          tag: 'CORE' },
  { icon: '⚡', title: 'Multi-Tab Batch Sending', body: 'Hook up 10 Gmail IDs across tabs and send in parallel — 10 accounts × 300 emails = 3,000 in a single run.',                               tag: 'SPEED' },
  { icon: '📝', title: 'Email Templates',         body: 'Save 50+ ready-to-go bodies and subject lines, organised into folders so you reuse your best openers in 2 clicks.',                       tag: 'LIBRARY' },
  { icon: '🔄', title: 'Template Rotation',       body: 'Flip between 5 template variants sequentially or randomly so Gmail sees fresh copy every time — no spam flags.',                          tag: 'SMART' },
  { icon: '👥', title: 'Merge Tags & Spintax',    body: 'Drop in {name}, {company}, {job_title} and {hi|hey|hello} — each email reads 1-to-1, even when you send 500 at once.',                   tag: 'PERSONAL' },
  { icon: '↩️', title: 'Follow-up Automation',    body: 'Set it once and it auto-replies on day 3, 7 and 14 under any Gmail label — roughly 3× more replies with zero manual work.',               tag: 'AUTOPILOT' },
  { icon: '📥', title: 'Recipient Management',    body: 'Paste or upload a 10,000-row .csv — health-check, de-dup and invalid-email removal runs in under 5 seconds.',                             tag: 'CLEAN' },
  { icon: '👁',  title: 'Draft Preview',           body: 'See exactly what the recipient sees before hitting send, or drop 5 sample drafts into Gmail Drafts for a final sanity check.',            tag: 'PREVIEW' },
  { icon: '🧪', title: 'A/B Testing',             body: 'Run 2 versions side-by-side across 500 recipients — we split 50/50 so you know which subject line actually wins.',                       tag: 'EXPERIMENT' },
  { icon: '🐢', title: 'Smart Throttle',          body: 'Cap at 10, 30 or 60 sends/hour per account so Gmail stays calm. Auto-pauses at the limit, auto-resumes when the window resets.',          tag: 'SAFE' },
  { icon: '✍️', title: 'Sign-Off Library',        body: 'Ship with 12 pro sign-offs (SEO, Agency, SaaS, Recruiting…) or write your own — auto-appended to every message.',                          tag: 'POLISH' },
  { icon: '🔗', title: 'One-Click Unsubscribe',   body: 'Drop {unsubscribe_link} anywhere in your template and every sent email gets a compliant mailto opt-out — CAN-SPAM happy.',                tag: 'COMPLIANT' },
]

const SLIDER_1 = [
  {
    src:   '/assets/images/tool1.png',
    alt:   'InSeconds Ultra campaign sidebar',
    label: 'Campaign Sidebar',
    note:  'The control panel that lives inside your Gmail tab.',
  },
]

const WHATSAPP_TRIAL = 'https://wa.me/916393973524?text=' + encodeURIComponent(
  "Hi Hridyansh! I'd like to try InSeconds Ultra — please activate my 3-day free trial."
)

const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260227_042027_c4b2f2ea-1c7c-4d6e-9e3d-81a78063703f.mp4'

/* ─── Reusable clipped button ─── */
function ClipBtn({ href, download, target, rel, onClick, children, variant = 'red', style: extraStyle = {} }) {
  const [hov, setHov] = useState(false)
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 10,
    padding: '13px 26px',
    clipPath: CLIP,
    fontFamily: '"Rubik", sans-serif', fontSize: 14, fontWeight: 700,
    letterSpacing: '0.04em', textTransform: 'uppercase',
    textDecoration: 'none', cursor: 'pointer', border: 'none',
    transition: 'all 0.25s ease',
    ...extraStyle,
  }
  const styles = {
    red:   { background: hov ? RED_D : RED,       color: '#fff' },
    white: { background: hov ? 'rgba(255,255,255,0.9)' : '#fff', color: '#000' },
    ghost: { background: 'transparent', color: '#fff', outline: `1.5px solid rgba(255,255,255,0.35)`, outlineOffset: '-1.5px' },
  }

  const Tag = href ? 'a' : 'button'
  return (
    <Tag
      href={href}
      download={download}
      target={target}
      rel={rel}
      onClick={onClick}
      style={{ ...base, ...styles[variant] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {children}
    </Tag>
  )
}

/* ─── Screenshot Slider ─── */
function Slider({ slides }) {
  const [idx, setIdx] = useState(0)
  const [hover, setHover] = useState(false)
  const total = slides.length
  const border = 'rgba(255,255,255,0.10)'
  const muted  = 'rgba(255,255,255,0.50)'
  const slide  = slides[idx]

  useEffect(() => {
    if (total < 2 || hover) return
    const t = setInterval(() => setIdx((i) => (i + 1) % total), 5500)
    return () => clearInterval(t)
  }, [total, hover])

  return (
    <div
      style={{ width: '100%', position: 'relative' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={{ position: 'relative', padding: '8px', perspective: '1400px' }}>
        {/* Ambient glow */}
        <div aria-hidden style={{
          position: 'absolute', inset: '-30px',
          background: `radial-gradient(closest-side at 30% 20%, ${RED}55, transparent 60%),
                       radial-gradient(closest-side at 75% 85%, ${RED}33, transparent 60%)`,
          filter: 'blur(40px)', opacity: hover ? 0.9 : 0.55,
          transition: 'opacity 0.6s ease', pointerEvents: 'none', zIndex: 0,
        }} />

        <motion.div
          animate={{ rotateX: hover ? -1 : 0, rotateY: hover ? 1 : 0, y: hover ? -4 : 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          style={{
            position: 'relative', zIndex: 1,
            borderRadius: 4, overflow: 'hidden',
            background: 'linear-gradient(180deg, #111, #080808)',
            border: `1px solid ${border}`,
            boxShadow: `0 50px 100px rgba(0,0,0,0.7), 0 0 0 1px ${RED}22, inset 0 1px 0 rgba(255,255,255,0.05)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Browser bar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '12px 16px',
            background: 'rgba(255,255,255,0.025)',
            borderBottom: `1px solid ${border}`,
          }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {['#ff5f57','#febc2e','#28c840'].map(c => (
                <span key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
              ))}
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '4px 14px', borderRadius: 999,
                background: 'rgba(255,255,255,0.05)', border: `1px solid ${border}`,
                fontFamily: '"Fira Code",monospace', fontSize: 10.5, color: muted,
                letterSpacing: '0.06em', maxWidth: '70%', overflow: 'hidden',
                textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: RED, boxShadow: `0 0 8px ${RED}` }} />
                chrome-extension://inseconds-ultra/dashboard
              </div>
            </div>
            <span style={{ fontFamily: '"Fira Code",monospace', fontSize: 10, color: muted }}>
              {String(idx + 1).padStart(2,'0')} / {String(total).padStart(2,'0')}
            </span>
          </div>

          {/* Image */}
          <div style={{
            position: 'relative', width: '100%', aspectRatio: '16 / 10',
            background: `radial-gradient(ellipse at 50% 30%, ${RED}18, transparent 65%), #060606`,
            display: 'grid', placeItems: 'center', overflow: 'hidden',
            padding: 'clamp(20px, 3.5vw, 44px)',
          }}>
            <div aria-hidden style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
              maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            }} />
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 18, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.99 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%', display: 'grid', placeItems: 'center' }}
              >
                {slide.src ? (
                  <div style={{ position: 'relative', maxWidth: '100%', maxHeight: '100%' }}>
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      onError={(e) => { e.currentTarget.style.display = 'none' }}
                      style={{
                        display: 'block', maxWidth: '100%', maxHeight: '100%',
                        width: 'auto', height: 'auto', objectFit: 'contain', borderRadius: 8,
                        filter: 'contrast(1.04) saturate(1.06) brightness(1.02)',
                        boxShadow: `0 30px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06), 0 0 30px ${RED}33`,
                      }}
                    />
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, color: muted }}>
                    <div style={{
                      width: 64, height: 64, borderRadius: 4,
                      border: `1.5px dashed ${RED}66`,
                      display: 'grid', placeItems: 'center',
                      fontFamily: '"Rubik",sans-serif', fontSize: 28, color: RED,
                    }}>+</div>
                    <div style={{ fontFamily: '"Fira Code",monospace', fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase' }}>Image coming soon</div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 16,
            padding: '16px 18px',
            borderTop: `1px solid ${border}`,
            background: 'rgba(255,255,255,0.02)',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}>
              <div style={{ fontFamily: '"Fira Code",monospace', fontSize: 9, color: RED, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4 }}>
                Frame {String(idx + 1).padStart(2,'0')}
              </div>
              <span style={{ fontFamily: '"Rubik",sans-serif', fontSize: '1rem', color: '#fff', fontWeight: 500 }}>{slide.label}</span>
              <span style={{ fontFamily: '"Rubik",sans-serif', fontSize: 12, color: muted, marginTop: 3 }}>{slide.note}</span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {slides.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  style={{
                    width: 44, height: 32, borderRadius: 3, padding: 0,
                    border: i === idx ? `1.5px solid ${RED}` : `1px solid ${border}`,
                    background: '#0a0a0a', overflow: 'hidden', cursor: 'pointer',
                    boxShadow: i === idx ? `0 0 0 3px ${RED}22, 0 4px 10px ${RED}33` : 'none',
                    transition: 'all 0.25s ease', display: 'grid', placeItems: 'center',
                    opacity: i === idx ? 1 : 0.5,
                  }}
                >
                  {s.src ? (
                    <img src={s.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  ) : (
                    <span style={{ color: muted, fontSize: 14 }}>+</span>
                  )}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                onClick={() => setIdx((i) => (i - 1 + total) % total)}
                style={{
                  width: 36, height: 36, background: 'transparent', border: `1px solid ${border}`,
                  color: '#fff', cursor: 'pointer', display: 'grid', placeItems: 'center',
                  fontSize: 18, clipPath: CLIP_SM, transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = RED; e.currentTarget.style.color = RED }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = border; e.currentTarget.style.color = '#fff' }}
              >‹</button>
              <button
                onClick={() => setIdx((i) => (i + 1) % total)}
                style={{
                  width: 36, height: 36, background: RED, border: 'none',
                  color: '#fff', cursor: 'pointer', display: 'grid', placeItems: 'center',
                  fontSize: 18, clipPath: CLIP_SM,
                  boxShadow: `0 6px 18px ${RED}55`,
                }}
              >›</button>
            </div>
          </div>
        </motion.div>

        {/* Floor glow */}
        <div aria-hidden style={{
          position: 'absolute', left: '8%', right: '8%', bottom: '-18px', height: '30px',
          background: `radial-gradient(ellipse at center, ${RED}55, transparent 70%)`,
          filter: 'blur(20px)', opacity: hover ? 0.7 : 0.4, transition: 'opacity 0.5s ease', zIndex: 0,
        }} />
      </div>
    </div>
  )
}

/* ─── Feature card ─── */
function FeatureCard({ f, i }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 50, y: 50 })
  const [hov, setHov] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
      onMouseMove={(e) => {
        if (!ref.current) return
        const r = ref.current.getBoundingClientRect()
        setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: 'relative', padding: '1.5px',
        background: hov
          ? `radial-gradient(180px circle at ${pos.x}% ${pos.y}%, ${RED}cc, ${RED}33 35%, rgba(255,255,255,0.08) 70%)`
          : `linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))`,
        clipPath: CLIP_SM,
        transition: 'background 0.3s ease',
      }}
    >
      <div style={{
        position: 'relative', overflow: 'hidden', padding: 18,
        background: hov
          ? 'linear-gradient(160deg, rgba(18,12,10,0.98), rgba(10,6,5,0.99))'
          : 'linear-gradient(160deg, rgba(14,14,16,0.97), rgba(8,8,10,0.97))',
        backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
        height: '100%', transition: 'background 0.3s ease',
      }}>
        {/* Spotlight */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(380px circle at ${pos.x}% ${pos.y}%, ${RED}18, transparent 50%)`,
          pointerEvents: 'none', transition: 'background 0.15s ease',
        }} />
        {/* Top hairline */}
        <div aria-hidden style={{
          position: 'absolute', top: 0, left: 20, right: 20, height: 1,
          background: `linear-gradient(90deg, transparent, ${RED}88, transparent)`,
          opacity: hov ? 1 : 0, transition: 'opacity 0.3s',
        }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, position: 'relative', zIndex: 1 }}>
          <div style={{
            width: 36, height: 36,
            display: 'grid', placeItems: 'center', fontSize: 18,
            background: `linear-gradient(135deg, ${RED}33, ${RED}11)`,
            border: `1px solid ${RED}55`,
            clipPath: CLIP_SM,
          }}>{f.icon}</div>
          <span style={{
            fontFamily: '"Rubik",sans-serif', fontSize: 7.5, letterSpacing: '0.16em',
            color: RED, textTransform: 'uppercase', fontWeight: 700,
            padding: '3px 8px', border: `1px solid ${RED}44`,
            background: `${RED}10`, clipPath: CLIP_SM,
          }}>{f.tag}</span>
        </div>

        <div style={{ fontFamily: '"Fira Code",monospace', fontSize: 7.5, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.2em', marginBottom: 6, position: 'relative', zIndex: 1 }}>
          / {String(i + 1).padStart(2,'0')}
        </div>
        <h3 style={{ fontFamily: '"Rubik",sans-serif', fontSize: '0.95rem', lineHeight: 1.2, margin: '0 0 8px', fontWeight: 600, color: '#fff', position: 'relative', zIndex: 1 }}>
          {f.title}
        </h3>
        <p style={{ fontFamily: '"Rubik",sans-serif', fontSize: 12, lineHeight: 1.55, margin: 0, color: 'rgba(255,255,255,0.48)', position: 'relative', zIndex: 1 }}>
          {f.body}
        </p>
      </div>
    </motion.div>
  )
}

/* ─── Animated price counter (easeOutCubic) ─── */
function PriceCounter({ to = 800, duration = 1500 }) {
  const ref = useRef(null)
  const [val, setVal] = useState(0)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    let done = false
    let raf
    const run = () => {
      if (done) return
      done = true
      const start = performance.now()
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - t, 3)
        setVal(Math.round(eased * to))
        if (t < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) run() })
    }, { threshold: 0.1 })
    io.observe(node)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [to, duration])

  return <span ref={ref}>{val.toLocaleString('en-IN')}</span>
}

/* ─── Animated checkmark item for the features list ─── */
function CheckItem({ label, i, highlight }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, delay: 0.08 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        fontFamily: '"Rubik",sans-serif', fontSize: 13.5, fontWeight: 500,
        color: highlight ? '#fff' : 'rgba(255,255,255,0.72)',
        padding: '6px 0',
        borderBottom: '1px dashed rgba(255,255,255,0.05)',
      }}
    >
      <motion.span
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.4, delay: 0.1 + i * 0.05, type: 'spring', stiffness: 220, damping: 16 }}
        style={{
          width: 18, height: 18, flexShrink: 0,
          background: `${RED}22`, border: `1px solid ${RED}66`, color: RED,
          display: 'grid', placeItems: 'center', fontSize: 10, fontWeight: 800,
          clipPath: CLIP_SM,
        }}
      >✓</motion.span>
      {label}
    </motion.li>
  )
}

import { useTheme } from '../context/ThemeContext'

export default function InSecondsPage() {
  const { setSplashConfig } = useTheme()
  const [isMobile, setIsMobile] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showLoading, setShowLoading] = useState(true)
  const [loadProgress, setLoadProgress] = useState(0)
  const audioRef = useRef(null)
  const videoRef = useRef(null)

  /* Set splash cursor to red for InSeconds experience */
  useEffect(() => {
    setSplashConfig({ rainbow: false, color: '#EE3F2C' })
    return () => setSplashConfig({ rainbow: true, color: '#c69603' })
  }, [setSplashConfig])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  /* ── Loading screen countdown + progress ── */
  useEffect(() => {
    const duration = 5000
    const start = performance.now()
    let raf
    let lastUpdate = 0
    const tick = (now) => {
      const elapsed = now - start
      // Throttle state updates to ~30fps
      if (now - lastUpdate > 33) {
        lastUpdate = now
        const progress = Math.min(100, (elapsed / duration) * 100)
        setLoadProgress(progress)
      }
      if (elapsed < duration) {
        raf = requestAnimationFrame(tick)
      } else {
        setLoadProgress(100)
        setShowLoading(false)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Auto-play music and video after loading finishes
  useEffect(() => {
    if (!showLoading) {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(e => {
            console.error("Audio autoplay blocked:", e)
            setIsPlaying(false)
          })
      }
      if (videoRef.current) {
        videoRef.current.muted = true
        videoRef.current.play().catch(e => {
          console.error("Video autoplay blocked:", e)
        })
      }
    }
  }, [showLoading])


  const toggleAudio = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(e => console.error("Audio play failed:", e))
    }
    setIsPlaying(!isPlaying)
  }

  /* ═══════════ LOADING SCREEN ═══════════ */
  if (showLoading) {
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#000', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
        fontFamily: '"Rubik", sans-serif',
      }}>
        <style>{`
          @keyframes is-speed-line {
            0% { transform: translateX(-100%) scaleX(0.3); opacity: 0; }
            30% { opacity: 1; }
            100% { transform: translateX(200vw) scaleX(1); opacity: 0; }
          }
          @keyframes is-pulse-glow {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.8; }
          }
          @keyframes is-rpm-sweep {
            0% { transform: rotate(-130deg); }
            60% { transform: rotate(40deg); }
            80% { transform: rotate(20deg); }
            100% { transform: rotate(50deg); }
          }
          @keyframes is-shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-1px); }
            75% { transform: translateX(1px); }
          }
          @keyframes is-grid-scroll {
            0% { transform: perspective(400px) rotateX(45deg) translateY(0); }
            100% { transform: perspective(400px) rotateX(45deg) translateY(40px); }
          }
        `}</style>

        {/* ── Background racing grid ── */}
        <div style={{
          position: 'absolute', bottom: 0, left: '-20%', right: '-20%', height: '50%',
          backgroundImage: `linear-gradient(rgba(238,63,44,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(238,63,44,0.06) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          animation: 'is-grid-scroll 2s linear infinite',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent 80%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent 80%)',
          pointerEvents: 'none',
        }} />

        {/* ── Speed lines ── */}
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: `${12 + i * 10}%`,
            left: 0, width: `${80 + Math.random() * 120}px`, height: '2px',
            background: `linear-gradient(90deg, transparent, ${RED}${i % 2 === 0 ? 'cc' : '66'}, transparent)`,
            animation: `is-speed-line ${1.2 + Math.random() * 1.5}s ${i * 0.25}s ease-in-out infinite`,
            pointerEvents: 'none',
          }} />
        ))}

        {/* ── Red ambient glow ── */}
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          width: '60%', height: '60%',
          background: `radial-gradient(ellipse at center, ${RED}15, transparent 60%)`,
          filter: 'blur(80px)', animation: 'is-pulse-glow 3s ease-in-out infinite',
          pointerEvents: 'none',
        }} />

        {/* ── RPM Gauge ── */}
        <div style={{
          position: 'relative', width: 140, height: 140,
          marginBottom: 40,
        }}>
          {/* Gauge outer ring */}
          <svg viewBox="0 0 140 140" style={{ position: 'absolute', inset: 0 }}>
            <circle cx="70" cy="70" r="62" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
            <motion.circle 
              cx="70" cy="70" r="62" fill="none" stroke={RED} strokeWidth="3"
              animate={{ strokeDasharray: `${loadProgress * 3.9} 390` }}
              transition={{ type: 'spring', stiffness: 50, damping: 20 }}
              strokeLinecap="round" transform="rotate(-90 70 70)"
              style={{ filter: `drop-shadow(0 0 8px ${RED})` }}
            />
          </svg>
          {/* Needle */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 2, height: 44,
            background: `linear-gradient(to top, ${RED}, #fff)`,
            transformOrigin: 'bottom center',
            animation: 'is-rpm-sweep 5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            borderRadius: 1,
            boxShadow: `0 0 10px ${RED}`,
            marginLeft: -1, marginTop: -44,
          }} />
          {/* Center dot */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 10, height: 10, borderRadius: '50%',
            background: RED, transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 16px ${RED}`,
          }} />
          {/* RPM text */}
          <div style={{
            position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)',
            fontFamily: '"Rubik", sans-serif', fontSize: 8, fontWeight: 700,
            color: 'rgba(255,255,255,0.3)', letterSpacing: '0.3em', textTransform: 'uppercase',
          }}>RPM × 1000</div>
        </div>

        {/* ── Brand ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ textAlign: 'center', animation: 'is-shake 0.15s infinite', zIndex: 1 }}
        >
          <h1 style={{
            fontFamily: '"Rubik", sans-serif', fontWeight: 900, fontStyle: 'italic',
            fontSize: isMobile ? '2.8rem' : '4.5rem',
            lineHeight: 0.85, letterSpacing: '-0.06em', margin: '0 0 16px',
          }}>
            <span style={{ color: '#fff' }}>In</span>
            <span style={{ color: RED }}>Seconds</span>
            <span style={{ color: RED, textShadow: `0 0 24px ${RED}88` }}>.</span>
          </h1>
        </motion.div>

        {/* ── Progress bar ── */}
        <div style={{
          width: 'min(320px, 80%)', height: 4, marginTop: 28,
          background: 'rgba(255,255,255,0.06)',
          clipPath: CLIP_SM, overflow: 'hidden', position: 'relative',
        }}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${loadProgress}%` }}
            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            style={{
              height: '100%',
              background: `linear-gradient(90deg, ${RED}, #ff6b5a)`,
              boxShadow: `0 0 16px ${RED}88`,
            }} 
          />
        </div>

        {/* ── Status text ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{
            marginTop: 20, textAlign: 'center',
            fontFamily: '"Rubik", sans-serif', fontSize: 10,
            color: 'rgba(255,255,255,0.35)', letterSpacing: '0.25em',
            textTransform: 'uppercase', fontWeight: 600,
          }}
        >
          {loadProgress < 30 ? 'Igniting engine...' : loadProgress < 60 ? 'Revving up...' : loadProgress < 90 ? 'Hitting redline...' : 'Launching...'}
        </motion.div>

        {/* ── Headphone advisory ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            marginTop: 32, padding: '10px 20px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            clipPath: CLIP_SM,
          }}
        >
          {/* Headphone icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={RED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
          </svg>
          <span style={{
            fontFamily: '"Rubik", sans-serif', fontSize: 11, fontWeight: 600,
            color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase',
          }}>
            Connect headphones for the best experience
          </span>
        </motion.div>

        {/* ── Corner racing stripes decoration ── */}
        <div style={{
          position: 'absolute', top: 0, right: 0, width: 120, height: 120,
          background: `repeating-linear-gradient(-45deg, ${RED}12 0 6px, transparent 6px 18px)`,
          maskImage: 'linear-gradient(135deg, black 20%, transparent 70%)',
          WebkitMaskImage: 'linear-gradient(135deg, black 20%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, width: 120, height: 120,
          background: `repeating-linear-gradient(45deg, ${RED}12 0 6px, transparent 6px 18px)`,
          maskImage: 'linear-gradient(-45deg, black 20%, transparent 70%)',
          WebkitMaskImage: 'linear-gradient(-45deg, black 20%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Removed redundant audio element during loading */}

      </div>
    )
  }

  return (
    <main style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', position: 'relative', overflow: 'hidden', fontFamily: '"Rubik", sans-serif' }}>
      <style>{`

        .is-feature-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        .is-pricing-grid { display: grid; grid-template-columns: 1fr 1.3fr; gap: 40px; align-items: stretch; }
        @media (max-width: 1100px) {
          .is-feature-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 900px) {
          .is-feature-grid { grid-template-columns: 1fr 1fr !important; }
          .is-pricing-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .is-feature-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .is-feature-grid > * { content-visibility: auto; contain-intrinsic-size: 220px; }
        }
      `}</style>

      <BackButton label="Home" />

      {/* ── Page Wide Background Grid & Glow ── */}
      <div aria-hidden style={{
        fixed: 'absolute', top: 0, left: 0, right: 0, height: '100%',
        backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
        maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
        pointerEvents: 'none', zIndex: 0
      }} />
      <div aria-hidden style={{ position: 'fixed', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '80vw', height: '80vh', background: `radial-gradient(ellipse, rgba(238,63,44,0.06), transparent 70%)`, pointerEvents: 'none', zIndex: 0 }} />

      {/* ── Audio Background ── */}
      <audio ref={audioRef} src="/tokyo-drift.mp3" loop />
      
      {/* ── Play / Volume Toggle ── */}
      <div style={{ position: 'fixed', top: 24, right: 24, zIndex: 100 }}>
        <button
          onClick={toggleAudio}
          style={{
            background: isPlaying ? RED : 'rgba(255,255,255,0.05)',
            border: isPlaying ? 'none' : '1px solid rgba(255,255,255,0.14)',
            color: '#fff',
            width: 100, height: 48,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            cursor: 'pointer',
            clipPath: CLIP_SM,
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: isPlaying ? `0 0 20px ${RED}88` : 'none',
            padding: '0 16px',
            fontFamily: '"Rubik", sans-serif',
            fontSize: 12,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          {isPlaying ? (
            <>
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <Volume2 size={18} />
              </motion.div>
              <span>Sound</span>
            </>
          ) : (
            <>
              <Play size={18} fill="currentColor" />
              <span>Play</span>
            </>
          )}
        </button>
      </div>


      {/* ══════════════════════════════════════════
          HERO — video background, left-aligned
      ══════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden' }}>
        {/* Video BG */}
        <video
          ref={videoRef}
          autoPlay muted loop playsInline
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', opacity: 1, zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>

        {/* Very subtle noise/grain overlay — keeps text readable */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to right, rgba(0,0,0,0.72) 55%, rgba(0,0,0,0.18) 100%)',
        }} />

        {/* Red accent bleed at bottom */}
        <div aria-hidden style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%', zIndex: 1,
          background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, padding: isMobile ? '100px 24px 40px' : '110px 64px 48px', maxWidth: 1400, width: '100%' }}>
          


          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 14px', marginBottom: 24,
              background: `${RED}22`, border: `1px solid ${RED}66`,
              clipPath: CLIP_SM,
              fontFamily: '"Rubik",sans-serif', fontSize: 10, letterSpacing: '0.2em',
              color: RED, textTransform: 'uppercase', fontWeight: 700,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: RED, boxShadow: `0 0 10px ${RED}` }} />
            Chrome Extension · v5.0
          </motion.div>

          {/* ── Stylised brand wordmark ── */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'relative',
              fontFamily: '"Rubik",sans-serif', fontWeight: 900, fontStyle: 'italic',
              fontSize: isMobile ? '4rem' : 'clamp(5rem, 13vw, 11rem)',
              lineHeight: 0.82, letterSpacing: '-0.06em',
              margin: isMobile ? '-10px 0 14px 14px' : '-18px 0 14px 0',
              maxWidth: '100%',
              display: 'inline-block',
            }}
          >
            {/* Racing speed-line leading the wordmark */}
            <span aria-hidden style={{
              display: 'inline-block',
              verticalAlign: 'middle',
              width: isMobile ? 16 : 28, height: isMobile ? 3 : 5,
              background: RED, boxShadow: `0 0 18px ${RED}`,
              transform: 'skewX(-20deg)',
              marginRight: isMobile ? 8 : 12,
              marginBottom: isMobile ? 4 : 8,
            }} />
            <span style={{ color: '#fff' }}>In</span>
            <span style={{ color: RED }}>Seconds</span>
            <span style={{
              color: RED,
              fontFamily: '"Rubik",sans-serif',
              textShadow: `0 0 24px ${RED}88`,
            }}>.</span>
            <sup style={{
              fontSize: '0.18em', fontWeight: 600, fontStyle: 'normal',
              color: 'rgba(255,255,255,0.55)', letterSpacing: '0.12em',
              marginLeft: 6, verticalAlign: 'top', top: '-1.6em', position: 'relative',
            }}>®</sup>
          </motion.h1>

          {/* ── Slogan: speed × cars × mail ── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 14,
              padding: '10px 18px',
              marginBottom: 20,
              background: 'rgba(238,63,44,0.08)',
              border: '1px solid rgba(238,63,44,0.25)',
              borderRadius: '6px',
              backdropFilter: 'blur(10px)',
              boxShadow: 'inset 0 0 20px rgba(238,63,44,0.05)'
            }}
          >
            <span aria-hidden style={{
              display: 'inline-block',
              width: 30, height: 2,
              background: `linear-gradient(90deg, ${RED}, transparent)`,
              boxShadow: `0 0 10px ${RED}`,
            }} />
            <span style={{
              fontFamily: '"Fira Code",monospace', fontWeight: 600,
              fontSize: isMobile ? '0.75rem' : '0.85rem',
              color: '#fff', letterSpacing: '0.15em', textTransform: 'uppercase',
            }}>
              INSECONDS_ENGINE: <span style={{ color: RED }}>0 → 3,000 EMAILS</span>
            </span>
          </motion.div>

          {/* ── Tagline (former headline, now smaller) ── */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{
              fontFamily: '"Rubik",sans-serif', fontWeight: 500,
              fontSize: isMobile ? '1.1rem' : '1.35rem',
              color: 'rgba(255,255,255,0.82)', lineHeight: 1.35,
              letterSpacing: '-0.01em', maxWidth: 540,
              margin: '0 0 32px',
            }}
          >
            Send 3,000 emails.{' '}
            <span style={{ color: RED, fontWeight: 700 }}>Right from Gmail.</span>
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}
          >
            <ClipBtn href="/InSeconds%20V5.0.3.zip" download variant="red">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              Download Free
            </ClipBtn>
            <ClipBtn href={WHATSAPP_TRIAL} target="_blank" rel="noreferrer" variant="white">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
              Start 3-Day Trial
            </ClipBtn>
          </motion.div>
        </div>

        {/* Stats strip at bottom of hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            position: 'relative', zIndex: 2,
            padding: isMobile ? '24px' : '28px 64px',
            display: 'flex', gap: isMobile ? 24 : 0, flexWrap: 'wrap',
            borderTop: '1px solid rgba(255,255,255,0.10)',
            background: 'rgba(0,0,0,0.45)',
            backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          {STATS.map((s, i) => (
            <div
              key={s.l}
              style={{
                flex: 1, minWidth: 120, display: 'flex', flexDirection: 'column', gap: 6,
                paddingLeft: i > 0 ? (isMobile ? 0 : 40) : 0,
                borderLeft: i > 0 && !isMobile ? '1px solid rgba(255,255,255,0.15)' : 'none',
              }}
            >
              <span style={{ fontFamily: '"Rubik",sans-serif', fontWeight: 800, fontSize: isMobile ? '1.8rem' : '2.2rem', color: '#fff', lineHeight: 1, textShadow: '0 0 20px rgba(255,255,255,0.2)' }}>{s.k}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: '"Fira Code",monospace', fontSize: 10, color: RED, letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>
                <span style={{ width: 4, height: 4, background: RED, borderRadius: '50%' }} />
                {s.l}
              </span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          PRICING — premium animated
      ══════════════════════════════════════════ */}
      <section style={{ padding: isMobile ? '80px 24px' : '100px 64px', maxWidth: 1240, margin: '0 auto', position: 'relative' }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 36 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
            <span style={{ width: 36, height: 1, background: `linear-gradient(90deg, ${RED}, transparent)` }} />
            <span style={{ fontFamily: '"Rubik",sans-serif', fontSize: 10, letterSpacing: '0.28em', color: RED, textTransform: 'uppercase', fontWeight: 700 }}>
              Pricing · One Lane. No Tolls.
            </span>
          </div>
          <h2 style={{
            fontFamily: '"Rubik",sans-serif', fontWeight: 800,
            fontSize: isMobile ? '2rem' : 'clamp(2rem, 3.6vw, 3.2rem)',
            letterSpacing: '-0.035em', textTransform: 'uppercase',
            margin: '0 0 10px', lineHeight: 1, maxWidth: 680,
          }}>
            Full throttle. <span style={{ color: RED }}>Flat fee.</span>
          </h2>
          <p style={{ fontFamily: '"Rubik",sans-serif', fontSize: '0.95rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, maxWidth: 520, margin: 0 }}>
            One price, every feature, every Gmail account you own.
            No seat tax, no per-email fees, no quota dance.
          </p>
        </motion.div>

        {/* ── Floating "NO CREDIT CARD" ribbon ── */}
        <motion.div
          initial={{ opacity: 0, y: -8, rotate: -4 }}
          whileInView={{ opacity: 1, y: 0, rotate: -4 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            position: 'absolute',
            top: isMobile ? 130 : 110, right: isMobile ? 20 : 60,
            zIndex: 3,
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 14px',
            background: RED, color: '#fff',
            fontFamily: '"Rubik",sans-serif', fontWeight: 800,
            fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
            clipPath: CLIP_SM,
            boxShadow: `0 14px 34px ${RED}66, 0 0 0 1px ${RED}`,
          }}
        >
          <motion.span
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', boxShadow: '0 0 10px #fff' }}
          />
          No Credit Card
        </motion.div>

        {/* ── PRICING CARD ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.02) 100%)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: `0 30px 80px rgba(0,0,0,0.55), 0 0 0 1px ${RED}15, inset 0 1px 0 rgba(255,255,255,0.08)`,
            clipPath: CLIP,
            overflow: 'hidden',
          }}
        >
          {/* Drifting shine */}
          <motion.div
            aria-hidden
            animate={{ backgroundPosition: ['0% 0%', '200% 200%'] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.08) 100%)',
              backgroundSize: '200% 200%', zIndex: 0,
            }}
          />
          {/* Red ambient pulses */}
          <motion.div
            aria-hidden
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', top: '-35%', right: '-15%', width: '60%', height: '130%',
              background: `radial-gradient(closest-side, ${RED}1c, transparent 70%)`,
              filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0,
            }}
          />
          <motion.div
            aria-hidden
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            style={{
              position: 'absolute', bottom: '-30%', left: '-10%', width: '50%', height: '120%',
              background: `radial-gradient(closest-side, ${RED}12, transparent 70%)`,
              filter: 'blur(70px)', pointerEvents: 'none', zIndex: 0,
            }}
          />

          {/* Racing stripe corner decoration */}
          <div aria-hidden style={{
            position: 'absolute', top: 0, left: 0, width: 140, height: 140,
            background: `repeating-linear-gradient(135deg, ${RED}16 0 8px, transparent 8px 20px)`,
            maskImage: 'linear-gradient(135deg, black, transparent 70%)',
            WebkitMaskImage: 'linear-gradient(135deg, black, transparent 70%)',
            pointerEvents: 'none', zIndex: 0,
          }} />

          {/* ── Top bar (plan badge + trial) ── */}
          <div style={{
            position: 'relative', zIndex: 2,
            padding: isMobile ? '20px 20px 0' : '26px 32px 0',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 12, flexWrap: 'wrap',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '7px 14px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.14)',
              clipPath: CLIP_SM,
              fontFamily: '"Rubik",sans-serif', fontWeight: 700,
              fontSize: 10, letterSpacing: '0.22em', textTransform: 'uppercase',
              color: '#fff',
            }}>
              <motion.span
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: 7, height: 7, borderRadius: '50%', background: RED, boxShadow: `0 0 12px ${RED}` }}
              />
              Standard Plan
              <span style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>/ v5.0</span>
            </div>

            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 12px',
              background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.4)',
              color: '#22c55e',
              fontFamily: '"Rubik",sans-serif', fontWeight: 700,
              fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase',
              clipPath: CLIP_SM,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px #22c55e' }} />
              3-Day Free Trial
            </div>
          </div>

          {/* ── Split body ── */}
          <div
            className="is-pricing-premium"
            style={{
              position: 'relative', zIndex: 2,
              padding: isMobile ? '28px 20px 20px' : '36px 32px 28px',
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '0.9fr 1.1fr',
              gap: isMobile ? 28 : 44,
              alignItems: 'start',
            }}
          >
            {/* ── LEFT: price + CTAs ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Price */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  fontFamily: '"Rubik",sans-serif', fontSize: 10, letterSpacing: '0.28em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 600,
                  marginBottom: 8,
                }}>
                  Monthly Subscription
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                  <span style={{
                    fontFamily: '"Rubik",sans-serif', fontWeight: 700,
                    fontSize: isMobile ? '2.2rem' : '2.6rem',
                    color: 'rgba(255,255,255,0.5)', lineHeight: 1,
                    marginTop: isMobile ? 6 : 10,
                  }}>
                    ₹
                  </span>
                  <span style={{
                    fontFamily: '"Rubik",sans-serif', fontWeight: 900, fontStyle: 'italic',
                    fontSize: isMobile ? '4.5rem' : 'clamp(4.5rem, 7vw, 6.5rem)',
                    lineHeight: 0.9, color: '#fff', letterSpacing: '-0.05em',
                    textShadow: `0 0 40px ${RED}44`,
                  }}>
                    <PriceCounter to={800} />
                  </span>
                </div>
                <div style={{
                  marginTop: 8, display: 'flex', alignItems: 'center', gap: 10,
                  fontFamily: '"Rubik",sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.45)',
                  letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500,
                }}>
                  <span style={{ width: 14, height: 1, background: 'rgba(255,255,255,0.25)' }} />
                  per month · INR · billed monthly
                </div>
              </div>

              {/* Savings strip */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 14px',
                  background: `${RED}0e`, border: `1px solid ${RED}30`,
                  clipPath: CLIP_SM,
                }}
              >
                <div style={{
                  width: 34, height: 34, flexShrink: 0,
                  background: `${RED}26`, border: `1px solid ${RED}66`,
                  display: 'grid', placeItems: 'center',
                  clipPath: CLIP_SM, color: RED, fontSize: 18,
                }}>⚡</div>
                <div style={{ minWidth: 0 }}>
                  <div style={{
                    fontFamily: '"Rubik",sans-serif', fontSize: 12, fontWeight: 700,
                    color: '#fff', letterSpacing: '-0.01em',
                  }}>
                    Less than <span style={{ color: RED }}>₹27 a day</span>
                  </div>
                  <div style={{
                    fontFamily: '"Rubik",sans-serif', fontSize: 11, color: 'rgba(255,255,255,0.5)',
                    lineHeight: 1.4, marginTop: 2,
                  }}>
                    Most SaaS tools start at ₹2,400+/mo. We stay lean.
                  </div>
                </div>
              </motion.div>

              {/* CTA buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <ClipBtn
                  href="/InSeconds%20V5.0.3.zip"
                  download
                  variant="red"
                  style={{ width: '100%', justifyContent: 'center', padding: '15px 26px' }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                  </svg>
                  Download File
                </ClipBtn>
                <ClipBtn
                  href={WHATSAPP_TRIAL}
                  target="_blank"
                  rel="noreferrer"
                  variant="white"
                  style={{ width: '100%', justifyContent: 'center', padding: '15px 26px' }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                  </svg>
                  Activate WhatsApp Trial
                </ClipBtn>
              </div>

              {/* Trust micro-row */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap',
                paddingTop: 4,
              }}>
                {['Cancel anytime', 'Human activation', 'No funnels'].map((t) => (
                  <div key={t} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    fontFamily: '"Rubik",sans-serif', fontSize: 10.5, fontWeight: 600,
                    color: 'rgba(255,255,255,0.55)', letterSpacing: '0.06em',
                  }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={RED} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: features ── */}
            <div style={{
              position: 'relative',
              padding: isMobile ? '20px 18px' : '24px 26px',
              background: 'rgba(0,0,0,0.35)',
              border: '1px solid rgba(255,255,255,0.08)',
              clipPath: CLIP_SM,
            }}>
              {/* Top hairline accent */}
              <div aria-hidden style={{
                position: 'absolute', top: 0, left: 20, right: 20, height: 1,
                background: `linear-gradient(90deg, transparent, ${RED}aa, transparent)`,
              }} />

              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: 14,
              }}>
                <div style={{
                  fontFamily: '"Rubik",sans-serif', fontSize: 10, letterSpacing: '0.26em',
                  textTransform: 'uppercase', color: RED, fontWeight: 700,
                }}>
                  What's Included
                </div>
                <div style={{
                  fontFamily: '"Fira Code",monospace', fontSize: 9, letterSpacing: '0.18em',
                  color: 'rgba(255,255,255,0.35)',
                }}>
                  08 BENEFITS
                </div>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  { label: 'All 12 power features unlocked', highlight: true },
                  { label: 'Multi-tab parallel sending', highlight: true },
                  { label: 'Unlimited Gmail accounts', highlight: true },
                  { label: 'Lifetime updates while subscribed' },
                  { label: 'Priority WhatsApp support' },
                  { label: 'Manual human trial activation' },
                  { label: 'Cancel anytime — no questions' },
                  { label: 'No credit card needed to start' },
                ].map((item, i) => (
                  <CheckItem key={item.label} i={i} label={item.label} highlight={item.highlight} />
                ))}
              </ul>
            </div>
          </div>

          {/* ── Bottom trust bar ── */}
          <div style={{
            position: 'relative', zIndex: 2,
            padding: isMobile ? '16px 20px' : '18px 32px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(0,0,0,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 12, flexWrap: 'wrap',
          }}>
            <p style={{
              margin: 0, fontFamily: '"Rubik",sans-serif', fontSize: 11.5,
              color: 'rgba(255,255,255,0.48)', lineHeight: 1.5, fontWeight: 500,
            }}>
              Approved manually over WhatsApp — <span style={{ color: '#fff' }}>human-to-human</span>, no funnels, no auto-renewals.
            </p>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: '"Rubik",sans-serif', fontSize: 10, fontWeight: 700,
              color: 'rgba(255,255,255,0.6)', letterSpacing: '0.18em', textTransform: 'uppercase',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 8px #22c55e' }} />
              Active — Trials open
            </div>
          </div>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          GALLERY — screenshot showcase
      ══════════════════════════════════════════ */}
      <section style={{ padding: isMobile ? '20px 24px 60px' : '0 64px 80px', maxWidth: 1280, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 36 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
            <span style={{ width: 36, height: 1, background: `linear-gradient(90deg, ${RED}, transparent)` }} />
            <span style={{ fontFamily: '"Rubik",sans-serif', fontSize: 10, letterSpacing: '0.25em', color: RED, textTransform: 'uppercase', fontWeight: 700 }}>Inside the Extension</span>
          </div>
          <h2 style={{
            fontFamily: '"Rubik",sans-serif', fontWeight: 800,
            fontSize: isMobile ? '2rem' : 'clamp(1.8rem, 3.5vw, 3rem)',
            letterSpacing: '-0.04em', textTransform: 'uppercase', margin: 0, lineHeight: 1,
          }}>
            A look at <span style={{ color: RED }}>InSeconds Ultra</span>
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <Slider slides={SLIDER_1} />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          12 POWER FEATURES
      ══════════════════════════════════════════ */}
      <section style={{ padding: isMobile ? '40px 24px 80px' : '20px 64px 100px', maxWidth: 1400, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 44 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
            <span style={{ width: 36, height: 1, background: `linear-gradient(90deg, ${RED}, transparent)` }} />
            <span style={{ fontFamily: '"Rubik",sans-serif', fontSize: 10, letterSpacing: '0.25em', color: RED, textTransform: 'uppercase', fontWeight: 700 }}>12 Power Features</span>
          </div>
          <h2 style={{
            fontFamily: '"Rubik",sans-serif', fontWeight: 800,
            fontSize: isMobile ? '2rem' : 'clamp(1.8rem, 3.6vw, 3.2rem)',
            letterSpacing: '-0.04em', textTransform: 'uppercase',
            margin: '0 0 12px', lineHeight: 1, maxWidth: 760,
          }}>
            Everything you need for <span style={{ color: RED }}>cold-email</span>, built into Gmail.
          </h2>
          <p style={{ fontFamily: '"Rubik",sans-serif', fontSize: '0.95rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, maxWidth: 560, margin: 0 }}>
            Twelve modules that turn the world's most-used inbox into a personalised, throttled, A/B-tested sending engine.
          </p>
        </motion.div>

        <div className="is-feature-grid">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} f={f} i={i} />
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          BOTTOM CTA
      ══════════════════════════════════════════ */}
      <section style={{ padding: isMobile ? '0 24px 80px' : '0 64px 120px', maxWidth: 1280, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          style={{
            position: 'relative', overflow: 'hidden',
            padding: isMobile ? '48px 28px' : '72px 64px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.015) 100%)',
            backdropFilter: 'blur(40px) saturate(180%)',
            WebkitBackdropFilter: 'blur(40px) saturate(180%)',
            border: '1px solid rgba(255,255,255,0.10)',
            boxShadow: `0 0 0 1px ${RED}22, 0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)`,
            clipPath: CLIP,
          }}
        >
          {/* Diagonal shine */}
          <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)', pointerEvents: 'none' }} />
          {/* Red glow at top center */}
          <div aria-hidden style={{ position: 'absolute', top: '-60%', left: '50%', transform: 'translateX(-50%)', width: '80%', height: '160%', background: `radial-gradient(closest-side, ${RED}20, transparent 60%)`, filter: 'blur(50px)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <span style={{ width: 36, height: 1, background: `linear-gradient(90deg, ${RED}, transparent)` }} />
              <span style={{ fontFamily: '"Rubik",sans-serif', fontSize: 10, letterSpacing: '0.25em', color: RED, textTransform: 'uppercase', fontWeight: 700 }}>Install</span>
            </div>
            <h2 style={{
              fontFamily: '"Rubik",sans-serif', fontWeight: 800,
              fontSize: isMobile ? '2rem' : 'clamp(2rem, 4vw, 3.4rem)',
              letterSpacing: '-0.04em', textTransform: 'uppercase',
              margin: '0 0 14px', lineHeight: 1, maxWidth: 700,
            }}>
              Ship your next 10,000 emails <span style={{ color: RED }}>tonight.</span>
            </h2>
            <p style={{ fontFamily: '"Rubik",sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.5)', margin: '0 0 32px', maxWidth: 500, lineHeight: 1.6 }}>
              ₹800/month — 3-day free trial. Works with any Gmail account.
              No server, no API keys. WhatsApp to activate in minutes.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <ClipBtn href="/InSeconds%20V5.0.3.zip" download variant="red">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
                Download File
              </ClipBtn>
              <ClipBtn href={WHATSAPP_TRIAL} target="_blank" rel="noreferrer" variant="white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
                Get InSeconds Ultra · WhatsApp
              </ClipBtn>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
