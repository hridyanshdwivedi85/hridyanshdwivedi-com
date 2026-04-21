import { motion } from 'motion/react'
import {
  Component, Shapes, Sparkles, FileCode2, Globe2,
  Server, TerminalSquare, Flame, Database, CloudCog,
  Layout, Paintbrush, Box, Code2
} from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const skillGroups = [
  {
    category: 'Frontend & 3D',
    accent:   '#f97316',
    items: [
      { icon: Component,  name: 'React',      sub: 'Components & Hooks' },
      { icon: Shapes,     name: 'Three.js',   sub: '3D / WebGL / GLSL' },
      { icon: Sparkles,   name: 'GSAP',       sub: 'Animations' },
      { icon: FileCode2,  name: 'JavaScript', sub: 'ES2024+' },
      { icon: Globe2,     name: 'Next.js',    sub: 'Full-stack' },
    ],
  },
  {
    category: 'Backend & APIs',
    accent:   '#fbbf24',
    items: [
      { icon: Server,         name: 'Node.js',  sub: 'Express & REST' },
      { icon: TerminalSquare, name: 'Python',   sub: 'FastAPI' },
      { icon: Flame,          name: 'Firebase', sub: 'Auth & Firestore' },
      { icon: Database,       name: 'SQL',      sub: 'Databases' },
      { icon: CloudCog,       name: 'GCP',      sub: 'Cloud Platform' },
    ],
  },
  {
    category: 'Design & Tools',
    accent:   '#60a5fa',
    items: [
      { icon: Paintbrush, name: 'Tailwind', sub: 'Utility-first' },
      { icon: Layout,     name: 'Figma',    sub: 'Design System' },
      { icon: Box,        name: 'Docker',   sub: 'DevOps' },
      { icon: Code2,      name: 'AI / LLM', sub: 'Groq · GPT' },
    ],
  },
]

export default function FeaturesGrid() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section id="skills" className="relative py-20 md:py-32 px-6 md:px-8 lg:px-16 max-w-6xl mx-auto overflow-hidden">
      {/* Ambient glow backdrop */}
      <div aria-hidden style={{
        position:'absolute', inset:0, pointerEvents:'none', zIndex:0,
      }}>
        <div style={{
          position:'absolute', top:'8%', left:'10%', width:'40%', height:'40%',
          background:'radial-gradient(closest-side, rgba(249,115,22,0.10), transparent 70%)',
          filter:'blur(60px)',
        }} />
        <div style={{
          position:'absolute', bottom:'10%', right:'8%', width:'35%', height:'35%',
          background:'radial-gradient(closest-side, rgba(96,165,250,0.10), transparent 70%)',
          filter:'blur(70px)',
        }} />
      </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center mb-20"
      >
        <div
          className="inline-flex items-center gap-2 liquid-glass rounded-full px-4 py-1.5 text-[10px] font-medium font-body mb-6 uppercase"
          style={{ color: 'var(--theme-text)', letterSpacing: '0.22em' }}
        >
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: '#f97316', boxShadow: '0 0 10px #f97316',
          }} />
          The Arsenal
        </div>
        <h2
          className="text-5xl md:text-6xl lg:text-7xl font-heading italic tracking-tight leading-[0.88]"
          style={{ color: 'var(--theme-text)' }}
        >
          Technical <span style={{
            background: 'linear-gradient(120deg, #f97316, #fbbf24 45%, #60a5fa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>Edge</span>.
        </h2>
        <p
          className="mt-5 font-body font-light text-sm md:text-base max-w-xl mx-auto"
          style={{ color: 'var(--theme-text-secondary)' }}
        >
          A curated stack of battle-tested tools — from WebGL shaders to cloud infra —
          each one earning its spot by shipping real, revenue-moving work.
        </p>
      </motion.div>

      {/* Skill Groups */}
      <div className="relative z-10 space-y-14">
        {skillGroups.map(({ category, items, accent }) => (
          <div key={category}>
            <div className="flex items-center gap-3 mb-5">
              <span
                style={{
                  width: 6, height: 6, borderRadius: 999,
                  background: accent, boxShadow: `0 0 12px ${accent}80`,
                }}
              />
              <h3 className="font-body text-xs uppercase tracking-[0.25em]" style={{ color: 'var(--theme-text-muted)' }}>
                {category}
              </h3>
              <div style={{ flex: 1, height: 1, background: 'var(--theme-border)' }} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {items.map(({ icon: Icon, name, sub }, idx) => (
                <motion.div
                  key={name}
                  className="group relative liquid-glass rounded-2xl p-5 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    overflow: 'hidden',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}`,
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${accent}25, transparent 65%)`,
                    }}
                  />
                  {/* Hairline accent on hover */}
                  <div
                    className="absolute top-0 left-1/2 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      width: '60%',
                      transform: 'translateX(-50%)',
                      background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                    }}
                  />
                  <div
                    className="rounded-full w-11 h-11 flex items-center justify-center mb-3 relative"
                    style={{
                      background: `${accent}18`,
                      border: `1px solid ${accent}30`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: accent }} />
                  </div>
                  <h4 className="font-body font-medium text-sm relative" style={{ color: 'var(--theme-text)' }}>
                    {name}
                  </h4>
                  <p className="font-body font-light text-xs mt-1 relative" style={{ color: 'var(--theme-text-muted)' }}>
                    {sub}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
