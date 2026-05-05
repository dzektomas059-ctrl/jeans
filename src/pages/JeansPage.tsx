import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import Footer from '../components/Footer';

/* ─────────────────────────── DATA ─────────────────────────── */
const PRODUCTS = [
  {
    id: 101, art: 'CON-796', name: 'Джинсы Straight с вискозой серые',
    price: 127.49, oldPrice: 149.99, image: '/images/jeans/j6.jpg',
    badge: 'SALE', badgeColor: '#c8102e',
    rating: 4, reviews: 38,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['#8a8a8a', '#1a1a1a'],
    fit: 'Straight', rise: 'Высокая', height: '164–170', material: 'Деним + вискоза',
    isNew: false, isSale: true,
  },
  {
    id: 102, art: 'CON-797', name: 'Джинсы Straight чёрные с декоративными патами',
    price: 135.99, oldPrice: 159.99, image: '/images/jeans/j3.jpg',
    badge: 'SALE', badgeColor: '#c8102e',
    rating: 5, reviews: 54,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#1a1a1a'],
    fit: 'Straight', rise: 'Высокая', height: '170+', material: '100% Хлопок',
    isNew: false, isSale: true,
  },
  {
    id: 103, art: 'CON-800', name: 'Джинсы Wide Leg с петлёй для кастомизации',
    price: 109.99, oldPrice: 165.99, image: '/images/jeans/j2.jpg',
    badge: 'SALE', badgeColor: '#c8102e',
    rating: 5, reviews: 72,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['#2255aa', '#1a1a1a'],
    fit: 'Wide Leg', rise: 'Высокая', height: '164–170', material: 'Eco-friendly деним',
    isNew: false, isSale: true,
  },
  {
    id: 104, art: 'CON-805', name: 'Джинсы Wide Leg Eco-Friendly с потёртостями',
    price: 119.99, oldPrice: 165.99, image: '/images/jeans/j8.jpg',
    badge: 'NEW', badgeColor: '#3a7c3a',
    rating: 4, reviews: 21,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#2255aa', '#6699cc'],
    fit: 'Wide Leg', rise: 'Средняя', height: '158–164', material: 'Eco-friendly деним',
    isNew: true, isSale: true,
  },
  {
    id: 105, art: 'CON-845', name: 'Джинсы Wide Leg винтажной варки необработанный край',
    price: 119.99, oldPrice: 165.99, image: '/images/jeans/j7.jpg',
    badge: 'NEW', badgeColor: '#3a7c3a',
    rating: 5, reviews: 15,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['#6699cc', '#aab8cc'],
    fit: 'Wide Leg', rise: 'Высокая', height: '170+', material: '99% Хлопок, 1% Эластан',
    isNew: true, isSale: true,
  },
  {
    id: 106, art: 'CON-720', name: 'Джинсы Skinny асимметричный низ с разрушениями',
    price: 94.99, oldPrice: 135.49, image: '/images/jeans/j9.jpg',
    badge: 'SALE', badgeColor: '#c8102e',
    rating: 4, reviews: 89,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['#2255aa', '#6699cc'],
    fit: 'Skinny', rise: 'Средняя', height: '158–164', material: '98% Хлопок, 2% Эластан',
    isNew: false, isSale: true,
  },
  {
    id: 107, art: 'CON-626', name: 'Джинсы Slim Fit оксидной варки',
    price: 99.99, oldPrice: 142.49, image: '/images/jeans/j5.jpg',
    badge: 'SALE', badgeColor: '#c8102e',
    rating: 4, reviews: 103,
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#4477bb', '#6699cc'],
    fit: 'Slim', rise: 'Высокая', height: '164–170', material: '97% Хлопок, 3% Эластан',
    isNew: false, isSale: true,
  },
  {
    id: 108, art: 'CON-793', name: 'Джинсы Straight винтажной варки',
    price: 101.99, oldPrice: 149.99, image: '/images/jeans/j1.jpg',
    badge: 'SALE', badgeColor: '#c8102e',
    rating: 5, reviews: 67,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['#3366aa', '#2255aa'],
    fit: 'Straight', rise: 'Высокая', height: '164–170', material: '100% Хлопок',
    isNew: false, isSale: true,
  },
  {
    id: 109, art: 'CON-799', name: 'Джинсы Straight ULTRA-LONG чёрные с потёртостями',
    price: 119.99, oldPrice: 149.99, image: '/images/jeans/j4.jpg',
    badge: 'NEW', badgeColor: '#3a7c3a',
    rating: 5, reviews: 29,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['#1a1a1a', '#333333'],
    fit: 'Straight', rise: 'Высокая', height: '170+', material: '100% Хлопок',
    isNew: true, isSale: true,
  },
  {
    id: 110, art: 'CON-812', name: 'Джинсы Mom Fit с высокой посадкой светлая варка',
    price: 129.99, oldPrice: null, image: '/images/jeans/j10.jpg',
    badge: null, badgeColor: null,
    rating: 5, reviews: 44,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['#aab8cc', '#6699cc'],
    fit: 'Mom', rise: 'Высокая', height: '158–164', material: '98% Хлопок, 2% Эластан',
    isNew: false, isSale: false,
  },
  {
    id: 111, art: 'CON-831', name: 'Джинсы Straight тёмно-синие базовые',
    price: 139.99, oldPrice: null, image: '/images/jeans/j11.jpg',
    badge: 'NEW', badgeColor: '#3a7c3a',
    rating: 4, reviews: 18,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['#1a2a4a', '#2255aa'],
    fit: 'Straight', rise: 'Средняя', height: '164–170', material: '99% Хлопок, 1% Эластан',
    isNew: true, isSale: false,
  },
  {
    id: 112, art: 'CON-860', name: 'Джинсы Baggy Fit оверсайз уличный стиль',
    price: 149.99, oldPrice: null, image: '/images/jeans/j12.jpg',
    badge: 'NEW', badgeColor: '#3a7c3a',
    rating: 5, reviews: 11,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['#6699cc', '#aab8cc'],
    fit: 'Baggy', rise: 'Низкая', height: '164–170', material: '100% Хлопок',
    isNew: true, isSale: false,
  },
];

