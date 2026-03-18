'use client'
import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const innerRef = useRef<HTMLDivElement>(null)
  const outerRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: -100, y: -100 })
  const outerPos = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number>(0)
  const [isCTA, setIsCTA] = useState(false)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }

      // Update inner cursor instantly via ref (no re-render)
      if (innerRef.current) {
        innerRef.current.style.left = `${e.clientX}px`
        innerRef.current.style.top = `${e.clientY}px`
      }

      // Check if hovering a CTA element
      const target = e.target as HTMLElement
      const isCTATarget = !!(target.closest('[data-cursor="cta"]'))
      setIsCTA(isCTATarget)
    }

    const animate = () => {
      // Lerp outer cursor toward mouse — ~100ms lag feel
      outerPos.current.x += (mousePos.current.x - outerPos.current.x) * 0.12
      outerPos.current.y += (mousePos.current.y - outerPos.current.y) * 0.12

      if (outerRef.current) {
        outerRef.current.style.left = `${outerPos.current.x}px`
        outerRef.current.style.top = `${outerPos.current.y}px`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div ref={innerRef} className="cursor-inner" />
      <div ref={outerRef} className={`cursor-outer${isCTA ? ' cursor-cta' : ''}`} />
    </>
  )
}
