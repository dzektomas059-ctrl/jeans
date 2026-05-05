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
    title: 'Denim\nCollection',
    subtitle:
      'Premium silhouettes — wide-leg, mom-fit, straight and flared. Crafted in heavyweight denim, made to last.',
    cta: { label: 'Shop jeans', href: '/jeans' },
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
    cta: { label: 'Shop sale', href: '/jeans?sale=1' },
    secondary: { label: 'How to order', href: '/how-to-order' },
    align: 'right',
  },
  {
    id: 3,
    image: '/images/banner2.jpg',
    badge: 'New arrivals',
    title: 'Wide-leg,\nReimagined',
    subtitle:
      'Soft-touch denim with a confident silhouette and that perfect raw-hem detail.',
    cta: { label: 'Browse wide-leg', href: '/jeans?fit=Wide%20leg' },
    secondary: { label: 'View bestsellers', href: '/jeans' },
    align: 'left',
  },
];
