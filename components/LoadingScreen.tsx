'use client'
import { useEffect, useRef, useState } from 'react'

interface Props {
  frameCount: number
  onComplete: (images: HTMLImageElement[]) => void
}

export default function LoadingScreen({ frameCount, onComplete }: Props) {
  const [loaded, setLoaded] = useState(0)
  const [visible, setVisible] = useState(true)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const completedRef = useRef(false)

  useEffect(() => {
    if (frameCount === 0) return

    const images: HTMLImageElement[] = []
    let loadedCount = 0

    const onImageLoad = () => {
      loadedCount++
      setLoaded(loadedCount)

      if (loadedCount === frameCount && !completedRef.current) {
        completedRef.current = true
        imagesRef.current = images

        // Dismiss loading screen then hand off images
        setTimeout(() => {
          setVisible(false)
          setTimeout(() => {
            onComplete(images)
          }, 800) // match the fade duration
        }, 200)
      }
    }

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image()
      const padded = String(i).padStart(4, '0')
      img.src = `/frames/frame_${padded}.webp`
      img.onload = onImageLoad
      img.onerror = onImageLoad // count errors too so we don't hang
      images.push(img)
    }
  }, [frameCount, onComplete])

  const pct = frameCount > 0 ? Math.round((loaded / frameCount) * 100) : 0

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9000,
        background: 'var(--bg-deep)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '28px',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.8s ease',
        pointerEvents: visible ? 'all' : 'none',
      }}
    >
      {/* Brand wordmark */}
      <div
        style={{
          fontFamily: 'var(--font-inter), Inter, sans-serif',
          fontSize: '14px',
          fontWeight: 500,
          letterSpacing: '6px',
          textTransform: 'uppercase',
          color: 'var(--molten)',
        }}
      >
        NOCARA DARK
      </div>

      {/* Progress track */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: '200px',
            height: '1px',
            background: 'rgba(255,255,255,0.08)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, var(--molten), var(--molten-light))',
              transformOrigin: 'left',
              transform: `scaleX(${pct / 100})`,
              transition: 'transform 0.15s ease',
            }}
          />
        </div>

        {/* Percentage */}
        <div
          style={{
            fontFamily: 'var(--font-inter), Inter, sans-serif',
            fontSize: '11px',
            color: 'var(--cream-muted)',
            letterSpacing: '2px',
          }}
        >
          {pct}%
        </div>
      </div>
    </div>
  )
}
