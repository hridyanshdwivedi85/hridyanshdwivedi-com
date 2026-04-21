import { motion } from 'motion/react'
import HlsVideo from './HlsVideo'
import { useTheme } from '../../context/ThemeContext'

const HLS_URL = 'https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8'

export default function CtaFooter() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section id="contact" className="relative overflow-hidden" style={{ minHeight: 560 }}>
      {/* HLS Video Background */}
      <HlsVideo
        src={HLS_URL}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: isDark ? 1 : 0.15, zIndex: 0 }}
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
      <div className="relative z-10 flex flex-col items-center text-center py-32 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-6xl lg:text-7xl font-heading italic leading-[0.85] max-w-3xl"
          style={{ color: 'var(--theme-text)' }}
        >
          Let's build something remarkable.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-body font-light text-sm md:text-base max-w-lg"
          style={{ color: 'var(--theme-text-secondary)' }}
        >
          Open to freelance briefs, full-time roles, and ambitious collaborations.
          I respond within 24 hours.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 flex items-center gap-4">
          <a
            href="https://wa.me/916393973524"
            target="_blank"
            rel="noreferrer"
            className="liquid-glass-strong rounded-full px-6 py-3 font-body text-sm font-medium"
            style={{ color: 'var(--theme-text)' }}
          >
            WhatsApp Me
          </a>
          <a
            href="https://in.linkedin.com/in/hridyanshd85"
            target="_blank"
            rel="noreferrer"
            className="rounded-full px-6 py-3 font-body text-sm font-medium transition-colors"
            style={{
              backgroundColor: 'var(--theme-btn-primary-bg)',
              color: 'var(--theme-btn-primary-text)',
            }}
          >
            LinkedIn
          </a>
        </motion.div>
      </div>
    </section>
  )
}
