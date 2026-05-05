import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

const suggestions = [
  'Колготки 20 den', 'Термобельё женское', 'Носки мужские', 'Бюстгальтер', 'Пижама',
  'Колготки для беременных', 'Носки детские', 'Купальник', 'Боди', 'Джинсы',
];

const popular = ['Колготки', 'Термобельё', 'Носки', 'Бельё', 'Пижама', 'Купальники'];

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useApp();
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setFiltered([]);
    }
    return () => { document.body.style.overflow = ''; };
  }, [searchOpen]);

  useEffect(() => {
    if (query.trim().length > 1) {
      setFiltered(suggestions.filter(s => s.toLowerCase().includes(query.toLowerCase())));
    } else {
      setFiltered([]);
    }
  }, [query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [setSearchOpen]);

  return (
    <>
      {/* OVERLAY */}
      <div
        onClick={() => setSearchOpen(false)}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.6)',
          zIndex: 3000,
          opacity: searchOpen ? 1 : 0,
          pointerEvents: searchOpen ? 'all' : 'none',
          transition: 'opacity 0.3s ease',
          backdropFilter: 'blur(4px)'
        }}
      />

      {/* SEARCH PANEL */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        background: '#fff',
        zIndex: 3100,
        padding: '28px 20px 24px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
        transform: searchOpen ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          {/* CLOSE BTN */}
          <button onClick={() => setSearchOpen(false)}
            style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer', color: '#888', fontSize: '24px', lineHeight: 1, transition: 'color 0.2s', padding: '4px' }}
            onMouseEnter={e => e.currentTarget.style.color = '#c8102e'}
            onMouseLeave={e => e.currentTarget.style.color = '#888'}>
            ×
          </button>

          <h3 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '14px', color: '#888', marginBottom: '14px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            Поиск по сайту
          </h3>

          {/* INPUT */}
          <div style={{ display: 'flex', gap: '0', border: '2px solid #c8102e', borderRadius: '4px', overflow: 'hidden' }}>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Введите название товара..."
              style={{ flex: 1, padding: '14px 18px', fontSize: '16px', border: 'none', outline: 'none', fontFamily: 'Open Sans, sans-serif' }}
              onKeyDown={e => { if (e.key === 'Enter' && query.trim()) setSearchOpen(false); }}
            />
            <button
              style={{ padding: '14px 24px', background: '#c8102e', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '14px', transition: 'background 0.2s', flexShrink: 0 }}
              onMouseEnter={e => e.currentTarget.style.background = '#a00e26'}
              onMouseLeave={e => e.currentTarget.style.background = '#c8102e'}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              Найти
            </button>
          </div>

          {/* AUTOCOMPLETE */}
          {filtered.length > 0 && (
            <div style={{ marginTop: '8px', border: '1px solid #e5e5e5', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
              {filtered.map((s, i) => (
                <button key={i}
                  onClick={() => { setQuery(s); setSearchOpen(false); }}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '11px 16px', background: '#fff', border: 'none', borderBottom: i < filtered.length - 1 ? '1px solid #f5f5f5' : 'none', cursor: 'pointer', textAlign: 'left', fontSize: '14px', color: '#333', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#fef8f8'}
                  onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* POPULAR */}
          <div style={{ marginTop: '20px' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
              Популярные запросы:
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {popular.map(p => (
                <button key={p}
                  onClick={() => { setQuery(p); }}
                  style={{ padding: '6px 14px', background: '#f6f6f6', border: '1px solid #e5e5e5', borderRadius: '20px', fontSize: '13px', color: '#555', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Open Sans, sans-serif' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#c8102e'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#c8102e'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#f6f6f6'; e.currentTarget.style.color = '#555'; e.currentTarget.style.borderColor = '#e5e5e5'; }}>
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
