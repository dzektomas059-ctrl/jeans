import { Link } from 'react-router-dom';
import { useState } from 'react';
import Icon from './Icon';
import { useApp } from '../context/useApp';
import type { JeansProduct } from '../data/jeans';

interface Props {
  product: JeansProduct;
  onQuickView: () => void;
}

const badgeText: Record<NonNullable<JeansProduct['badge']>, string> = {
  new: 'НОВИНКА',
  sale: 'СКИДКА',
  bestseller: 'ХИТ',
};

export default function JeansCard({ product, onQuickView }: Props) {
  const { wishlist, toggleWishlist } = useApp();
  const [hover, setHover] = useState(false);
  const liked = wishlist.includes(product.id);

  const fmt = (n: number) =>
    n.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const primary = product.images[0];
  const secondary = product.images[1] ?? primary;

  return (
    <article
      className="jeans-card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="jeans-card__media">
        {product.badge && (
          <span className={`jeans-card__badge jeans-card__badge--${product.badge}`}>
            {badgeText[product.badge]}
          </span>
        )}

        <button
          type="button"
          className={`jeans-card__like${liked ? ' is-active' : ''}`}
          onClick={() => toggleWishlist(product.id)}
          aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Icon name="heart" size={18} />
        </button>

        <button
          type="button"
          className="jeans-card__media-btn"
          onClick={onQuickView}
          aria-label={`Open quick view for ${product.shortName}`}
        >
          <img
            className="jeans-card__img jeans-card__img--primary"
            src={primary}
            alt={product.shortName}
            loading="lazy"
            decoding="async"
          />
          <img
            className={`jeans-card__img jeans-card__img--secondary${
              hover ? ' is-visible' : ''
            }`}
            src={secondary}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
          />
        </button>

        <div className={`jeans-card__quick${hover ? ' is-visible' : ''}`}>
          <button
            type="button"
            className="jeans-card__quick-btn"
            onClick={onQuickView}
          >
            <Icon name="search" size={14} />
            Быстрый просмотр
          </button>
        </div>
      </div>

      <div className="jeans-card__body">
        <div className="jeans-card__price">
          <span className="jeans-card__price-current">
            {fmt(product.price)} {product.currency}
          </span>
          {product.oldPrice && (
            <span className="jeans-card__price-old">
              {fmt(product.oldPrice)} {product.currency}
            </span>
          )}
        </div>
        <Link to={`/jeans/${product.slug}`} className="jeans-card__name">
          {product.shortName}
        </Link>

        {product.colors.length > 1 && (
          <div className="jeans-card__colors" aria-label="Available colors">
            {product.colors.slice(0, 5).map((c) => (
              <span
                key={c.code}
                className="jeans-card__color"
                style={{ background: c.swatch }}
                title={c.label}
                aria-label={c.label}
              />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
