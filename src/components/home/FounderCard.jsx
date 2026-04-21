import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import ProfileCard from './ProfileCard'
import { useTheme } from '../../context/ThemeContext'

export default function FounderCard() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  // Detect mobile to disable heavy animations
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <section className="relative py-20 md:py-32 px-6 md:px-8 lg:px-16 max-w-7xl mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Left: copy — shown FIRST on mobile */}
        <div className="order-1 lg:order-1">
          <div
            className="inline-block liquid-glass rounded-full px-3.5 py-1 text-xs font-medium font-body mb-6"
            style={{ color: 'var(--theme-text)' }}
          >
            Founder
          </div>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-heading italic tracking-tight leading-[0.9] mb-6"
            style={{ color: 'var(--theme-text)' }}
          >
            One operator. <br />
            Full stack.
          </h2>
          <p
            className="font-body font-light text-base md:text-lg max-w-md mb-6"
            style={{ color: 'var(--theme-text-secondary)' }}
          >
            Hridyansh Dwivedi — systems architect, aesthetic engineer, and
            founder of the InSeconds Ultra stack. I build production-grade
            software for operators who refuse to wait on committees, roadmaps,
            or permission slips.
          </p>

          {/* Quick stats row */}
          <div className="flex items-center gap-8 pt-6" style={{ borderTop: `1px solid var(--theme-border)` }}>
            <div>
              <div
                className="text-3xl font-heading italic"
                style={{ color: 'var(--theme-text)' }}
              >
                3+
              </div>
              <div
                className="text-xs font-body uppercase tracking-widest mt-1"
                style={{ color: 'var(--theme-text-muted)' }}
              >
                Years shipping
              </div>
            </div>
            <div>
              <div
                className="text-3xl font-heading italic"
                style={{ color: 'var(--theme-text)' }}
              >
                50K+
              </div>
              <div
                className="text-xs font-body uppercase tracking-widest mt-1"
                style={{ color: 'var(--theme-text-muted)' }}
              >
                Leads handled
              </div>
            </div>
            <div>
              <div
                className="text-3xl font-heading italic"
                style={{ color: 'var(--theme-text)' }}
              >
                ∞
              </div>
              <div
                className="text-xs font-body uppercase tracking-widest mt-1"
                style={{ color: 'var(--theme-text-muted)' }}
              >
                Vibe ratio
              </div>
            </div>
          </div>
        </div>

        {/* Right: profile card — shown AFTER copy on mobile */}
        <div className="order-2 lg:order-2 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 60, rotateY: -25, scale: 0.85 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.15,
            }}
            style={{
              maxWidth: isMobile ? 320 : 380,
              width: '100%',
              perspective: isMobile ? 800 : 1200,
              transformStyle: 'preserve-3d',
            }}
          >
            {isMobile ? (
              /* No floating animation on mobile — saves GPU */
              <div style={{ willChange: 'auto' }}>
                <ProfileCard
                  name="Hridyansh Dwivedi"
                  title="CEO"
                  handle="hridyanshd85"
                  status="Available"
                  contactText="WhatsApp"
                  avatarUrl="/assets/images/profile.jpg"
                  miniAvatarUrl="/assets/images/profile.jpg"
                  showUserInfo={true}
                  enableTilt={false}
                  enableMobileTilt={false}
                  behindGlowEnabled={false}
                  onContactClick={() => window.open('https://wa.me/916393973524', '_blank')}
                />
              </div>
            ) : (
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 6,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'mirror',
                }}
                style={{ willChange: 'transform' }}
              >
                <ProfileCard
                  name="Hridyansh Dwivedi"
                  title="CEO"
                  handle="hridyanshd85"
                  status="Available"
                  contactText="WhatsApp"
                  avatarUrl="/assets/images/profile.jpg"
                  miniAvatarUrl="/assets/images/profile.jpg"
                  showUserInfo={true}
                  enableTilt={true}
                  enableMobileTilt={false}
                  behindGlowEnabled={true}
                  onContactClick={() => window.open('https://wa.me/916393973524', '_blank')}
                />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
