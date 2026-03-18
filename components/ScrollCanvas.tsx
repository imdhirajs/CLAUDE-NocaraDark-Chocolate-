'use client'
import { useRef, useEffect, useCallback, useState } from 'react'
import TextOverlay from './TextOverlay'

interface Props {
  images: HTMLImageElement[]
}

// The outer div is 500vh. The sticky inner div is 100vh.
// The sticky element is active from scrollY = 0 to scrollY = (500-100)vh = 4 * innerHeight.
// canvasProgress = scrollY / (4 * innerHeight) → goes 0→1 exactly through the canvas section.
const SECTION_HEIGHT_VH = 500
const STICKY_HEIGHT_VH = 100
const SCROLL_RANGE_VH = SECTION_HEIGHT_VH - STICKY_HEIGHT_VH // 400vh

export default function ScrollCanvas({ images }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const currentFrameRef = useRef(0)
  const rafRef = useRef<number>(0)
  const pendingRef = useRef(false)

  // Canvas-local progress: 0 → 1 across the 400vh active sticky range
  const [canvasProgress, setCanvasProgress] = useState(0)

  // ── Canvas-local scroll tracker ──────────────────────────────────────────
  useEffect(() => {
    const update = () => {
      const scrollRangePx = (SCROLL_RANGE_VH / 100) * window.innerHeight // 4 × innerHeight
      const p = Math.max(0, Math.min(window.scrollY / scrollRangePx, 1))
      setCanvasProgress(p)
    }

    window.addEventListener('scroll', update, { passive: true })
    update() // set initial value
    return () => window.removeEventListener('scroll', update)
  }, [])

  // ── Draw a frame with object-fit: cover ──────────────────────────────────
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current
    if (!canvas || images.length === 0) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = images[Math.max(0, Math.min(frameIndex, images.length - 1))]
    if (!img || !img.complete || img.naturalWidth === 0) return

    const cw = canvas.width
    const ch = canvas.height
    const iw = img.naturalWidth
    const ih = img.naturalHeight
    const scale = Math.max(cw / iw, ch / ih)
    const x = Math.round((cw - iw * scale) / 2)
    const y = Math.round((ch - ih * scale) / 2)

    ctx.clearRect(0, 0, cw, ch)
    ctx.fillStyle = '#0D0600'
    ctx.fillRect(0, 0, cw, ch)
    ctx.drawImage(img, x, y, iw * scale, ih * scale)
  }, [images])

  // ── Resize handler — keeps canvas buffer matched to display size ─────────
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const resize = () => {
      canvas.width = container.clientWidth
      canvas.height = container.clientHeight
      drawFrame(currentFrameRef.current)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(container)
    return () => ro.disconnect()
  }, [drawFrame])

  // ── Drive frames from canvas-local progress ──────────────────────────────
  useEffect(() => {
    if (images.length === 0) return

    // Mobile: skip every 2nd frame for performance
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    let frameIndex = Math.floor(canvasProgress * (images.length - 1))
    if (isMobile) frameIndex = Math.floor(frameIndex / 2) * 2
    frameIndex = Math.max(0, Math.min(frameIndex, images.length - 1))

    if (frameIndex === currentFrameRef.current) return
    currentFrameRef.current = frameIndex

    if (!pendingRef.current) {
      pendingRef.current = true
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        drawFrame(frameIndex)
        pendingRef.current = false
      })
    }
  }, [canvasProgress, images, drawFrame])

  // ── Draw first frame when images arrive ──────────────────────────────────
  useEffect(() => {
    if (images.length > 0) drawFrame(0)
  }, [images, drawFrame])

  return (
    // 500vh outer div creates the scroll distance for the sticky effect
    <div style={{ height: `${SECTION_HEIGHT_VH}vh`, position: 'relative' }}>
      {/* Sticky viewport-height container — pins for 400vh of scroll */}
      <div
        ref={containerRef}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          background: 'var(--bg-deep)',
        }}
      >
        {/* Warm glow — radial gold emanation behind canvas */}
        <div className="warm-glow" aria-hidden="true" />

        {/* Canvas — full viewport, object-fit: cover drawImage */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
          }}
        />

        {/* Text overlays — above canvas, driven by same canvas-local progress */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
          }}
        >
          <TextOverlay progress={canvasProgress} />
        </div>
      </div>
    </div>
  )
}
