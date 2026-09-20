/* ──────────────────────────────────────────────────────────────
   CardsMen — Product catalogue
   Data sourced from idlord.ph CSV exports (Sept 2026)
   Images: external URLs from idlord.ph (webp, 1100x1100)
   Pricing: $120 base, bulk tiers standard
────────────────────────────────────────────────────────────── */

export interface Product {
  slug: string
  name: string
  model: string
  country: 'usa' | 'canada' | 'uk' | 'germany' | 'netherlands' | 'australia'
  price: number          // base / single unit price
  originalPrice?: number // crossed-out price (if sale)
  currency: string
  images: string[]       // index 0 = main card image
  bulkTiers: { label: string; highlight?: boolean }[]
  freeShipping: boolean
  isNew?: boolean
  description?: string
}

const BULK_STD = [
  { label: 'Get 2-3 IDs, $100/pc' },
  { label: 'Get 4-9 IDs, $90/pc' },
  { label: 'Get 10+ IDs, $80/pc' },
]

function slug(name: string) {
  return name
    .toLowerCase()
    .replace(/[()]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

/* ── USA products (from CSV: idlord-ph-2026-09-15.csv + idlord-ph-2026-09-16-2.csv) ── */
const RAW_USA: { name: string; model: string; images: string[]; isNew?: boolean }[] = [
  {
    name: 'California (CA) Fake ID (2026 Version)',
    model: 'California (CA) Fake IDs (2026 Version)',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/ca2026-1-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/ca2026-3-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/ca2026-2-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/ca2026-4-1100x1100w.webp',
    ],
    isNew: true,
  },
  {
    name: 'California (CA) Fake ID',
    model: 'California ID',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/california-1-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/california-3-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/california-2-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/california-4-1100x1100w.webp',
    ],
  },
  {
    name: 'New York (NY) Fake ID (2025 Version)',
    model: 'New York Fake ID (2025 Version)',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/img_20250709_101410-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/img_20250709_101504-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/img_20250709_101442-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/img_20250709_101425-1100x1100w.webp',
    ],
    isNew: true,
  },
  {
    name: 'New York (NY) Fake ID',
    model: 'New York ID',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/new_york-1-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/new_york-3-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/new_york-4-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/new_york-2-1100x1100w.webp',
    ],
  },
  {
    name: 'Texas (TX) Fake ID (2025 version)',
    model: 'Texas ID',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/img_20250709_174234-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/img_20250709_101628-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/img_20250709_101614-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/img_20250709_101623-1100x1100w.webp',
    ],
    isNew: true,
  },
  {
    name: 'Florida (FL) Fake ID',
    model: 'Florida ID',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/img20250519094344_拷贝-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/img20250519094341_拷贝-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/img20250519094354_拷贝-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/img20250519094350_拷贝-1100x1100w.webp',
    ],
  },
  {
    name: 'Georgia (GA) Fake ID (2025 version)',
    model: 'Georgia ID',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/img_20250709_101648-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/img_20250709_101652-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/img_20250709_101708-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/img_20250709_101702-1100x1100w.webp',
    ],
    isNew: true,
  },
  {
    name: 'Illinois (IL) Fake ID',
    model: 'Illinois ID',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/illinois-1-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/illinois-4-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/illinois-3-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/illinois-2-1100x1100w.webp',
    ],
  },
  {
    name: 'Ohio (OH) Fake ID',
    model: 'Ohio scannable ID',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/ohio-1-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/ohio-4-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/ohio-3-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/ohio-2-1100x1100w.webp',
    ],
  },
  {
    name: 'Pennsylvania (PA) Fake ID (2025 Version)',
    model: 'Pennsylvania Fake ID (Upgrade Version)',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/2025/pennsylvania_fake_ids/1-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/2025/pennsylvania_fake_ids/2-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/2025/pennsylvania_fake_ids/3-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/2025/pennsylvania_fake_ids/4-1100x1100w.webp',
    ],
    isNew: true,
  },
  {
    name: 'Pennsylvania (PA) Fake ID',
    model: 'Pennsylvania ID',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/pennsylvania-1-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/pennsylvania-4-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/pennsylvania-2-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/pennsylvania-3-1100x1100w.webp',
    ],
  },
  {
    name: 'Michigan (MI) Fake ID',
    model: 'Michigan ID',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/michigan-1-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/michigan-3-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/michigan-4-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/michigan-2-1100x1100w.webp',
    ],
  },
  {
    name: 'North Carolina (NC) Fake ID (2025 Version)',
    model: 'North Carolina Fake ID (2025 Version)',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/img_20251104_121042-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/img_20251104_121052-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/img_20251104_143244-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/img_20251104_143306-1100x1100w.webp',
    ],
    isNew: true,
  },
  {
    name: 'North Carolina (NC) Fake ID',
    model: 'North Carolina ID',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/north_carolina-1-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/north_carolina-4-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/north_carolina-3-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/north_carolina-2-1100x1100w.webp',
    ],
  },
  {
    name: 'Virginia (VA) ID (2025 Version)',
    model: 'Virginia ID (2025 Version)',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/virginia_id(2025_version)/img_20250916_112253-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/virginia_id(2025_version)/img_20250916_112337-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/virginia_id(2025_version)/img_20250916_112309-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/virginia_id(2025_version)/img_20250916_112348-1100x1100w.webp',
    ],
    isNew: true,
  },
  {
    name: 'Virginia (VA) Fake ID',
    model: 'Virginia ID',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/virginia-1-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/virginia-3-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/virginia-4-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/virginia-2-1100x1100w.webp',
    ],
  },
  {
    name: 'Washington (WA) Fake ID',
    model: 'Washington ID',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/washington-1-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/washington-4-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/washington-3-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/washington-2-1100x1100w.webp',
    ],
  },
  {
    name: 'Arizona (AZ) Fake ID (2025 Version)',
    model: 'Arizona Fake IDs (2025 Version)',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/new/arizona1-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/new/arizona3-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/new/arizona2-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/new/arizona4-1100x1100w.webp',
    ],
    isNew: true,
  },
  {
    name: 'Arizona (AZ) Fake ID',
    model: 'Arizona ID',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/arizona-1-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/arizona-3-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/arizona-4-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/arizona-2-1100x1100w.webp',
    ],
  },
  {
    name: 'Colorado (CO) Fake ID',
    model: 'Colorado ID',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/img_20250623_100000-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/img_20250623_163052-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/img_20250623_100024-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/img_20250623_163135-1100x1100w.webp',
    ],
  },
  {
    name: 'Tennessee (TN) Fake ID (2025 Version)',
    model: 'Tennessee (TN) Fake ID',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/img_20260112_114628-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/img_20260112_114639-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/img_20260112_114626-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/img_20260112_114652-1100x1100w.webp',
    ],
    isNew: true,
  },
  {
    name: 'Utah (UT) Fake DL (2026 Version)',
    model: 'Utah (UT) Fake DL (2026 Version)',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/img_20260605_153740-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/img_20260605_153748-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/img_20260605_153805-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/img_20260605_153821-1100x1100w.webp',
    ],
    isNew: true,
  },
  {
    name: 'Utah (UT) Fake ID',
    model: 'Utah ID',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/utah-1-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/utah-3-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/utah-4-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/utah-2-1100x1100w.webp',
    ],
  },
  {
    name: 'Wisconsin (WI) Fake ID (2026 Version)',
    model: 'Wisconsin (WI) Fake ID (2026 Version)',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/w_id1-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/w_id2-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/w_id3-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/w_id_4-1100x1100w.webp',
    ],
    isNew: true,
  },
  {
    name: 'Wisconsin (WI) Fake DL (2026 Version)',
    model: 'Wisconsin (WI) Fake DL (2026 Version)',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/w_dl1-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/w_dl2-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/w_dl3-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/w_dl4-1100x1100w.webp',
    ],
    isNew: true,
  },
  {
    name: 'Nevada (NV) Fake ID',
    model: 'Nevada ID',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/nevada-1-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/nevada-3-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/nevada-4-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/nevada-2-1100x1100w.webp',
    ],
  },
  {
    name: 'New Jersey (NJ) Fake ID',
    model: 'New Jersey ID',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/new_jersey-1-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/new_jersey-2-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/new_jersey-3-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/new_jersey-4-1100x1100w.webp',
    ],
  },
  {
    name: 'Maryland (MD) Fake ID',
    model: 'Maryland ID',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/maryland-1-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/maryland-4-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/maryland-3-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/maryland-2-1100x1100w.webp',
    ],
  },
  {
    name: 'Massachusetts (MA) Fake ID',
    model: 'Massachusetts ID',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/massachusetts-1-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/massachusetts-4-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/massachusetts-3-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/massachusetts-2-1100x1100w.webp',
    ],
  },
  {
    name: 'Minnesota (MN) Fake ID',
    model: 'Minnesota ID',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/minnesota-1-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/minnesota-4-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/minnesota-3-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/minnesota-2-1100x1100w.webp',
    ],
  },
  {
    name: 'Mississippi (MS) Fake ID',
    model: 'Mississippi ID',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/mississippi-1-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/mississippi-2-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/mississippi-3-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/mississippi-4-1100x1100w.webp',
    ],
  },
  {
    name: 'Missouri (MO) Fake ID',
    model: 'Missouri ID',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/missouri-1-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/missouri-2-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/missouri-4-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/missouri-3-1100x1100w.webp',
    ],
  },
  {
    name: 'Nebraska (NE) Fake ID',
    model: 'Nebraska ID',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/nebraska-1-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/nebraska-4-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/nebraska-3-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/nebraska-2-1100x1100w.webp',
    ],
  },
  {
    name: 'Kansas (KS) Fake ID',
    model: 'Kansas ID',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/kansas-1-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/kansas-4-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/kansas-2-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/kansas-3-1100x1100w.webp',
    ],
  },
  {
    name: 'Indiana (IN) Fake ID',
    model: 'Indiana ID',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/indiana-1-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/indiana-4-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/indiana-3-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/indiana-2-1100x1100w.webp',
    ],
  },
  {
    name: 'Delaware (DE) Fake ID',
    model: 'Delaware ID',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/delaware-1-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/delaware-2-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/delaware-4-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/delaware-3-1100x1100w.webp',
    ],
  },
  {
    name: 'Connecticut (CT) Fake ID',
    model: 'Connecticut ID',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/connecticut-1-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/connecticut-4-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/connecticut-2-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/connecticut-3-1100x1100w.webp',
    ],
  },
  {
    name: 'Rhode Island (RI) Fake ID',
    model: 'Rhode Island ID',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/rhode_island-1-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/rhode_island-4-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/rhode_island-2-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/rhode_island-3-1100x1100w.webp',
    ],
  },
  {
    name: 'South Carolina (SC) Fake ID',
    model: 'South Carolina ID',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/south_carolina-1-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/south_carolina-3-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/south_carolina-4-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/south_carolina-2-1100x1100w.webp',
    ],
  },
  {
    name: 'Alabama (AL) Fake ID',
    model: 'Alabama ID',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/alabama-1-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/alabama-2-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/alabama-3-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/alabama-4-1100x1100w.webp',
    ],
  },
]

