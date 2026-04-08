interface Props {
  variant?: 'full' | 'compact'
  height?: number
}

// Full logo: symbol + BEN DAOUD + HAUTE JOAILLERIE (pour footer, splash)
// Compact: symbol + texte côte à côte (pour navbar)
export default function SiteLogo({ variant = 'compact', height = 52 }: Props) {
  const gold = '#C8A951'
  const goldFade = 'rgba(200,169,81,0.22)'

  const Symbol = () => (
    <svg viewBox="0 0 200 230" xmlns="http://www.w3.org/2000/svg" height={variant === 'full' ? 140 : height}>
      {/* Diamond facets */}
      <polygon points="100,8 182,88 100,222 18,88" fill={goldFade} stroke={gold} strokeWidth="1.2"/>
      <line x1="100" y1="8"  x2="60"  y2="88"  stroke={gold} strokeWidth="0.7" opacity="0.55"/>
      <line x1="100" y1="8"  x2="140" y2="88"  stroke={gold} strokeWidth="0.7" opacity="0.55"/>
      <line x1="18"  y1="88" x2="182" y2="88"  stroke={gold} strokeWidth="0.7" opacity="0.45"/>
      <line x1="60"  y1="88" x2="100" y2="222" stroke={gold} strokeWidth="0.7" opacity="0.45"/>
      <line x1="140" y1="88" x2="100" y2="222" stroke={gold} strokeWidth="0.7" opacity="0.45"/>
      <line x1="60"  y1="48" x2="140" y2="48"  stroke={gold} strokeWidth="0.7" opacity="0.4"/>
      <line x1="100" y1="8"  x2="60"  y2="48"  stroke={gold} strokeWidth="0.7" opacity="0.4"/>
      <line x1="100" y1="8"  x2="140" y2="48"  stroke={gold} strokeWidth="0.7" opacity="0.4"/>

      {/* Crown base */}
      <path d="M68,92 Q100,88 132,92 L126,112 Q100,108 74,112 Z" fill={gold}/>
      {/* Crown left spike */}
      <path d="M74,112 L68,92 L58,74 L66,82 L74,92 Z" fill={gold}/>
      {/* Crown center spike (tall) */}
      <path d="M82,112 L90,90 L100,66 L110,90 L118,112 Z" fill={gold}/>
      {/* Crown right spike */}
      <path d="M126,112 L132,92 L142,74 L134,82 L126,92 Z" fill={gold}/>
      {/* Crown orbs */}
      <circle cx="58"  cy="72" r="4.5" fill={gold}/>
      <circle cx="100" cy="63" r="4.5" fill={gold}/>
      <circle cx="142" cy="72" r="4.5" fill={gold}/>
      <circle cx="78"  cy="82" r="3.5" fill={gold}/>
      <circle cx="122" cy="82" r="3.5" fill={gold}/>

      {/* BD monogram */}
      <text
        x="100" y="178"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="76"
        fontWeight="bold"
        fill={gold}
        letterSpacing="-2"
      >BD</text>

      {/* Ring detail on D */}
      <ellipse cx="127" cy="134" rx="16" ry="6"
               fill="none" stroke={gold} strokeWidth="2.5" opacity="0.75"
               transform="rotate(-18,127,134)"/>
    </svg>
  )

  if (variant === 'full') {
    return (
      <div className="flex flex-col items-center">
        <Symbol />
        <p
          style={{ color: gold, fontFamily: "Georgia, 'Times New Roman', serif", letterSpacing: '0.18em', fontSize: '2rem', fontWeight: 700, marginTop: '8px', lineHeight: 1 }}
        >
          BEN DAOUD
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px' }}>
          <span style={{ display: 'block', height: '1px', width: '40px', background: gold }} />
          <p style={{ color: gold, fontFamily: "Georgia, serif", letterSpacing: '0.28em', fontSize: '0.7rem' }}>
            HAUTE JOAILLERIE
          </p>
          <span style={{ display: 'block', height: '1px', width: '40px', background: gold }} />
        </div>
      </div>
    )
  }

  // Compact: symbol + text side by side
  return (
    <div className="flex items-center gap-3">
      <Symbol />
      <div className="flex flex-col leading-tight">
        <span
          style={{ color: '#1a1a1a', fontFamily: "Georgia, 'Times New Roman', serif", letterSpacing: '0.16em', fontSize: '1.25rem', fontWeight: 700 }}
        >
          BEN DAOUD
        </span>
        <span
          style={{ color: gold, fontFamily: "Georgia, serif", letterSpacing: '0.25em', fontSize: '0.6rem' }}
        >
          HAUTE JOAILLERIE
        </span>
      </div>
    </div>
  )
}
