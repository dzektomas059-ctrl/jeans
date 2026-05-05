export interface HeroSlide {
  id: number;
  image: string;
  badge: string;
  title: string;
  subtitle: string;
  cta: { label: string; href: string };
  secondary: { label: string; href: string };
  align: 'left' | 'right';
}

export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: '/images/hero1.jpg',
    badge: 'Spring – Summer 2025',
    title: 'Romance\nCollection',
    subtitle:
      'Effortless silhouettes, softly textured tights and weightless lingerie — designed for everyday confidence.',
    cta: { label: 'Shop the collection', href: '/collections/romance' },
    secondary: { label: 'See all promotions', href: '/promotions' },
    align: 'left',
  },
  {
    id: 2,
    image: '/images/banner1.jpg',
    badge: 'Up to −50%',
    title: 'Big Spring\nSale',
    subtitle:
      'Thousands of products at special prices — refresh your wardrobe with everyday essentials.',
    cta: { label: 'Go to sale', href: '/sale' },
    secondary: { label: 'How to order', href: '/how-to-order' },
    align: 'right',
  },
  {
    id: 3,
    image: '/images/banner2.jpg',
    badge: 'Best socks',
    title: 'Best Friends,\nBest Socks',
    subtitle:
      'Cosy combed-cotton socks in playful prints — for the ones who never want to take them off.',
    cta: { label: 'Browse socks', href: '/women/socks' },
    secondary: { label: 'Kids socks', href: '/girls/socks' },
    align: 'left',
  },
];