const FIT_OPTIONS = ['Straight', 'Wide Leg', 'Skinny', 'Slim', 'Mom', 'Baggy'];
const RISE_OPTIONS = ['Высокая', 'Средняя', 'Низкая'];
const HEIGHT_OPTIONS = ['158–164', '164–170', '170+'];
const SIZE_OPTIONS = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const COLOR_MAP: Record<string, { label: string; hex: string }> = {
  '#1a1a1a': { label: 'Чёрный', hex: '#1a1a1a' },
  '#333333': { label: 'Тёмно-серый', hex: '#333333' },
  '#8a8a8a': { label: 'Серый', hex: '#8a8a8a' },
  '#1a2a4a': { label: 'Тёмно-синий', hex: '#1a2a4a' },
  '#2255aa': { label: 'Синий', hex: '#2255aa' },
  '#3366aa': { label: 'Голубой', hex: '#3366aa' },
  '#4477bb': { label: 'Светло-синий', hex: '#4477bb' },
  '#6699cc': { label: 'Светлый деним', hex: '#6699cc' },
  '#aab8cc': { label: 'Выбеленный', hex: '#aab8cc' },
};

const SORT_OPTIONS = [
  { value: 'popular', label: 'По популярности' },
  { value: 'new', label: 'Сначала новинки' },
  { value: 'price_asc', label: 'Цена: по возрастанию' },
  { value: 'price_desc', label: 'Цена: по убыванию' },
  { value: 'discount', label: 'По размеру скидки' },
];

const NAV_ITEMS = [
  { label: 'Женщинам', subs: ['Одежда', 'Бельё', 'Колготки и чулки', 'Носки', 'Домашняя одежда', 'Купальники'] },
  { label: 'Мужчинам', subs: ['Одежда', 'Бельё', 'Носки'] },
  { label: 'Детям', subs: ['Девочкам', 'Мальчикам', 'Малышам'] },
  { label: 'Акции', subs: [] },
  { label: 'Новинки', subs: [] },
  { label: 'Магазины', subs: [] },
];

