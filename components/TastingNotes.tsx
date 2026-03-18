'use client'

interface Card {
  pct: number
  label: string
  name: string
  notes: string[]
}

const CARDS: Card[] = [
  {
    pct: 72,
    label: '72% — Dark Intensity',
    name: 'Dark Intensity',
    notes: ['Dark cherry', 'Roasted tobacco', 'Long finish', 'Velvet texture'],
  },
  {
    pct: 85,
    label: '85% — Forest Bitter',
    name: 'Forest Bitter',
    notes: ['Green walnut', 'Earth & moss', 'Bitter orange peel', 'Mineral close'],
  },
  {
    pct: 92,
    label: '92% — Pure Origin',
    name: 'Pure Origin',
    notes: ['Raw cacao', 'Smoked cedar', 'Dried fig', 'Astringent clarity'],
  },
]

function PercentageCircle({ pct }: { pct: number }) {
  const radius = 32
  const circumference = 2 * Math.PI * radius
  const filled = (pct / 100) * circumference

  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      style={{ marginBottom: '24px' }}
    >
      {/* Track */}
      <circle
        cx="40"
        cy="40"
        r={radius}
        fill="none"
        stroke="rgba(212,131,26,0.12)"
        strokeWidth="1.5"
      />
      {/* Fill — rotated so it starts at top */}
      <circle
        cx="40"
        cy="40"
        r={radius}
        fill="none"
        stroke="#D4831A"
        strokeWidth="1.5"
        strokeDasharray={`${filled} ${circumference}`}
        strokeLinecap="round"
        transform="rotate(-90 40 40)"
        style={{
          filter: 'drop-shadow(0 0 4px rgba(212,131,26,0.6))',
        }}
      />
      {/* Percentage text */}
      <text
        x="40"
        y="40"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="#D4831A"
        fontFamily="var(--font-inter), Inter, sans-serif"
        fontSize="14"
        fontWeight="400"
        letterSpacing="1"
      >
        {pct}%
      </text>
    </svg>
  )
}

export default function TastingNotes() {
  return (
    <section
      id="collection"
      style={{
        background: 'var(--bg-section)',
        padding: '120px 48px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div
            style={{
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '4px',
              textTransform: 'uppercase',
              color: 'var(--molten)',
              marginBottom: '20px',
            }}
          >
            Tasting Notes
          </div>
          <div
            style={{
              fontFamily: 'var(--font-playfair), "Playfair Display", serif',
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 400,
              color: 'var(--cream)',
              letterSpacing: '-0.5px',
            }}
          >
            Three expressions of darkness.
          </div>
        </div>

        {/* Cards grid */}
        <div
          className="tasting-cards-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}
        >
          {CARDS.map((card) => (
            <div key={card.pct} className="tasting-card">
              <PercentageCircle pct={card.pct} />

              {/* Label */}
              <div
                style={{
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  fontSize: '11px',
                  fontWeight: 400,
                  letterSpacing: '4px',
                  textTransform: 'uppercase',
                  color: 'var(--molten)',
                  marginBottom: '12px',
                }}
              >
                {card.label}
              </div>

              {/* Name */}
              <div
                style={{
                  fontFamily: 'var(--font-playfair), "Playfair Display", serif',
                  fontSize: '26px',
                  fontWeight: 400,
                  color: 'var(--cream)',
                  marginBottom: '24px',
                  lineHeight: 1.2,
                }}
              >
                {card.name}
              </div>

              {/* Notes */}
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {card.notes.map((note) => (
                  <li
                    key={note}
                    style={{
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                      fontSize: '14px',
                      fontWeight: 300,
                      color: 'var(--cream-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        background: 'var(--molten)',
                        flexShrink: 0,
                      }}
                    />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
