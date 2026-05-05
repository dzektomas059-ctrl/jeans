import { useState } from 'react';
import ProductCard from './ProductCard';

const allProducts = [
  // NEW ARRIVALS
  { id: 1, name: 'Колготки женские CONTE ELEGANT 20 den', price: 5.90, image: '/images/prod1.jpg', rating: 5, reviews: 124, badge: 'NEW', badgeColor: '#3a7c3a', sizes: ['S', 'M', 'L', 'XL'], tab: 'new' },
  { id: 2, name: 'Термобельё женское CONTE ACTIVE', price: 38.50, oldPrice: 52.00, image: '/images/prod2.jpg', rating: 4, reviews: 87, badge: 'NEW', badgeColor: '#3a7c3a', sizes: ['XS', 'S', 'M', 'L'], tab: 'new' },
  { id: 3, name: 'Бюстгальтер CONTE ELEGANT с мягкими чашками', price: 22.90, image: '/images/prod3.jpg', rating: 5, reviews: 56, badge: 'NEW', badgeColor: '#3a7c3a', sizes: ['75B', '80B', '85C', '90C'], tab: 'new' },
  { id: 4, name: 'Носки женские CONTE FANTASY весна', price: 3.20, image: '/images/prod4.jpg', rating: 4, reviews: 203, badge: 'NEW', badgeColor: '#3a7c3a', sizes: ['23-25', '25-27'], tab: 'new' },
  { id: 5, name: 'Пижама женская CONTE HOME хлопок', price: 45.90, oldPrice: 59.90, image: '/images/prod5.jpg', rating: 5, reviews: 41, badge: 'NEW', badgeColor: '#3a7c3a', sizes: ['S', 'M', 'L', 'XL', 'XXL'], tab: 'new' },
  { id: 6, name: 'Носки детские CONTE KIDS набор 5 пар', price: 8.50, image: '/images/prod6.jpg', rating: 5, reviews: 312, badge: 'NEW', badgeColor: '#3a7c3a', sizes: ['16-18', '18-20', '20-22'], tab: 'new' },
  { id: 7, name: 'Колготки корректирующие CONTE PRESTIGE', price: 12.90, oldPrice: 16.50, image: '/images/prod1.jpg', rating: 4, reviews: 78, tab: 'new' },
  { id: 8, name: 'Боди женское CONTE ELEGANT с кружевом', price: 28.90, image: '/images/prod3.jpg', rating: 5, reviews: 34, tab: 'new' },

  // POPULAR
  { id: 9, name: 'Колготки CONTE ELEGANT 20 den чёрные', price: 5.90, image: '/images/prod1.jpg', rating: 5, reviews: 1240, badge: 'ХИТ', badgeColor: '#f5a623', sizes: ['S', 'M', 'L', 'XL'], tab: 'popular' },
  { id: 10, name: 'Термобельё CONTE ACTIVE женское', price: 38.50, oldPrice: 52.00, image: '/images/prod2.jpg', rating: 5, reviews: 870, badge: 'SALE', badgeColor: '#c8102e', sizes: ['XS', 'S', 'M', 'L'], tab: 'popular' },
  { id: 11, name: 'Бюстгальтер CONTE ELEGANT классический', price: 19.90, image: '/images/prod3.jpg', rating: 4, reviews: 560, sizes: ['75B', '80B', '85C', '90C'], tab: 'popular' },
  { id: 12, name: 'Носки CONTE FANTASY женские набор', price: 9.90, oldPrice: 13.50, image: '/images/prod4.jpg', rating: 5, reviews: 2030, badge: 'SALE', badgeColor: '#c8102e', sizes: ['23-25', '25-27'], tab: 'popular' },
  { id: 13, name: 'Пижама CONTE HOME женская лёгкая', price: 42.90, image: '/images/prod5.jpg', rating: 4, reviews: 410, sizes: ['S', 'M', 'L', 'XL'], tab: 'popular' },
  { id: 14, name: 'Носки детские CONTE KIDS', price: 2.90, image: '/images/prod6.jpg', rating: 5, reviews: 3120, badge: 'ХИТ', badgeColor: '#f5a623', sizes: ['16-18', '18-20', '20-22'], tab: 'popular' },
  { id: 15, name: 'Колготки CONTE PRESTIGE 40 den', price: 8.90, oldPrice: 11.50, image: '/images/prod1.jpg', rating: 4, reviews: 780, tab: 'popular' },
  { id: 16, name: 'Боди CONTE ELEGANT кружевное', price: 25.90, image: '/images/prod3.jpg', rating: 5, reviews: 340, tab: 'popular' },
];

interface Props {
  title: string;
  tab: string;
}

export default function ProductSection({ title, tab }: Props) {
  const [page, setPage] = useState(0);
  const perPage = 4;
  const products = allProducts.filter(p => p.tab === tab);
  const totalPages = Math.ceil(products.length / perPage);
  const visible = products.slice(page * perPage, page * perPage + perPage);

  return (
    <section style={{ padding: '50px 0', background: tab === 'popular' ? '#f6f6f6' : '#fff' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        {/* HEADER */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 800, fontSize: 'clamp(22px, 3vw, 30px)', color: '#1a1a1a', marginBottom: '4px' }}>
              {title}
            </h2>
            <div style={{ width: '50px', height: '3px', background: '#c8102e', borderRadius: '2px' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a href="#" style={{ fontSize: '14px', fontWeight: 600, color: '#c8102e', display: 'flex', alignItems: 'center', gap: '6px', transition: 'gap 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.gap = '10px'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.gap = '6px'; }}>
              Все товары
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9,18 15,12 9,6"/></svg>
            </a>
            {/* PAGINATION ARROWS */}
            <div style={{ display: 'flex', gap: '6px' }}>
              <button onClick={() => setPage(p => Math.max(0, p - 1))}
                disabled={page === 0}
                style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #ddd', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: page === 0 ? 'not-allowed' : 'pointer', opacity: page === 0 ? 0.4 : 1, transition: 'all 0.2s', color: '#555' }}
                onMouseEnter={e => { if (page !== 0) { e.currentTarget.style.borderColor = '#c8102e'; e.currentTarget.style.color = '#c8102e'; } }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.color = '#555'; }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15,18 9,12 15,6"/></svg>
              </button>
              <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #ddd', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: page >= totalPages - 1 ? 'not-allowed' : 'pointer', opacity: page >= totalPages - 1 ? 0.4 : 1, transition: 'all 0.2s', color: '#555' }}
                onMouseEnter={e => { if (page < totalPages - 1) { e.currentTarget.style.borderColor = '#c8102e'; e.currentTarget.style.color = '#c8102e'; } }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.color = '#555'; }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9,18 15,12 9,6"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* PRODUCTS GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }} className="prod-grid">
          {visible.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* DOTS */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '28px' }}>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button key={i} onClick={() => setPage(i)}
              style={{ width: i === page ? '24px' : '8px', height: '8px', borderRadius: '4px', background: i === page ? '#c8102e' : '#ddd', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease' }} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .prod-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .prod-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
        }
      `}</style>
    </section>
  );
}
