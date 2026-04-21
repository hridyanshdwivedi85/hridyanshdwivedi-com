import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

export default function WordsPullUp({ text, className = '', showAsterisk = false }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const words = text.split(' ')

  return (
    <span ref={ref} className={className} style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0 0.22em' }}>
      {words.map((word, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block', paddingBottom: '0.25em', marginBottom: '-0.25em' }}>
          <motion.span
            style={{ display: 'inline-block', position: 'relative' }}
            initial={{ y: '105%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: '105%', opacity: 0 }}
            transition={{ duration: 0.75, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
            {showAsterisk && i === words.length - 1 && (
              <sup
                style={{
                  position: 'absolute',
                  top: '0.65em',
                  right: '-0.35em',
                  fontSize: '0.28em',
                  fontFamily: 'Barlow, sans-serif',
                  fontStyle: 'normal',
                  lineHeight: 1,
                }}
              >
                ✦
              </sup>
            )}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