/* ── Canada products (from CSV: idlord-ph-2026-09-16.csv) ── */
const RAW_CANADA: { name: string; model: string; images: string[]; isNew?: boolean }[] = [
  {
    name: 'Ontario (ON) Fake ID (2025 version)',
    model: 'Ontario Scannable ID',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/df7f882d306a64eb4b56cc5394b4262-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/d574fc8c674facffb4fc4fac9d5439f-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/75803b7ebe463f78c156d914972f786-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/a64787852ed657a017166263045d63a-1100x1100w.webp',
    ],
    isNew: true,
  },
  {
    name: 'British Columbia (B.C.) Fake ID (2025 Version)',
    model: 'British Columbia Fake IDs (2025 Version)',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/1img_20251112_095406-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/1img_20251112_095410-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/1img_20251112_095436-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/1img_20251112_095432-1100x1100w.webp',
    ],
    isNew: true,
  },
  {
    name: 'British Columbia (B.C.) Fake ID',
    model: 'British Columbia ID',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/british_columbia-1-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/british_columbia-2-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/british_columbia-3-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/british_columbia-4-1100x1100w.webp',
    ],
  },
  {
    name: 'Quebec (QC) Fake ID',
    model: 'Quebec ID',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/quebec-1-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/quebec-2-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/quebec-4-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/quebec-3-1100x1100w.webp',
    ],
  },
  {
    name: 'Alberta (Alta) Fake DL (2026 Version)',
    model: 'Alberta (Alta) Fake DL (2026 Version)',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/img_20260423_151420-临时_拷贝-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/img_20260423_151524-临时_拷贝-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/img_20260423_151439-临时_拷贝-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/img_20260423_151507-临时_拷贝-1100x1100w.webp',
    ],
    isNew: true,
  },
  {
    name: 'Manitoba (Man) Fake ID (2026 Version)',
    model: 'Manitoba (Man) Fake ID (2026 Version)',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/img_20260302_104011-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/img_20260302_104016-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/img_20260302_104026-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/img_20260302_104040-1100x1100w.webp',
    ],
    isNew: true,
  },
  {
    name: 'Saskatchewan (SK) Fake ID',
    model: 'Saskatchewan (SK) Fake Drivers Licence',
    images: [
      'https://idlord.ph/image/webp/cache/catalog/products/new/saskatchewan1-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/new/saskatchewan3-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/new/saskatchewan2-1100x1100w.webp',
      'https://idlord.ph/image/webp/cache/catalog/products/new/saskatchewan4-1100x1100w.webp',
    ],
  },
]

