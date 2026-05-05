export interface Category {
  id: number;
  name: string;
  count: number;
  image: string;
  href: string;
}

export const categories: Category[] = [
  { id: 1, name: 'Tights', count: 284, image: '/images/cat1.jpg', href: '/women/tights' },
  { id: 2, name: 'Lingerie', count: 196, image: '/images/cat2.jpg', href: '/women/lingerie' },
  { id: 3, name: 'Clothing', count: 312, image: '/images/cat3.jpg', href: '/women/clothing' },
  { id: 4, name: 'Kids', count: 178, image: '/images/cat4.jpg', href: '/girls' },
  { id: 5, name: 'Men', count: 145, image: '/images/cat5.jpg', href: '/men' },
  { id: 6, name: 'Socks', count: 89, image: '/images/cat6.jpg', href: '/women/socks' },
];
