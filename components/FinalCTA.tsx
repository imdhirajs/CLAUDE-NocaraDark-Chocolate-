export default function FinalCTA() {
  return (
    <section
      style={{
        background: 'linear-gradient(180deg, var(--bg-section) 0%, var(--bg-deep) 100%)',
        padding: '160px 48px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {/* Gold divider above */}
      <div
        style={{
          width: '60px',
          height: '1px',
          background: 'var(--molten)',
          marginBottom: '64px',
        }}
      />

      {/* Label */}
      <div
        style={{
          fontFamily: 'var(--font-inter), Inter, sans-serif',
          fontSize: '11px',
          fontWeight: 400,
          letterSpacing: '4px',
          textTransform: 'uppercase',
          color: 'var(--molten)',
          marginBottom: '24px',
        }}
      >
        The Collection
      </div>

      {/* Heading */}
      <div
        style={{
          fontFamily: 'var(--font-playfair), "Playfair Display", serif',
          fontSize: 'clamp(40px, 6vw, 84px)',
          fontWeight: 400,
          color: 'var(--cream)',
          lineHeight: 1.05,
          letterSpacing: '-1px',
          marginBottom: '24px',
        }}
      >
        Taste the Craft.
      </div>

      {/* Subtext */}
      <div
        style={{
          fontFamily: 'var(--font-inter), Inter, sans-serif',
          fontSize: '15px',
          fontWeight: 300,
          color: 'var(--cream-muted)',
          marginBottom: '52px',
          maxWidth: '400px',
          lineHeight: 1.9,
        }}
      >
        Handcrafted in small batches. Ships worldwide.
      </div>

      {/* CTA Button */}
      <a
        href="#"
        className="cta-button"
        data-cursor="cta"
      >
        Shop the Collection →
      </a>

      {/* Fine print */}
      <div
        style={{
          fontFamily: 'var(--font-inter), Inter, sans-serif',
          fontSize: '11px',
          fontWeight: 300,
          color: 'rgba(200,168,130,0.4)',
          marginTop: '40px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
        }}
      >
        Free shipping on orders over $80
      </div>
    </section>
  )
}
