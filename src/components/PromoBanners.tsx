export default function PromoBanners() {
  return (
    <section style={{ padding: '50px 0', background: '#fff' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="promo-grid">

          {/* LEFT BANNER */}
          <a href="#" style={{ display: 'block', borderRadius: '8px', overflow: 'hidden', position: 'relative', minHeight: '280px', textDecoration: 'none' }}
            onMouseEnter={e => { const img = e.currentTarget.querySelector('img') as HTMLImageElement; if (img) img.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { const img = e.currentTarget.querySelector('img') as HTMLImageElement; if (img) img.style.transform = 'scale(1)'; }}>
            <img src="/images/banner1.jpg" alt="Весенняя коллекция"
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, transition: 'transform 0.5s ease' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(200,16,46,0.8) 0%, rgba(100,0,20,0.6) 100%)' }} />
            <div style={{ position: 'relative', padding: '40px 36px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', marginBottom: '12px' }}>
                Весна-Лето 2025
              </div>
              <h3 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 800, fontSize: 'clamp(22px, 3vw, 36px)', color: '#fff', marginBottom: '12px', lineHeight: 1.2 }}>
                Новая коллекция<br />одежды
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px', marginBottom: '24px', maxWidth: '280px' }}>
                Лёгкость и комфорт для каждого дня. Трикотаж, блузы, платья.
              </p>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: '#fff', color: '#c8102e',
                padding: '12px 24px', borderRadius: '2px',
                fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '13px',
                width: 'fit-content', transition: 'all 0.2s',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
              }}>
                Смотреть
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9,18 15,12 9,6"/></svg>
              </span>
            </div>
          </a>

          {/* RIGHT — 2 stacked banners */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <a href="#" style={{ display: 'block', borderRadius: '8px', overflow: 'hidden', position: 'relative', flex: 1, minHeight: '125px', textDecoration: 'none', background: '#1a1a1a' }}
              onMouseEnter={e => { const img = e.currentTarget.querySelector('img') as HTMLImageElement; if (img) img.style.transform = 'scale(1.05)'; }}
              onMouseLeave={e => { const img = e.currentTarget.querySelector('img') as HTMLImageElement; if (img) img.style.transform = 'scale(1)'; }}>
              <img src="/images/banner2.jpg" alt="Распродажа"
                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0, transition: 'transform 0.5s ease', opacity: 0.5 }} />
              <div style={{ position: 'relative', padding: '28px 30px', display: 'flex', alignItems: 'center', gap: '20px', height: '100%' }}>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#f5a623', marginBottom: '6px' }}>Горячие скидки</div>
                  <h3 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 800, fontSize: 'clamp(20px, 2.5vw, 28px)', color: '#fff', marginBottom: '8px' }}>
                    Распродажа<br />до <span style={{ color: '#c8102e' }}>-50%</span>
                  </h3>
                  <span style={{ display: 'inline-block', background: '#c8102e', color: '#fff', padding: '8px 20px', borderRadius: '2px', fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '12px', transition: 'background 0.2s' }}>
                    Перейти →
                  </span>
                </div>
              </div>
            </a>

            <a href="#" style={{ display: 'block', borderRadius: '8px', overflow: 'hidden', position: 'relative', flex: 1, minHeight: '125px', textDecoration: 'none', background: '#f0f0f0' }}
              onMouseEnter={e => e.currentTarget.style.background = '#e8e8e8'}
              onMouseLeave={e => e.currentTarget.style.background = '#f0f0f0'}>
              <div style={{ padding: '28px 30px', display: 'flex', alignItems: 'center', gap: '20px', height: '100%' }}>
                <div style={{ fontSize: '48px' }}>🎁</div>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#888', marginBottom: '6px' }}>Для близких</div>
                  <h3 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 800, fontSize: 'clamp(18px, 2vw, 24px)', color: '#1a1a1a', marginBottom: '8px' }}>
                    Подарочные<br />сертификаты
                  </h3>
                  <span style={{ display: 'inline-block', background: '#1a1a1a', color: '#fff', padding: '8px 20px', borderRadius: '2px', fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '12px', transition: 'background 0.2s' }}>
                    Выбрать →
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .promo-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
