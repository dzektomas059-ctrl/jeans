import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/useApp';
import type { Product } from '../data/products';
import Icon from './Icon';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { wishlist, toggleWishlist, addToCart } = useApp();
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes ? product.sizes[0] : null,
  );
  const [added, setAdded] = useState(false);

  const wished = wishlist.includes(product.id);

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize || undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article className="product-card">
      <div className="product-card__media">
        <img
          src={product.image}
          alt={product.name}
          className="product-card__img"
          loading="lazy"
          decoding="async"
        />

        {product.badge && (
          <div className="product-card__badges">
            <span
              className={`tag${
                product.badgeKind === 'new'
                  ? ' tag--new'
                  : product.badgeKind === 'gold'
                  ? ' tag--gold'
                  : product.badgeKind === 'dark'
                  ? ' tag--dark'
                  : ''
              }`}
            >
              {product.badge}
            </span>
            {product.oldPrice && (
              <span className="tag">
                −{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
              </span>
            )}
          </div>
        )}

        <button
          type="button"
          className={`product-card__wish${wished ? ' is-active' : ''}`}
          onClick={() => toggleWishlist(product.id)}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={wished}
        >
          <Icon name="heart" size={16} />
        </button>

        {product.sizes && product.sizes.length > 0 && (
          <div className="product-card__quick">
            <div className="product-card__sizes">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`product-card__size${
                    selectedSize === size ? ' is-selected' : ''
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <button
              type="button"
              className={`product-card__add${added ? ' is-added' : ''}`}
              onClick={handleAdd}
            >
              {added ? (
                <>Added to bag</>
              ) : (
                <>
                  <Icon name="cart" size={14} />
                  Add to bag
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <div className="product-card__body">
        <Stars rating={product.rating} reviews={product.reviews} />
        <h3 className="product-card__name">
          <Link to={product.href}>{product.name}</Link>
        </h3>
        <div className="product-card__price-row">
          <span
            className={`product-card__price${
              product.oldPrice ? ' is-discounted' : ''
            }`}
          >
            €{product.price.toFixed(2)}
          </span>
          {product.oldPrice && (
            <span className="product-card__old">
              €{product.oldPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function Stars({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="product-card__rating" aria-label={`${rating} of 5 stars, ${reviews} reviews`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon
          key={i}
          name="star"
          size={12}
          className={i < Math.round(rating) ? 'is-on' : 'is-off'}
        />
      ))}
      <span style={{ marginLeft: 4 }}>({reviews})</span>
    </div>
  );
}
