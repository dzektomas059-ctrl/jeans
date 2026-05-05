/**
 * Jeans catalog data — the centerpiece of the store.
 *
 * Note on sizes: Conte sizes use a "<height>-<hip>/<EU letter>" format,
 * e.g. `164-94/S` (height 164 cm, hip 94 cm, EU "S"). Each product carries
 * the full grid plus a list of available colors.
 */

export type JeansBadge = 'new' | 'sale' | 'bestseller';

export interface JeansColor {
  /** Internal code, e.g. "blue", "black", "indigo" */
  code: string;
  /** Display name shown in the modal next to "Цвет:" */
  label: string;
  /** Hex / CSS color used for the swatch fallback */
  swatch: string;
  /** Image previewing the color swatch (square thumbnail) */
  preview: string;
}

export interface JeansSize {
  /** Full label, e.g. "164-94/S" */
  label: string;
  /** Whether the size is currently in stock */
  inStock: boolean;
}

export interface JeansFit {
  /** "Mom", "Wide leg", "Straight" etc. */
  code: string;
  label: string;
}

export interface JeansProduct {
  id: number;
  /** Slug used in the URL: /jeans/<slug> */
  slug: string;
  /** Catalog title — shorter, for grid */
  shortName: string;
  /** Full title used in modal & PDP */
  title: string;
  /** Article string shown under the title in modal: "Джинсы жен. С CON-866, p.164-94, blue" */
  article: string;
  price: number;
  oldPrice?: number;
  /** "руб." / "BYN" / "€" — keep simple string */
  currency: string;
  /** Badge in the top-left corner of the catalog card */
  badge?: JeansBadge;
  /** All gallery images (used for the modal & PDP). First image is the primary. */
  images: string[];
  /** Available colors */
  colors: JeansColor[];
  /** Default selected color code */
  defaultColor: string;
  /** Available sizes for the default color (we keep one grid for simplicity) */
  sizes: JeansSize[];
  /** Fit / silhouette tag(s) — used by the "Посадка" / "Дизайн" filters */
  fit: string;
  design: string;
  rise: 'high' | 'mid' | 'low';
  rating: number;
  reviews: number;
  /** Composition string shown on PDP */
  composition: string;
  /** Description paragraphs shown on PDP */
  description: string[];
  /** Whether this product is on sale (used by the "Товары со скидкой" chip) */
  onSale: boolean;
  /** Whether the product is in stock in physical stores (used by the chip filter) */
  inStores: boolean;
}

const sharedSizes: JeansSize[] = [
  { label: '164-86/XXS', inStock: true },
  { label: '164-90/XS', inStock: true },
  { label: '164-94/S', inStock: true },
  { label: '164-98/M', inStock: true },
  { label: '164-102/L', inStock: true },
  { label: '164-106/XL', inStock: false },
  { label: '170-86/XXS', inStock: true },
  { label: '170-90/XS', inStock: true },
  { label: '170-94/S', inStock: true },
  { label: '170-98/M', inStock: true },
  { label: '170-102/L', inStock: false },
  { label: '170-106/XL', inStock: true },
];

/** Stable, hot-linkable jeans/lifestyle photos from Unsplash. */
const IMG = {
  blueWideA: 'https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?w=1200&q=80',
  blueWideB: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=1200&q=80',
  blueWideC: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=1200&q=80',
  blueWideD: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&q=80',

  momA: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1200&q=80',
  momB: 'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=1200&q=80',
  momC: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=1200&q=80',

  straightA: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=1200&q=80',
  straightB: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200&q=80',
  straightC: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=1200&q=80',

  flaredA: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=1200&q=80',
  flaredB: 'https://images.unsplash.com/photo-1495385794356-15371f348c31?w=1200&q=80',
  flaredC: 'https://images.unsplash.com/photo-1603189343302-e603f7add05a?w=1200&q=80',

  blackA: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200&q=80',
  blackB: 'https://images.unsplash.com/photo-1524275801520-29a9b8b5e7d2?w=1200&q=80',
  blackC: 'https://images.unsplash.com/photo-1519748771451-a94c596fad67?w=1200&q=80',

  whiteA: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=1200&q=80',
  whiteB: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?w=1200&q=80',

  greenA: 'https://images.unsplash.com/photo-1473800447596-01729482b8eb?w=1200&q=80',
  greenB: 'https://images.unsplash.com/photo-1551048632-24e444b48a3e?w=1200&q=80',

  beigeA: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=1200&q=80',
  beigeB: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200&q=80',
};

