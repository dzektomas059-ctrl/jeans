import { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/useApp';
import { useScrollLock } from '../hooks/useScrollLock';
import { useEscapeKey } from '../hooks/useEscapeKey';
import { products } from '../data/products';
import Icon from './Icon';

const POPULAR = [
  'Tights 20 den',
  'Lace bra',
  'Thermal underwear',
  'Kids socks',
  'Mom-fit jeans',
  'Cotton pyjama',
];

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const close = () => {
    setSearchOpen(false);
    setQuery('');
  };

  useScrollLock(searchOpen);
  useEscapeKey(searchOpen, close);

  useEffect(() => {
    if (searchOpen) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 50);
      return () => window.clearTimeout(id);
    }
    return undefined;
  }, [searchOpen]);
  const trimmed = query.trim().toLowerCase();
  const suggestions = trimmed
    ? products.filter((p) => p.name.toLowerCase().includes(trimmed)).slice(0, 6)
    : [];

  return (
    <>
      <div
        className={`search-overlay${searchOpen ? ' is-open' : ''}`}
        onClick={close}
        aria-hidden
      />
      <div
        className={`search${searchOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site search"
        aria-hidden={!searchOpen}
      >
        <div className="search__inner">
          <button
            type="button"
            className="search__close"
            onClick={close}
            aria-label="Close search"
          >
            ×
          </button>
          <div className="search__label">What are you looking for?</div>
          <form
            className="search__field"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              ref={inputRef}
              type="search"
              className="search__input"
              placeholder="Search products, categories, articles…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search"
            />
            <button type="submit" className="search__submit">
              <Icon name="search" size={16} />
              Search
            </button>
          </form>

          {suggestions.length > 0 && (
            <ul className="search__suggestions" role="listbox">
              {suggestions.map((p) => (
                <li key={p.id}>
                  <a className="search__suggestion" href={p.href}>
                    <img
                      src={p.image}
                      alt=""
                      width={36}
                      height={48}
                      style={{ objectFit: 'cover', borderRadius: 4 }}
                    />
                    <span style={{ flex: 1 }}>{p.name}</span>
                    <strong>€{p.price.toFixed(2)}</strong>
                  </a>
                </li>
              ))}
            </ul>
          )}

          {!trimmed && (
            <div className="search__popular">
              <div className="search__popular-label">Popular searches</div>
              <div className="search__popular-list">
                {POPULAR.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className="search__chip"
                    onClick={() => setQuery(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
