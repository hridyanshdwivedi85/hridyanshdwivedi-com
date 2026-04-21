import { motion } from 'motion/react'
import HlsVideo from './HlsVideo'
import { useTheme } from '../../context/ThemeContext'

const HLS_URL = 'https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8'

const stats = [
  { value: '50+', label: 'Projects Shipped' },
  { value: '3+',  label: 'Years Experience' },
  { value: '4K',  label: 'LinkedIn Followers' },
  { value: '99%', label: 'Passion Level' },
]

export default function Stats() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section className="relative overflow-hidden py-16 md:py-24" style={{ minHeight: 420 }}>
      {/* HLS Video Background (desaturated) */}
      <HlsVideo
        src={HLS_URL}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'saturate(0)', opacity: isDark ? 1 : 0.15, zIndex: 0 }}
      />

      {/* Top gradient fade */}
      <div
        className="absolute top-0 left-0 right-0 z-[1] pointer-events-none"
        style={{
          height: 200,
          background: `linear-gradient(to top, transparent, var(--theme-gradient-fade))`,
        }}
      />

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[1] pointer-events-none"
        style={{
          height: 200,
          background: `linear-gradient(to bottom, transparent, var(--theme-gradient-fade))`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-6 md:px-8 lg:px-16 max-w-6xl mx-auto">
        <div
          className="liquid-glass rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden"
          style={{
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)'}`,
          }}
        >
          {/* Decorative ambient glow */}
          <div
            style={{
              position: 'absolute',
              top: '-30%', left: '50%',
              transform: 'translateX(-50%)',
              width: 400, height: 400,
              background: 'radial-gradient(circle, rgba(249,115,22,0.18), transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {stats.map(({ value, label }, i) => (
              <motion.div
                key={label}
                className="text-center relative"
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Vertical separator */}
                {i > 0 && (
                  <div
                    className="hidden lg:block absolute top-1/2 left-0 w-px h-12"
                    style={{
                      transform: 'translateY(-50%)',
                      background: `linear-gradient(to bottom, transparent, ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}, transparent)`,
                    }}
                  />
                )}
                <div className="text-5xl md:text-6xl lg:text-7xl font-heading italic" style={{ color: 'var(--theme-text)' }}>
                  {value}
                </div>
                <div
                  className="mt-3 font-body uppercase tracking-[0.2em] text-[10px] md:text-xs"
                  style={{ color: 'var(--theme-text-muted)' }}
                >
                  {label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
