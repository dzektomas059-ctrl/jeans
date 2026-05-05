import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Icon from '../components/Icon';

interface StubPageProps {
  title?: string;
  description?: string;
  ctaToJeans?: boolean;
  /** When true, render a contact / legal info block (used for /about, /contact) */
  showContact?: boolean;
}

export default function StubPage({
  title,
  description,
  ctaToJeans = true,
  showContact = false,
}: StubPageProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const segments = pathname.split('/').filter(Boolean);
  const auto = segments[segments.length - 1] ?? 'page';
  const computedTitle =
    title ||
    auto
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="app-wrapper">
      <Header />
      <main className="stub-page">
        <div className="container stub-page__inner">
          <nav className="breadcrumbs" aria-label="Breadcrumbs">
            <Link to="/">Home</Link>
            {segments.map((seg, idx) => {
              const path = '/' + segments.slice(0, idx + 1).join('/');
              const label = seg.replace(/-/g, ' ');
              const last = idx === segments.length - 1;
              return (
                <span key={path} className="breadcrumbs__sep">
                  <span className="breadcrumbs__divider">/</span>
                  {last ? (
                    <span className="breadcrumbs__current" aria-current="page">
                      {label}
                    </span>
                  ) : (
                    <Link to={path}>{label}</Link>
                  )}
                </span>
              );
            })}
          </nav>

          <h1 className="stub-page__title">{computedTitle}</h1>
          <p className="stub-page__lead">
            {description ||
              'This section is part of the Conte storefront. We are gradually rolling out every category — for now, please explore our flagship Jeans catalog where every interaction is fully wired up.'}
          </p>

          <div className="stub-page__cta">
            {ctaToJeans && (
              <button
                type="button"
                className="stub-page__btn stub-page__btn--primary"
                onClick={() => navigate('/jeans')}
              >
                Browse jeans catalog
                <Icon name="arrow-right" size={16} />
              </button>
            )}
            <button
              type="button"
              className="stub-page__btn stub-page__btn--ghost"
              onClick={() => navigate('/')}
            >
              <Icon name="chevron-left" size={16} />
              Back to home
            </button>
          </div>

          {showContact && (
            <section className="stub-page__contact" aria-label="Контактная информация">
              <h2 className="stub-page__contact-title">Контактная информация</h2>
              <div className="stub-page__contact-grid">
                <div className="stub-page__contact-card">
                  <div className="stub-page__contact-icon">
                    <Icon name="phone" size={20} />
                  </div>
                  <h3>Телефон</h3>
                  <a
                    className="stub-page__contact-link"
                    href="tel:+375291218648"
                  >
                    +375 (29) 121-86-48
                  </a>
                  <p>Пн–Пт 9:00 – 18:00</p>
                </div>
                <div className="stub-page__contact-card">
                  <div className="stub-page__contact-icon">
                    <Icon name="mail" size={20} />
                  </div>
                  <h3>Email</h3>
                  <a
                    className="stub-page__contact-link"
                    href="mailto:hello@conteshop.com"
                  >
                    hello@conteshop.com
                  </a>
                  <p>Ответим в течение 24 часов</p>
                </div>
                <div className="stub-page__contact-card">
                  <div className="stub-page__contact-icon">
                    <Icon name="pin" size={20} />
                  </div>
                  <h3>Реквизиты</h3>
                  <p className="stub-page__contact-strong">
                    ИП Полякова Светлана Александровна
                  </p>
                  <p>Адрес: Могилевская область</p>
                </div>
              </div>
            </section>
          )}

          <div className="stub-page__grid">
            <div className="stub-page__feature">
              <div className="stub-page__feature-icon">
                <Icon name="truck" size={22} />
              </div>
              <h3>Free EU delivery</h3>
              <p>For orders over €60. 30-day easy returns on every item.</p>
            </div>
            <div className="stub-page__feature">
              <div className="stub-page__feature-icon">
                <Icon name="shield" size={22} />
              </div>
              <h3>Crafted since 1974</h3>
              <p>Premium yarns, modern silhouettes and confident fits.</p>
            </div>
            <div className="stub-page__feature">
              <div className="stub-page__feature-icon">
                <Icon name="refresh" size={22} />
              </div>
              <h3>120 boutiques</h3>
              <p>Touch and feel the products in stores across Europe.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
