'use client'
import { useState, useCallback } from 'react'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import LoadingScreen from '@/components/LoadingScreen'
import Navbar from '@/components/Navbar'
import ScrollProgressBar from '@/components/ScrollProgressBar'
import ScrollCanvas from '@/components/ScrollCanvas'
import OriginSection from '@/components/OriginSection'
import ProcessQuote from '@/components/ProcessQuote'
import TastingNotes from '@/components/TastingNotes'
import FinalCTA from '@/components/FinalCTA'

// 127 frames extracted at 24fps from Chocolate 1.mp4
const FRAME_COUNT = 127

export default function Home() {
  const [images, setImages] = useState<HTMLImageElement[]>([])
  const [siteReady, setSiteReady] = useState(false)

  // Global page progress — used only for the 1px scroll progress bar at top
  const globalProgress = useScrollProgress()

  const handleLoadComplete = useCallback((loadedImages: HTMLImageElement[]) => {
    setImages(loadedImages)
    setSiteReady(true)
  }, [])

  return (
    <>
      {/* Loading screen — gates everything until frames preloaded */}
      {!siteReady && (
        <LoadingScreen frameCount={FRAME_COUNT} onComplete={handleLoadComplete} />
      )}

      {/* Main site — fades in after loading */}
      <main
        style={{
          opacity: siteReady ? 1 : 0,
          transition: 'opacity 0.7s ease',
        }}
      >
        {/* Fixed UI elements */}
        <Navbar />
        {/* ScrollProgressBar uses global progress (full page scroll) */}
        <ScrollProgressBar progress={globalProgress} />

        {/* ScrollCanvas manages its OWN canvas-local progress internally.
            canvasProgress = scrollY / (400vh) → 0..1 through the 500vh sticky section.
            This ensures all 127 frames play before below-fold content appears. */}
        {siteReady && (
          <ScrollCanvas images={images} />
        )}

        {/* Below-fold content sections */}
        <OriginSection />
        <ProcessQuote />
        <TastingNotes />
        <FinalCTA />
      </main>
    </>
  )
}