/* ─────────────────────────── MAIN ─────────────────────────── */
export default function JeansPage() {
  const { cartCount, setCartOpen, setSearchOpen, wishlist, toggleWishlist, addToCart } = useApp();

  // Header state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<number | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Filter state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    fit: [] as string[],
    rise: [] as string[],
    height: [] as string[],
    size: [] as string[],
    color: [] as string[],
    onlySale: false,
    onlyNew: false,
    priceMin: '',
    priceMax: '',
  });
  const [sort, setSort] = useState('popular');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [page, setPage] = useState(1);
  const PER_PAGE = 9;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (mobileMenuOpen || sidebarOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen, sidebarOpen]);

  // Filter logic
  const filtered = PRODUCTS.filter(p => {
    if (filters.fit.length && !filters.fit.includes(p.fit)) return false;
    if (filters.rise.length && !filters.rise.includes(p.rise)) return false;
    if (filters.height.length && !filters.height.includes(p.height)) return false;
    if (filters.size.length && !filters.size.some(s => p.sizes.includes(s))) return false;
    if (filters.color.length && !filters.color.some(c => p.colors.includes(c))) return false;
    if (filters.onlySale && !p.isSale) return false;
    if (filters.onlyNew && !p.isNew) return false;
    if (filters.priceMin && p.price < parseFloat(filters.priceMin)) return false;
    if (filters.priceMax && p.price > parseFloat(filters.priceMax)) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'new') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    if (sort === 'price_asc') return a.price - b.price;
    if (sort === 'price_desc') return b.price - a.price;
    if (sort === 'discount') {
      const da = a.oldPrice ? a.oldPrice - a.price : 0;
      const db = b.oldPrice ? b.oldPrice - b.price : 0;
      return db - da;
    }
    return b.reviews - a.reviews;
  });

  const totalPages = Math.ceil(sorted.length / PER_PAGE);
  const paged = sorted.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const toggleFilter = (key: keyof typeof filters, val: string) => {
    setPage(1);
    setFilters(prev => {
      const arr = prev[key] as string[];
      return { ...prev, [key]: arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val] };
    });
  };

  const activeFilterCount = filters.fit.length + filters.rise.length + filters.height.length +
    filters.size.length + filters.color.length + (filters.onlySale ? 1 : 0) + (filters.onlyNew ? 1 : 0);

  const clearFilters = () => {
    setFilters({ fit: [], rise: [], height: [], size: [], color: [], onlySale: false, onlyNew: false, priceMin: '', priceMax: '' });
    setPage(1);
  };

  const handleNavEnter = (idx: number) => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    if (NAV_ITEMS[idx].subs.length) setActiveMega(idx);
  };
  const handleNavLeave = () => {
    megaTimer.current = setTimeout(() => setActiveMega(null), 180);
  };

  return (
    <div style={{ fontFamily: "'Open Sans', sans-serif", color: '#1a1a1a', background: '#fff' }}>

      {/* ═══════════════ TOP BAR ═══════════════ */}
      <div style={{ background: '#1a1a1a', color: '#aaa', fontSize: '12px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '7px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Доставка и оплата', 'Возврат и гарантия', 'Подарочные сертификаты'].map(l => (
              <a key={l} href="#" style={{ color: '#aaa', transition: 'color .2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                onMouseLeave={e => e.currentTarget.style.color = '#aaa'}>{l}</a>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
            <span style={{ color: '#555' }}>RU</span>
            <span style={{ color: '#444' }}>|</span>
            <span style={{ color: '#555' }}>BYN</span>
            <span style={{ color: '#444' }}>|</span>
            <a href="tel:+375172500000" style={{ color: '#aaa', transition: 'color .2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#c8102e'}
              onMouseLeave={e => e.currentTarget.style.color = '#aaa'}>
              +375 (17) 250-00-00
            </a>
          </div>
        </div>
      </div>

      {/* ═══════════════ HEADER ═══════════════ */}
      <header style={{ background: '#fff', position: 'sticky', top: 0, zIndex: 900, boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,.1)' : '0 1px 0 #e5e5e5', transition: 'box-shadow .3s' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px', height: '68px', display: 'flex', alignItems: 'center', gap: '16px' }}>

          {/* BURGER */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ display: 'none', flexDirection: 'column', gap: '5px', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
            className="jeans-burger" aria-label="Меню">
            {[0, 1, 2].map(i => (
              <span key={i} style={{ display: 'block', width: '24px', height: '2px', background: '#1a1a1a', transition: 'all .3s',
                transform: mobileMenuOpen && i === 0 ? 'rotate(45deg) translate(5px,5px)' : mobileMenuOpen && i === 2 ? 'rotate(-45deg) translate(5px,-5px)' : 'none',
                opacity: mobileMenuOpen && i === 1 ? 0 : 1 }} />
            ))}
          </button>

          {/* LOGO */}
          <a href="/" style={{ flexShrink: 0 }}>
            <svg width="140" height="36" viewBox="0 0 140 36"><text x="0" y="28" fontFamily="Raleway,sans-serif" fontWeight="800" fontSize="28" fill="#c8102e">CONTE</text><text x="98" y="28" fontFamily="Raleway,sans-serif" fontWeight="300" fontSize="18" fill="#1a1a1a">shop</text></svg>
          </a>

          {/* NAV */}
          <nav style={{ flex: 1, display: 'flex', alignItems: 'center' }} className="jeans-nav">
            {NAV_ITEMS.map((item, idx) => (
              <div key={idx} style={{ position: 'relative' }}
                onMouseEnter={() => handleNavEnter(idx)}
                onMouseLeave={handleNavLeave}>
                <a href="#"
                  style={{ display: 'block', padding: '8px 13px', fontSize: '13.5px', fontWeight: 700, fontFamily: 'Raleway,sans-serif',
                    color: activeMega === idx ? '#c8102e' : '#1a1a1a',
                    borderBottom: activeMega === idx ? '2px solid #c8102e' : '2px solid transparent',
                    transition: 'all .2s', whiteSpace: 'nowrap' }}
                  onMouseEnter={e => { if (!item.subs.length) e.currentTarget.style.color = '#c8102e'; }}
                  onMouseLeave={e => { if (!item.subs.length) e.currentTarget.style.color = '#1a1a1a'; }}>
                  {item.label}{item.subs.length > 0 && <span style={{ marginLeft: '3px', fontSize: '9px', display: 'inline-block', transition: 'transform .2s', transform: activeMega === idx ? 'rotate(180deg)' : 'none' }}>▾</span>}
                </a>
              </div>
            ))}
          </nav>

          {/* ACTIONS */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px', flexShrink: 0 }}>
            {[
              { icon: <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>, action: () => setSearchOpen(true), label: 'Поиск', badge: 0 },
              { icon: <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>, action: () => {}, label: 'Избранное', badge: wishlist.length },
              { icon: <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, action: () => {}, label: 'Профиль', badge: 0 },
              { icon: <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>, action: () => setCartOpen(true), label: 'Корзина', badge: cartCount },
            ].map((btn, i) => (
              <button key={i} onClick={btn.action} aria-label={btn.label}
                style={{ position: 'relative', padding: '10px', borderRadius: '50%', background: 'none', border: 'none', cursor: 'pointer', color: '#1a1a1a', transition: 'all .2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#f6f6f6'; e.currentTarget.style.color = '#c8102e'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#1a1a1a'; }}>
                {btn.icon}
                {btn.badge > 0 && <span style={{ position: 'absolute', top: '4px', right: '4px', background: '#c8102e', color: '#fff', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{btn.badge}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* MEGA MENU */}
        {activeMega !== null && NAV_ITEMS[activeMega].subs.length > 0 && (
          <div onMouseEnter={() => { if (megaTimer.current) clearTimeout(megaTimer.current); }} onMouseLeave={handleNavLeave}
            style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', borderTop: '2px solid #c8102e', boxShadow: '0 8px 30px rgba(0,0,0,.12)', zIndex: 800, animation: 'jfadeDown .2s ease' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 20px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
              {NAV_ITEMS[activeMega].subs.map((sub, si) => (
                <a key={si} href="#"
                  style={{ fontSize: '13px', color: '#444', fontWeight: 500, transition: 'color .2s', padding: '4px 0' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#c8102e'}
                  onMouseLeave={e => e.currentTarget.style.color = '#444'}>
                  {sub}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ═══════════════ MOBILE MENU ═══════════════ */}
      <div onClick={() => setMobileMenuOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 1100, opacity: mobileMenuOpen ? 1 : 0, pointerEvents: mobileMenuOpen ? 'all' : 'none', transition: 'opacity .3s' }} />
      <div style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: '290px', background: '#fff', zIndex: 1200, transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)', transition: 'transform .35s cubic-bezier(.4,0,.2,1)', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '18px 20px', borderBottom: '1px solid #e5e5e5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <svg width="120" height="30" viewBox="0 0 140 36"><text x="0" y="26" fontFamily="Raleway,sans-serif" fontWeight="800" fontSize="24" fill="#c8102e">CONTE</text><text x="84" y="26" fontFamily="Raleway,sans-serif" fontWeight="300" fontSize="16" fill="#1a1a1a">shop</text></svg>
          <button onClick={() => setMobileMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px', color: '#666' }}>×</button>
        </div>
        {NAV_ITEMS.map((item, idx) => (
          <div key={idx}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <a href="#" style={{ flex: 1, display: 'block', padding: '14px 20px', fontSize: '14px', fontWeight: 700, fontFamily: 'Raleway,sans-serif', color: '#1a1a1a', borderBottom: '1px solid #f0f0f0', transition: 'color .2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#c8102e'}
                onMouseLeave={e => e.currentTarget.style.color = '#1a1a1a'}>{item.label}</a>
              {item.subs.length > 0 && (
                <button onClick={() => setMobileExpanded(mobileExpanded === idx ? null : idx)}
                  style={{ padding: '14px 18px', background: 'none', border: 'none', cursor: 'pointer', borderBottom: '1px solid #f0f0f0', color: '#888', fontSize: '16px', transition: 'transform .2s', transform: mobileExpanded === idx ? 'rotate(90deg)' : 'none' }}>›</button>
              )}
            </div>
            {item.subs.length > 0 && mobileExpanded === idx && (
              <div style={{ background: '#f9f9f9', padding: '10px 20px 10px 30px' }}>
                {item.subs.map((s, si) => (
                  <a key={si} href="#" style={{ display: 'block', padding: '6px 0', fontSize: '13px', color: '#555', transition: 'color .2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#c8102e'}
                    onMouseLeave={e => e.currentTarget.style.color = '#555'}>{s}</a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ═══════════════ BREADCRUMB ═══════════════ */}
      <div style={{ background: '#f9f9f9', borderBottom: '1px solid #efefef' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#888', flexWrap: 'wrap' }}>
          {['Главная', 'Женщинам', 'Одежда', 'Джинсы'].map((crumb, i, arr) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {i < arr.length - 1
                ? <a href="#" style={{ color: '#888', transition: 'color .2s' }} onMouseEnter={e => e.currentTarget.style.color = '#c8102e'} onMouseLeave={e => e.currentTarget.style.color = '#888'}>{crumb}</a>
                : <span style={{ color: '#1a1a1a', fontWeight: 600 }}>{crumb}</span>}
              {i < arr.length - 1 && <span style={{ color: '#ccc' }}>›</span>}
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════ PAGE TITLE + FILTER BAR ═══════════════ */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
          <div>
            <h1 style={{ fontFamily: 'Raleway,sans-serif', fontWeight: 800, fontSize: 'clamp(22px,3vw,32px)', color: '#1a1a1a', marginBottom: '4px' }}>Джинсы</h1>
            <p style={{ fontSize: '13px', color: '#888' }}>{sorted.length} товаров</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {/* FILTER TOGGLE */}
            <button onClick={() => setSidebarOpen(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '9px 18px', border: '1.5px solid #ddd', borderRadius: '4px', background: activeFilterCount > 0 ? '#c8102e' : '#fff', color: activeFilterCount > 0 ? '#fff' : '#444', cursor: 'pointer', fontFamily: 'Raleway,sans-serif', fontWeight: 600, fontSize: '13px', transition: 'all .2s' }}
              onMouseEnter={e => { if (!activeFilterCount) { e.currentTarget.style.borderColor = '#c8102e'; e.currentTarget.style.color = '#c8102e'; } }}
              onMouseLeave={e => { if (!activeFilterCount) { e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.color = '#444'; } }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
              Фильтры{activeFilterCount > 0 && <span style={{ background: 'rgba(255,255,255,.25)', borderRadius: '10px', padding: '1px 7px', fontSize: '11px' }}>{activeFilterCount}</span>}
            </button>
            {/* SORT */}
            <div style={{ position: 'relative' }}>
              <select value={sort} onChange={e => setSort(e.target.value)}
                style={{ padding: '9px 36px 9px 14px', border: '1.5px solid #ddd', borderRadius: '4px', background: '#fff', color: '#444', fontFamily: 'Open Sans,sans-serif', fontSize: '13px', cursor: 'pointer', outline: 'none', appearance: 'none', WebkitAppearance: 'none', minWidth: '210px' }}>
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}><polyline points="6,9 12,15 18,9"/></svg>
            </div>
            {/* VIEW TOGGLE */}
            <div style={{ display: 'flex', border: '1.5px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
              {(['grid', 'list'] as const).map(v => (
                <button key={v} onClick={() => setView(v)}
                  style={{ padding: '8px 12px', background: view === v ? '#1a1a1a' : '#fff', color: view === v ? '#fff' : '#888', border: 'none', cursor: 'pointer', transition: 'all .15s', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {v === 'grid'
                    ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                    : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ACTIVE FILTER CHIPS */}
        {activeFilterCount > 0 && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', color: '#888' }}>Активные фильтры:</span>
            {[...filters.fit, ...filters.rise, ...filters.height, ...filters.size].map(f => (
              <span key={f} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#f0f0f0', border: '1px solid #ddd', borderRadius: '20px', padding: '3px 10px', fontSize: '12px', color: '#444' }}>
                {f}
                <button onClick={() => {
                  const key = filters.fit.includes(f) ? 'fit' : filters.rise.includes(f) ? 'rise' : filters.height.includes(f) ? 'height' : 'size';
                  toggleFilter(key as any, f);
                }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', fontSize: '14px', lineHeight: 1, padding: '0 0 0 2px', display: 'flex', alignItems: 'center' }}>×</button>
              </span>
            ))}
            {filters.onlySale && <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#fff0f0', border: '1px solid #fcc', borderRadius: '20px', padding: '3px 10px', fontSize: '12px', color: '#c8102e' }}>Скидки<button onClick={() => setFilters(p => ({ ...p, onlySale: false }))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c8102e', fontSize: '14px', lineHeight: 1, padding: '0 0 0 2px' }}>×</button></span>}
            {filters.onlyNew && <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#f0fff0', border: '1px solid #9d9', borderRadius: '20px', padding: '3px 10px', fontSize: '12px', color: '#3a7c3a' }}>Новинки<button onClick={() => setFilters(p => ({ ...p, onlyNew: false }))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3a7c3a', fontSize: '14px', lineHeight: 1, padding: '0 0 0 2px' }}>×</button></span>}
            <button onClick={clearFilters} style={{ fontSize: '12px', color: '#c8102e', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}>Сбросить все</button>
          </div>
        )}
      </div>

      {/* ═══════════════ PRODUCT GRID ═══════════════ */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px 60px' }}>
        {paged.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', color: '#aaa' }}>
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="1.5" style={{ margin: '0 auto 16px' }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <p style={{ fontFamily: 'Raleway,sans-serif', fontWeight: 700, fontSize: '18px', color: '#bbb', marginBottom: '8px' }}>Товары не найдены</p>
            <p style={{ fontSize: '13px', marginBottom: '20px' }}>Попробуйте изменить параметры фильтрации</p>
            <button onClick={clearFilters} style={{ background: '#c8102e', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: '4px', fontFamily: 'Raleway,sans-serif', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>Сбросить фильтры</button>
          </div>
        ) : (
          <>
            <div style={{ display: view === 'grid' ? 'grid' : 'flex', gridTemplateColumns: 'repeat(3,1fr)', flexDirection: 'column', gap: '20px' }} className="jeans-product-grid">
              {paged.map(product => (
                view === 'grid'
                  ? <JeansProductCard key={product.id} product={product} onAddToCart={addToCart} onWishlist={toggleWishlist} isWished={wishlist.includes(product.id)} />
                  : <JeansProductRow key={product.id} product={product} onAddToCart={addToCart} onWishlist={toggleWishlist} isWished={wishlist.includes(product.id)} />
              ))}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', marginTop: '44px', flexWrap: 'wrap' }}>
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  style={{ width: '38px', height: '38px', borderRadius: '4px', border: '1.5px solid #ddd', background: '#fff', cursor: page === 1 ? 'not-allowed' : 'pointer', opacity: page === 1 ? .4 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', transition: 'all .2s' }}
                  onMouseEnter={e => { if (page > 1) { e.currentTarget.style.borderColor = '#c8102e'; e.currentTarget.style.color = '#c8102e'; } }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.color = '#555'; }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15,18 9,12 15,6"/></svg>
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => setPage(p)}
                    style={{ width: '38px', height: '38px', borderRadius: '4px', border: `1.5px solid ${p === page ? '#c8102e' : '#ddd'}`, background: p === page ? '#c8102e' : '#fff', color: p === page ? '#fff' : '#555', cursor: 'pointer', fontWeight: p === page ? 700 : 400, fontSize: '13px', transition: 'all .2s' }}
                    onMouseEnter={e => { if (p !== page) { e.currentTarget.style.borderColor = '#c8102e'; e.currentTarget.style.color = '#c8102e'; } }}
                    onMouseLeave={e => { if (p !== page) { e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.color = '#555'; } }}>
                    {p}
                  </button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  style={{ width: '38px', height: '38px', borderRadius: '4px', border: '1.5px solid #ddd', background: '#fff', cursor: page === totalPages ? 'not-allowed' : 'pointer', opacity: page === totalPages ? .4 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', transition: 'all .2s' }}
                  onMouseEnter={e => { if (page < totalPages) { e.currentTarget.style.borderColor = '#c8102e'; e.currentTarget.style.color = '#c8102e'; } }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.color = '#555'; }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9,18 15,12 9,6"/></svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* ═══════════════ SEO TEXT ═══════════════ */}
      <div style={{ background: '#f9f9f9', borderTop: '1px solid #efefef', padding: '40px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Raleway,sans-serif', fontWeight: 700, fontSize: '18px', color: '#1a1a1a', marginBottom: '12px' }}>Женские джинсы Conte — стиль и комфорт каждый день</h2>
          <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.8, marginBottom: '10px' }}>
            Коллекция женских джинсов Conte включает широкий выбор фасонов: Straight, Wide Leg, Skinny, Slim Fit, Mom Fit и Baggy. Все модели изготовлены из качественного денима с добавлением эластана для идеальной посадки и свободы движений.
          </p>
          <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.8 }}>
            Джинсы доступны в различных вариантах варки — классический синий, тёмно-синий индиго, чёрный, серый и выбеленный. Подберите свой идеальный размер и рост: модели представлены для роста 158–164, 164–170 и 170+.
          </p>
        </div>
      </div>

      {/* ═══════════════ FILTER SIDEBAR OVERLAY ═══════════════ */}
      <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', zIndex: 1300, opacity: sidebarOpen ? 1 : 0, pointerEvents: sidebarOpen ? 'all' : 'none', transition: 'opacity .3s', backdropFilter: 'blur(2px)' }} />

      {/* ═══════════════ FILTER SIDEBAR ═══════════════ */}
      <aside style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(360px,100vw)', background: '#fff', zIndex: 1400, transform: sidebarOpen ? 'translateX(0)' : 'translateX(100%)', transition: 'transform .35s cubic-bezier(.4,0,.2,1)', display: 'flex', flexDirection: 'column', boxShadow: '-8px 0 40px rgba(0,0,0,.15)' }}>
        {/* SIDEBAR HEADER */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div>
            <h2 style={{ fontFamily: 'Raleway,sans-serif', fontWeight: 800, fontSize: '18px', color: '#1a1a1a' }}>Фильтры</h2>
            {activeFilterCount > 0 && <span style={{ fontSize: '12px', color: '#c8102e' }}>{activeFilterCount} активных</span>}
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            {activeFilterCount > 0 && (
              <button onClick={clearFilters} style={{ fontSize: '12px', color: '#c8102e', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}>Сбросить</button>
            )}
            <button onClick={() => setSidebarOpen(false)} style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#f6f6f6', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', color: '#666', transition: 'all .2s', lineHeight: 1 }}
              onMouseEnter={e => { e.currentTarget.style.background = '#c8102e'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#f6f6f6'; e.currentTarget.style.color = '#666'; }}>×</button>
          </div>
        </div>

        {/* SIDEBAR BODY */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>

          {/* QUICK TOGGLES */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
            {[{ key: 'onlySale', label: '🔥 Скидки', color: '#c8102e', bg: '#fff0f0' }, { key: 'onlyNew', label: '✨ Новинки', color: '#3a7c3a', bg: '#f0fff0' }].map(t => (
              <button key={t.key} onClick={() => setFilters(p => ({ ...p, [t.key]: !p[t.key as keyof typeof p] }))}
                style={{ flex: 1, padding: '9px', border: `1.5px solid ${filters[t.key as keyof typeof filters] ? t.color : '#ddd'}`, borderRadius: '4px', background: filters[t.key as keyof typeof filters] ? t.bg : '#fff', color: filters[t.key as keyof typeof filters] ? t.color : '#666', cursor: 'pointer', fontWeight: 600, fontSize: '13px', transition: 'all .2s' }}>
                {t.label}
              </button>
            ))}
          </div>

          {/* PRICE RANGE */}
          <FilterSection title="Цена (BYN)">
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input type="number" placeholder="от" value={filters.priceMin} onChange={e => { setFilters(p => ({ ...p, priceMin: e.target.value })); setPage(1); }}
                style={{ flex: 1, padding: '8px 10px', border: '1.5px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', transition: 'border-color .2s' }}
                onFocus={e => e.target.style.borderColor = '#c8102e'}
                onBlur={e => e.target.style.borderColor = '#ddd'} />
              <span style={{ color: '#aaa', fontSize: '12px' }}>—</span>
              <input type="number" placeholder="до" value={filters.priceMax} onChange={e => { setFilters(p => ({ ...p, priceMax: e.target.value })); setPage(1); }}
                style={{ flex: 1, padding: '8px 10px', border: '1.5px solid #ddd', borderRadius: '4px', fontSize: '13px', outline: 'none', transition: 'border-color .2s' }}
                onFocus={e => e.target.style.borderColor = '#c8102e'}
                onBlur={e => e.target.style.borderColor = '#ddd'} />
            </div>
          </FilterSection>

          {/* FIT */}
          <FilterSection title="Фасон">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
              {FIT_OPTIONS.map(f => (
                <FilterChip key={f} label={f} active={filters.fit.includes(f)} onClick={() => toggleFilter('fit', f)} />
              ))}
            </div>
          </FilterSection>

          {/* RISE */}
          <FilterSection title="Посадка">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
              {RISE_OPTIONS.map(r => (
                <FilterChip key={r} label={r} active={filters.rise.includes(r)} onClick={() => toggleFilter('rise', r)} />
              ))}
            </div>
          </FilterSection>

          {/* HEIGHT */}
          <FilterSection title="Рост">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
              {HEIGHT_OPTIONS.map(h => (
                <FilterChip key={h} label={h} active={filters.height.includes(h)} onClick={() => toggleFilter('height', h)} />
              ))}
            </div>
          </FilterSection>

          {/* SIZE */}
          <FilterSection title="Размер">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
              {SIZE_OPTIONS.map(s => (
                <FilterChip key={s} label={s} active={filters.size.includes(s)} onClick={() => toggleFilter('size', s)} />
              ))}
            </div>
          </FilterSection>

          {/* COLOR */}
          <FilterSection title="Цвет">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {Object.entries(COLOR_MAP).map(([hex, { label }]) => (
                <button key={hex} onClick={() => toggleFilter('color', hex)} title={label}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', background: hex, border: `3px solid ${filters.color.includes(hex) ? '#c8102e' : 'transparent'}`, outline: `2px solid ${filters.color.includes(hex) ? '#c8102e' : '#ddd'}`, cursor: 'pointer', transition: 'all .2s', transform: filters.color.includes(hex) ? 'scale(1.15)' : 'scale(1)' }} />
              ))}
            </div>
          </FilterSection>
        </div>

        {/* SIDEBAR FOOTER */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid #f0f0f0', flexShrink: 0 }}>
          <button onClick={() => setSidebarOpen(false)}
            style={{ width: '100%', padding: '14px', background: '#c8102e', color: '#fff', border: 'none', borderRadius: '4px', fontFamily: 'Raleway,sans-serif', fontWeight: 700, fontSize: '14px', cursor: 'pointer', transition: 'background .2s', letterSpacing: '.3px' }}
            onMouseEnter={e => e.currentTarget.style.background = '#a00e26'}
            onMouseLeave={e => e.currentTarget.style.background = '#c8102e'}>
            Показать {sorted.length} товаров
          </button>
        </div>
      </aside>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <Footer />

      {/* ═══════════════ STYLES ═══════════════ */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;500;600;700;800&family=Open+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes jfadeDown { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes jPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
        @media (max-width:960px) {
          .jeans-nav { display:none!important; }
          .jeans-burger { display:flex!important; }
          .jeans-product-grid { grid-template-columns:repeat(2,1fr)!important; }
        }
        @media (max-width:540px) {
          .jeans-product-grid { grid-template-columns:repeat(2,1fr)!important; gap:10px!important; }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────── FILTER SECTION ─────────────────────────── */
function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ borderBottom: '1px solid #f0f0f0', marginBottom: '4px' }}>
      <button onClick={() => setOpen(!open)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Raleway,sans-serif', fontWeight: 700, fontSize: '13px', color: '#1a1a1a', textAlign: 'left' }}>
        {title}
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" style={{ transition: 'transform .25s', transform: open ? 'rotate(180deg)' : 'none', flexShrink: 0 }}><polyline points="6,9 12,15 18,9"/></svg>
      </button>
      {open && <div style={{ paddingBottom: '16px' }}>{children}</div>}
    </div>
  );
}

/* ─────────────────────────── FILTER CHIP ─────────────────────────── */
function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      style={{ padding: '6px 13px', border: `1.5px solid ${active ? '#c8102e' : '#ddd'}`, borderRadius: '20px', background: active ? '#c8102e' : '#fff', color: active ? '#fff' : '#555', fontSize: '12px', fontWeight: active ? 700 : 400, cursor: 'pointer', transition: 'all .18s', fontFamily: 'Open Sans,sans-serif' }}
      onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = '#c8102e'; e.currentTarget.style.color = '#c8102e'; } }}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.color = '#555'; } }}>
      {label}
    </button>
  );
}

/* ─────────────────────────── PRODUCT CARD (GRID) ─────────────────────────── */
function JeansProductCard({ product, onAddToCart, onWishlist, isWished }: any) {
  const [hovered, setHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;

  const handleAdd = () => {
    onAddToCart({ id: product.id, name: product.name, price: product.price, image: product.image, size: selectedSize || undefined });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article
      style={{ background: '#fff', borderRadius: '8px', overflow: 'hidden', border: '1px solid #f0f0f0', boxShadow: hovered ? '0 8px 30px rgba(0,0,0,.1)' : '0 2px 8px rgba(0,0,0,.05)', transition: 'all .3s', transform: hovered ? 'translateY(-4px)' : 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      {/* IMAGE */}
      <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: '#f8f8f8' }}>
        <img src={product.image} alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', transition: 'transform .45s ease', transform: hovered ? 'scale(1.06)' : 'scale(1)' }} />

        {/* BADGES */}
        <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {product.badge && <span style={{ background: product.badgeColor, color: '#fff', fontSize: '10px', fontWeight: 800, padding: '3px 8px', borderRadius: '2px', letterSpacing: '.5px' }}>{product.badge}</span>}
          {discount > 0 && <span style={{ background: '#c8102e', color: '#fff', fontSize: '10px', fontWeight: 800, padding: '3px 8px', borderRadius: '2px' }}>−{discount}%</span>}
        </div>

        {/* WISHLIST */}
        <button onClick={() => onWishlist(product.id)}
          style={{ position: 'absolute', top: '10px', right: '10px', width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,.92)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,.1)', transition: 'all .2s', transform: isWished ? 'scale(1.15)' : 'scale(1)' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill={isWished ? '#c8102e' : 'none'} stroke={isWished ? '#c8102e' : '#888'} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>

        {/* SIZE HOVER PANEL */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(255,255,255,.97)', padding: '10px 12px 12px', transform: hovered ? 'translateY(0)' : 'translateY(100%)', transition: 'transform .3s ease' }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: '6px' }}>Размер</div>
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '8px' }}>
            {product.sizes.map((s: string) => (
              <button key={s} onClick={() => setSelectedSize(selectedSize === s ? null : s)}
                style={{ padding: '4px 8px', fontSize: '11px', fontWeight: 600, border: `1.5px solid ${selectedSize === s ? '#c8102e' : '#ddd'}`, background: selectedSize === s ? '#c8102e' : '#fff', color: selectedSize === s ? '#fff' : '#555', borderRadius: '3px', cursor: 'pointer', transition: 'all .15s' }}
                onMouseEnter={e => { if (selectedSize !== s) { e.currentTarget.style.borderColor = '#c8102e'; e.currentTarget.style.color = '#c8102e'; } }}
                onMouseLeave={e => { if (selectedSize !== s) { e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.color = '#555'; } }}>
                {s}
              </button>
            ))}
          </div>
          <button onClick={handleAdd}
            style={{ width: '100%', padding: '9px', background: added ? '#3a7c3a' : '#c8102e', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer', fontFamily: 'Raleway,sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '.3px', transition: 'all .2s', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', animation: added ? 'jPulse .4s ease' : 'none' }}
            onMouseEnter={e => { if (!added) e.currentTarget.style.background = '#a00e26'; }}
            onMouseLeave={e => { if (!added) e.currentTarget.style.background = '#c8102e'; }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            {added ? '✓ Добавлено!' : 'В корзину'}
          </button>
        </div>
      </div>

      {/* INFO */}
      <div style={{ padding: '12px 14px 14px' }}>
        {/* COLORS */}
        <div style={{ display: 'flex', gap: '5px', marginBottom: '7px' }}>
          {product.colors.map((c: string) => (
            <span key={c} title={COLOR_MAP[c]?.label} style={{ width: '14px', height: '14px', borderRadius: '50%', background: c, border: '1.5px solid #ddd', display: 'inline-block', flexShrink: 0 }} />
          ))}
        </div>

        {/* RATING */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginBottom: '6px' }}>
          {[1,2,3,4,5].map(s => (
            <svg key={s} width="11" height="11" viewBox="0 0 24 24" fill={s <= product.rating ? '#f5a623' : '#e0e0e0'} stroke="none"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
          ))}
          <span style={{ fontSize: '11px', color: '#aaa', marginLeft: '3px' }}>({product.reviews})</span>
        </div>

        <h3 style={{ fontFamily: 'Raleway,sans-serif', fontWeight: 600, fontSize: '13px', color: '#1a1a1a', marginBottom: '4px', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          <a href="#" style={{ color: 'inherit', transition: 'color .2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#c8102e'}
            onMouseLeave={e => e.currentTarget.style.color = '#1a1a1a'}>{product.name}</a>
        </h3>

        <div style={{ fontSize: '11px', color: '#aaa', marginBottom: '8px' }}>Арт. {product.art}</div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'Raleway,sans-serif', fontWeight: 800, fontSize: '17px', color: product.isSale ? '#c8102e' : '#1a1a1a' }}>
            {product.price.toFixed(2)} BYN
          </span>
          {product.oldPrice && (
            <span style={{ fontSize: '13px', color: '#bbb', textDecoration: 'line-through' }}>{product.oldPrice.toFixed(2)} BYN</span>
          )}
        </div>
      </div>
    </article>
  );
}

/* ─────────────────────────── PRODUCT ROW (LIST) ─────────────────────────── */
function JeansProductRow({ product, onAddToCart, onWishlist, isWished }: any) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;

  const handleAdd = () => {
    onAddToCart({ id: product.id, name: product.name, price: product.price, image: product.image, size: selectedSize || undefined });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article style={{ display: 'flex', gap: '20px', background: '#fff', borderRadius: '8px', border: `1px solid ${hovered ? '#ddd' : '#f0f0f0'}`, overflow: 'hidden', boxShadow: hovered ? '0 4px 20px rgba(0,0,0,.08)' : '0 1px 4px rgba(0,0,0,.04)', transition: 'all .25s', padding: '0' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>

      {/* IMAGE */}
      <div style={{ position: 'relative', width: '160px', flexShrink: 0, overflow: 'hidden', background: '#f8f8f8' }}>
        <img src={product.image} alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', transition: 'transform .4s', transform: hovered ? 'scale(1.05)' : 'scale(1)' }} />
        <div style={{ position: 'absolute', top: '8px', left: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {product.badge && <span style={{ background: product.badgeColor, color: '#fff', fontSize: '10px', fontWeight: 800, padding: '2px 7px', borderRadius: '2px' }}>{product.badge}</span>}
          {discount > 0 && <span style={{ background: '#c8102e', color: '#fff', fontSize: '10px', fontWeight: 800, padding: '2px 7px', borderRadius: '2px' }}>−{discount}%</span>}
        </div>
      </div>

      {/* INFO */}
      <div style={{ flex: 1, padding: '18px 18px 18px 0', display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <div style={{ display: 'flex', gap: '5px', marginBottom: '8px' }}>
            {product.colors.map((c: string) => (
              <span key={c} title={COLOR_MAP[c]?.label} style={{ width: '14px', height: '14px', borderRadius: '50%', background: c, border: '1.5px solid #ddd', display: 'inline-block' }} />
            ))}
          </div>
          <h3 style={{ fontFamily: 'Raleway,sans-serif', fontWeight: 700, fontSize: '15px', color: '#1a1a1a', marginBottom: '4px', lineHeight: 1.35 }}>
            <a href="#" style={{ color: 'inherit', transition: 'color .2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#c8102e'}
              onMouseLeave={e => e.currentTarget.style.color = '#1a1a1a'}>{product.name}</a>
          </h3>
          <div style={{ fontSize: '11px', color: '#aaa', marginBottom: '10px' }}>Арт. {product.art}</div>
          <div style={{ display: 'flex', gap: '3px', marginBottom: '10px' }}>
            {[1,2,3,4,5].map(s => <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill={s <= product.rating ? '#f5a623' : '#e0e0e0'} stroke="none"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>)}
            <span style={{ fontSize: '11px', color: '#aaa', marginLeft: '4px' }}>({product.reviews} отзывов)</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#888', flexWrap: 'wrap' }}>
            <span>Фасон: <strong style={{ color: '#444' }}>{product.fit}</strong></span>
            <span>Посадка: <strong style={{ color: '#444' }}>{product.rise}</strong></span>
            <span>Рост: <strong style={{ color: '#444' }}>{product.height}</strong></span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px', flexShrink: 0, minWidth: '180px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'Raleway,sans-serif', fontWeight: 800, fontSize: '20px', color: product.isSale ? '#c8102e' : '#1a1a1a' }}>{product.price.toFixed(2)} BYN</div>
            {product.oldPrice && <div style={{ fontSize: '13px', color: '#bbb', textDecoration: 'line-through' }}>{product.oldPrice.toFixed(2)} BYN</div>}
          </div>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: '6px' }}>Размер</div>
            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              {product.sizes.map((s: string) => (
                <button key={s} onClick={() => setSelectedSize(selectedSize === s ? null : s)}
                  style={{ padding: '5px 9px', fontSize: '11px', fontWeight: 600, border: `1.5px solid ${selectedSize === s ? '#c8102e' : '#ddd'}`, background: selectedSize === s ? '#c8102e' : '#fff', color: selectedSize === s ? '#fff' : '#555', borderRadius: '3px', cursor: 'pointer', transition: 'all .15s' }}
                  onMouseEnter={e => { if (selectedSize !== s) { e.currentTarget.style.borderColor = '#c8102e'; e.currentTarget.style.color = '#c8102e'; } }}
                  onMouseLeave={e => { if (selectedSize !== s) { e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.color = '#555'; } }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => onWishlist(product.id)}
              style={{ width: '38px', height: '38px', borderRadius: '50%', background: isWished ? '#fff0f0' : '#f6f6f6', border: `1.5px solid ${isWished ? '#c8102e' : '#ddd'}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#c8102e'; e.currentTarget.style.background = '#fff0f0'; }}
              onMouseLeave={e => { if (!isWished) { e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.background = '#f6f6f6'; } }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill={isWished ? '#c8102e' : 'none'} stroke={isWished ? '#c8102e' : '#888'} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
            <button onClick={handleAdd}
              style={{ padding: '10px 22px', background: added ? '#3a7c3a' : '#c8102e', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontFamily: 'Raleway,sans-serif', fontWeight: 700, fontSize: '13px', transition: 'all .2s', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}
              onMouseEnter={e => { if (!added) e.currentTarget.style.background = '#a00e26'; }}
              onMouseLeave={e => { if (!added) e.currentTarget.style.background = '#c8102e'; }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              {added ? '✓ Добавлено!' : 'В корзину'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
