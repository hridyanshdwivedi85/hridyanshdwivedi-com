import { useRef } from 'react'
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle'
import AnimatedText from './AnimatedText'

const CREAM = '#E1E0CC'

const BODY_TEXT =
  'For the past three years I have operated at the intersection of systems design and digital craft — ' +
  'shipping bespoke SaaS infrastructure, conversion-first web platforms, and immersive 3D interfaces for ' +
  'clients across three continents. Translating ambition into working software, one deliberate line at a time.'

const headingSegments = [
  {
    text: 'I am Hridyansh Dwivedi,',
    className: 'font-display font-normal',
  },
  {
    text: 'born in Kanpur, built on the internet.',
    className: 'font-serif italic',
  },
  {
    text: 'I architect systems that move revenue.',
    className: 'font-display font-normal',
  },
]

export default function StartSection() {
  const sectionRef = useRef(null)

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ background: '#000', padding: 'clamp(48px,6vw,96px) clamp(16px,4vw,40px)' }}
    >
      {/* Inner card */}
      <div
        style={{
          background: '#101010',
          borderRadius: 'clamp(20px, 2.5vw, 32px)',
          padding: 'clamp(48px,5vw,80px) clamp(24px,4vw,72px)',
          maxWidth: 1100,
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle top glow */}
        <div
          style={{
            position: 'absolute', top: 0, left: '50%',
            transform: 'translateX(-50%)',
            width: '60%', height: 1,
            background: `linear-gradient(90deg, transparent, ${CREAM}30, transparent)`,
            pointerEvents: 'none',
          }}
        />

        {/* Label */}
        <div
          style={{
            display: 'inline-block',
            fontFamily: "'Almarai', sans-serif",
            fontSize: 'clamp(9px, 1vw, 11px)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: CREAM,
            marginBottom: 'clamp(20px, 2.5vw, 32px)',
            opacity: 0.85,
          }}
        >
          About Me
        </div>

        {/* Mixed-style heading */}
        <div
          style={{
            fontSize: 'clamp(28px, 4.5vw, 72px)',
            lineHeight: 0.95,
            marginBottom: 'clamp(28px, 3.5vw, 52px)',
            color: CREAM,
          }}
        >
          <WordsPullUpMultiStyle
            segments={headingSegments}
            className="text-center"
          />
        </div>

        {/* Scroll-linked character reveal */}
        <div
          style={{
            maxWidth: 680,
            margin: '0 auto',
            fontFamily: "'Almarai', sans-serif",
            fontSize: 'clamp(12px, 1.2vw, 16px)',
            lineHeight: 1.65,
            color: CREAM,
          }}
        >
          <AnimatedText text={BODY_TEXT} containerRef={sectionRef} />
        </div>
      </div>
    </section>
  )
}
