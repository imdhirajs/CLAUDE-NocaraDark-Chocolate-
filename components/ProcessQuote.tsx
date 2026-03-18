export default function ProcessQuote() {
  return (
    <section
      id="process"
      style={{
        background: 'var(--bg-deep)',
        padding: '140px 48px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {/* Gold divider — above */}
      <div
        style={{
          width: '60px',
          height: '1px',
          background: 'var(--molten)',
          marginBottom: '64px',
        }}
      />

      {/* Quote */}
      <blockquote
        style={{
          fontFamily: 'var(--font-playfair), "Playfair Display", serif',
          fontSize: 'clamp(28px, 4vw, 52px)',
          fontWeight: 400,
          fontStyle: 'italic',
          color: 'var(--cream)',
          lineHeight: 1.3,
          letterSpacing: '-0.5px',
          maxWidth: '820px',
          margin: '0',
        }}
      >
        &ldquo;72 hours of conching.<br />Zero compromises.&rdquo;
      </blockquote>

      {/* Gold divider — below */}
      <div
        style={{
          width: '60px',
          height: '1px',
          background: 'var(--molten)',
          marginTop: '64px',
        }}
      />
    </section>
  )
}
