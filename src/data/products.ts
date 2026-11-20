import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'boucle-wool-peak-coat',
    name: 'Bouclé Wool Peak Lapel Coat',
    tagline: 'Sculptural silhouette in Italian double-faced virgin wool.',
    category: 'Clothing',
    price: 68500,
    originalPrice: 76000,
    badge: 'ICONIC',
    description: 'An architectural double-breasted longline overcoat constructed from ultra-dense Italian virgin wool bouclé with structured dropped shoulders.',
    longDescription: 'Engineered in Biella, Italy, this signature long coat represents the pinnacle of atelier tailoring. The peak lapels frame the neckline with razor-sharp precision, while the unlined interior features handcrafted silk-bound seams for effortless fluid draping over fine knitwear.',
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=1200&auto=format&fit=crop'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop',
    colors: [
      { name: 'Onyx Black', hex: '#1C1C1E', imageIndex: 0 },
      { name: 'Pebble Melange', hex: '#8E8E93', imageIndex: 1 },
      { name: 'Camel Warmth', hex: '#B59470', imageIndex: 2 }
    ],
    sizes: ['34 (XS)', '36 (S)', '38 (M)', '40 (L)', '42 (XL)'],
    materials: ['95% Virgin Wool', '5% Mulberry Silk Bound Seams', 'Horn buttons harvested sustainably'],
    careInstructions: ['Specialist dry clean only', 'Store on broad wooden shoulder hanger', 'Steam gently from reverse'],
    details: [
      'Double-breasted fastening with concealed interior anchor button',
      'Sharp peak lapels with reinforced canvas chest piece',
      'Deep welt side pockets and dual interior ticket pockets',
      'Handcrafted in Tuscany, Italy'
    ],
    inStock: true,
    featured: true,
    isNewArrival: true,
    collectionId: 'timeless-essentials',
    rating: 4.9,
    reviewCount: 38,
    reviews: [
      {
        id: 'r1',
        author: 'Eleanor V.',
        rating: 5,
        date: '14 Oct 2026',
        comment: 'The drape and weight are sensational. It falls like armor yet feels like soft cashmere against the body.',
        verified: true
      },
      {
        id: 'r2',
        author: 'Marcus K.',
        rating: 5,
        date: '02 Nov 2026',
        comment: 'A true investment piece. The stitching along the lapels is immaculate.',
        verified: true
      }
    ]
  },
  {
    id: 'merino-oversized-cardigan',
    name: 'Merino Wool-Silk Oversized Cardigan',
    tagline: 'Quiet luxury knit in 18-gauge ultrafine yarn.',
    category: 'Clothing',
    price: 34000,
    badge: 'NEW',
    description: 'A relaxed deep V-neck knit jacket spun from Australian extrafine merino blended with mulberry silk, fastened with mother-of-pearl buttons.',
    longDescription: 'Created for elevated lounge rituals and seamless day-to-night layering. The dropped shoulder cut creates a relaxed silhouette that flatters without adding bulk. Ribbed wide cuffs allow effortless styling pushed up along the forearm.',
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1200&auto=format&fit=crop',
    colors: [
      { name: 'Ivory Crème', hex: '#F4EFE6', imageIndex: 0 },
      { name: 'Warm Taupe', hex: '#9E8B7A', imageIndex: 1 },
      { name: 'Midnight Charcoal', hex: '#2C2B2A', imageIndex: 2 }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    materials: ['70% Ultrafine Merino Wool (19.5 micron)', '30% Mulberry Silk', 'Natural Mother-of-Pearl Buttons'],
    careInstructions: ['Hand wash cold with wool detergent', 'Dry flat on clean towel', 'Do not wring or tumble dry'],
    details: [
      'Relaxed oversized fit designed for layered fluidity',
      'Seven-gauge ribbed hems and cuffs',
      'Hand-attached mother-of-pearl disc buttons',
      'Spun and knit in Biella, Italy'
    ],
    inStock: true,
    featured: true,
    isNewArrival: true,
    collectionId: 'everyday-edit',
    rating: 4.8,
    reviewCount: 24,
    reviews: [
      {
        id: 'r3',
        author: 'Siddharth M.',
        rating: 5,
        date: '28 Sep 2026',
        comment: 'Sublime texture. Far softer than any traditional knit and looks effortlessly chic over a plain white tee.',
        verified: true
      }
    ]
  },
  {
    id: 'saddle-leather-tote',
    name: 'Saddle Leather Structured Tote',
    tagline: 'Hand-burnished bridle leather with brushed brass hardware.',
    category: 'Bags',
    price: 52000,
    originalPrice: 58000,
    badge: 'SIGNATURE',
    description: 'An architectural everyday tote cut from full-grain Tuscan bridle leather that will age gracefully, developing an irreplaceable rich patina.',
    longDescription: 'Each tote is formed around a minimalist wooden block mold in Florence. It features clean edge-painted borders, an interior microsuede slip compartment for laptops up to 15 inches, and magnetic tab closure crafted from concealed neodymium elements.',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1200&auto=format&fit=crop',
    colors: [
      { name: 'Cognac Saddle', hex: '#8B4513', imageIndex: 0 },
      { name: 'Pitch Noir', hex: '#141414', imageIndex: 1 },
      { name: 'Olive Drab', hex: '#4A533E', imageIndex: 2 }
    ],
    sizes: ['One Size (38cm x 30cm x 14cm)'],
    materials: ['100% Full-grain Tuscan Calf Leather', 'Vegetable tanning extracts', 'Solid raw brass hardware'],
    careInstructions: ['Condition annually with neutral organic beeswax balm', 'Protect from prolonged direct rain', 'Store in cotton dust bag'],
    details: [
      'Reinforced base with 5 protective brass studs',
      'Accommodates 15" laptop with dedicated padded sleeve',
      'Key lanyard with engraved atelier snap hook',
      'Individual artisan batch number stamped in gold leaf'
    ],
    inStock: true,
    featured: true,
    isNewArrival: false,
    collectionId: 'objects-of-desire',
    rating: 5.0,
    reviewCount: 42,
    reviews: [
      {
        id: 'r4',
        author: 'Claire D.',
        rating: 5,
        date: '19 Oct 2026',
        comment: 'The scent of genuine vegetable-tanned leather is intoxicating. It stands upright effortlessly without being stiff.',
        verified: true
      }
    ]
  },
  {
    id: 'pencil-mule-leather',
    name: 'The Sculpted Point Mule',
    tagline: 'Razor silhouette in glove-soft lambskin.',
    category: 'Footwear',
    price: 38000,
    badge: 'LIMITED',
    description: 'A striking asymmetrical pointed mule set upon a micro-kitten cantilevered heel, designed for cushioned day-long poise.',
    longDescription: 'Handcrafted in Civitanova Marche, Italy. The upper is carved from buttery Napa leather with folded, unhemmed edges that conform softly to the foot. The memory-foam insole and natural leather sole ensure comfort that defies its architectural aesthetic.',
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512374382149-233c42b6683b?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?q=80&w=1200&auto=format&fit=crop'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1512374382149-233c42b6683b?q=80&w=1200&auto=format&fit=crop',
    colors: [
      { name: 'Polished Black', hex: '#111111', imageIndex: 0 },
      { name: 'Bone White', hex: '#EAE6DF', imageIndex: 1 },
      { name: 'Espresso Gloss', hex: '#3B2F2F', imageIndex: 2 }
    ],
    sizes: ['EU 36', 'EU 37', 'EU 38', 'EU 39', 'EU 40', 'EU 41'],
    materials: ['100% Lambskin Nappa Upper', 'Calfskin lining and cushioned footbed', 'Hand-nailed stacked leather sole'],
    careInstructions: ['Clean with soft microfibre cloth', 'Treat with leather nourishing cream', 'Replace heel taps at shoe artisan'],
    details: [
      '45mm cantilevered structural heel with rubber tap',
      'Deep cut-out vamp that elongates the foot line',
      'Non-slip injected rubber forefoot patch',
      'Dust bag and spare heel taps included'
    ],
    inStock: true,
    featured: true,
    isNewArrival: true,
    collectionId: 'timeless-essentials',
    rating: 4.7,
    reviewCount: 19
  },
  {
    id: 'double-breasted-blazer',
    name: 'Tailored Double-Breasted Wool Blazer',
    tagline: 'Precise masculine proportions re-engineered for effortless grace.',
    category: 'Clothing',
    price: 54000,
    badge: 'NEW',
    description: 'Cut from high-twist virgin wool cavalry twill that resists creasing. Sits slightly broad on the shoulder with a gentle waist suppression.',
    longDescription: 'An homage to modern minimalist power tailoring. Constructed with half-canvas interior framing, high armholes, and subtle horn-button sleeve cuffs. Suitable for high-stakes presentations or casual drape over crisp poplin shirts.',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?q=80&w=1200&auto=format&fit=crop',
    colors: [
      { name: 'Charcoal Houndstooth', hex: '#2F3136', imageIndex: 0 },
      { name: 'Deep Camel', hex: '#9C7A58', imageIndex: 1 },
      { name: 'Ink Navy', hex: '#1C2237', imageIndex: 2 }
    ],
    sizes: ['34 (XS)', '36 (S)', '38 (M)', '40 (L)', '42 (XL)'],
    materials: ['100% Wool Cavalry Twill', 'Cupro Bemberg Jacquard Lining', 'Natural water-buffalo horn buttons'],
    careInstructions: ['Dry clean only with eco-friendly solvents', 'Press with damp cloth', 'Do not bleach'],
    details: [
      'Six-button stance with four working buttonholes',
      'Dual rear vents for effortless movement',
      'Internal smartphone pocket and pen slot',
      'Made in Portugal'
    ],
    inStock: true,
    featured: false,
    isNewArrival: true,
    collectionId: 'everyday-edit',
    rating: 4.9,
    reviewCount: 31
  },
  {
    id: 'travertine-sculptural-vessel',
    name: 'Monolithic Travertine Vessel',
    tagline: 'Hand-carved Roman travertine stone object.',
    category: 'Home Objects',
    price: 24500,
    badge: 'LIMITED',
    description: 'A singular monolithic bowl carved from solid unpolished travertine stone, bringing geological poise into serene interiors.',
    longDescription: 'Mined in Tivoli, Italy, each piece is individually honed by master stonemasons to accentuate the distinctive open cavities, veins, and warm ochre striations inherent in natural travertine.',
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1200&auto=format&fit=crop'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    colors: [
      { name: 'Raw Ivory Travertine', hex: '#E5DFD3', imageIndex: 0 },
      { name: 'Walnut Travertine', hex: '#A89279', imageIndex: 1 }
    ],
    sizes: ['Diameter 26cm, Height 14cm (Approx 4.8kg)'],
    materials: ['100% Solid Roman Travertine Stone', 'Protective felt feet beneath base'],
    careInstructions: ['Wipe clean with warm water and mild neutral soap', 'Avoid acidic liquids like lemon or vinegar', 'Not dishwasher safe'],
    details: [
      'Subtle porous texture celebrating natural geological variation',
      'Water-sealed interior suitable for delicate botanicals',
      'Cork-padded base to protect dining tables and credenzas',
      'Signed and numbered bottom engraving'
    ],
    inStock: true,
    featured: true,
    isNewArrival: false,
    collectionId: 'objects-of-desire',
    rating: 5.0,
    reviewCount: 15
  },
  {
    id: 'heavyweight-silk-slip-dress',
    name: 'Sandwashed Silk Bias Slip Dress',
    tagline: 'Weighty 30mm silk that flows like liquid mercury.',
    category: 'Clothing',
    price: 42000,
    badge: 'SIGNATURE',
    description: 'An understated floor-grazing slip dress cut on the true bias from heavyweight 30-momme sandwashed mulberry silk with a matte velvety finish.',
    longDescription: 'Cut diagonally across the grain to gently mold to the wearer’s contours without clinging. Delicate lingerie-inspired spaghetti straps adjust via 18k gold-dipped micro rings.',
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
    colors: [
      { name: 'Champagne Pearl', hex: '#EDE6D6', imageIndex: 0 },
      { name: 'Caviar Black', hex: '#1B1B1B', imageIndex: 1 },
      { name: 'Bronze Ochre', hex: '#94704B', imageIndex: 2 }
    ],
    sizes: ['XS (34)', 'S (36)', 'M (38)', 'L (40)'],
    materials: ['100% Grade 6A Mulberry Silk (30 momme)', 'Organic peachskin wash treatment'],
    careInstructions: ['Dry clean or hand-wash in cold water with pH-neutral silk wash', 'Line dry in shade', 'Cool iron inside out'],
    details: [
      'True bias cut ensures fluid drape across waist and hips',
      'Side discreet concealed French zipper',
      'Subtle ankle-height side movement slit',
      'Hand-rolled hems'
    ],
    inStock: true,
    featured: false,
    isNewArrival: false,
    collectionId: 'everyday-edit',
    rating: 4.8,
    reviewCount: 29
  },
  {
    id: 't-lock-leather-clutch',
    name: 'T-Bar Foldover Palmellata Clutch',
    tagline: 'Structured evening pouch with brushed gold hardware.',
    category: 'Bags',
    price: 46000,
    badge: 'ICONIC',
    description: 'Crafted from grained palmellata calfskin with our signature brushed pale gold T-bar lock. Includes a detachable slender shoulder strap.',
    longDescription: 'The tactile foldover closure opens to reveal a lambskin-lined interior with three credit card slots and dedicated lip balm holder. Can be carried effortlessly underarm or worn crossbody.',
    images: [
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1200&auto=format&fit=crop'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop',
    colors: [
      { name: 'Noir Palmellata', hex: '#151515', imageIndex: 0 },
      { name: 'Alabaster White', hex: '#F0ECE1', imageIndex: 1 },
      { name: 'Cacao Brown', hex: '#443126', imageIndex: 2 }
    ],
    sizes: ['One Size (28cm x 16cm x 9cm)'],
    materials: ['Full-grain Palmellata Calfskin', 'Soft lambskin nappa lining', 'Brushed 24k gold-plated brass lock'],
    careInstructions: ['Wipe gently with dry cloth', 'Keep away from humidity and direct sunlight'],
    details: [
      'Signature rotating T-bar lock mechanism',
      'Includes detachable 110cm crossbody leather strap',
      'Interior gold hot-stamped logo',
      'Made by leather masters in Milan'
    ],
    inStock: true,
    featured: true,
    isNewArrival: false,
    collectionId: 'objects-of-desire',
    rating: 4.9,
    reviewCount: 37
  },
  {
    id: 'pleated-wide-leg-trouser',
    name: 'Pleated High-Rise Virgin Wool Trouser',
    tagline: 'Deep forward pleats with a pooling floor-grazing hem.',
    category: 'Clothing',
    price: 36000,
    badge: 'NEW',
    description: 'Designed with deep double forward pleats and an extended waistband tab, these trousers offer dramatic architectural volume with effortless comfort.',
    longDescription: 'Spun from high-twist tropical wool from the Biella mills, this trouser falls straight from hip to hem. Features slant front pockets, rear welt pockets with horn buttons, and internal curtain waistband tailoring found only in bespoke savile row garments.',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1200&auto=format&fit=crop',
    colors: [
      { name: 'Dark Melange Grey', hex: '#454545', imageIndex: 0 },
      { name: 'Oatmeal Warmth', hex: '#DDD4C4', imageIndex: 1 },
      { name: 'Deep Midnight', hex: '#1E232E', imageIndex: 2 }
    ],
    sizes: ['34', '36', '38', '40', '42'],
    materials: ['100% Extrafine Virgin Wool', '100% Cotton Pocket Linings', 'Sartorial curtain waistband'],
    careInstructions: ['Dry clean only', 'Warm press with pressing cloth', 'Hang by hems to retain pleat sharpness'],
    details: [
      'Double forward pleats add relaxed fullness',
      'Extended tab front closure with hook and eye',
      'Generous 5cm hem allowance for custom tailoring',
      'Hand-stitched bar tacks on stress points'
    ],
    inStock: true,
    featured: false,
    isNewArrival: true,
    collectionId: 'everyday-edit',
    rating: 4.8,
    reviewCount: 22
  },
  {
    id: 'sculptural-brass-earrings',
    name: 'Hammered Orbital Brass Earrings',
    tagline: 'Hand-forged brass discs with raw geological texture.',
    category: 'Accessories',
    price: 18500,
    badge: 'LIMITED',
    description: 'Each earring is individually hand-beaten by silversmiths in Jaipur from solid recycled brass, finished with hypoallergenic titanium posts.',
    longDescription: 'Capturing the golden light of dusk, these orbital forms balance weightlessness with high-impact sculptural presence. Finished with a subtle matte sealant that prevents tarnishing.',
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1611591475152-47eac5c919af?q=80&w=1200&auto=format&fit=crop'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop',
    colors: [
      { name: 'Raw Warm Brass', hex: '#C5A059', imageIndex: 0 },
      { name: 'Silver Rhodium', hex: '#D8D8D8', imageIndex: 1 }
    ],
    sizes: ['One Size (4.2cm diameter, 7g per earring)'],
    materials: ['100% Recycled Solid Jewelers Brass', 'Grade 1 Medical Titanium Ear Posts', 'Silicone comfort backings'],
    careInstructions: ['Store in provided anti-tarnish suede pouch', 'Buff occasionally with dry cotton cloth', 'Remove before swimming or perfuming'],
    details: [
      'Hand-hammered faceted surface refracts light uniquely',
      'Featherlight hollowed design for all-day comfort',
      'Hypoallergenic for sensitive ears',
      'Engraved discreet ATELIER hallmark on reverse'
    ],
    inStock: true,
    featured: false,
    isNewArrival: false,
    collectionId: 'objects-of-desire',
    rating: 4.9,
    reviewCount: 46
  },
  {
    id: 'cashmere-wrap-scarf',
    name: 'Mongolian Cashmere Grand Wrap Scarf',
    tagline: 'Two-ply cloud cashmere with hand-twisted fringing.',
    category: 'Accessories',
    price: 29000,
    badge: 'ICONIC',
    description: 'An expansive 200cm x 75cm wrap spun from grade-A inner Mongolian cashmere down. Sublimely insulating, featherweight, and whisper-soft.',
    longDescription: 'Sourced strictly through ethical nomad cooperatives in the Alashan region. The subtle twill weave gives it remarkable durability and prevents pilling, creating an envelope of soothing warmth.',
    images: [
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=1200&auto=format&fit=crop',
    colors: [
      { name: 'Heather Stone', hex: '#B8B3A8', imageIndex: 0 },
      { name: 'Midnight Charcoal', hex: '#2A2928', imageIndex: 1 },
      { name: 'Oatmeal Milk', hex: '#EDE7DC', imageIndex: 2 }
    ],
    sizes: ['Grand (200cm x 75cm)'],
    materials: ['100% Pure Mongolian Cashmere (15.2 micron)', 'Azo-free low impact dyes'],
    careInstructions: ['Dry clean or gentle hand wash in lukewarm water', 'Dry flat away from direct heat', 'Comb gently with cashmere comb if needed'],
    details: [
      'Generous dimensions allow styling as travel blanket, shawl, or neck muffler',
      'Delicate hand-twisted 8cm eyelash fringes',
      'Signature embossed calfskin leather label',
      'Presented in rigid linen-embossed keepsake box'
    ],
    inStock: true,
    featured: true,
    isNewArrival: false,
    collectionId: 'timeless-essentials',
    rating: 5.0,
    reviewCount: 53
  },
  {
    id: 'ceramic-ritual-incense-burner',
    name: 'Wabi-Sabi Ceramic Incense Burner & Vessel',
    tagline: 'Hand-thrown black stoneware with volcanic ash glaze.',
    category: 'Home Objects',
    price: 12500,
    badge: 'NEW',
    description: 'Formed on a manual potter’s wheel in Kyoto, Japan, and wood-fired over 48 hours. Designed for both traditional stick and rope incense.',
    longDescription: 'The rough, granular surface echoes ancient basalt cliffs. A solid brass removable sphere holds standard and thick incense sticks at a calm meditative angle, while the wide dished tray catches falling embers gracefully.',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop',
    colors: [
      { name: 'Volcanic Ash Black', hex: '#232323', imageIndex: 0 },
      { name: 'Warm Sand Stone', hex: '#D2C8B8', imageIndex: 1 }
    ],
    sizes: ['Diameter 16cm, Height 4.5cm'],
    materials: ['Kyoto Black Stoneware Clay', 'Natural volcanic wood-ash glaze', 'Solid turned untreated brass holder'],
    careInstructions: ['Rinse gently with tepid water', 'Wipe with soft sponge', 'Do not place in microwave or dishwasher'],
    details: [
      'Includes 30 complimentary sticks of Japanese Hinoki Cedar incense',
      'Hand-thrown by 4th-generation ceramics master',
      'Unique glaze crystallization on every individual unit',
      'Heat-resistant base with non-scratch silicone feet'
    ],
    inStock: true,
    featured: false,
    isNewArrival: true,
    collectionId: 'objects-of-desire',
    rating: 4.9,
    reviewCount: 27
  },
  {
    id: 'minimalist-leather-chelsea-boot',
    name: 'The Architectural Chelsea Boot',
    tagline: 'Clean unbroken lines in French box calf leather.',
    category: 'Footwear',
    price: 49000,
    badge: 'ICONIC',
    description: 'An exacting Chelsea boot without superfluous broguing or stitching. Features concealed elastic gussets and a Blake-stitched leather sole.',
    longDescription: 'Crafted with seamless whole-cut construction over our custom anatomical last. The subtly squared almond toe and stacked wooden Cuban heel confer confident proportion under wide-leg trousers.',
    images: [
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512374382149-233c42b6683b?q=80&w=1200&auto=format&fit=crop'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1200&auto=format&fit=crop',
    colors: [
      { name: 'Polished Black Boxcalf', hex: '#111111', imageIndex: 0 },
      { name: 'Deep Espresso Suede', hex: '#3E2F28', imageIndex: 1 }
    ],
    sizes: ['EU 37', 'EU 38', 'EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43'],
    materials: ['French Box Calfskin', 'Full calf leather lining', 'Blake welted stacked leather sole'],
    careInstructions: ['Brush off dry dirt with horsehair brush', 'Polish with wax cream', 'Always use cedar shoe trees when resting'],
    details: [
      'Seamless wholecut vamp pattern requires flawless hide selection',
      'High-grade tone-on-tone elastic gore',
      'Recessed leather pull tabs concealed inside collar',
      'Handcrafted in Porto, Portugal'
    ],
    inStock: true,
    featured: false,
    isNewArrival: false,
    collectionId: 'timeless-essentials',
    rating: 4.8,
    reviewCount: 34
  },
  {
    id: 'botanical-eau-de-parfum',
    name: 'Atelier N° 07 Eau de Parfum (100ml)',
    tagline: 'Smoky vetiver, hinoki wood, and black amber.',
    category: 'Lifestyle',
    price: 19500,
    badge: 'LIMITED',
    description: 'An intimate, genderless fragrance composed by master perfumers in Grasse, France. Formulated with high-concentration essential absolutes.',
    longDescription: 'Top notes of crushed green cardamom and bitter bergamot give way to a heart of smoked Hinoki cedar and Haitian vetiver, anchored by warm benzoin tears and Spanish labdanum. Housed in heavy flacon glass with magnetic Bakelite cap.',
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1200&auto=format&fit=crop'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1200&auto=format&fit=crop',
    colors: [
      { name: 'Amber Flacon', hex: '#BA7A32', imageIndex: 0 }
    ],
    sizes: ['100ml (3.4 fl. oz)'],
    materials: ['22% Extrait de Parfum concentration', 'Organic cane alcohol base', 'Recyclable heavyweight Italian glass'],
    careInstructions: ['Store away from direct light and heat', 'Apply to pulse points and garment lapels'],
    details: [
      'Top: Italian Bergamot, Cardamom, Pink Peppercorn',
      'Heart: Hinoki Wood, Orris Concrete, Incense Resin',
      'Base: Haitian Vetiver, Cistus Labdanum, Black Amber',
      'Hand-numbered bottle with silk-screened batch notation'
    ],
    inStock: true,
    featured: true,
    isNewArrival: true,
    collectionId: 'objects-of-desire',
    rating: 5.0,
    reviewCount: 39
  },
  {
    id: 'organic-cotton-poplin-shirt',
    name: 'Relaxed Tailored Poplin Shirt',
    tagline: 'Crisp 120-thread count Egyptian Giza cotton.',
    category: 'Clothing',
    price: 21000,
    badge: 'NEW',
    description: 'A sharp, oversized shirting silhouette featuring a structured collar, French cuffs, and a gently dropped back hem.',
    longDescription: 'Woven from extra-long staple Egyptian Giza cotton that offers a dry, paper-like crunch and luminous luster. Finished with single-needle French seams throughout and carved mother-of-pearl buttons.',
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1200&auto=format&fit=crop'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200&auto=format&fit=crop',
    colors: [
      { name: 'Crisp Chalk White', hex: '#FAF9F6', imageIndex: 0 },
      { name: 'Powder Sky Blue', hex: '#D6E4ED', imageIndex: 1 },
      { name: 'Pinstripe Noir', hex: '#2F333B', imageIndex: 2 }
    ],
    sizes: ['XS (36)', 'S (38)', 'M (40)', 'L (42)', 'XL (44)'],
    materials: ['100% Certified Organic Giza Cotton', 'Mother-of-pearl buttons'],
    careInstructions: ['Machine wash 30°C delicate cycle', 'Steam or iron while slightly damp', 'Hang on contoured shirt hanger'],
    details: [
      'Subtle oversized cut with dropped back yoke',
      'Double fused spread collar retains crispness without starch',
      'Convertible cuffs compatible with cufflinks',
      'Crafted in Bergamo, Italy'
    ],
    inStock: true,
    featured: false,
    isNewArrival: true,
    collectionId: 'everyday-edit',
    rating: 4.7,
    reviewCount: 18
  },
  {
    id: 'linen-waffle-bath-robe',
    name: 'Washed Belgian Linen Bath Robe',
    tagline: 'Ultra-absorbent stonewashed European flax.',
    category: 'Lifestyle',
    price: 26000,
    badge: 'SIGNATURE',
    description: 'An indulgent, generous kimono-style robe woven in a deep waffle texture from masters of linen in Flanders, Belgium.',
    longDescription: 'Pre-washed for instantaneous softness and a relaxed rumpled aesthetic. Linen naturally regulates temperature, drying twice as fast as terry cotton while feeling crisp against skin.',
    images: [
      'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1200&auto=format&fit=crop'
    ],
    secondaryImage: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1200&auto=format&fit=crop',
    colors: [
      { name: 'Flax Natural', hex: '#D7CCBC', imageIndex: 0 },
      { name: 'Slate Anthracite', hex: '#4B4D52', imageIndex: 1 }
    ],
    sizes: ['S/M (Relaxed)', 'L/XL (Generous)'],
    materials: ['100% Certified Masters of Linen® European Flax', '380 GSM waffle weave'],
    careInstructions: ['Wash warm at 40°C', 'Tumble dry low for optimal fluffiness or line dry', 'Softens exponentially with each wash'],
    details: [
      'Two deep patch pockets for everyday essentials',
      'Detachable waist belt with double belt loops for height adjustment',
      'Reinforced hanging loop inside back neck',
      'Woven and dyed in Flanders, Belgium'
    ],
    inStock: true,
    featured: false,
    isNewArrival: false,
    collectionId: 'objects-of-desire',
    rating: 4.9,
    reviewCount: 31
  }
];
