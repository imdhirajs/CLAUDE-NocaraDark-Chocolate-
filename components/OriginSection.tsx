export default function OriginSection() {
  const columns = [
    {
      icon: (
        // Cocoa bean SVG
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="20" cy="20" rx="9" ry="14" stroke="#D4831A" strokeWidth="1.2" fill="none"/>
          <path d="M20 6 C 24 10, 26 15, 20 20 C 14 25, 16 30, 20 34" stroke="#D4831A" strokeWidth="1" strokeLinecap="round" fill="none"/>
          <path d="M20 6 C 16 10, 14 15, 20 20 C 26 25, 24 30, 20 34" stroke="#D4831A" strokeWidth="1" strokeLinecap="round" fill="none"/>
          <circle cx="20" cy="20" r="2" fill="#D4831A" opacity="0.5"/>
        </svg>
      ),
      label: 'Bean to Bar',
      heading: 'Single Estate',
      body: 'Every bean traced to a single farm. We visit each harvest — the provenance is the flavour.',
    },
    {
      icon: (
        // Stone mill SVG
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="13" stroke="#D4831A" strokeWidth="1.2" fill="none"/>
          <circle cx="20" cy="20" r="4" stroke="#D4831A" strokeWidth="1.2" fill="none"/>
          <line x1="20" y1="7" x2="20" y2="16" stroke="#D4831A" strokeWidth="1"/>
          <line x1="20" y1="24" x2="20" y2="33" stroke="#D4831A" strokeWidth="1"/>
          <line x1="7" y1="20" x2="16" y2="20" stroke="#D4831A" strokeWidth="1"/>
          <line x1="24" y1="20" x2="33" y2="20" stroke="#D4831A" strokeWidth="1"/>
          <line x1="10.9" y1="10.9" x2="17.2" y2="17.2" stroke="#D4831A" strokeWidth="1"/>
          <line x1="22.8" y1="22.8" x2="29.1" y2="29.1" stroke="#D4831A" strokeWidth="1"/>
        </svg>
      ),
      label: 'Stone Ground',
      heading: 'Ancient Method',
      body: 'Stone-ground for 72 hours. No shortcuts — the friction builds the complexity.',
    },
    {
      icon: (
        // Small batch jar SVG
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="16" width="16" height="18" rx="2" stroke="#D4831A" strokeWidth="1.2" fill="none"/>
          <path d="M15 16 V13 C15 11.9 15.9 11 17 11 H23 C24.1 11 25 11.9 25 13 V16" stroke="#D4831A" strokeWidth="1.2" fill="none"/>
          <line x1="20" y1="21" x2="20" y2="29" stroke="#D4831A" strokeWidth="1" strokeDasharray="1 2"/>
          <line x1="16" y1="25" x2="24" y2="25" stroke="#D4831A" strokeWidth="1" strokeDasharray="1 2"/>
        </svg>
      ),
      label: 'Small Batch',
      heading: 'Limited Release',
      body: 'Maximum 200 bars per batch. Each one numbered. When it\'s gone, it\'s gone.',
    },
  ]

  return (
    <section
      id="origin"
      style={{
        background: 'var(--bg-section)',
        padding: '120px 0',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 48px',
        }}
      >
        {/* Section label */}
        <div
          style={{
            fontFamily: 'var(--font-inter), Inter, sans-serif',
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: 'var(--molten)',
            marginBottom: '64px',
            textAlign: 'center',
          }}
        >
          The Craft
        </div>

        {/* 3-column grid */}
        <div
          className="origin-cols-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0',
          }}
        >
          {columns.map((col, i) => (
            <div
              key={col.label}
              style={{
                padding: '0 48px',
                borderRight: i < 2 ? '1px solid rgba(212,131,26,0.12)' : 'none',
                borderLeft: i > 0 ? 'none' : 'none',
              }}
            >
              {/* Icon */}
              <div style={{ marginBottom: '24px' }}>{col.icon}</div>

              {/* Label */}
              <div
                style={{
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  fontSize: '11px',
                  fontWeight: 400,
                  letterSpacing: '4px',
                  textTransform: 'uppercase',
                  color: 'var(--molten)',
                  marginBottom: '16px',
                }}
              >
                {col.label}
              </div>

              {/* Heading */}
              <div
                style={{
                  fontFamily: 'var(--font-playfair), "Playfair Display", serif',
                  fontSize: '26px',
                  fontWeight: 400,
                  color: 'var(--cream)',
                  marginBottom: '16px',
                  lineHeight: 1.2,
                }}
              >
                {col.heading}
              </div>

              {/* Body */}
              <div
                style={{
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  fontSize: '15px',
                  fontWeight: 300,
                  lineHeight: 1.9,
                  color: 'var(--cream-muted)',
                }}
              >
                {col.body}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
