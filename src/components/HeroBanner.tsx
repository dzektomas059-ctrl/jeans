import { useState, useEffect, useCallback } from 'react';

const slides = [
  {
    id: 1,
    image: '/images/hero1.jpg',
    badge: 'Новая коллекция',
    title: 'Весна-Лето\n2025',
    subtitle: 'Лёгкость, комфорт и стиль в каждой детали',
    cta: 'Смотреть коллекцию',
    ctaSecondary: 'Акции',
    align: 'left',
    overlay: 'rgba(0,0,0,0.35)',
  },
  {
    id: 2,
    image: '/images/hero2.jpg',
    badge: 'Скидки до 50%',
    title: 'Большая\nраспродажа',
    subtitle: 'Тысячи товаров по специальным ценам',
    cta: 'Перейти к распродаже',
    ctaSecondary: 'Все акции',
    align: 'right',
    overlay: 'rgba(0,0,0,0.4)',
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const goTo = useCallback((idx: number) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setCurrent(idx);
      setTransitioning(false);
    }, 300);
  }, [transitioning]);

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const slide = slides[current];

  return (
    <section style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      {/* MAIN SLIDER */}
      <div style={{ position: 'relative', height: 'clamp(380px, 55vw, 620px)', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          opacity: transitioning ? 0 : 1,
          transition: 'opacity 0.4s ease',
        }}>
          <img
            src={slide.image}
            alt={slide.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: slide.overlay }} />

          {/* CONTENT */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center',
            justifyContent: slide.align === 'right' ? 'flex-end' : 'flex-start',
            padding: '0 clamp(20px, 6vw, 100px)'
          }}>
            <div style={{
              maxWidth: '520px',
              color: '#fff',
              animation: transitioning ? 'none' : 'heroFadeIn 0.6s ease',
            }}>
              <div style={{
                display: 'inline-block',
                background: '#c8102e',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                padding: '5px 14px',
                borderRadius: '2px',
                marginBottom: '16px'
              }}>
                {slide.badge}
              </div>
              <h1 style={{
                fontFamily: 'Raleway, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(32px, 5vw, 62px)',
                lineHeight: 1.1,
                marginBottom: '16px',
                whiteSpace: 'pre-line',
                textShadow: '0 2px 8px rgba(0,0,0,0.3)'
              }}>
                {slide.title}
              </h1>
              <p style={{
                fontSize: 'clamp(14px, 1.5vw, 18px)',
                opacity: 0.9,
                marginBottom: '28px',
                fontWeight: 300,
                textShadow: '0 1px 4px rgba(0,0,0,0.3)'
              }}>
                {slide.subtitle}
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <a href="#"
                  style={{
                    display: 'inline-block',
                    background: '#c8102e',
                    color: '#fff',
                    padding: '14px 32px',
                    fontWeight: 700,
                    fontFamily: 'Raleway, sans-serif',
                    fontSize: '14px',
                    letterSpacing: '0.5px',
                    borderRadius: '2px',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 15px rgba(200,16,46,0.4)'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#a00e26'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(200,16,46,0.5)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#c8102e'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(200,16,46,0.4)'; }}>
                  {slide.cta}
                </a>
                <a href="#"
                  style={{
                    display: 'inline-block',
                    background: 'transparent',
                    color: '#fff',
                    padding: '14px 32px',
                    fontWeight: 600,
                    fontFamily: 'Raleway, sans-serif',
                    fontSize: '14px',
                    border: '2px solid rgba(255,255,255,0.7)',
                    borderRadius: '2px',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.borderColor = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)'; }}>
                  {slide.ctaSecondary}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ARROWS */}
        <button onClick={prev}
          style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', width: '44px', height: '44px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', backdropFilter: 'blur(4px)', zIndex: 10 }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,16,46,0.8)'; e.currentTarget.style.borderColor = '#c8102e'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15,18 9,12 15,6"/></svg>
        </button>
        <button onClick={next}
          style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', width: '44px', height: '44px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', backdropFilter: 'blur(4px)', zIndex: 10 }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,16,46,0.8)'; e.currentTarget.style.borderColor = '#c8102e'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9,18 15,12 9,6"/></svg>
        </button>

        {/* DOTS */}
        <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 10 }}>
          {slides.map((_, idx) => (
            <button key={idx} onClick={() => goTo(idx)}
              style={{
                width: idx === current ? '28px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: idx === current ? '#c8102e' : 'rgba(255,255,255,0.6)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0
              }} />
          ))}
        </div>
      </div>

      {/* PROMO STRIP */}
      <div style={{ background: '#f6f6f6', borderBottom: '1px solid #e5e5e5' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }} className="promo-strip">
          {[
            { icon: '🔥', label: 'Акции', sub: 'Скидки до 50%', color: '#c8102e' },
            { icon: '✨', label: 'Новинки', sub: 'Свежие поступления', color: '#3a7c3a' },
            { icon: '🎁', label: 'Сертификаты', sub: 'Идеальный подарок', color: '#7c5a3a' },
          ].map((item, i) => (
            <a key={i} href="#"
              style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 24px', borderRight: i < 2 ? '1px solid #e5e5e5' : 'none', transition: 'background 0.2s', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.background = '#efefef'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <span style={{ fontSize: '24px' }}>{item.icon}</span>
              <div>
                <div style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '14px', color: item.color }}>{item.label}</div>
                <div style={{ fontSize: '12px', color: '#888' }}>{item.sub}</div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes heroFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 600px) {
          .promo-strip { grid-template-columns: 1fr !important; }
          .promo-strip a { border-right: none !important; border-bottom: 1px solid #e5e5e5; }
        }
      `}</style>
    </section>
  );
}
