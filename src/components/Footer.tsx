const footerLinks = {
  'Покупателям': ['Как сделать заказ', 'Доставка и оплата', 'Возврат и обмен', 'Гарантия качества', 'Программа лояльности', 'Подарочные сертификаты'],
  'Компания': ['О бренде Conte', 'История компании', 'Производство', 'Вакансии', 'Пресс-центр', 'Контакты'],
  'Каталог': ['Женщинам', 'Мужчинам', 'Детям', 'Новинки', 'Акции', 'Все товары'],
  'Помощь': ['Частые вопросы', 'Размерная таблица', 'Уход за изделиями', 'Магазины', 'Обратная связь', 'Блог'],
};

const paymentIcons = [
  { name: 'Visa', bg: '#1a1f71', text: 'VISA', textColor: '#fff' },
  { name: 'Mastercard', bg: '#eb001b', text: 'MC', textColor: '#fff' },
  { name: 'ЕРИП', bg: '#00a651', text: 'ЕРИП', textColor: '#fff' },
  { name: 'Наличные', bg: '#f6f6f6', text: '💵', textColor: '#333' },
  { name: 'Рассрочка', bg: '#f6f6f6', text: '0%', textColor: '#c8102e' },
];

export default function Footer() {
  return (
    <footer style={{ background: '#1a1a1a', color: '#aaa' }}>
      {/* MAIN FOOTER */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '60px 20px 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr repeat(4, 1fr)', gap: '40px', marginBottom: '50px' }} className="footer-grid">

          {/* BRAND */}
          <div>
            <a href="#" style={{ display: 'inline-block', marginBottom: '20px' }}>
              <svg width="140" height="36" viewBox="0 0 140 36" fill="none">
                <text x="0" y="28" fontFamily="Raleway, sans-serif" fontWeight="800" fontSize="28" fill="#c8102e">CONTE</text>
                <text x="98" y="28" fontFamily="Raleway, sans-serif" fontWeight="300" fontSize="18" fill="#fff">shop</text>
              </svg>
            </a>
            <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#888', marginBottom: '20px', maxWidth: '220px' }}>
              Официальный интернет-магазин белорусского бренда Conte. Колготки, бельё, одежда и аксессуары.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="tel:+375172500000" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontSize: '15px', fontWeight: 600, transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#c8102e'}
                onMouseLeave={e => e.currentTarget.style.color = '#fff'}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.38 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                +375 (17) 250-00-00
              </a>
              <a href="mailto:info@conteshop.by" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#888', fontSize: '13px', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#c8102e'}
                onMouseLeave={e => e.currentTarget.style.color = '#888'}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                info@conteshop.by
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#888', fontSize: '13px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
                Пн-Пт: 9:00 – 18:00
              </div>
            </div>
          </div>

          {/* LINKS */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '13px', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '18px', paddingBottom: '10px', borderBottom: '1px solid #2a2a2a' }}>
                {section}
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {links.map(link => (
                  <li key={link}>
                    <a href="#" style={{ fontSize: '13px', color: '#888', transition: 'color 0.2s', display: 'block' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#c8102e'}
                      onMouseLeave={e => e.currentTarget.style.color = '#888'}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* DIVIDER */}
        <div style={{ borderTop: '1px solid #2a2a2a', paddingTop: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>

            {/* PAYMENT */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '12px', color: '#666', marginRight: '4px' }}>Способы оплаты:</span>
              {paymentIcons.map(p => (
                <div key={p.name} title={p.name}
                  style={{ background: p.bg, borderRadius: '4px', padding: '4px 8px', fontSize: '11px', fontWeight: 700, color: p.textColor, minWidth: '40px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.08)' }}>
                  {p.text}
                </div>
              ))}
            </div>

            {/* SOCIAL */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', color: '#666', marginRight: '4px' }}>Мы в соцсетях:</span>
              {[
                { name: 'Instagram', icon: '📸' },
                { name: 'VK', icon: '💙' },
                { name: 'Telegram', icon: '✈️' },
                { name: 'YouTube', icon: '▶️' },
              ].map(s => (
                <a key={s.name} href="#" title={s.name}
                  style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', transition: 'all 0.2s', textDecoration: 'none', border: '1px solid #333' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#c8102e'; e.currentTarget.style.borderColor = '#c8102e'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#2a2a2a'; e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.transform = 'none'; }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div style={{ background: '#111', padding: '16px 20px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <p style={{ fontSize: '12px', color: '#555' }}>
            © 2025 Conte. Все права защищены. ООО «Конте Спа»
          </p>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Политика конфиденциальности', 'Пользовательское соглашение', 'Карта сайта'].map(link => (
              <a key={link} href="#" style={{ fontSize: '12px', color: '#555', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#c8102e'}
                onMouseLeave={e => e.currentTarget.style.color = '#555'}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 700px) {
          .footer-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
