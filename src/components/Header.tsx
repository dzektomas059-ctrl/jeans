import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

const navItems = [
  {
    label: 'Женщинам',
    mega: {
      cols: [
        {
          title: 'Одежда',
          links: ['Офис (Office NEW)', 'Трикотаж', 'Джемперы', 'Жакеты и блузы', 'Футболки и топы', 'Платья и сарафаны', 'Комбинезоны', 'Юбки и шорты', 'Брюки', 'Джинсы →']
        },
        {
          title: 'Бельё',
          links: ['Бюстгальтеры', 'Трусы', 'Майки', 'Боди', 'Термобельё', 'Корсеты']
        },
        {
          title: 'Колготки и чулки',
          links: ['Классические', 'Корректирующие', 'Фантазийные', 'Для будущих мам', 'Свадебные', 'Чулки']
        },
        {
          title: 'Носки',
          links: ['Классические', 'Фантазийные', 'Тёплые', 'Гольфы', 'Наборы']
        },
        {
          title: 'Домашняя одежда',
          links: ['Пижамы', 'Халаты', 'Ночные сорочки', 'Домашние костюмы']
        }
      ]
    }
  },
  {
    label: 'Мужчинам',
    mega: {
      cols: [
        {
          title: 'Одежда',
          links: ['Футболки', 'Поло', 'Джемперы', 'Брюки', 'Джинсы']
        },
        {
          title: 'Бельё',
          links: ['Трусы', 'Майки', 'Термобельё', 'Наборы']
        },
        {
          title: 'Носки',
          links: ['Классические', 'Спортивные', 'Фантазийные', 'Тёплые', 'Наборы']
        }
      ]
    }
  },
  {
    label: 'Детям',
    mega: {
      cols: [
        {
          title: 'Девочкам',
          links: ['Колготки', 'Носки', 'Бельё', 'Одежда', 'Пижамы']
        },
        {
          title: 'Мальчикам',
          links: ['Носки', 'Бельё', 'Одежда', 'Пижамы']
        },
        {
          title: 'Малышам',
          links: ['Ползунки', 'Боди', 'Носочки', 'Шапочки']
        }
      ]
    }
  },
  { label: 'Акции', link: '#' },
  { label: 'Новинки', link: '#' },
  { label: 'Магазины', link: '#' },
];

