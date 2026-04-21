import { motion } from 'motion/react'
import { useTheme } from '../../context/ThemeContext'

const timeline = [
  {
    year: 'Present',
    role: 'System Architect & Vibe Coder',
    company: 'Independent',
    desc: 'Pioneering advanced "vibe coding" methodologies. Architecting and deploying sophisticated custom tools and AI-driven workflows to engineer modern software solutions.',
  },
  {
    year: '2023 – 2024',
    role: 'Founder & Lead Generation Specialist',
    company: 'Digital Consulting',
    desc: 'Engineered scalable digital marketing strategies as an independent consultant, successfully driving and converting 10,000+ high-quality B2B leads.',
  },
  {
    year: '2022',
    role: 'Business Development Manager',
    company: 'B2B Sales',
    desc: 'Spearheaded full-cycle sales processes. Drove substantial revenue growth through strategic deal closures and high-level stakeholder negotiations.',
  },
  {
    year: '2021',
    role: 'Business Development Executive',
    company: 'International Sales',
    desc: 'Managed global client relations across the US and Canada. Successfully generated and orchestrated high-value client acquisition meetings.',
  },
]

export default function Testimonials() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section id="experience" className="py-20 md:py-32 px-6 md:px-8 lg:px-16 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-block liquid-glass rounded-full px-3.5 py-1 text-xs font-medium font-body mb-6" style={{ color: 'var(--theme-text)' }}>
          Experience
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic tracking-tight leading-[0.9]" style={{ color: 'var(--theme-text)' }}>
          The Journey.
        </h2>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical accent line (desktop) */}
        <div
          className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px"
          style={{
            background: `linear-gradient(to bottom, transparent, ${isDark ? 'rgba(249,115,22,0.4)' : 'rgba(249,115,22,0.3)'}, transparent)`,
            transform: 'translateX(-50%)',
          }}
        />

        <div className="space-y-8 md:space-y-0">
          {timeline.map(({ year, role, company, desc }, i) => {
            const isLeft = i % 2 === 0
            return (
              <motion.div
                key={year}
                className="md:grid md:grid-cols-2 md:gap-12 relative"
                style={{ paddingTop: i === 0 ? 0 : '2rem' }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Dot on the line */}
                <div
                  className="hidden md:block absolute left-1/2 top-8 w-3 h-3 rounded-full"
                  style={{
                    transform: 'translate(-50%, -50%)',
                    background: '#f97316',
                    boxShadow: `0 0 0 4px ${isDark ? 'rgba(249,115,22,0.15)' : 'rgba(249,115,22,0.12)'}, 0 0 16px rgba(249,115,22,0.5)`,
                    zIndex: 1,
                  }}
                />

                <div className={`${isLeft ? 'md:pr-12' : 'md:col-start-2 md:pl-12'}`}>
                  <div
                    className="liquid-glass rounded-2xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
                    style={{
                      border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}`,
                    }}
                  >
                    {/* Corner accent */}
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: 80,
                        height: 80,
                        background: 'radial-gradient(circle at top right, rgba(249,115,22,0.15), transparent 70%)',
                        pointerEvents: 'none',
                      }}
                    />

                    <div
                      className="font-body text-xs uppercase tracking-[0.25em] mb-3 inline-block px-2.5 py-1 rounded-full"
                      style={{
                        color: '#f97316',
                        background: isDark ? 'rgba(249,115,22,0.1)' : 'rgba(249,115,22,0.08)',
                        border: '1px solid rgba(249,115,22,0.25)',
                      }}
                    >
                      {year}
                    </div>
                    <h3 className="font-body font-medium text-lg mb-1" style={{ color: 'var(--theme-text)' }}>
                      {role}
                    </h3>
                    <div className="font-body font-light text-sm mb-4 italic" style={{ color: 'var(--theme-text-secondary)' }}>
                      {company}
                    </div>
                    <p className="font-body font-light text-sm leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                      {desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
