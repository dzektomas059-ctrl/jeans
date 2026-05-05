import { useState } from 'react';
import { useApp } from '../context/AppContext';

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  badgeColor?: string;
  sizes?: string[];
  colors?: string[];
}

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { wishlist, toggleWishlist, addToCart } = useApp();
  const [hovered, setHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [addedAnim, setAddedAnim] = useState(false);
  const isWished = wishlist.includes(product.id);
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize || undefined,
    });
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 600);
  };

  return (
    <article
      style={{ position: 'relative', background: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: hovered ? '0 8px 30px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.06)', transition: 'box-shadow 0.3s ease, transform 0.3s ease', transform: hovered ? 'translateY(-4px)' : 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      {/* IMAGE */}
      <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: '#f8f8f8' }}>
        <img src={product.image} alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />

        {/* BADGES */}
        <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {product.badge && (
            <span style={{ background: product.badgeColor || '#c8102e', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '2px', letterSpacing: '0.5px' }}>
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span style={{ background: '#c8102e', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '2px' }}>
              -{discount}%
            </span>
          )}
        </div>

        {/* WISHLIST BTN */}
        <button
          onClick={e => { e.stopPropagation(); toggleWishlist(product.id); }}
          style={{
            position: 'absolute', top: '10px', right: '10px',
            width: '34px', height: '34px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'all 0.2s',
            transform: isWished ? 'scale(1.1)' : 'scale(1)'
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#fff'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.9)'}
          aria-label="Добавить в избранное">
          <svg width="16" height="16" viewBox="0 0 24 24" fill={isWished ? '#c8102e' : 'none'} stroke={isWished ? '#c8102e' : '#888'} strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        {/* QUICK ADD OVERLAY */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'rgba(255,255,255,0.95)',
          padding: '12px',
          transform: hovered ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.3s ease',
        }}>
          {product.sizes && (
            <div style={{ display: 'flex', gap: '5px', justifyContent: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
              {product.sizes.map(size => (
                <button key={size} onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                  style={{
                    padding: '4px 8px', fontSize: '11px', fontWeight: 600,
                    border: `1px solid ${selectedSize === size ? '#c8102e' : '#ddd'}`,
                    background: selectedSize === size ? '#c8102e' : '#fff',
                    color: selectedSize === size ? '#fff' : '#555',
                    borderRadius: '2px', cursor: 'pointer', transition: 'all 0.15s'
                  }}>
                  {size}
                </button>
              ))}
            </div>
          )}
          <button onClick={handleAddToCart}
            style={{
              width: '100%', padding: '9px', background: addedAnim ? '#3a7c3a' : '#c8102e', color: '#fff',
              border: 'none', borderRadius: '2px', cursor: 'pointer',
              fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '12px', letterSpacing: '0.5px',
              transition: 'background 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
            }}
            onMouseEnter={e => { if (!addedAnim) e.currentTarget.style.background = '#a00e26'; }}
            onMouseLeave={e => { if (!addedAnim) e.currentTarget.style.background = '#c8102e'; }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            {addedAnim ? 'Добавлено!' : 'В корзину'}
          </button>
        </div>
      </div>

      {/* INFO */}
      <div style={{ padding: '12px' }}>
        {/* RATING */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
          {[1,2,3,4,5].map(s => (
            <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill={s <= product.rating ? '#f5a623' : '#ddd'} stroke="none">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
            </svg>
          ))}
          <span style={{ fontSize: '11px', color: '#999', marginLeft: '2px' }}>({product.reviews})</span>
        </div>

        <h3 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600, fontSize: '13px', color: '#1a1a1a', marginBottom: '8px', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          <a href="#" style={{ color: 'inherit', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#c8102e'}
            onMouseLeave={e => e.currentTarget.style.color = '#1a1a1a'}>
            {product.name}
          </a>
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 800, fontSize: '16px', color: '#c8102e' }}>
            {product.price.toFixed(2)} BYN
          </span>
          {product.oldPrice && (
            <span style={{ fontSize: '13px', color: '#aaa', textDecoration: 'line-through' }}>
              {product.oldPrice.toFixed(2)} BYN
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
