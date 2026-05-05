export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export const footerColumns: FooterColumn[] = [
  {
    title: 'Customers',
    links: [
      { label: 'How to order', href: '/how-to-order' },
      { label: 'Delivery', href: '/delivery' },
      { label: 'Payment', href: '/payment' },
      { label: 'Return and refunds', href: '/returns' },
      { label: 'Loyalty programme', href: '/loyalty' },
      { label: 'Gift certificates', href: '/gift-cards' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', href: '/about' },
      { label: 'Our history', href: '/history' },
      { label: 'Production', href: '/production' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Contacts', href: '/contacts' },
    ],
  },
  {
    title: 'Catalog',
    links: [
      { label: 'Women', href: '/women' },
      { label: 'Men', href: '/men' },
      { label: 'Girls', href: '/girls' },
      { label: 'Boys', href: '/boys' },
      { label: 'New arrivals', href: '/new' },
      { label: 'Sale', href: '/sale' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Size guide', href: '/size-guide' },
      { label: 'Garment care', href: '/care' },
      { label: 'Stores', href: '/stores' },
      { label: 'Get in touch', href: '/contact' },
      { label: 'Blog', href: '/blog' },
    ],
  },
];

export const paymentMethods = [
  { name: 'Visa', label: 'VISA' },
  { name: 'Mastercard', label: 'MC' },
  { name: 'PayPal', label: 'PAYPAL' },
  { name: 'Apple Pay', label: 'A·PAY' },
  { name: 'Google Pay', label: 'G·PAY' },
];
