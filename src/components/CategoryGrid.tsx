const categories = [
  { id: 1, name: 'Колготки и чулки', image: '/images/cat1.jpg', count: 284, color: '#8b5e83' },
  { id: 2, name: 'Бельё', image: '/images/cat2.jpg', count: 196, color: '#5e8b7a' },
  { id: 3, name: 'Одежда', image: '/images/cat3.jpg', count: 312, color: '#7a7a5e' },
  { id: 4, name: 'Детям', image: '/images/cat4.jpg', count: 178, color: '#5e7a8b' },
  { id: 5, name: 'Мужчинам', image: '/images/cat5.jpg', count: 145, color: '#5e6b8b' },
  { id: 6, name: 'Купальники', image: '/images/cat6.jpg', count: 89, color: '#8b7a5e' },
];

export default function CategoryGrid() {
  return (
    <section style={{ padding: '50px 0', background: '#fff' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        {/* SECTION HEADER */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(22px, 3vw, 30px)',
              color: '#1a1a1a',
              marginBottom: '4px'
            }}>
              Категории товаров
            </h2>
            <div style={{ width: '50px', height: '3px', background: '#c8102e', borderRadius: '2px' }} />
          </div>
          <a href="#"
            style={{ fontSize: '14px', fontWeight: 600, color: '#c8102e', display: 'flex', alignItems: 'center', gap: '6px', transition: 'gap 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.gap = '10px'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.gap = '6px'; }}>
            Все категории
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9,18 15,12 9,6"/></svg>
          </a>
        </div>

        {/* GRID */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '16px'
        }} className="cat-grid">
          {categories.map(cat => (
            <a key={cat.id} href="#"
              style={{ display: 'block', textDecoration: 'none', borderRadius: '8px', overflow: 'hidden', position: 'relative', aspectRatio: '3/4', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(-6px)';
                el.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)';
                const img = el.querySelector('img') as HTMLImageElement;
                if (img) img.style.transform = 'scale(1.08)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'none';
                el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
                const img = el.querySelector('img') as HTMLImageElement;
                if (img) img.style.transform = 'scale(1)';
              }}>
              <img src={cat.image} alt={cat.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', transition: 'transform 0.4s ease' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 12px' }}>
                <div style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: 'clamp(11px, 1.2vw, 14px)', color: '#fff', marginBottom: '4px', lineHeight: 1.2 }}>{cat.name}</div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>{cat.count} товаров</div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .cat-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .cat-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
        }
      `}</style>
    </section>
  );
}
