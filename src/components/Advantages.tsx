const advantages = [
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    title: 'Быстрая доставка',
    text: 'Доставка по Беларуси курьером или самовывоз из более 100 магазинов',
    color: '#c8102e',
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
    title: 'Удобная оплата',
    text: 'Наличными, банковской картой, ЕРИП или при получении',
    color: '#5e8b7a',
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 14s-4 0-4-4 4-4 4-4 4 0 4 4-4 4-4 4z"/><path d="M9 14h6"/><path d="M15 14s4 0 4-4-4-4-4-4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
      </svg>
    ),
    title: 'Гарантия качества',
    text: 'Собственное производство в Беларуси. Контроль качества на каждом этапе',
    color: '#7c5a3a',
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
    title: 'Возврат 30 дней',
    text: 'Простой и понятный процесс возврата и обмена товара в течение 30 дней',
    color: '#5e6b8b',
  },
];

export default function Advantages() {
  return (
    <section style={{ padding: '60px 0', background: '#fff', borderTop: '1px solid #f0f0f0' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '44px' }}>
          <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 800, fontSize: 'clamp(22px, 3vw, 30px)', color: '#1a1a1a', marginBottom: '8px' }}>
            Почему выбирают Conte
          </h2>
          <div style={{ width: '50px', height: '3px', background: '#c8102e', borderRadius: '2px', margin: '0 auto' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px' }} className="adv-grid">
          {advantages.map((adv, i) => (
            <div key={i}
              style={{ textAlign: 'center', padding: '32px 20px', borderRadius: '8px', background: '#f9f9f9', transition: 'all 0.3s ease', cursor: 'default', border: '1px solid transparent' }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = '#fff';
                el.style.borderColor = adv.color;
                el.style.transform = 'translateY(-4px)';
                el.style.boxShadow = '0 8px 30px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = '#f9f9f9';
                el.style.borderColor = 'transparent';
                el.style.transform = 'none';
                el.style.boxShadow = 'none';
              }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px', color: adv.color }}>
                {adv.icon}
              </div>
              <h3 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '16px', color: '#1a1a1a', marginBottom: '10px' }}>
                {adv.title}
              </h3>
              <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.6 }}>
                {adv.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .adv-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .adv-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
