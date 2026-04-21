import { useNavigate } from 'react-router-dom'
import { ArrowUpRight, Mail, Zap, Code2 } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import CardSwap, { Card } from './CardSwap'
import feature1 from '../../assets/feature-1.gif'
import feature2 from '../../assets/feature-2.gif'

const projects = [
  {
    tag:    'CHROME · GMAIL',
    title:  'InSeconds Extension',
    desc:   'Manifest V3 Chrome extension that turns Gmail into a personalised bulk-sending engine. Multi-tab parallel sending, A/B testing, follow-up automation.',
    icon:   Mail,
    accent: '#ff7e5f',
    image:  feature2,
  },
  {
    tag:    'PYTHON · FASTAPI',
    title:  'InSeconds API',
    desc:   'Desktop mailer handling 50,000+ leads. Anti-spam, schema injection, AI co-pilot, queue throttling. Built to scale outbound at precision.',
    icon:   Zap,
    accent: '#fbbf24',
    image:  feature1,
  },
  {
    tag:    'FULL STACK',
    title:  'Engineered to Scale',
    desc:   'Both products ship under the InSeconds Ultra umbrella — a unified outreach stack designed for operators who need precision at volume.',
    icon:   Code2,
    accent: '#60a5fa',
    image:  feature2,
  },
]

export default function Work() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const navigate = useNavigate()

  return (
    <section className="relative py-20 md:py-32 px-6 md:px-8 lg:px-16 max-w-7xl mx-auto" id="work">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: copy */}
        <div>
          <div
            className="inline-block liquid-glass rounded-full px-3.5 py-1 text-xs font-medium font-body mb-6"
            style={{ color: 'var(--theme-text)' }}
          >
            Selected Work
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-heading italic tracking-tight leading-[0.9] mb-6"
            style={{ color: 'var(--theme-text)' }}
          >
            Built for <br />operators.
          </h2>
          <p
            className="font-body font-light text-base md:text-lg max-w-md mb-8"
            style={{ color: 'var(--theme-text-secondary)' }}
          >
            Two flagship products under the <span style={{ fontStyle: 'italic' }}>InSeconds Ultra</span> umbrella —
            a Chrome-native Gmail mailer and a desktop FastAPI engine. Engineered
            to move outbound at industrial scale while preserving deliverability,
            sender reputation, and the compounding trust deliverability is built on.
          </p>
          <button
            onClick={() => navigate('/inseconds')}
            className="liquid-glass-strong rounded-full px-6 py-3 font-body text-sm font-medium inline-flex items-center gap-2 transition-transform hover:scale-105"
            style={{ color: 'var(--theme-text)', cursor: 'pointer', border: 'none' }}
          >
            Explore InSeconds <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right: card swap stack */}
        <div className="card-swap-wrapper" style={{ minHeight: '420px', position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CardSwap
            width={380}
            height={340}
            cardDistance={45}
            verticalDistance={55}
            delay={4500}
            pauseOnHover={true}
            easing="elastic"
            onCardClick={() => navigate('/inseconds')}
          >
            {projects.map((p) => {
              const Icon = p.icon
              return (
                <Card key={p.title} customClass="cursor-pointer">
                  {/* Header bar */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '16px 20px',
                      borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 8,
                          display: 'grid',
                          placeItems: 'center',
                          background: `${p.accent}22`,
                          color: p.accent,
                        }}
                      >
                        <Icon size={14} />
                      </div>
                      <span
                        style={{
                          fontFamily: '"Barlow", sans-serif',
                          fontSize: 10,
                          letterSpacing: '0.18em',
                          color: isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)',
                        }}
                      >
                        {p.tag}
                      </span>
                    </div>
                    <ArrowUpRight
                      size={16}
                      style={{ color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}
                    />
                  </div>

                  {/* Image strip */}
                  <div
                    style={{
                      height: 170,
                      overflow: 'hidden',
                      position: 'relative',
                      background: isDark ? '#000' : '#f5f5f5',
                    }}
                  >
                    <img
                      src={p.image}
                      alt={p.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: 0.9,
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(135deg, transparent 40%, ${p.accent}22)`,
                      }}
                    />
                  </div>

                  {/* Body */}
                  <div style={{ padding: '18px 20px' }}>
                    <h3
                      style={{
                        fontFamily: '"Instrument Serif", serif',
                        fontStyle: 'italic',
                        fontSize: 24,
                        lineHeight: 1.05,
                        marginBottom: 6,
                        color: isDark ? '#fff' : '#0a0a0a',
                      }}
                    >
                      {p.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: '"Barlow", sans-serif',
                        fontSize: 12,
                        lineHeight: 1.5,
                        color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
                      }}
                    >
                      {p.desc}
                    </p>
                  </div>
                </Card>
              )
            })}
          </CardSwap>
        </div>
      </div>
    </section>
  )
}