const swatch = (hex: string) =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" fill="${hex}"/></svg>`,
  )}`;

const COLORS: Record<string, JeansColor> = {
  blue: { code: 'blue', label: 'blue', swatch: '#5d7a9e', preview: swatch('#5d7a9e') },
  skyBlue: { code: 'sky-blue', label: 'sky blue', swatch: '#9fb8d2', preview: swatch('#9fb8d2') },
  indigo: { code: 'indigo', label: 'indigo', swatch: '#2c3e62', preview: swatch('#2c3e62') },
  black: { code: 'black', label: 'black', swatch: '#1a1a1a', preview: swatch('#1a1a1a') },
  white: { code: 'white', label: 'white', swatch: '#f4f1ec', preview: swatch('#f4f1ec') },
  beige: { code: 'beige', label: 'beige', swatch: '#c9b59b', preview: swatch('#c9b59b') },
  green: { code: 'green', label: 'green', swatch: '#5e7a4e', preview: swatch('#5e7a4e') },
  grey: { code: 'grey', label: 'grey', swatch: '#7a7a7a', preview: swatch('#7a7a7a') },
};

export const jeansProducts: JeansProduct[] = [
  {
    id: 101,
    slug: 'wide-leg-sky-blue-raw-hem',
    shortName: 'Джинсы wide leg небесно-голубого цвета с необработанным краем',
    title: 'Джинсы wide leg небесно-голубого цвета с необработанным краем',
    article: 'Джинсы жен. С CON-866, p.164-94, blue',
    price: 159.99,
    currency: 'руб.',
    badge: 'new',
    images: [IMG.blueWideA, IMG.blueWideB, IMG.blueWideC, IMG.blueWideD],
    colors: [COLORS.skyBlue, COLORS.blue, COLORS.indigo],
    defaultColor: 'sky-blue',
    sizes: sharedSizes,
    fit: 'Wide leg',
    design: 'Raw hem',
    rise: 'high',
    rating: 4.9,
    reviews: 128,
    composition: '99% хлопок · 1% эластан',
    description: [
      'Свободный силуэт wide leg с высокой посадкой и выразительным необработанным краем — главный must-have сезона.',
      'Деним премиальной плотности 12 oz с лёгкой эластичной нитью обеспечивает идеальную посадку и форму даже после долгой носки.',
    ],
    onSale: false,
    inStores: true,
  },
  {
    id: 102,
    slug: 'mom-fit-classic-blue',
    shortName: 'Джинсы mom-fit классические синие',
    title: 'Джинсы mom-fit классические синие',
    article: 'Джинсы жен. С CON-512, p.164-94, blue',
    price: 139.99,
    oldPrice: 169.99,
    currency: 'руб.',
    badge: 'sale',
    images: [IMG.momA, IMG.momB, IMG.momC, IMG.blueWideC],
    colors: [COLORS.blue, COLORS.indigo],
    defaultColor: 'blue',
    sizes: sharedSizes,
    fit: 'Mom',
    design: 'Classic',
    rise: 'high',
    rating: 4.8,
    reviews: 412,
    composition: '100% хлопок',
    description: [
      'Универсальная mom-fit модель с приталенным верхом и зауженным к низу силуэтом.',
      'Среднеплотный деним держит форму и подчёркивает фигуру.',
    ],
    onSale: true,
    inStores: true,
  },
  {
    id: 103,
    slug: 'straight-cut-mid-rise',
    shortName: 'Джинсы прямого кроя со средней посадкой',
    title: 'Джинсы прямого кроя со средней посадкой',
    article: 'Джинсы жен. С CON-301, p.164-94, blue',
    price: 129.99,
    currency: 'руб.',
    images: [IMG.straightA, IMG.straightB, IMG.straightC, IMG.blueWideD],
    colors: [COLORS.blue, COLORS.black, COLORS.indigo],
    defaultColor: 'blue',
    sizes: sharedSizes,
    fit: 'Straight',
    design: 'Classic',
    rise: 'mid',
    rating: 4.6,
    reviews: 256,
    composition: '98% хлопок · 2% эластан',
    description: [
      'Аккуратный прямой крой с средней посадкой — основа повседневного гардероба.',
      'Надёжно сидят на бёдрах и выгодно вытягивают силуэт.',
    ],
    onSale: false,
    inStores: true,
  },
  {
    id: 104,
    slug: 'flared-bell-bottom-indigo',
    shortName: 'Джинсы flared с расклешённым низом, индиго',
    title: 'Джинсы flared с расклешённым низом, индиго',
    article: 'Джинсы жен. С CON-720, p.164-94, indigo',
    price: 169.99,
    currency: 'руб.',
    badge: 'new',
    images: [IMG.flaredA, IMG.flaredB, IMG.flaredC, IMG.blueWideB],
    colors: [COLORS.indigo, COLORS.blue],
    defaultColor: 'indigo',
    sizes: sharedSizes,
    fit: 'Flared',
    design: 'Bell-bottom',
    rise: 'high',
    rating: 4.7,
    reviews: 98,
    composition: '99% хлопок · 1% эластан',
    description: [
      'Облегающие до колена и эффектно расклешённые от середины бедра.',
      'Образ из 70-х в актуальном плотном дениме премиального качества.',
    ],
    onSale: false,
    inStores: false,
  },
  {
    id: 105,
    slug: 'black-skinny-high-rise',
    shortName: 'Джинсы skinny с высокой посадкой, чёрные',
    title: 'Джинсы skinny с высокой посадкой, чёрные',
    article: 'Джинсы жен. С CON-205, p.164-94, black',
    price: 119.99,
    oldPrice: 149.99,
    currency: 'руб.',
    badge: 'sale',
    images: [IMG.blackA, IMG.blackB, IMG.blackC, IMG.straightC],
    colors: [COLORS.black, COLORS.grey],
    defaultColor: 'black',
    sizes: sharedSizes,
    fit: 'Skinny',
    design: 'Classic',
    rise: 'high',
    rating: 4.9,
    reviews: 1024,
    composition: '92% хлопок · 6% полиэстер · 2% эластан',
    description: [
      'Классические чёрные skinny — must-have гардероба.',
      'Эластичный деним сохраняет форму и идеально облегает ноги.',
    ],
    onSale: true,
    inStores: true,
  },
  {
    id: 106,
    slug: 'white-mom-fit-summer',
    shortName: 'Джинсы mom-fit белые летние',
    title: 'Джинсы mom-fit белые летние',
    article: 'Джинсы жен. С CON-518, p.164-94, white',
    price: 149.99,
    currency: 'руб.',
    images: [IMG.whiteA, IMG.whiteB, IMG.momA, IMG.momC],
    colors: [COLORS.white, COLORS.beige],
    defaultColor: 'white',
    sizes: sharedSizes,
    fit: 'Mom',
    design: 'Summer',
    rise: 'high',
    rating: 4.5,
    reviews: 78,
    composition: '100% хлопок',
    description: [
      'Лёгкий хлопковый деним идеален для жаркого лета.',
      'Светлый оттенок отлично сочетается с любыми верхами.',
    ],
    onSale: false,
    inStores: true,
  },
  {
    id: 107,
    slug: 'green-loose-cargo',
    shortName: 'Джинсы loose с накладными карманами, зелёные',
    title: 'Джинсы loose с накладными карманами, зелёные',
    article: 'Джинсы жен. С CON-933, p.164-94, green',
    price: 179.99,
    currency: 'руб.',
    badge: 'new',
    images: [IMG.greenA, IMG.greenB, IMG.flaredC, IMG.straightA],
    colors: [COLORS.green, COLORS.beige, COLORS.black],
    defaultColor: 'green',
    sizes: sharedSizes,
    fit: 'Loose',
    design: 'Cargo',
    rise: 'mid',
    rating: 4.4,
    reviews: 56,
    composition: '100% хлопок',
    description: [
      'Свободный силуэт с объёмными карманами и плотным дёнимом цвета хаки.',
      'Идеальны для уличного образа в стиле utility.',
    ],
    onSale: false,
    inStores: true,
  },
  {
    id: 108,
    slug: 'beige-straight-relaxed',
    shortName: 'Джинсы прямые relaxed бежевые',
    title: 'Джинсы прямые relaxed бежевые',
    article: 'Джинсы жен. С CON-440, p.164-94, beige',
    price: 145.0,
    currency: 'руб.',
    images: [IMG.beigeA, IMG.beigeB, IMG.straightB, IMG.whiteA],
    colors: [COLORS.beige, COLORS.white],
    defaultColor: 'beige',
    sizes: sharedSizes,
    fit: 'Relaxed',
    design: 'Classic',
    rise: 'mid',
    rating: 4.6,
    reviews: 142,
    composition: '99% хлопок · 1% эластан',
    description: [
      'Свободные бежевые джинсы прямого кроя с лёгкой эластичностью.',
      'Сочетают комфорт и универсальность для офиса и кэжуал-образов.',
    ],
    onSale: false,
    inStores: false,
  },
  {
    id: 109,
    slug: 'mom-fit-plus-size',
    shortName: 'Джинсы mom-fit Plus Size, синий деним',
    title: 'Джинсы mom-fit Plus Size, синий деним',
    article: 'Джинсы жен. С CON-612, p.170-110, blue',
    price: 165.0,
    currency: 'руб.',
    badge: 'bestseller',
    images: [IMG.momB, IMG.momA, IMG.blueWideA, IMG.blueWideC],
    colors: [COLORS.blue, COLORS.indigo, COLORS.black],
    defaultColor: 'blue',
    sizes: [
      { label: '164-102/L', inStock: true },
      { label: '164-106/XL', inStock: true },
      { label: '164-110/XXL', inStock: true },
      { label: '170-102/L', inStock: true },
      { label: '170-106/XL', inStock: true },
      { label: '170-110/XXL', inStock: true },
      { label: '170-114/3XL', inStock: true },
    ],
    fit: 'Mom',
    design: 'Plus Size',
    rise: 'high',
    rating: 4.9,
    reviews: 642,
    composition: '98% хлопок · 2% эластан',
    description: [
      'Любимая модель mom-fit в расширенной размерной линейке.',
      'Анатомический крой и мягкий комфортный пояс.',
    ],
    onSale: false,
    inStores: true,
  },
];

export const jeansFilters = {
  fits: ['Wide leg', 'Mom', 'Straight', 'Skinny', 'Flared', 'Loose', 'Relaxed'] as const,
  designs: ['Classic', 'Raw hem', 'Cargo', 'Bell-bottom', 'Summer', 'Plus Size'] as const,
  colors: Object.values(COLORS),
  sizesShort: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'] as const,
  sortOptions: [
    { code: 'updated', label: 'По обновлению' },
    { code: 'price-asc', label: 'Цена: по возрастанию' },
    { code: 'price-desc', label: 'Цена: по убыванию' },
    { code: 'popular', label: 'По популярности' },
  ] as const,
  prices: [
    { code: 'all', label: 'Все цены' },
    { code: '0-100', label: 'до 100 руб.' },
    { code: '100-150', label: '100 – 150 руб.' },
    { code: '150-200', label: '150 – 200 руб.' },
    { code: '200+', label: 'от 200 руб.' },
  ] as const,
  tags: [
    { code: 'high-rise', label: 'С высокой посадкой' },
    { code: 'plus-size', label: 'Большие размеры' },
    { code: 'mom', label: 'Mom' },
    { code: 'loose', label: 'Свободные' },
    { code: 'wide', label: 'Широкие' },
  ] as const,
};

export const totalJeansCount = 53;

export function findJeansBySlug(slug: string): JeansProduct | undefined {
  return jeansProducts.find((p) => p.slug === slug);
}

export function findJeansById(id: number): JeansProduct | undefined {
  return jeansProducts.find((p) => p.id === id);
}
