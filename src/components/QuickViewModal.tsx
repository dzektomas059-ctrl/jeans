import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from './Icon';
import { useApp } from '../context/useApp';
import { useScrollLock } from '../hooks/useScrollLock';
import { useEscapeKey } from '../hooks/useEscapeKey';
import type { JeansProduct } from '../data/jeans';

interface Props {
  product: JeansProduct;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: Props) {
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist } = useApp();
  const [activeImage, setActiveImage] = useState(0);
  const [activeColor, setActiveColor] = useState(product.defaultColor);
  const [activeSize, setActiveSize] = useState(
    product.sizes.find((s) => s.inStock)?.label || product.sizes[0]?.label || '',
  );
  const [qty, setQty] = useState(1);
  const liked = wishlist.includes(product.id);

  useScrollLock(true);
  useEscapeKey(true, onClose);

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

  const goPrev = () =>
    setActiveImage((i) => (i - 1 + product.images.length) % product.images.length);
  const goNext = () => setActiveImage((i) => (i + 1) % product.images.length);

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      image: product.images[0],
      size: activeSize,
    });
    if (qty > 1) {
      // simulate qty by adding multiple times
      for (let i = 1; i < qty; i++) {
        addToCart({
          id: product.id,
          name: product.title,
          price: product.price,
          image: product.images[0],
          size: activeSize,
        });
      }
    }
    onClose();
  };

  const goPDP = () => {
    onClose();
    navigate(`/jeans/${product.slug}`);
  };

  return (
    <div
      className="quick-view-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Быстрый просмотр товара"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="quick-view" onMouseDown={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="quick-view__close"
          onClick={onClose}
          aria-label="Закрыть"
        >
          <Icon name="close" size={20} />
        </button>

        <div className="quick-view__layout">
          <div className="quick-view__gallery">
            <ul className="quick-view__thumbs" role="tablist" aria-label="Миниатюры">
              {product.images.map((src, idx) => (
                <li key={src + idx}>
                  <button
                    type="button"
                    className={`quick-view__thumb${
                      idx === activeImage ? ' is-active' : ''
                    }`}
                    onClick={() => setActiveImage(idx)}
                    role="tab"
                    aria-selected={idx === activeImage}
                    aria-label={`Image ${idx + 1}`}
                  >
                    <img src={src} alt="" loading="lazy" decoding="async" />
                  </button>
                </li>
              ))}
            </ul>

            <div className="quick-view__main">
              <button
                type="button"
                className="quick-view__nav quick-view__nav--prev"
                onClick={goPrev}
                aria-label="Предыдущее изображение"
              >
                <Icon name="chevron-left" size={20} />
              </button>
              <img
                key={activeImage}
                src={product.images[activeImage]}
                alt={product.title}
                className="quick-view__main-img"
              />
              <button
                type="button"
                className="quick-view__nav quick-view__nav--next"
                onClick={goNext}
                aria-label="Следующее изображение"
              >
                <Icon name="chevron-right" size={20} />
              </button>
            </div>

            <button
              type="button"
              className="quick-view__pdp"
              onClick={goPDP}
            >
              ПОДРОБНЕЕ
            </button>
          </div>

          <div className="quick-view__info">
            <h2 className="quick-view__title">{product.title}</h2>
            <p className="quick-view__article">{article}</p>

            <div className="quick-view__price">
              <span className="quick-view__price-current">
                {fmt(product.price)} {product.currency}
              </span>
              {product.oldPrice && (
                <span className="quick-view__price-old">
                  {fmt(product.oldPrice)} {product.currency}
                </span>
              )}
            </div>

            <div className="quick-view__row">
              <span className="quick-view__label">
                Цвет: <strong>{colorObj?.label}</strong>
              </span>
              <div className="quick-view__colors">
                {product.colors.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    className={`quick-view__color${
                      activeColor === c.code ? ' is-active' : ''
                    }`}
                    onClick={() => setActiveColor(c.code)}
                    aria-label={c.label}
                    title={c.label}
                  >
                    <span
                      className="quick-view__color-dot"
                      style={{ background: c.swatch }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="quick-view__row">
              <div className="quick-view__row-head">
                <span className="quick-view__label">Размер:</span>
                <Link className="quick-view__sizechart" to="/size-chart-jeans" onClick={onClose}>
                  Таблица размеров
                </Link>
              </div>
              <div className="quick-view__sizes">
                {product.sizes.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    className={`quick-view__size${
                      activeSize === s.label ? ' is-active' : ''
                    }${!s.inStock ? ' is-disabled' : ''}`}
                    onClick={() => s.inStock && setActiveSize(s.label)}
                    disabled={!s.inStock}
                    aria-pressed={activeSize === s.label}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="quick-view__row quick-view__row--qty">
              <span className="quick-view__label">Кол-во:</span>
              <div className="quick-view__qty">
                <button
                  type="button"
                  className="quick-view__qty-btn"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Уменьшить количество"
                >
                  <Icon name="minus" size={14} />
                </button>
                <span className="quick-view__qty-value" aria-live="polite">
                  {qty}
                </span>
                <button
                  type="button"
                  className="quick-view__qty-btn"
                  onClick={() => setQty((q) => Math.min(99, q + 1))}
                  aria-label="Увеличить количество"
                >
                  <Icon name="plus" size={14} />
                </button>
              </div>
            </div>

            <div className="quick-view__actions">
              <button
                type="button"
                className="quick-view__add"
                onClick={handleAdd}
              >
                ДОБАВИТЬ В КОРЗИНУ
              </button>
              <button
                type="button"
                className={`quick-view__like${liked ? ' is-active' : ''}`}
                onClick={() => toggleWishlist(product.id)}
                aria-label={liked ? 'Убрать из избранного' : 'В избранное'}
              >
                <Icon name="heart" size={20} />
              </button>
            </div>

            <ul className="quick-view__links">
              <li>
                <Link to="/how-to-order" onClick={onClose}>
                  Как заказать
                </Link>
              </li>
              <li>
                <Link to="/discount-card" onClick={onClose}>
                  Дисконтная карта
                </Link>
              </li>
              <li>
                <Link to="/store-availability" onClick={onClose}>
                  Наличие в магазинах
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
