'use client'

interface Props {
  progress: number
}

/**
 * Returns 0–1 opacity for a section given its visible range.
 * Fades in over fadeZone before start, fades out over fadeZone after end.
 */
function sectionOpacity(
  progress: number,
  start: number,
  end: number,
  fadeZone = 0.04
): number {
  const fadeStart = start - fadeZone
  const fadeEnd = end + fadeZone

  if (progress <= fadeStart || progress >= fadeEnd) return 0
  if (progress < start) return (progress - fadeStart) / fadeZone
  if (progress > end) return 1 - (progress - end) / fadeZone
  return 1
}

const LABEL_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-inter), Inter, sans-serif',
  fontSize: '11px',
  fontWeight: 400,
  letterSpacing: '4px',
  textTransform: 'uppercase',
  color: 'var(--molten)',
  marginBottom: '16px',
}

const SUBTEXT_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-inter), Inter, sans-serif',
  fontSize: '16px',
  fontWeight: 300,
  lineHeight: 1.9,
  color: 'var(--cream-muted)',
  marginTop: '24px',
}

export default function TextOverlay({ progress }: Props) {
  const s1 = sectionOpacity(progress, 0, 0.22)
  const s2 = sectionOpacity(progress, 0.30, 0.55)
  const s3 = sectionOpacity(progress, 0.60, 0.78)
  const s4 = sectionOpacity(progress, 0.84, 1.0)

  return (
    <>
      {/* ─── Section 1: Single Origin — bottom-left ─── */}
      <div
        style={{
          position: 'absolute',
          left: '10%',
          bottom: '15%',
          opacity: s1,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          maxWidth: '480px',
        }}
        aria-hidden={s1 === 0}
      >
        <div style={LABEL_STYLE}>Single Origin</div>
        <div
          style={{
            fontFamily: 'var(--font-playfair), "Playfair Display", serif',
            fontSize: 'clamp(52px, 6vw, 84px)',
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 1.0,
            letterSpacing: '-1px',
            background: 'var(--gradient-text)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Dark.<br />Pure.<br />Obsessive.
        </div>
        <div style={SUBTEXT_STYLE}>
          Crafted from single-origin cocoa beans.
        </div>
      </div>

      {/* ─── Section 2: The Melt Moment — top-right ─── */}
      <div
        style={{
          position: 'absolute',
          right: '8%',
          top: '18%',
          opacity: s2,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          maxWidth: '420px',
          textAlign: 'right',
        }}
        aria-hidden={s2 === 0}
      >
        <div style={{ ...LABEL_STYLE, textAlign: 'right' }}>The Melt Moment</div>
        <div
          style={{
            fontFamily: 'var(--font-playfair), "Playfair Display", serif',
            fontSize: 'clamp(44px, 5.5vw, 76px)',
            fontWeight: 500,
            lineHeight: 1.05,
            letterSpacing: '-1px',
            color: 'var(--cream)',
          }}
        >
          The Melt<br />Moment.
        </div>
        <div style={{ ...SUBTEXT_STYLE, textAlign: 'right' }}>
          72% dark. 100% real.
        </div>
      </div>

      {/* ─── Section 3: Reborn — center ─── */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: s3,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
          textAlign: 'center',
          width: '100%',
          padding: '0 24px',
        }}
        aria-hidden={s3 === 0}
      >
        <div style={{ ...LABEL_STYLE, textAlign: 'center' }}>Reborn</div>
        <div
          style={{
            fontFamily: 'var(--font-playfair), "Playfair Display", serif',
            fontSize: 'clamp(52px, 7vw, 92px)',
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 1.0,
            letterSpacing: '-1px',
            background: 'var(--gradient-reborn)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Reborn<br />Every Time.
        </div>
        <div style={{ ...SUBTEXT_STYLE, textAlign: 'center' }}>
          Every bar made to be broken.
        </div>
      </div>

      {/* ─── Section 4: CTA — center ─── */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: s4,
          transition: 'opacity 0.3s ease',
          pointerEvents: s4 > 0.1 ? 'auto' : 'none',
          textAlign: 'center',
          width: '100%',
          padding: '0 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0',
        }}
        aria-hidden={s4 === 0}
      >
        <div
          style={{
            fontFamily: 'var(--font-playfair), "Playfair Display", serif',
            fontSize: 'clamp(48px, 6.5vw, 96px)',
            fontWeight: 400,
            lineHeight: 1.0,
            letterSpacing: '-1px',
            color: 'var(--cream)',
            marginBottom: '20px',
          }}
        >
          Taste the Craft.
        </div>
        <div
          style={{
            fontFamily: 'var(--font-inter), Inter, sans-serif',
            fontSize: '15px',
            fontWeight: 300,
            color: 'var(--cream-muted)',
            marginBottom: '40px',
          }}
        >
          Handcrafted in small batches. Ships worldwide.
        </div>
        <a
          href="#collection"
          className="cta-button"
          data-cursor="cta"
          style={{ display: 'inline-block' }}
        >
          Shop the Collection →
        </a>
      </div>
    </>
  )
}
