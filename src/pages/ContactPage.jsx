import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import {
  Instagram, Linkedin, Twitter, Github,
  Wifi, Monitor, Clock, Mail,
  MapPin, GraduationCap, MoreHorizontal, ArrowLeft, Search,
} from 'lucide-react'
import BackButton from '../components/ui/BackButton'

/* ── Tiny twinkling star background ───────────────────────────── */
function StarField() {
  const [stars] = useState(() =>
    Array.from({ length: 60 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      d: Math.random() * 4,
      s: 0.5 + Math.random() * 1.6,
    }))
  )
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute', inset: 0, overflow: 'hidden',
        pointerEvents: 'none', zIndex: 0,
      }}
    >
      {stars.map((st, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: `${st.x}%`, top: `${st.y}%`,
            width: st.s, height: st.s, borderRadius: '50%',
            background: '#a78bfa', opacity: 0.55,
            boxShadow: '0 0 4px rgba(167,139,250,0.7)',
            animation: `cp-twinkle 3.8s ${st.d}s ease-in-out infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes cp-twinkle {
          0%, 100% { opacity: 0.18; transform: scale(0.6); }
          50%      { opacity: 0.95; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}

/* ── Social icon button ──────────────────────────────────────── */
function SocialBox({ icon: Icon, label, href, color }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 8, padding: '18px 12px',
        borderRadius: 14,
        background: 'rgba(20,20,28,0.65)',
        border: '1px solid rgba(255,255,255,0.07)',
        color: 'rgba(255,255,255,0.85)',
        textDecoration: 'none',
        transition: 'all 0.25s ease',
        backdropFilter: 'blur(12px)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.borderColor = color + '88'
        e.currentTarget.style.boxShadow = `0 12px 32px ${color}33`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <span
        style={{
          width: 38, height: 38, borderRadius: 10,
          background: `${color}22`,
          border: `1px solid ${color}55`,
          display: 'grid', placeItems: 'center',
          color,
        }}
      >
        <Icon size={18} />
      </span>
      <span
        style={{
          fontFamily: '"Barlow", sans-serif',
          fontSize: 9, letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.55)',
        }}
      >
        {label}
      </span>
    </a>
  )
}

/* ── Service tag pill ───────────────────────────────────────── */
function Pill({ children }) {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '6px 14px',
        borderRadius: 6,
        background: 'rgba(45,52,75,0.85)',
        color: '#cbd5e1',
        fontFamily: '"Barlow", sans-serif',
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: '0.02em',
        border: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      {children}
    </span>
  )
}

/* ─────────────────────────────────────────────────────────────── */
export default function ContactPage() {
  const [typed, setTyped] = useState('')
  const target = 'mannathridyanshdwivedi85@gmail.com'

  // Lightweight typewriter for the mail_client.js card
  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      i++
      setTyped(target.slice(0, i))
      if (i >= target.length) clearInterval(id)
    }, 60)
    return () => clearInterval(id)
  }, [])

  return (
    <main
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at 20% 0%, #0d0a1a 0%, #050407 60%, #02010a 100%)',
        color: '#fff',
        overflow: 'hidden',
        padding: '24px',
      }}
    >
      <BackButton label="Home" />
      <StarField />

      {/* Brand mark — top-left */}
      <div
        style={{
          position: 'relative', zIndex: 2,
          padding: '12px 12px 0',
          marginLeft: 80,
        }}
      >
        <div
          style={{
            fontFamily: '"Instrument Serif", serif',
            fontSize: 26,
            color: '#fff',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          HD<span style={{ color: '#f97316' }}>.</span>
        </div>
        <div
          style={{
            fontFamily: '"Barlow", sans-serif',
            fontSize: 9, letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
            marginTop: 4,
          }}
        >
          sys.online
        </div>
      </div>

      {/* Two-column layout */}
      <div
        style={{
          position: 'relative', zIndex: 2,
          maxWidth: 1100, margin: '32px auto 0',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.05fr) minmax(0, 1fr)',
          gap: 28,
          alignItems: 'start',
        }}
        className="cp-grid"
      >
        {/* ═══════════════════════════════════════════════════
           LEFT — LinkedIn-style profile card
           ═══════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background: '#1d2230',
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)',
          }}
        >
          {/* Banner */}
          <div
            style={{
              position: 'relative',
              height: 130,
              backgroundImage: 'url(/assets/images/linkedin_desk_bg.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              overflow: 'hidden',
            }}
          >
            {/* Top mini-nav buttons */}
            <div style={{
              position: 'absolute', top: 12, left: 12,
              display: 'flex', gap: 8,
            }}>
              <span style={{
                width: 26, height: 26, borderRadius: '50%',
                background: 'rgba(0,0,0,0.45)', display: 'grid', placeItems: 'center',
                color: '#fff',
              }}>
                <ArrowLeft size={14} />
              </span>
            </div>
            <div style={{
              position: 'absolute', top: 12, right: 12,
              display: 'flex', gap: 8,
            }}>
              <span style={{
                width: 26, height: 26, borderRadius: '50%',
                background: 'rgba(0,0,0,0.45)', display: 'grid', placeItems: 'center',
                color: '#fff',
              }}>
                <Search size={14} />
              </span>
            </div>
            <div
              style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'rgba(255,255,255,0.92)',
                color: '#000',
                padding: '6px 14px',
                borderRadius: 6,
                fontFamily: '"Instrument Serif", serif',
                fontStyle: 'italic',
                fontSize: 18,
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                lineHeight: 1.05,
                boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
              }}
            >
              <span style={{
                background: '#0a66c2',
                color: '#fff',
                padding: '0 6px',
                borderRadius: 3,
                fontFamily: '"Barlow", sans-serif',
                fontSize: 10,
                fontWeight: 700,
                fontStyle: 'normal',
                letterSpacing: '0.04em',
                marginBottom: 4,
              }}>in</span>
              Hridyansh Dwivedi
              <span style={{ fontSize: 10, color: '#666', fontStyle: 'italic' }}>
                Made it Happen.
              </span>
            </div>
            
            {/* Badge */}
            <div style={{
              position: 'absolute', bottom: 12, right: 12,
              background: 'rgba(255,255,255,0.92)',
              color: '#000',
              padding: '4px 10px',
              borderRadius: 4,
              fontFamily: '"Barlow", sans-serif',
              fontSize: 9, fontWeight: 700, letterSpacing: '0.04em',
              display: 'flex', alignItems: 'center', gap: 6,
              boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
            }}>
              <span>BUSINESS DEVELOPMENT EXECUTIVE</span>
              <span style={{ fontSize: 12 }}>🪙</span>
            </div>
          </div>

          {/* Avatar + actions */}
          <div style={{ position: 'relative', padding: '0 24px' }}>
            <div
              style={{
                position: 'absolute', top: -42, left: 24,
                width: 84, height: 84, borderRadius: '50%',
                background: '#f97316',
                display: 'grid', placeItems: 'center',
                color: '#fff', fontFamily: '"Barlow", sans-serif',
                fontWeight: 800, fontSize: 28,
                border: '4px solid #1d2230',
                letterSpacing: '0.02em',
                overflow: 'hidden',
              }}
            >
              <img src="/assets/images/profile.jpg" alt="HD" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{
              display: 'flex', justifyContent: 'flex-end',
              padding: '14px 0 10px',
            }}>
              <span style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'rgba(255,255,255,0.05)',
                display: 'grid', placeItems: 'center',
                color: 'rgba(255,255,255,0.6)',
              }}>
                <MoreHorizontal size={16} />
              </span>
            </div>
          </div>

          {/* Name & meta */}
          <div style={{ padding: '8px 24px 0' }}>
            <h1 style={{
              fontFamily: '"Barlow", sans-serif',
              fontSize: 22, fontWeight: 700,
              color: '#fff',
              margin: '0 0 12px',
              letterSpacing: '-0.01em',
            }}>
              Hridyansh Dwivedi
            </h1>

            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              fontFamily: '"Barlow", sans-serif', fontSize: 13,
              color: 'rgba(255,255,255,0.85)', marginBottom: 6,
            }}>
              <Mail size={14} style={{ opacity: 0.7 }} />
              Beeyond Digital · System Architect
            </div>

            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              fontFamily: '"Barlow", sans-serif', fontSize: 13,
              color: 'rgba(255,255,255,0.85)', marginBottom: 10,
            }}>
              <GraduationCap size={14} style={{ opacity: 0.7 }} />
              Axis Colleges
            </div>

            <div style={{
              display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap',
              fontFamily: '"Barlow", sans-serif', fontSize: 12,
              color: 'rgba(255,255,255,0.55)', marginBottom: 6,
            }}>
              <MapPin size={12} />
              Kanpur, Uttar Pradesh, India ·
              <a href="https://wa.me/916393973524" target="_blank" rel="noreferrer"
                 style={{ color: '#3b82f6', textDecoration: 'none' }}>
                Contact info
              </a>
            </div>

            <div style={{
              fontFamily: '"Barlow", sans-serif', fontSize: 12,
              color: 'rgba(255,255,255,0.55)', marginBottom: 14,
            }}>
              4K followers · <a href="https://in.linkedin.com/in/hridyanshd85" target="_blank" rel="noreferrer"
                style={{ color: '#3b82f6', textDecoration: 'none' }}>
                500+ connections
              </a>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 22, flexWrap: 'wrap' }}>
              <a
                href="https://in.linkedin.com/in/hridyanshd85"
                target="_blank" rel="noreferrer"
                style={{
                  flex: 1, minWidth: 130,
                  padding: '10px 18px', borderRadius: 999,
                  background: '#0a66c2', color: '#fff',
                  textAlign: 'center', textDecoration: 'none',
                  fontFamily: '"Barlow", sans-serif', fontWeight: 600, fontSize: 14,
                  border: 'none',
                }}
              >
                Connect
              </a>
              <a
                href="https://wa.me/916393973524"
                target="_blank" rel="noreferrer"
                style={{
                  flex: 1, minWidth: 130,
                  padding: '10px 18px', borderRadius: 999,
                  background: 'transparent', color: '#fff',
                  textAlign: 'center', textDecoration: 'none',
                  fontFamily: '"Barlow", sans-serif', fontWeight: 600, fontSize: 14,
                  border: '1.5px solid rgba(255,255,255,0.5)',
                }}
              >
                ✈ Message
              </a>
            </div>

            {/* Services */}
            <div style={{ marginBottom: 18 }}>
              <h3 style={{
                fontFamily: '"Barlow", sans-serif', fontSize: 14, fontWeight: 700,
                color: '#fff', margin: '0 0 10px',
              }}>
                Services
              </h3>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                <Pill>Advertising</Pill>
                <Pill>Web Development</Pill>
                <Pill>Digital Marketing</Pill>
                <Pill>SEO</Pill>
              </div>
            </div>

            {/* About */}
            <div style={{ paddingBottom: 24 }}>
              <h3 style={{
                fontFamily: '"Barlow", sans-serif', fontSize: 14, fontWeight: 700,
                color: '#fff', margin: '0 0 8px',
              }}>
                About
              </h3>
              <p style={{
                fontFamily: '"Barlow", sans-serif', fontSize: 13, lineHeight: 1.55,
                color: 'rgba(255,255,255,0.7)', margin: 0,
              }}>
                Born in Kanpur, raised on caffeine and curiosity. I build the kind
                of websites your competitors quietly screenshot. If your product
                deserves an upgrade from "okay" to <em>"how did they do that?"</em>{' '}
                — we should probably talk.&nbsp;
                <span style={{ color: '#3b82f6', cursor: 'pointer' }}>see more</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* ═══════════════════════════════════════════════════
           RIGHT — socials, terminal CTA, status
           ═══════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
        >
          {/* Socials grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 12,
          }}>
            <SocialBox icon={Instagram} label="Instagram" color="#e1306c" href="https://www.instagram.com/hridyansh__D/" />
            <SocialBox icon={Linkedin}  label="LinkedIn"  color="#0a66c2" href="https://in.linkedin.com/in/hridyanshd85" />
            <SocialBox icon={Twitter}   label="X"         color="#ffffff" href="https://x.com/hridyansh_d" />
            <SocialBox icon={Github}    label="GitHub"    color="#a78bfa" href="https://github.com/hridyanshdwivedi85" />
          </div>

          {/* Terminal-style mail CTA */}
          <div style={{
            background: 'rgba(15,18,26,0.85)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 14,
            overflow: 'hidden',
            backdropFilter: 'blur(14px)',
            boxShadow: '0 18px 40px rgba(0,0,0,0.45)',
          }}>
            {/* terminal header */}
            <div style={{
              display: 'flex', alignItems: 'center',
              padding: '10px 14px',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>
              <div style={{ display: 'flex', gap: 6 }}>
                <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' }} />
                <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e' }} />
                <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840' }} />
              </div>
              <span style={{
                marginLeft: 14,
                fontFamily: '"Fira Code", monospace',
                fontSize: 11,
                color: 'rgba(255,255,255,0.55)',
              }}>
                mail_client.js
              </span>
              <Mail size={14} style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.4)' }} />
            </div>

            {/* code body */}
            <div style={{ padding: '20px 18px 8px' }}>
              <pre style={{
                margin: 0,
                fontFamily: '"Fira Code", monospace',
                fontSize: 13,
                color: '#cbd5e1',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
              }}>
<span style={{ color: '#f97316' }}>await</span> <span style={{ color: '#60a5fa' }}>connect</span>(<span style={{ color: '#facc15' }}>&quot;{typed}&quot;</span>);
                <span style={{
                  display: 'inline-block', width: 8, height: 14,
                  background: '#fff', verticalAlign: 'middle',
                  marginLeft: 4, animation: 'cp-blink 1s steps(1) infinite',
                }} />
              </pre>

              <a
                href="mailto:mannathridyanshdwivedi85@gmail.com"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  marginTop: 18, marginBottom: 12,
                  padding: '14px 18px',
                  borderRadius: 10,
                  background: 'rgba(0,0,0,0.55)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#fff',
                  textDecoration: 'none',
                  fontFamily: '"Barlow", sans-serif',
                  fontSize: 12, fontWeight: 700,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(249,115,22,0.18)'
                  e.currentTarget.style.borderColor = 'rgba(249,115,22,0.6)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0,0,0,0.55)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                }}
              >
                Initialize
                <span style={{ color: '#f97316', fontSize: 18 }}>→</span>
              </a>
            </div>
            <style>{`
              @keyframes cp-blink { 50% { opacity: 0; } }
            `}</style>
          </div>

          {/* Status block */}
          <div style={{
            background: 'rgba(15,18,26,0.85)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: 14,
            padding: '18px 20px',
            backdropFilter: 'blur(14px)',
            boxShadow: '0 18px 40px rgba(0,0,0,0.45)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{
                fontFamily: '"Barlow", sans-serif',
                fontSize: 9, letterSpacing: '0.32em',
                color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase',
                marginBottom: 6,
              }}>
                System Status
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                color: '#fff', fontFamily: '"Barlow", sans-serif',
                fontSize: 15, fontWeight: 600,
              }}>
                <span style={{
                  width: 9, height: 9, borderRadius: '50%',
                  background: '#22c55e',
                  boxShadow: '0 0 10px #22c55e',
                  animation: 'cp-pulse 1.6s ease-in-out infinite',
                }} />
                Available for Work
              </div>
            </div>

            <div style={{ display: 'flex', gap: 14, color: 'rgba(255,255,255,0.55)' }}>
              <Wifi size={16} />
              <Monitor size={16} />
              <Clock size={16} />
            </div>
            <style>{`
              @keyframes cp-pulse {
                0%, 100% { transform: scale(1);   opacity: 1; }
                50%      { transform: scale(1.4); opacity: 0.7; }
              }
            `}</style>
          </div>
        </motion.div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 860px) {
          .cp-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