/* ── Build full product objects ── */
function buildProducts(
  raw: typeof RAW_USA,
  country: Product['country'],
  price: number,
  currency: string,
  originalPrice?: number,
): Product[] {
  return raw.map((r) => ({
    slug: slug(r.name),
    name: r.name,
    model: r.model,
    country,
    price,
    originalPrice,
    currency,
    images: r.images,
    bulkTiers: BULK_STD,
    freeShipping: true,
    isNew: r.isNew,
  }))
}

export const USA_PRODUCTS = buildProducts(RAW_USA, 'usa', 120, '$', 150)
  .sort((a, b) => a.name.localeCompare(b.name))

export const CANADA_PRODUCTS = buildProducts(RAW_CANADA, 'canada', 120, '$', 150)
  .sort((a, b) => a.name.localeCompare(b.name))

/* ── UK products ── */
const RAW_UK: { name: string; model: string; images: string[] }[] = [
  {
    name: 'UK Fake ID — DVLA Photocard (Teslin)',
    model: 'UK DVLA Photocard',
    images: ['/images/uk1.jpg', '/images/uk2.jpg', '/images/uk3.jpg', '/images/uk4.jpg'],
  },
  {
    name: 'UK Provisional Licence (Polycarbonate)',
    model: 'UK Provisional Licence',
    images: ['/images/uk1.jpg', '/images/uk2.jpg', '/images/uk3.jpg', '/images/uk4.jpg'],
  },
]