export default function Header() {
  const { cartCount, setCartOpen, setSearchOpen, wishlist } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<number | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<'RU' | 'BY'>('RU');
  const [currency, setCurrency] = useState<'BYN' | 'USD'>('BYN');
  const megaRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavEnter = (idx: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setActiveMega(idx);
  };

  const handleNavLeave = () => {
    timerRef.current = setTimeout(() => setActiveMega(null), 200);
  };

  const handleMegaEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return (
    <>
      {/* TOP BAR */}
      <div style={{ background: '#1a1a1a', color: '#ccc', fontSize: '12px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '6px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <a href="#" style={{ color: '#ccc', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#ccc')}>
              Доставка и оплата
            </a>
            <a href="#" style={{ color: '#ccc', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#ccc')}>
              Возврат и гарантия
            </a>
            <a href="#" style={{ color: '#ccc', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = '#ccc')}>
              Подарочные сертификаты
            </a>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              {(['RU', 'BY'] as const).map(l => (
                <button key={l} onClick={() => setLang(l)}
                  style={{ color: lang === l ? '#c8102e' : '#ccc', fontWeight: lang === l ? 700 : 400, background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', padding: '2px 4px', transition: 'color 0.2s' }}>
                  {l}
                </button>
              ))}
            </div>
            <span style={{ color: '#444' }}>|</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {(['BYN', 'USD'] as const).map(c => (
                <button key={c} onClick={() => setCurrency(c)}
                  style={{ color: currency === c ? '#c8102e' : '#ccc', fontWeight: currency === c ? 700 : 400, background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', padding: '2px 4px', transition: 'color 0.2s' }}>
                  {c}
                </button>
              ))}
            </div>
            <span style={{ color: '#444' }}>|</span>
            <a href="tel:+375172500000" style={{ color: '#ccc', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#c8102e')}
              onMouseLeave={e => (e.currentTarget.style.color = '#ccc')}>
              +375 (17) 250-00-00
            </a>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <header style={{
        background: '#fff',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.1)' : '0 1px 0 #e5e5e5',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        transition: 'box-shadow 0.3s ease'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', height: '70px', gap: '20px' }}>

          {/* BURGER */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ display: 'none', flexDirection: 'column', gap: '5px', padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}
            className="burger-btn"
            aria-label="Меню"
          >
            <span style={{ display: 'block', width: '24px', height: '2px', background: mobileOpen ? 'transparent' : '#1a1a1a', transition: 'all 0.3s', transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></span>
            <span style={{ display: 'block', width: '24px', height: '2px', background: '#1a1a1a', transition: 'all 0.3s', opacity: mobileOpen ? 0 : 1 }}></span>
            <span style={{ display: 'block', width: '24px', height: '2px', background: '#1a1a1a', transition: 'all 0.3s', transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></span>
          </button>

          {/* LOGO */}
          <a href="#" style={{ flexShrink: 0 }}>
            <svg width="140" height="36" viewBox="0 0 140 36" fill="none">
              <text x="0" y="28" fontFamily="Raleway, sans-serif" fontWeight="800" fontSize="28" fill="#c8102e" letterSpacing="-1">CONTE</text>
              <text x="98" y="28" fontFamily="Raleway, sans-serif" fontWeight="300" fontSize="18" fill="#1a1a1a">shop</text>
            </svg>
          </a>

          {/* DESKTOP NAV */}
          <nav style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '4px' }} className="desktop-nav">
            {navItems.map((item, idx) => (
              <div key={idx} style={{ position: 'relative' }}
                onMouseEnter={() => item.mega && handleNavEnter(idx)}
                onMouseLeave={() => item.mega && handleNavLeave()}>
                <a href={item.link || '#'}
                  style={{
                    display: 'block',
                    padding: '8px 14px',
                    fontSize: '14px',
                    fontWeight: 600,
                    fontFamily: 'Raleway, sans-serif',
                    color: activeMega === idx ? '#c8102e' : '#1a1a1a',
                    borderBottom: activeMega === idx ? '2px solid #c8102e' : '2px solid transparent',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={e => { if (!item.mega) e.currentTarget.style.color = '#c8102e'; }}
                  onMouseLeave={e => { if (!item.mega) e.currentTarget.style.color = '#1a1a1a'; }}
                >
                  {item.label}
                  {item.mega && (
                    <span style={{ marginLeft: '4px', fontSize: '10px', display: 'inline-block', transition: 'transform 0.2s', transform: activeMega === idx ? 'rotate(180deg)' : 'none' }}>▾</span>
                  )}
                </a>
              </div>
            ))}
          </nav>

          {/* ACTIONS */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
            <button onClick={() => setSearchOpen(true)}
              style={{ padding: '10px', borderRadius: '50%', background: 'none', border: 'none', cursor: 'pointer', color: '#1a1a1a', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#f6f6f6'; e.currentTarget.style.color = '#c8102e'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#1a1a1a'; }}
              aria-label="Поиск">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>

            <button style={{ padding: '10px', borderRadius: '50%', background: 'none', border: 'none', cursor: 'pointer', color: '#1a1a1a', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#f6f6f6'; e.currentTarget.style.color = '#c8102e'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#1a1a1a'; }}
              aria-label="Избранное">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {wishlist.length > 0 && (
                <span style={{ position: 'absolute', top: '4px', right: '4px', background: '#c8102e', color: '#fff', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                  {wishlist.length}
                </span>
              )}
            </button>

            <button style={{ padding: '10px', borderRadius: '50%', background: 'none', border: 'none', cursor: 'pointer', color: '#1a1a1a', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#f6f6f6'; e.currentTarget.style.color = '#c8102e'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#1a1a1a'; }}
              aria-label="Профиль">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </button>

            <button onClick={() => setCartOpen(true)}
              style={{ padding: '10px', borderRadius: '50%', background: 'none', border: 'none', cursor: 'pointer', color: '#1a1a1a', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#f6f6f6'; e.currentTarget.style.color = '#c8102e'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#1a1a1a'; }}
              aria-label="Корзина">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span style={{ position: 'absolute', top: '4px', right: '4px', background: '#c8102e', color: '#fff', borderRadius: '50%', width: '18px', height: '18px', fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* MEGA MENU */}
        {activeMega !== null && navItems[activeMega]?.mega && (
          <div
            ref={megaRef}
            onMouseEnter={handleMegaEnter}
            onMouseLeave={handleNavLeave}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: '#fff',
              borderTop: '2px solid #c8102e',
              boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
              zIndex: 999,
              animation: 'fadeSlideDown 0.2s ease'
            }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '30px 20px', display: 'grid', gridTemplateColumns: `repeat(${navItems[activeMega].mega!.cols.length}, 1fr)`, gap: '30px' }}>
              {navItems[activeMega].mega!.cols.map((col, ci) => (
                <div key={ci}>
                  <h4 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '13px', color: '#c8102e', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid #f0f0f0' }}>
                    {col.title}
                  </h4>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {col.links.map((link, li) => (
                      <li key={li}>
                        <a href={link === 'Джинсы →' ? '/dzhinsy' : '#'} style={{ fontSize: '13px', color: link === 'Джинсы →' ? '#c8102e' : '#444', transition: 'color 0.2s', display: 'block', padding: '2px 0', fontWeight: link === 'Джинсы →' ? 600 : 400 }}
                          onMouseEnter={e => e.currentTarget.style.color = '#c8102e'}
                          onMouseLeave={e => { e.currentTarget.style.color = link === 'Джинсы →' ? '#c8102e' : '#444'; }}>
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 1100,
        opacity: mobileOpen ? 1 : 0,
        pointerEvents: mobileOpen ? 'all' : 'none',
        transition: 'opacity 0.3s ease'
      }} onClick={() => setMobileOpen(false)} />

      {/* MOBILE MENU DRAWER */}
      <div style={{
        position: 'fixed', top: 0, left: 0, bottom: 0, width: '300px',
        background: '#fff',
        zIndex: 1200,
        transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #e5e5e5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <svg width="120" height="30" viewBox="0 0 140 36" fill="none">
            <text x="0" y="26" fontFamily="Raleway, sans-serif" fontWeight="800" fontSize="24" fill="#c8102e">CONTE</text>
            <text x="84" y="26" fontFamily="Raleway, sans-serif" fontWeight="300" fontSize="16" fill="#1a1a1a">shop</text>
          </svg>
          <button onClick={() => setMobileOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px', color: '#666', lineHeight: 1 }}>×</button>
        </div>
        <nav style={{ flex: 1, padding: '10px 0' }}>
          {navItems.map((item, idx) => (
            <div key={idx}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <a href={item.link || '#'}
                  style={{ flex: 1, display: 'block', padding: '14px 20px', fontSize: '15px', fontWeight: 600, fontFamily: 'Raleway, sans-serif', color: '#1a1a1a', borderBottom: '1px solid #f0f0f0', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#c8102e'}
                  onMouseLeave={e => e.currentTarget.style.color = '#1a1a1a'}>
                  {item.label}
                </a>
                {item.mega && (
                  <button onClick={() => setMobileExpanded(mobileExpanded === idx ? null : idx)}
                    style={{ padding: '14px 20px', background: 'none', border: 'none', cursor: 'pointer', borderBottom: '1px solid #f0f0f0', color: '#666', fontSize: '16px', transition: 'transform 0.2s', transform: mobileExpanded === idx ? 'rotate(90deg)' : 'none' }}>
                    ›
                  </button>
                )}
              </div>
              {item.mega && mobileExpanded === idx && (
                <div style={{ background: '#f9f9f9' }}>
                  {item.mega.cols.map((col, ci) => (
                    <div key={ci} style={{ padding: '10px 20px 10px 30px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#c8102e', textTransform: 'uppercase', marginBottom: '8px' }}>{col.title}</div>
                      {col.links.map((link, li) => (
                        <a key={li} href={link === 'Джинсы →' ? '/dzhinsy' : '#'} style={{ display: 'block', padding: '5px 0', fontSize: '13px', color: link === 'Джинсы →' ? '#c8102e' : '#555', transition: 'color 0.2s', fontWeight: link === 'Джинсы →' ? 600 : 400 }}
                          onMouseEnter={e => e.currentTarget.style.color = '#c8102e'}
                          onMouseLeave={e => { e.currentTarget.style.color = link === 'Джинсы →' ? '#c8102e' : '#555'; }}>
                          {link}
                        </a>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div style={{ padding: '20px', borderTop: '1px solid #e5e5e5' }}>
          <a href="tel:+375172500000" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#c8102e', fontWeight: 600, fontSize: '15px' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.38 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            +375 (17) 250-00-00
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .burger-btn { display: flex !important; }
        }
        @media (max-width: 600px) {
          .header-top-info { display: none !important; }
        }
      `}</style>
    </>
  );
}
