import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

export default function WordsPullUpMultiStyle({ segments, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // Flatten segments → [{word, cls}]
  const allWords = []
  segments.forEach(({ text, className: cls = '' }) => {
    text.split(' ').forEach((word) => {
      if (word) allWords.push({ word, cls })
    })
  })

  return (
    <div
      ref={ref}
      className={`inline-flex flex-wrap justify-center ${className}`}
      style={{ gap: '0 0.22em' }}
    >
      {allWords.map(({ word, cls }, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <motion.span
            className={cls}
            style={{ display: 'inline-block' }}
            initial={{ y: '105%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: '105%', opacity: 0 }}
            transition={{ duration: 0.75, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  )
}