export const UK_PRODUCTS = buildProducts(RAW_UK, 'uk', 80, '£', 100)
  .sort((a, b) => a.name.localeCompare(b.name))

/* ── Germany products ── */
const RAW_GERMANY: { name: string; model: string; images: string[] }[] = [
  {
    name: 'Germany Fake ID — Scannable Replica',
    model: 'Germany ID',
    images: ['/images/germany.jpg'],
  },
  {
    name: 'Germany Fake ID (Polycarbonate)',
    model: 'Germany Polycarbonate ID',
    images: ['/images/germany.jpg'],
  },
]

export const GERMANY_PRODUCTS = buildProducts(RAW_GERMANY, 'germany', 100, '€', 120)
  .sort((a, b) => a.name.localeCompare(b.name))

/* ── Netherlands products ── */
const RAW_NETHERLANDS: { name: string; model: string; images: string[] }[] = [
  {
    name: 'Netherlands Fake ID — Scannable Replica',
    model: 'Netherlands ID',
    images: ['/images/netherlands.jpg'],
  },
  {
    name: 'Netherlands Fake ID (Polycarbonate)',
    model: 'Netherlands Polycarbonate ID',
    images: ['/images/netherlands.jpg'],
  },
]

export const NETHERLANDS_PRODUCTS = buildProducts(RAW_NETHERLANDS, 'netherlands', 100, '€', 120)
  .sort((a, b) => a.name.localeCompare(b.name))

/* ── Australia products ── */
const RAW_AUSTRALIA: { name: string; model: string; images: string[] }[] = [
  {
    name: 'New South Wales Driver Licence',
    model: 'NSW Driver Licence',
    images: ['/images/australia.jpg'],
  },
  {
    name: 'Victoria Driver Licence',
    model: 'Victoria Driver Licence',
    images: ['/images/australia.jpg'],
  },
  {
    name: 'Queensland Driver Licence',
    model: 'Queensland Driver Licence',
    images: ['/images/australia.jpg'],
  },
  {
    name: 'Western Australia Driver Licence',
    model: 'WA Driver Licence',
    images: ['/images/australia.jpg'],
  },
  {
    name: 'South Australia Driver Licence',
    model: 'SA Driver Licence',
    images: ['/images/australia.jpg'],
  },
  {
    name: 'Tasmania Driver Licence',
    model: 'Tasmania Driver Licence',
    images: ['/images/australia.jpg'],
  },
  {
    name: 'ACT Driver Licence',
    model: 'ACT Driver Licence',
    images: ['/images/australia.jpg'],
  },
  {
    name: 'Northern Territory Driver Licence',
    model: 'NT Driver Licence',
    images: ['/images/australia.jpg'],
  },
]

export const AUSTRALIA_PRODUCTS = buildProducts(RAW_AUSTRALIA, 'australia', 100, 'AUD$', 120)
  .sort((a, b) => a.name.localeCompare(b.name))

export const ALL_PRODUCTS: Product[] = [
  ...USA_PRODUCTS,
  ...CANADA_PRODUCTS,
  ...UK_PRODUCTS,
  ...GERMANY_PRODUCTS,
  ...NETHERLANDS_PRODUCTS,
  ...AUSTRALIA_PRODUCTS,
]

export function getProductBySlug(s: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.slug === s)
}
