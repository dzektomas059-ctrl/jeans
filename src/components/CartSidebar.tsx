import { useEffect } from 'react';
import { useApp } from '../context/AppContext';

export default function CartSidebar() {
  const { cartOpen, setCartOpen, cart, removeFromCart, updateQty, cartTotal } = useApp();

  useEffect(() => {
    if (cartOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [cartOpen]);

  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={() => setCartOpen(false)}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 2000,
          opacity: cartOpen ? 1 : 0,
          pointerEvents: cartOpen ? 'all' : 'none',
          transition: 'opacity 0.3s ease',
          backdropFilter: 'blur(2px)'
        }}
      />

      {/* SIDEBAR */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 'min(420px, 100vw)',
        background: '#fff',
        zIndex: 2100,
        transform: cartOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-8px 0 40px rgba(0,0,0,0.15)'
      }}>
        {/* HEADER */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div>
            <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 800, fontSize: '20px', color: '#1a1a1a' }}>Корзина</h2>
            {cart.length > 0 && <span style={{ fontSize: '13px', color: '#888' }}>{cart.length} {cart.length === 1 ? 'товар' : cart.length < 5 ? 'товара' : 'товаров'}</span>}
          </div>
          <button onClick={() => setCartOpen(false)}
            style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#f6f6f6', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', fontSize: '20px', transition: 'all 0.2s', lineHeight: 1 }}
            onMouseEnter={e => { e.currentTarget.style.background = '#c8102e'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#f6f6f6'; e.currentTarget.style.color = '#666'; }}>
            ×
          </button>
        </div>

        {/* ITEMS */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
          {cart.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '16px', color: '#aaa' }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <p style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600, fontSize: '16px', color: '#888' }}>Корзина пуста</p>
              <p style={{ fontSize: '13px', color: '#bbb', textAlign: 'center' }}>Добавьте товары из каталога</p>
              <button onClick={() => setCartOpen(false)}
                style={{ background: '#c8102e', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: '2px', fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '13px', cursor: 'pointer', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#a00e26'}
                onMouseLeave={e => e.currentTarget.style.background = '#c8102e'}>
                Перейти в каталог
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '14px', padding: '14px', borderRadius: '8px', background: '#f9f9f9', border: '1px solid #f0f0f0', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = '#ddd'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = '#f0f0f0'}>
                  <img src={item.image} alt={item.name}
                    style={{ width: '72px', height: '90px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 600, fontSize: '13px', color: '#1a1a1a', marginBottom: '4px', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {item.name}
                    </h4>
                    {item.size && <div style={{ fontSize: '11px', color: '#888', marginBottom: '8px' }}>Размер: {item.size}</div>}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                      {/* QTY */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0', border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
                        <button onClick={() => updateQty(item.id, item.qty - 1)}
                          style={{ width: '28px', height: '28px', background: '#f6f6f6', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#555', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}
                          onMouseEnter={e => e.currentTarget.style.background = '#e0e0e0'}
                          onMouseLeave={e => e.currentTarget.style.background = '#f6f6f6'}>−</button>
                        <span style={{ width: '32px', textAlign: 'center', fontSize: '13px', fontWeight: 600 }}>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)}
                          style={{ width: '28px', height: '28px', background: '#f6f6f6', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#555', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.15s' }}
                          onMouseEnter={e => e.currentTarget.style.background = '#e0e0e0'}
                          onMouseLeave={e => e.currentTarget.style.background = '#f6f6f6'}>+</button>
                      </div>
                      <span style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 800, fontSize: '15px', color: '#c8102e' }}>
                        {(item.price * item.qty).toFixed(2)} BYN
                      </span>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)}
                    style={{ alignSelf: 'flex-start', background: 'none', border: 'none', cursor: 'pointer', color: '#bbb', padding: '2px', transition: 'color 0.2s', flexShrink: 0 }}
                    onMouseEnter={e => e.currentTarget.style.color = '#c8102e'}
                    onMouseLeave={e => e.currentTarget.style.color = '#bbb'}
                    aria-label="Удалить">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3,6 5,6 21,6"/><path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v2"/></svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}
        {cart.length > 0 && (
          <div style={{ padding: '20px 24px', borderTop: '1px solid #f0f0f0', flexShrink: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '13px', color: '#888' }}>Итого:</span>
              <span style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 800, fontSize: '22px', color: '#1a1a1a' }}>{cartTotal.toFixed(2)} BYN</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <span style={{ fontSize: '12px', color: '#aaa' }}>Доставка рассчитывается при оформлении</span>
            </div>
            <button
              style={{ width: '100%', padding: '16px', background: '#c8102e', color: '#fff', border: 'none', borderRadius: '4px', fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '15px', cursor: 'pointer', transition: 'all 0.2s', letterSpacing: '0.5px', boxShadow: '0 4px 15px rgba(200,16,46,0.3)' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#a00e26'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#c8102e'; e.currentTarget.style.transform = 'none'; }}>
              Оформить заказ
            </button>
            <button onClick={() => setCartOpen(false)}
              style={{ width: '100%', padding: '12px', background: 'transparent', color: '#888', border: 'none', fontFamily: 'Raleway, sans-serif', fontWeight: 600, fontSize: '13px', cursor: 'pointer', marginTop: '8px', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#1a1a1a'}
              onMouseLeave={e => e.currentTarget.style.color = '#888'}>
              Продолжить покупки
            </button>
          </div>
        )}
      </div>
    </>
  );
}
