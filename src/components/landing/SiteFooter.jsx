import { Github, Linkedin, MessageCircle } from 'lucide-react'

const linkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  fontSize: 12,
  color: 'var(--theme-text-muted)',
  textDecoration: 'none',
  transition: 'opacity 0.2s ease',
}

const links = [
  { href: 'https://github.com/hridyanshdwivedi85',   Icon: Github,        label: 'GitHub'  },
  { href: 'https://in.linkedin.com/in/hridyanshd85', Icon: Linkedin,       label: 'LinkedIn' },
  { href: 'https://wa.me/916393973524',              Icon: MessageCircle, label: 'Contact' },
]

export default function SiteFooter() {
  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 5,
        background: 'var(--theme-bg)',
        borderTop: '1px solid var(--theme-border)',
        padding: '28px 24px',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <span className="font-body" style={{ fontSize: 12, color: 'var(--theme-text-muted)' }}>
          &copy; 2026 Hridyansh Dwivedi · All rights reserved.
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          {links.map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="font-body"
              style={linkStyle}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <Icon size={14} /> {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
