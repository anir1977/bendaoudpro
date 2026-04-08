export type Category =
  | 'collier'
  | 'bague'
  | 'bracelet'
  | 'bague-mariage'
  | 'gourmette'
  | 'boucle-doreille'
  | 'parure'
  | 'sautoire'
  | 'broche'

export type WatchBrand = 'guess' | 'festina' | 'daniel-cline' | 'guess-collection' | 'tommy'
export type WatchGender = 'femme' | 'homme'

export interface Bijou {
  id: string
  name: string
  category: Category
  image: string
  description: string
  material: string
}

export interface Montre {
  id: string
  name: string
  brand: WatchBrand
  gender: WatchGender
  image: string
  description: string
}

export const categoryLabels: Record<Category, string> = {
  collier: 'Colliers',
  bague: 'Bagues',
  bracelet: 'Bracelets',
  'bague-mariage': 'Bagues de Mariage',
  gourmette: 'Gourmettes',
  'boucle-doreille': "Boucles d'Oreilles",
  parure: 'Parures',
  sautoire: 'Sautoires',
  broche: 'Broches',
}

export const brandLabels: Record<WatchBrand, string> = {
  guess: 'Guess',
  festina: 'Festina',
  'daniel-cline': 'Daniel Cline',
  'guess-collection': 'Guess Collection',
  tommy: 'Tommy Hilfiger',
}

export const bijoux: Bijou[] = [
  // Colliers
  {
    id: 'col-001',
    name: 'Collier Fantaisie Or 18K',
    category: 'collier',
    image: '/slide1.jpg',
    description: "Collier élégant en or 18 carats, finition brillante. Un bijou intemporel qui sublimera toutes vos tenues.",
    material: 'Or 18 carats',
  },
  {
    id: 'col-002',
    name: 'Collier Pendentif Cœur',
    category: 'collier',
    image: '/slide2.jpg',
    description: "Collier avec pendentif en forme de cœur, en or jaune 18 carats. Idéal pour offrir.",
    material: 'Or 18 carats',
  },
  {
    id: 'col-003',
    name: 'Collier Chaîne Fine Or',
    category: 'collier',
    image: '/slide3.jpg',
    description: "Chaîne fine en or 18 carats, sobre et raffinée. Parfaite pour un port quotidien.",
    material: 'Or 18 carats',
  },

  // Bagues
  {
    id: 'bag-001',
    name: 'Bague Solitaire Or',
    category: 'bague',
    image: '/slide5.jpg',
    description: "Bague solitaire en or 18 carats, finition polie. Élégance et simplicité réunies.",
    material: 'Or 18 carats',
  },
  {
    id: 'bag-002',
    name: 'Bague Jonc Torsadé',
    category: 'bague',
    image: 'https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?w=600&q=80&fit=crop',
    description: "Bague jonc torsadé en or 18 carats. Un design moderne et sophistiqué.",
    material: 'Or 18 carats',
  },

  // Bracelets
  {
    id: 'bra-001',
    name: 'Bracelet Chaîne Or',
    category: 'bracelet',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80&fit=crop',
    description: "Bracelet chaîne en or 18 carats, fermoir à cliquet. Souplesse et raffinement.",
    material: 'Or 18 carats',
  },
  {
    id: 'bra-002',
    name: 'Bracelet Jonc Plat',
    category: 'bracelet',
    image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&q=80&fit=crop',
    description: "Bracelet jonc plat en or 18 carats, intérieur confort. Un classique intemporel.",
    material: 'Or 18 carats',
  },

  // Bagues de Mariage
  {
    id: 'mar-001',
    name: 'Alliance Classique Lisse',
    category: 'bague-mariage',
    image: 'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=600&q=80&fit=crop',
    description: "Alliance lisse en or 18 carats, symbole d'union éternelle. Disponible en plusieurs largeurs.",
    material: 'Or 18 carats',
  },
  {
    id: 'mar-002',
    name: 'Alliance Demi-Jonc Diamanté',
    category: 'bague-mariage',
    image: 'https://images.unsplash.com/photo-1588421357574-87938a86fa28?w=600&q=80&fit=crop',
    description: "Alliance demi-jonc en or 18 carats avec pavage diamants. Pour un jour inoubliable.",
    material: 'Or 18 carats & Diamants',
  },

  // Gourmettes
  {
    id: 'gou-001',
    name: 'Gourmette Identité Or',
    category: 'gourmette',
    image: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=600&q=80&fit=crop',
    description: "Gourmette identité en or 18 carats, personnalisable avec gravure. Un cadeau unique.",
    material: 'Or 18 carats',
  },
  {
    id: 'gou-002',
    name: 'Gourmette Enfant Or',
    category: 'gourmette',
    image: 'https://images.unsplash.com/photo-1573408301185-9519f94816b5?w=600&q=80&fit=crop',
    description: "Gourmette pour enfant en or 18 carats avec fermoir sécurisé. Un cadeau précieux.",
    material: 'Or 18 carats',
  },

  // Boucles d'oreilles
  {
    id: 'bou-001',
    name: "Boucles d'Oreilles Créoles",
    category: 'boucle-doreille',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80&fit=crop',
    description: "Créoles en or 18 carats, disponibles en différents diamètres. Classiques et indémodables.",
    material: 'Or 18 carats',
  },
  {
    id: 'bou-002',
    name: "Puces d'Oreilles Rondes",
    category: 'boucle-doreille',
    image: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&q=80&fit=crop',
    description: "Puces d'oreilles rondes en or 18 carats. Discrétion et élégance au quotidien.",
    material: 'Or 18 carats',
  },

  // Parures
  {
    id: 'par-001',
    name: 'Parure 3 Pièces Or',
    category: 'parure',
    image: 'https://images.unsplash.com/photo-1613748274804-fb37cc935de6?w=600&q=80&fit=crop',
    description: "Parure complète en or 18 carats : collier, bracelet et boucles d'oreilles assortis.",
    material: 'Or 18 carats',
  },

  // Sautoires
  {
    id: 'sau-001',
    name: 'Sautoire Long Or',
    category: 'sautoire',
    image: 'https://images.unsplash.com/photo-1564502673534-ffc5ddb39f7a?w=600&q=80&fit=crop',
    description: "Sautoire long en or 18 carats. Élégance bohème et sophistiquée.",
    material: 'Or 18 carats',
  },

  // Broches
  {
    id: 'bro-001',
    name: 'Broche Fleur Or',
    category: 'broche',
    image: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=600&q=80&fit=crop',
    description: "Broche motif fleur en or 18 carats. Accessoire élégant pour sublimer vos tenues.",
    material: 'Or 18 carats',
  },
]

