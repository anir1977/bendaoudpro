import { WatchBrand } from '@/data/products'

interface Props {
  brand: WatchBrand
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function BrandLogo({ brand, className = '', size = 'md' }: Props) {
  const h = size === 'sm' ? 28 : size === 'lg' ? 56 : 40

  switch (brand) {
    case 'guess':
      return (
        <svg viewBox="0 0 120 40" height={h} className={className} aria-label="Guess">
          <polygon points="60,4 68,18 52,18" fill="#000" />
          <text x="60" y="34" textAnchor="middle" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="14" letterSpacing="3" fill="#000">GUESS</text>
        </svg>
      )

    case 'festina':
      return (
        <svg viewBox="0 0 140 36" height={h} className={className} aria-label="Festina">
          <rect x="0" y="14" width="140" height="2" fill="#C8102E" />
          <text x="70" y="26" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="15" letterSpacing="4" fill="#1a1a1a">FESTINA</text>
        </svg>
      )

    case 'daniel-cline':
      return (
        <svg viewBox="0 0 160 40" height={h} className={className} aria-label="Daniel Cline">
          <text x="80" y="16" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="400" fontSize="10" letterSpacing="3" fill="#8a7a5a">DANIEL</text>
          <text x="80" y="32" textAnchor="middle" fontFamily="Georgia, serif" fontWeight="700" fontSize="15" letterSpacing="4" fill="#1a1a1a">CLINE</text>
        </svg>
      )

    case 'guess-collection':
      return (
        <svg viewBox="0 0 160 44" height={h} className={className} aria-label="Guess Collection">
          <text x="80" y="22" textAnchor="middle" fontFamily="'Arial Black', sans-serif" fontWeight="900" fontSize="20" letterSpacing="2" fill="#1a1a1a">G·C</text>
          <text x="80" y="38" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="400" fontSize="8" letterSpacing="3" fill="#888">GUESS COLLECTION</text>
        </svg>
      )

    case 'tommy':
      return (
        <svg viewBox="0 0 180 44" height={h} className={className} aria-label="Tommy Hilfiger">
          <rect x="0" y="0" width="60" height="8" fill="#C8102E" />
          <rect x="60" y="0" width="60" height="8" fill="#FFFFFF" stroke="#ddd" strokeWidth="0.5" />
          <rect x="120" y="0" width="60" height="8" fill="#003087" />
          <text x="90" y="30" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="10" letterSpacing="2" fill="#1a1a1a">TOMMY HILFIGER</text>
        </svg>
      )

    default:
      return null
  }
}
