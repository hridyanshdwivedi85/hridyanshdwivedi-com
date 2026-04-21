import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'

function AnimatedWord({ word, scrollYProgress, index, total }) {
  const start = Math.max(0, index / total - 0.08)
  const end = Math.min(1, index / total + 0.06)
  const opacity = useTransform(scrollYProgress, [start, end], [0.18, 1])
  return (
    <motion.span style={{ opacity, display: 'inline-block', marginRight: '0.28em', willChange: 'opacity', transform: 'translateZ(0)' }}>
      {word}
    </motion.span>
  )
}

export default function AnimatedText({ text, className = '', containerRef }) {
  const ownRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef || ownRef,
    offset: ['start 0.85', 'end 0.3'],
  })

  const words = text.split(/\s+/).filter(Boolean)

  return (
    <span ref={ownRef} className={className} style={{ display: 'inline' }}>
      {words.map((word, i) => (
        <AnimatedWord
          key={i}
          word={word}
          scrollYProgress={scrollYProgress}
          index={i}
          total={words.length}
        />
      ))}
    </span>
  )
}
