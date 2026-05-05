import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Icon from '../components/Icon';
import JeansCard from '../components/JeansCard';
import QuickViewModal from '../components/QuickViewModal';
import {
  jeansFilters,
  jeansProducts,
  totalJeansCount,
  type JeansProduct,
} from '../data/jeans';

interface OpenDropdown {
  name: string | null;
}

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [sort, setSort] = useState<string>(searchParams.get('sort') || 'updated');
  const [fit, setFit] = useState<string>(searchParams.get('fit') || '');
  const [design, setDesign] = useState<string>(searchParams.get('design') || '');
  const [color, setColor] = useState<string>(searchParams.get('color') || '');
  const [price, setPrice] = useState<string>(searchParams.get('price') || 'all');
  const [size, setSize] = useState<string>(searchParams.get('size') || '');
  const [tag, setTag] = useState<string>(searchParams.get('tag') || '');
  const [inStores, setInStores] = useState<boolean>(searchParams.get('inStores') === '1');
  const [onSale, setOnSale] = useState<boolean>(searchParams.get('sale') === '1');
  const [open, setOpen] = useState<OpenDropdown>({ name: null });
  const [quickView, setQuickView] = useState<JeansProduct | null>(null);

  // Sync filter state to URL (without history pollution)
  useEffect(() => {
    const next = new URLSearchParams();
    if (sort && sort !== 'updated') next.set('sort', sort);
    if (fit) next.set('fit', fit);
    if (design) next.set('design', design);
    if (color) next.set('color', color);
    if (price && price !== 'all') next.set('price', price);
    if (size) next.set('size', size);
    if (tag) next.set('tag', tag);
    if (inStores) next.set('inStores', '1');
    if (onSale) next.set('sale', '1');
    setSearchParams(next, { replace: true });
  }, [sort, fit, design, color, price, size, tag, inStores, onSale, setSearchParams]);

  // Apply filters to product list
  const filtered = useMemo(() => {
    let list: JeansProduct[] = [...jeansProducts];

    if (fit) list = list.filter((p) => p.fit === fit);
    if (design) list = list.filter((p) => p.design === design);
    if (color) list = list.filter((p) => p.colors.some((c) => c.code === color));
    if (size) list = list.filter((p) => p.sizes.some((s) => s.label.endsWith('/' + size) && s.inStock));
    if (onSale) list = list.filter((p) => p.onSale);
    if (inStores) list = list.filter((p) => p.inStores);

    if (price && price !== 'all') {
      list = list.filter((p) => {
        if (price === '0-100') return p.price < 100;
        if (price === '100-150') return p.price >= 100 && p.price < 150;
        if (price === '150-200') return p.price >= 150 && p.price < 200;
        if (price === '200+') return p.price >= 200;
        return true;
      });
    }

    if (tag) {
      list = list.filter((p) => {
        if (tag === 'high-rise') return p.rise === 'high';
        if (tag === 'plus-size') return p.design === 'Plus Size';
        if (tag === 'mom') return p.fit === 'Mom';
        if (tag === 'loose') return p.fit === 'Loose' || p.fit === 'Relaxed';
        if (tag === 'wide') return p.fit === 'Wide leg' || p.fit === 'Flared';
        return true;
      });
    }

    if (sort === 'price-asc') list = list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list = list.sort((a, b) => b.price - a.price);
    else if (sort === 'popular') list = list.sort((a, b) => b.reviews - a.reviews);

    return list;
  }, [fit, design, color, size, price, sort, tag, inStores, onSale]);

  const toggleDropdown = (name: string) =>
    setOpen((prev) => ({ name: prev.name === name ? null : name }));

  const closeDropdowns = () => setOpen({ name: null });

  // Close dropdowns when clicking outside
  useEffect(() => {
    if (!open.name) return undefined;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.filter-dropdown')) closeDropdowns();
    };
    window.addEventListener('mousedown', handler);
    return () => window.removeEventListener('mousedown', handler);
  }, [open.name]);

  const sortLabel =
    jeansFilters.sortOptions.find((o) => o.code === sort)?.label || 'По обновлению';
  const priceLabel = jeansFilters.prices.find((p) => p.code === price)?.label || 'Цена';
  const fitLabel = fit || 'Посадка';
  const designLabel = design || 'Дизайн';
  const colorLabel = color
    ? jeansFilters.colors.find((c) => c.code === color)?.label || 'Цвет'
    : 'Цвет';
  const sizeLabel = size || 'Размер';

  const resetAll = () => {
    setSort('updated');
    setFit('');
    setDesign('');
    setColor('');
    setPrice('all');
    setSize('');
    setTag('');
    setInStores(false);
    setOnSale(false);
  };

  const hasFilters = Boolean(
    fit || design || color || size || tag || inStores || onSale || price !== 'all' || sort !== 'updated',
  );

  return (
    <div className="app-wrapper">
      <Header />
      <main className="catalog">
        <div className="container catalog__inner">
          <nav className="breadcrumbs" aria-label="Breadcrumbs">
            <Link to="/">Домой</Link>
            <span className="breadcrumbs__sep">
              <span className="breadcrumbs__divider">/</span>
              <Link to="/women">Женщинам</Link>
            </span>
            <span className="breadcrumbs__sep">
              <span className="breadcrumbs__divider">/</span>
              <span className="breadcrumbs__current" aria-current="page">
                Джинсы
              </span>
            </span>
          </nav>

          <header className="catalog__header">
            <h1 className="catalog__title">
              Джинсы женские <span className="catalog__count">({totalJeansCount})</span>
            </h1>
          </header>

          <div className="catalog__toolbar">
            <div className="catalog__filters">
              {/* Sort dropdown */}
              <div className="filter-dropdown">
                <button
                  type="button"
                  className={`filter-dropdown__trigger${
                    open.name === 'sort' ? ' is-open' : ''
                  }${sort !== 'updated' ? ' is-active' : ''}`}
                  onClick={() => toggleDropdown('sort')}
                  aria-haspopup="listbox"
                  aria-expanded={open.name === 'sort'}
                >
                  <span>{sortLabel}</span>
                  <Icon name="chevron-down" size={14} />
                </button>
                {open.name === 'sort' && (
                  <ul className="filter-dropdown__menu" role="listbox">
                    {jeansFilters.sortOptions.map((o) => (
                      <li key={o.code}>
                        <button
                          type="button"
                          className={`filter-dropdown__option${
                            o.code === sort ? ' is-active' : ''
                          }`}
                          onClick={() => {
                            setSort(o.code);
                            closeDropdowns();
                          }}
                        >
                          {o.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Fit */}
              <div className="filter-dropdown">
                <button
                  type="button"
                  className={`filter-dropdown__trigger${
                    open.name === 'fit' ? ' is-open' : ''
                  }${fit ? ' is-active' : ''}`}
                  onClick={() => toggleDropdown('fit')}
                >
                  <span>{fitLabel}</span>
                  <Icon name="chevron-down" size={14} />
                </button>
                {open.name === 'fit' && (
                  <ul className="filter-dropdown__menu" role="listbox">
                    <li>
                      <button
                        type="button"
                        className="filter-dropdown__option"
                        onClick={() => {
                          setFit('');
                          closeDropdowns();
                        }}
                      >
                        Все
                      </button>
                    </li>
                    {jeansFilters.fits.map((f) => (
                      <li key={f}>
                        <button
                          type="button"
                          className={`filter-dropdown__option${
                            f === fit ? ' is-active' : ''
                          }`}
                          onClick={() => {
                            setFit(f);
                            closeDropdowns();
                          }}
                        >
                          {f}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Design */}
              <div className="filter-dropdown">
                <button
                  type="button"
                  className={`filter-dropdown__trigger${
                    open.name === 'design' ? ' is-open' : ''
                  }${design ? ' is-active' : ''}`}
                  onClick={() => toggleDropdown('design')}
                >
                  <span>{designLabel}</span>
                  <Icon name="chevron-down" size={14} />
                </button>
                {open.name === 'design' && (
                  <ul className="filter-dropdown__menu" role="listbox">
                    <li>
                      <button
                        type="button"
                        className="filter-dropdown__option"
                        onClick={() => {
                          setDesign('');
                          closeDropdowns();
                        }}
                      >
                        Все
                      </button>
                    </li>
                    {jeansFilters.designs.map((d) => (
                      <li key={d}>
                        <button
                          type="button"
                          className={`filter-dropdown__option${
                            d === design ? ' is-active' : ''
                          }`}
                          onClick={() => {
                            setDesign(d);
                            closeDropdowns();
                          }}
                        >
                          {d}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Color */}
              <div className="filter-dropdown">
                <button
                  type="button"
                  className={`filter-dropdown__trigger${
                    open.name === 'color' ? ' is-open' : ''
                  }${color ? ' is-active' : ''}`}
                  onClick={() => toggleDropdown('color')}
                >
                  <span>{colorLabel}</span>
                  <Icon name="chevron-down" size={14} />
                </button>
                {open.name === 'color' && (
                  <div className="filter-dropdown__menu filter-dropdown__menu--swatches">
                    <button
                      type="button"
                      className="filter-dropdown__option"
                      onClick={() => {
                        setColor('');
                        closeDropdowns();
                      }}
                    >
                      Все цвета
                    </button>
                    <div className="filter-swatches">
                      {jeansFilters.colors.map((c) => (
                        <button
                          key={c.code}
                          type="button"
                          className={`filter-swatch${
                            color === c.code ? ' is-active' : ''
                          }`}
                          onClick={() => {
                            setColor(c.code);
                            closeDropdowns();
                          }}
                          aria-label={c.label}
                          title={c.label}
                          style={{ background: c.swatch }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="filter-dropdown">
                <button
                  type="button"
                  className={`filter-dropdown__trigger${
                    open.name === 'price' ? ' is-open' : ''
                  }${price !== 'all' ? ' is-active' : ''}`}
                  onClick={() => toggleDropdown('price')}
                >
                  <span>{priceLabel}</span>
                  <Icon name="chevron-down" size={14} />
                </button>
                {open.name === 'price' && (
                  <ul className="filter-dropdown__menu" role="listbox">
                    {jeansFilters.prices.map((p) => (
                      <li key={p.code}>
                        <button
                          type="button"
                          className={`filter-dropdown__option${
                            p.code === price ? ' is-active' : ''
                          }`}
                          onClick={() => {
                            setPrice(p.code);
                            closeDropdowns();
                          }}
                        >
                          {p.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Size */}
              <div className="filter-dropdown">
                <button
                  type="button"
                  className={`filter-dropdown__trigger${
                    open.name === 'size' ? ' is-open' : ''
                  }${size ? ' is-active' : ''}`}
                  onClick={() => toggleDropdown('size')}
                >
                  <span>{sizeLabel}</span>
                  <Icon name="chevron-down" size={14} />
                </button>
                {open.name === 'size' && (
                  <div className="filter-dropdown__menu filter-dropdown__menu--sizes">
                    <button
                      type="button"
                      className="filter-dropdown__option"
                      onClick={() => {
                        setSize('');
                        closeDropdowns();
                      }}
                    >
                      Все размеры
                    </button>
                    <div className="filter-sizes">
                      {jeansFilters.sizesShort.map((s) => (
                        <button
                          key={s}
                          type="button"
                          className={`filter-size${size === s ? ' is-active' : ''}`}
                          onClick={() => {
                            setSize(s);
                            closeDropdowns();
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="catalog__chips">
              <button
                type="button"
                className={`catalog-chip${inStores ? ' is-active' : ''}`}
                onClick={() => setInStores((v) => !v)}
              >
                Наличие в магазинах
              </button>
              <button
                type="button"
                className={`catalog-chip catalog-chip--accent${onSale ? ' is-active' : ''}`}
                onClick={() => setOnSale((v) => !v)}
              >
                Товары со скидкой
              </button>
            </div>
          </div>

          <div className="catalog__tags">
            {jeansFilters.tags.map((t) => (
              <button
                key={t.code}
                type="button"
                className={`catalog-tag${tag === t.code ? ' is-active' : ''}`}
                onClick={() => setTag(tag === t.code ? '' : t.code)}
              >
                {t.label}
              </button>
            ))}
            {hasFilters && (
              <button
                type="button"
                className="catalog-tag catalog-tag--clear"
                onClick={resetAll}
              >
                Сбросить
                <Icon name="close" size={12} />
              </button>
            )}
          </div>

          {filtered.length > 0 ? (
            <div className="catalog__grid">
              {filtered.map((p) => (
                <JeansCard
                  key={p.id}
                  product={p}
                  onQuickView={() => setQuickView(p)}
                />
              ))}
            </div>
          ) : (
            <div className="catalog__empty">
              <h2>Ничего не найдено</h2>
              <p>Попробуйте изменить или сбросить фильтры.</p>
              <button
                type="button"
                className="catalog__empty-btn"
                onClick={resetAll}
              >
                Сбросить фильтры
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />

      {quickView && (
        <QuickViewModal
          product={quickView}
          onClose={() => setQuickView(null)}
        />
      )}
    </div>
  );
}
