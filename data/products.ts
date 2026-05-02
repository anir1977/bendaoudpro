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

export type WatchBrand = 'guess' | 'festina' | 'daniel-cline' | 'guess-collection' | 'michael-kors'
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
  'michael-kors': 'Michael Kors',
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
    name: 'Guess Rose Gold GW0768L3',
    brand: 'guess',
    gender: 'femme',
    image: 'https://guesswatches.com/cdn/shop/files/GW0768L3_Q.png?v=1727461932',
    description: "Montre femme Guess en acier doré rose, cadran analogique élégant. Un bijou de poignet alliant glamour et sophistication.",
  },
  {
    id: 'mon-gf-002',
    name: 'Guess Gold Multifunction GW0685L2',
    brand: 'guess',
    gender: 'femme',
    image: 'https://guesswatches.com/cdn/shop/files/GW0685L2_F.png?v=1706026331',
    description: "Montre femme Guess multifonction, boîtier 36mm doré, double rangée de cristaux sur le cadran. Luxe accessible et féminité affirmée.",
  },
  {
    id: 'mon-gf-003',
    name: 'Guess Mod Heavy Metal GW0740L2',
    brand: 'guess',
    gender: 'femme',
    image: 'https://guesswatches.com/cdn/shop/files/GW0740L2_Q.png?v=1739482502',
    description: "Montre femme Guess Heavy Metal, bracelet acier doré, style audacieux et moderne. Pour la femme qui ose se démarquer.",
  },
  // Guess Homme
  {
    id: 'mon-gh-001',
    name: 'Guess Jaq Coffee GW1070G3',
    brand: 'guess',
    gender: 'homme',
    image: 'https://guesswatches.com/cdn/shop/files/GW1070G3_Q.png?v=1770995636',
    description: "Montre homme Guess Jaq, cadran ton café élégant, boîtier acier, style sport-chic affirmé. L'alliance parfaite du style et de la précision.",
  },
  {
    id: 'mon-gh-002',
    name: 'Guess Multifunction GW0203G2',
    brand: 'guess',
    gender: 'homme',
    image: 'https://guesswatches.com/cdn/shop/products/GW0203G2_F.png?v=1691436643',
    description: "Montre homme Guess multifonction, cadran blanc, boîtier acier robuste. Design contemporain pour l'homme actif et élégant.",
  },
  // Festina Femme
  {
    id: 'mon-ff-001',
    name: 'Festina Alegria F20622',
    brand: 'festina',
    gender: 'femme',
    image: 'https://festinawatches.com/cdn/shop/products/F20622.4_27a3165f-7c4d-43f9-b699-912df499228c.png',
    description: "Montre femme Festina Alegria, bracelet acier inoxydable, cadran délicat et raffiné. La collection qui célèbre la joie de vivre.",
  },
  {
    id: 'mon-ff-002',
    name: 'Festina Ceramic Chrono F20693',
    brand: 'festina',
    gender: 'femme',
    image: 'https://festinawatches.com/cdn/shop/files/F20693-5_a8383614-3471-4145-8ae1-ac306ea3a438.jpg',
    description: "Montre femme Festina chronographe en céramique, élégance premium et précision suisse. Une pièce d'exception pour femme de caractère.",
  },
  // Festina Homme
  {
    id: 'mon-fh-001',
    name: 'Festina Timeless Chrono F20560',
    brand: 'festina',
    gender: 'homme',
    image: 'https://festinawatches.com/cdn/shop/products/0000_f20560_4.jpg',
    description: "Montre homme Festina Timeless chronographe, boîtier acier brossé, cadran sophistiqué. La montre de l'homme qui maîtrise son temps.",
  },
  {
    id: 'mon-fh-002',
    name: 'Festina Titanium F20698',
    brand: 'festina',
    gender: 'homme',
    image: 'https://festinawatches.com/cdn/shop/files/F20698-2_7966bf69-b693-4fbb-be72-728b388d7d08.jpg',
    description: "Montre homme Festina en titane, légèreté et résistance exceptionnelles. Pour l'homme exigeant qui ne fait aucun compromis sur la qualité.",
  },
  // Daniel Klein Femme
  {
    id: 'mon-dcf-001',
    name: 'Daniel Klein Premium Gold',
    brand: 'daniel-cline',
    gender: 'femme',
    image: 'https://www.danielkleinwatchusa.com/cdn/shop/files/DK.1.13696-2.jpg?v=1725732838',
    description: "Montre femme Daniel Klein Premium, boîtier doré avec pierres, élégance accessible. Un design féminin et contemporain pour toutes les occasions.",
  },
  {
    id: 'mon-dcf-002',
    name: 'Daniel Klein Premium Silver Mesh',
    brand: 'daniel-cline',
    gender: 'femme',
    image: 'https://www.danielkleinwatchusa.com/cdn/shop/files/DK.1.13695-6.jpg?v=1725732588',
    description: "Montre femme Daniel Klein, bracelet mesh argenté fin et délicat, cadran épuré. La montre tendance pour la femme moderne.",
  },
  // Daniel Klein Homme
  {
    id: 'mon-dch-001',
    name: 'Daniel Klein Exclusive Black',
    brand: 'daniel-cline',
    gender: 'homme',
    image: 'https://www.danielkleinwatchusa.com/cdn/shop/files/DK.1.13687-5.png?v=1725733145',
    description: "Montre homme Daniel Klein Exclusive Triple Black, boîtier et bracelet noirs, cadran minimaliste. Le style urbain à son apogée.",
  },
  // Guess Collection Femme
  {
    id: 'mon-gcf-001',
    name: 'Gc MoonChic Z69002L1',
    brand: 'guess-collection',
    gender: 'femme',
    image: 'https://guesswatches.com/cdn/shop/files/Z69002L1_Q.png?v=1773838187',
    description: "Montre femme Gc MoonChic, boîtier acier premium, design lunaire sophistiqué. La quintessence de l'élégance suisse pour femme.",
  },
  {
    id: 'mon-gcf-002',
    name: 'Gc MoonChic Z69001L7',
    brand: 'guess-collection',
    gender: 'femme',
    image: 'https://guesswatches.com/cdn/shop/files/Z69001L7_Q.png?v=1773838055',
    description: "Montre femme Gc MoonChic, finition luxueuse, bracelet métal élégant. Une montre de prestige qui allie modernité et raffinement.",
  },
  // Guess Collection Homme
  {
    id: 'mon-gch-001',
    name: 'Gc IronForce Chrono Z76001G2',
    brand: 'guess-collection',
    gender: 'homme',
    image: 'https://guesswatches.com/cdn/shop/files/Z76001G2_Q.png?v=1773838319',
    description: "Montre homme Gc IronForce chronographe, boîtier acier robuste, cadran technique. Pour l'homme qui incarne la force et le style.",
  },
  // Michael Kors Femme
  {
    id: 'mon-mkf-001',
    name: 'Michael Kors Parker MK7422',
    brand: 'michael-kors',
    gender: 'femme',
    image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=600&q=80&fit=crop',
    description: "Montre femme Michael Kors Parker, boîtier doré 38mm, lunette pavée de cristaux. Glamour new-yorkais à votre poignet.",
  },
  {
    id: 'mon-mkf-002',
    name: 'Michael Kors Slim Runway MK3179',
    brand: 'michael-kors',
    gender: 'femme',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80&fit=crop',
    description: "Montre femme Michael Kors Slim Runway, design minimaliste ultra-fin, bracelet métal. L'élégance épurée de New York.",
  },
  // Michael Kors Homme
  {
    id: 'mon-mkh-001',
    name: 'Michael Kors Lexington MK8718',
    brand: 'michael-kors',
    gender: 'homme',
    image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d851f?w=600&q=80&fit=crop',
    description: "Montre homme Michael Kors Lexington chronographe, boîtier acier 45mm, cadran soleillé. La puissance du style américain.",
  },
  {
    id: 'mon-mkh-002',
    name: 'Michael Kors Reid MK8710',
    brand: 'michael-kors',
    gender: 'homme',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80&fit=crop',
    description: "Montre homme Michael Kors Reid, boîtier acier brossé, bracelet cuir noble. Sophistication et caractère pour l'homme moderne.",
  },
]
