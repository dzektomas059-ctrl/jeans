import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useApp } from '../context/useApp';
import { useScrolled } from '../hooks/useScrolled';
import { useScrollLock } from '../hooks/useScrollLock';
import { navItems, type MegaPromo } from '../data/navigation';
import Icon from './Icon';

type Lang = 'EN' | 'PL';

export default function Header() {
  const { cartCount, setCartOpen, setSearchOpen, wishlist } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<number | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null);
  const [lang, setLang] = useState<Lang>('EN');
  const scrolled = useScrolled(40);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useScrollLock(mobileOpen);

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileExpanded(null);
  };

  const toggleMobile = () => {
    setMobileOpen((prev) => {
      const next = !prev;
      if (!next) setMobileExpanded(null);
      return next;
    });
  };

  const handleNavEnter = (idx: number) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMega(idx);
  };

  const handleNavLeave = () => {
    closeTimer.current = setTimeout(() => setActiveMega(null), 180);
  };

  const handleMegaEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <>
      <TopBar lang={lang} setLang={setLang} />

      <header className={`header${scrolled ? ' is-scrolled' : ''}`}>
        <div className="container header__inner">
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            className={`burger${mobileOpen ? ' is-open' : ''}`}
            onClick={toggleMobile}
          >
            <span className="burger__bar" />
            <span className="burger__bar" />
            <span className="burger__bar" />
          </button>

          <a href="/" className="header__brand" aria-label="Conte home">
            CONTE
          </a>

          <nav className="nav" aria-label="Main">
            {navItems.map((item, idx) => {
              const hasMega = !!item.mega;
              const isActive = activeMega === idx;
              return (
                <div
                  key={item.label}
                  className={`nav__item${isActive ? ' is-active' : ''}`}
                  onMouseEnter={() => hasMega && handleNavEnter(idx)}
                  onMouseLeave={() => hasMega && handleNavLeave()}
                >
                  <a
                    href={item.href}
                    className={`nav__link${item.accent ? ' nav__link--accent' : ''}`}
                  >
                    {item.label}
                    {hasMega && (
                      <span className="nav__caret" aria-hidden>
                        <Icon name="chevron-down" size={12} />
                      </span>
                    )}
                  </a>
                  {hasMega && isActive && (
                    <MegaMenu
                      onMouseEnter={handleMegaEnter}
                      onMouseLeave={handleNavLeave}
                      cols={item.mega!.cols}
                      promos={item.mega!.promos}
                    />
                  )}
                </div>
              );
            })}
          </nav>

          <div className="header__actions">
            <button
              type="button"
              className="header__search"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <Icon name="search" size={20} />
              <span className="header__search-label">Search</span>
            </button>

            <button
              type="button"
              className="icon-btn"
              aria-label="Account"
            >
              <Icon name="user" size={20} />
            </button>

            <button
              type="button"
              className="icon-btn"
              aria-label={`Wishlist (${wishlist.length})`}
            >
              <Icon name="heart" size={20} />
              {wishlist.length > 0 && (
                <span className="icon-btn__badge">{wishlist.length}</span>
              )}
            </button>

            <button
              type="button"
              className="icon-btn"
              aria-label={`Cart (${cartCount})`}
              onClick={() => setCartOpen(true)}
            >
              <Icon name="cart" size={20} />
              {cartCount > 0 && (
                <span className="icon-btn__badge">{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      <PromoStrip />

      <MobileDrawer
        open={mobileOpen}
        onClose={closeMobile}
        expanded={mobileExpanded}
        setExpanded={setMobileExpanded}
        lang={lang}
        setLang={setLang}
      />
    </>
  );
}

/* ---------------- Top bar ---------------- */

function TopBar({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <a href="tel:+48500503636" className="topbar__phone">
          <Icon name="phone" size={12} />
          +48 500 503 636
        </a>

        <div className="topbar__links">
          <a className="topbar__link" href="/about">
            About us
          </a>
          <a className="topbar__link" href="/how-to-order">
            How to order
          </a>
          <a className="topbar__link" href="/delivery">
            Delivery
          </a>
          <a className="topbar__link" href="/payment">
            Payment
          </a>
          <a className="topbar__link" href="/returns">
            Return and refunds
          </a>

          <div className="topbar__lang" role="group" aria-label="Language">
            {(['EN', 'PL'] as const).map((value) => (
              <button
                key={value}
                type="button"
                className={lang === value ? 'is-active' : ''}
                onClick={() => setLang(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Mega menu ---------------- */

interface MegaProps {
  cols: NonNullable<(typeof navItems)[number]['mega']>['cols'];
  promos?: MegaPromo[];
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function MegaMenu({ cols, promos, onMouseEnter, onMouseLeave }: MegaProps) {
  return (
    <div className="mega" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="mega__inner">
        <div className="mega__cols">
          {cols.map((col) => (
            <div key={col.title}>
              <h4
                className={`mega__col-title${
                  col.color === 'brand'
                    ? ' mega__col-title--accent'
                    : col.color === 'muted'
                    ? ' mega__col-title--muted'
                    : ''
                }`}
              >
                {col.title}
              </h4>
              <ul className="mega__list">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={link.accent ? 'is-accent' : undefined}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {promos && promos.length > 0 && (
          <div className="mega__promos">
            {promos.map((promo) => (
              <a
                key={promo.title}
                href={promo.href}
                className={`mega__promo${
                  promo.variant === 'light' ? ' mega__promo--light' : ''
                }`}
              >
                <img
                  src={promo.image}
                  alt=""
                  className="mega__promo-img"
                  loading="lazy"
                  decoding="async"
                />
                <div className="mega__promo-content">
                  {promo.eyebrow && (
                    <span className="mega__promo-eyebrow">{promo.eyebrow}</span>
                  )}
                  <span
                    className="mega__promo-title"
                    dangerouslySetInnerHTML={{ __html: promo.title }}
                  />
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Promo strip ---------------- */

function PromoStrip() {
  const items: { icon: ReactNode; text: ReactNode }[] = [
    {
      icon: <Icon name="truck" size={14} />,
      text: (
        <>
          Free delivery from <strong>€60</strong>
        </>
      ),
    },
    {
      icon: <Icon name="refresh" size={14} />,
      text: <>30 days easy returns</>,
    },
    {
      icon: <Icon name="shield" size={14} />,
      text: <>Secure payment</>,
    },
    {
      icon: <Icon name="card" size={14} />,
      text: (
        <>
          Minimum order <strong>€30</strong> excluding sale items
        </>
      ),
    },
  ];

  return (
    <div className="promo-strip" role="region" aria-label="Shop benefits">
      <div className="promo-strip__inner">
        {items.map((item, idx) => (
          <span key={idx} className="promo-strip__item">
            {item.icon}
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Mobile drawer ---------------- */

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  expanded: number | null;
  setExpanded: (v: number | null) => void;
  lang: Lang;
  setLang: (l: Lang) => void;
}

function MobileDrawer({
  open,
  onClose,
  expanded,
  setExpanded,
  lang,
  setLang,
}: DrawerProps) {
  return (
    <>
      <div
        className={`mobile-overlay${open ? ' is-open' : ''}`}
        onClick={onClose}
        aria-hidden
      />
      <aside className={`mobile-drawer${open ? ' is-open' : ''}`} aria-hidden={!open}>
        <div className="mobile-drawer__head">
          <span className="mobile-drawer__brand">CONTE</span>
          <button
            type="button"
            className="mobile-drawer__close"
            onClick={onClose}
            aria-label="Close menu"
          >
            ×
          </button>
        </div>

        <nav className="mobile-drawer__nav" aria-label="Mobile main">
          {navItems.map((item, idx) => {
            const hasMega = !!item.mega;
            const isExpanded = expanded === idx;
            return (
              <div key={item.label}>
                <div className="mobile-drawer__row">
                  <a className="mobile-drawer__link" href={item.href}>
                    {item.label}
                  </a>
                  {hasMega && (
                    <button
                      type="button"
                      className={`mobile-drawer__expand${isExpanded ? ' is-open' : ''}`}
                      onClick={() => setExpanded(isExpanded ? null : idx)}
                      aria-label={`Toggle ${item.label}`}
                    >
                      ›
                    </button>
                  )}
                </div>
                {hasMega && isExpanded && (
                  <div className="mobile-drawer__panel">
                    {item.mega!.cols.map((col) => (
                      <div key={col.title} className="mobile-drawer__panel-col">
                        <div className="mobile-drawer__panel-title">{col.title}</div>
                        {col.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            className={`mobile-drawer__panel-link${
                              link.accent ? ' mobile-drawer__panel-link--accent' : ''
                            }`}
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="mobile-drawer__foot">
          <a href="tel:+48500503636" className="mobile-drawer__phone">
            <Icon name="phone" size={16} />
            +48 500 503 636
          </a>
          <div className="mobile-drawer__lang">
            {(['EN', 'PL'] as const).map((value) => (
              <button
                key={value}
                type="button"
                className={lang === value ? 'is-active' : ''}
                onClick={() => setLang(value)}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