export const montres: Montre[] = [
  // Guess Femme
  {
    id: 'mon-gf-001',
    name: 'Guess Bloom Lady',
    brand: 'guess',
    gender: 'femme',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80&fit=crop',
    description: "Montre femme Guess, boîtier rond doré, bracelet acier, cadran nacré. Glamour et féminité.",
  },
  {
    id: 'mon-gf-002',
    name: 'Guess Sparkling Lady',
    brand: 'guess',
    gender: 'femme',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80&fit=crop',
    description: "Montre femme Guess avec cristaux, cadran blanc, boîtier acier doré rose.",
  },
  // Guess Homme
  {
    id: 'mon-gh-001',
    name: 'Guess Continental',
    brand: 'guess',
    gender: 'homme',
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&q=80&fit=crop',
    description: "Montre homme Guess, style sport-chic, boîtier acier noir, cadran chronographe.",
  },
  // Festina Femme
  {
    id: 'mon-ff-001',
    name: 'Festina Mademoiselle',
    brand: 'festina',
    gender: 'femme',
    image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&q=80&fit=crop',
    description: "Montre femme Festina, bracelet acier doré, cadran blanc avec index diamants.",
  },
  // Festina Homme
  {
    id: 'mon-fh-001',
    name: 'Festina Chrono Prestige',
    brand: 'festina',
    gender: 'homme',
    image: 'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=600&q=80&fit=crop',
    description: "Montre homme Festina chronographe, boîtier acier brossé, bracelet cuir noir.",
  },
  // Daniel Cline Femme
  {
    id: 'mon-dcf-001',
    name: 'Daniel Cline Élégance',
    brand: 'daniel-cline',
    gender: 'femme',
    image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&q=80&fit=crop',
    description: "Montre femme Daniel Cline, cadran rond, bracelet acier, finition dorée élégante.",
  },
  // Daniel Cline Homme
  {
    id: 'mon-dch-001',
    name: 'Daniel Cline Classic',
    brand: 'daniel-cline',
    gender: 'homme',
    image: 'https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=600&q=80&fit=crop',
    description: "Montre homme Daniel Cline, style classique, boîtier acier, bracelet cuir marron.",
  },
  // Guess Collection Femme
  {
    id: 'mon-gcf-001',
    name: 'Guess Collection Chic',
    brand: 'guess-collection',
    gender: 'femme',
    image: 'https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=600&q=80&fit=crop',
    description: "Montre femme Guess Collection, boîtier acier doré, bracelet céramique blanche.",
  },
  // Guess Collection Homme
  {
    id: 'mon-gch-001',
    name: 'Guess Collection Sport',
    brand: 'guess-collection',
    gender: 'homme',
    image: 'https://images.unsplash.com/photo-1580294647914-4f6d43d3b9b4?w=600&q=80&fit=crop',
    description: "Montre homme Guess Collection, design sport luxe, boîtier acier, affichage multiple.",
  },
  // Tommy Femme
  {
    id: 'mon-tf-001',
    name: 'Tommy Hilfiger Sophisticated',
    brand: 'tommy',
    gender: 'femme',
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600&q=80&fit=crop',
    description: "Montre femme Tommy Hilfiger, style preppy chic, cadran bleu, bracelet acier argenté.",
  },
  // Tommy Homme
  {
    id: 'mon-th-001',
    name: 'Tommy Hilfiger Blake',
    brand: 'tommy',
    gender: 'homme',
    image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=600&q=80&fit=crop',
    description: "Montre homme Tommy Hilfiger, style américain classique, boîtier acier, bracelet cuir.",
  },
]
