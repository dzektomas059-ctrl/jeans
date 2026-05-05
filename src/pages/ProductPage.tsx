import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Icon from '../components/Icon';
import { useApp } from '../context/useApp';
import { findJeansBySlug, jeansProducts, type JeansProduct } from '../data/jeans';

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = slug ? findJeansBySlug(slug) : undefined;

  if (!product) {
    return <NotFound />;
  }

  return <ProductView key={product.id} product={product} navigate={navigate} />;
}

function NotFound() {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="product-page">
        <div className="container product-page__notfound">
          <h1>Товар не найден</h1>
          <p>Возможно, он распродан или ссылка устарела. Загляните в каталог джинсов.</p>
          <Link to="/jeans" className="product-page__cta">
            В каталог джинсов
            <Icon name="arrow-right" size={16} />
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

interface ViewProps {
  product: JeansProduct;
  navigate: ReturnType<typeof useNavigate>;
}

function ProductView({ product, navigate }: ViewProps) {
  const { addToCart, wishlist, toggleWishlist } = useApp();
  const [activeImage, setActiveImage] = useState(0);
  const [activeColor, setActiveColor] = useState(product.defaultColor);
  const [activeSize, setActiveSize] = useState(
    product.sizes.find((s) => s.inStock)?.label || product.sizes[0]?.label || '',
  );
  const [qty, setQty] = useState(1);
  const liked = wishlist.includes(product.id);

  const fmt = (n: number) =>
    n.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const colorObj = useMemo(
    () => product.colors.find((c) => c.code === activeColor) ?? product.colors[0],
    [product.colors, activeColor],
  );

  const article = useMemo(() => {
    const baseArticle = product.article.replace(/, [a-z-]+$/i, '');
    return `${baseArticle}, ${colorObj?.label ?? activeColor}`;
  }, [product.article, colorObj, activeColor]);

  const related = useMemo(
    () => jeansProducts.filter((p) => p.id !== product.id).slice(0, 4),
    [product.id],
  );

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addToCart({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.images[0],
        size: activeSize,
      });
    }
  };

  return (
    <div className="app-wrapper">
      <Header />
      <main className="product-page">
        <div className="container product-page__inner">
          <nav className="breadcrumbs" aria-label="Breadcrumbs">
            <Link to="/">Домой</Link>
            <span className="breadcrumbs__sep">
              <span className="breadcrumbs__divider">/</span>
              <Link to="/women">Женщинам</Link>
            </span>
            <span className="breadcrumbs__sep">
              <span className="breadcrumbs__divider">/</span>
              <Link to="/jeans">Джинсы</Link>
            </span>
            <span className="breadcrumbs__sep">
              <span className="breadcrumbs__divider">/</span>
              <span className="breadcrumbs__current" aria-current="page">
                {product.shortName}
              </span>
            </span>
          </nav>

          <div className="product-page__layout">
            <div className="product-page__gallery">
              <ul className="product-page__thumbs" aria-label="Миниатюры">
                {product.images.map((src, idx) => (
                  <li key={src + idx}>
                    <button
                      type="button"
                      className={`product-page__thumb${
                        idx === activeImage ? ' is-active' : ''
                      }`}
                      onClick={() => setActiveImage(idx)}
                      aria-label={`Image ${idx + 1}`}
                    >
                      <img src={src} alt="" loading="lazy" decoding="async" />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="product-page__main">
                <img
                  key={activeImage}
                  src={product.images[activeImage]}
                  alt={product.title}
                  className="product-page__main-img"
                />
              </div>
            </div>

            <div className="product-page__info">
              <h1 className="product-page__title">{product.title}</h1>
              <p className="product-page__article">{article}</p>

              <div className="product-page__rating">
                <div className="product-page__stars" aria-label={`Rating ${product.rating}`}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Icon
                      key={i}
                      name="star"
                      size={16}
                      className={i < Math.round(product.rating) ? 'is-filled' : ''}
                    />
                  ))}
                </div>
                <span className="product-page__reviews">({product.reviews} отзывов)</span>
              </div>

              <div className="product-page__price">
                <span className="product-page__price-current">
                  {fmt(product.price)} {product.currency}
                </span>
                {product.oldPrice && (
                  <span className="product-page__price-old">
                    {fmt(product.oldPrice)} {product.currency}
                  </span>
                )}
              </div>

              <div className="product-page__row">
                <span className="product-page__label">
                  Цвет: <strong>{colorObj?.label}</strong>
                </span>
                <div className="product-page__colors">
                  {product.colors.map((c) => (
                    <button
                      key={c.code}
                      type="button"
                      className={`product-page__color${
                        activeColor === c.code ? ' is-active' : ''
                      }`}
                      onClick={() => setActiveColor(c.code)}
                      aria-label={c.label}
                      title={c.label}
                    >
                      <span
                        className="product-page__color-dot"
                        style={{ background: c.swatch }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="product-page__row">
                <div className="product-page__row-head">
                  <span className="product-page__label">Размер:</span>
                  <Link className="product-page__sizechart" to="/size-chart-jeans">
                    Таблица размеров
                  </Link>
                </div>
                <div className="product-page__sizes">
                  {product.sizes.map((s) => (
                    <button
                      key={s.label}
                      type="button"
                      className={`product-page__size${
                        activeSize === s.label ? ' is-active' : ''
                      }${!s.inStock ? ' is-disabled' : ''}`}
                      onClick={() => s.inStock && setActiveSize(s.label)}
                      disabled={!s.inStock}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="product-page__row product-page__row--qty">
                <span className="product-page__label">Кол-во:</span>
                <div className="product-page__qty">
                  <button
                    type="button"
                    className="product-page__qty-btn"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Уменьшить количество"
                  >
                    <Icon name="minus" size={14} />
                  </button>
                  <span className="product-page__qty-value">{qty}</span>
                  <button
                    type="button"
                    className="product-page__qty-btn"
                    onClick={() => setQty((q) => Math.min(99, q + 1))}
                    aria-label="Увеличить количество"
                  >
                    <Icon name="plus" size={14} />
                  </button>
                </div>
              </div>

              <div className="product-page__actions">
                <button
                  type="button"
                  className="product-page__add"
                  onClick={handleAdd}
                >
                  ДОБАВИТЬ В КОРЗИНУ
                </button>
                <button
                  type="button"
                  className={`product-page__like${liked ? ' is-active' : ''}`}
                  onClick={() => toggleWishlist(product.id)}
                  aria-label={liked ? 'Убрать из избранного' : 'В избранное'}
                >
                  <Icon name="heart" size={20} />
                </button>
              </div>

              <ul className="product-page__links">
                <li>
                  <Link to="/how-to-order">Как заказать</Link>
                </li>
                <li>
                  <Link to="/discount-card">Дисконтная карта</Link>
                </li>
                <li>
                  <Link to="/store-availability">Наличие в магазинах</Link>
                </li>
              </ul>

              <div className="product-page__details">
                <h3>Описание</h3>
                {product.description.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}

                <dl className="product-page__specs">
                  <div>
                    <dt>Состав</dt>
                    <dd>{product.composition}</dd>
                  </div>
                  <div>
                    <dt>Посадка</dt>
                    <dd>{product.fit}</dd>
                  </div>
                  <div>
                    <dt>Дизайн</dt>
                    <dd>{product.design}</dd>
                  </div>
                  <div>
                    <dt>Высота посадки</dt>
                    <dd>
                      {product.rise === 'high'
                        ? 'Высокая'
                        : product.rise === 'mid'
                        ? 'Средняя'
                        : 'Низкая'}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <section className="product-page__related">
            <header className="product-page__related-head">
              <h2>Похожие модели</h2>
              <button
                type="button"
                className="product-page__related-cta"
                onClick={() => navigate('/jeans')}
              >
                В каталог
                <Icon name="arrow-right" size={14} />
              </button>
            </header>
            <div className="product-page__related-grid">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to={`/jeans/${r.slug}`}
                  className="product-page__related-card"
                >
                  <div className="product-page__related-img">
                    <img src={r.images[0]} alt={r.shortName} loading="lazy" />
                  </div>
                  <div className="product-page__related-body">
                    <span className="product-page__related-price">
                      {fmt(r.price)} {r.currency}
                    </span>
                    <span className="product-page__related-name">{r.shortName}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
