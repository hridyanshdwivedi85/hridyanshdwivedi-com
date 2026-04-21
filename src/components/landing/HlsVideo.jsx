import { useEffect, useRef } from 'react'

export default function HlsVideo({ src, className = '', style = {} }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !src) return

    let hls
    let cancelled = false

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS (Safari, modern Chrome)
      video.src = src
      video.play().catch(() => {})
    } else {
      import('hls.js').then(({ default: Hls }) => {
        if (cancelled) return
        if (!Hls.isSupported()) return
        hls = new Hls({ autoStartLoad: true, startLevel: -1 })
        hls.loadSource(src)
        hls.attachMedia(video)
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => {})
        })
      })
    }

    return () => {
      cancelled = true
      if (hls) hls.destroy()
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      className={className}
      style={style}
    />
  )
}
