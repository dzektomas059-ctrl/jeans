import { useMemo, useState } from 'react';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import Icon from './Icon';

interface Props {
  title: string;
  subtitle?: string;
  tab: 'new' | 'popular';
  ctaLabel?: string;
  ctaHref?: string;
  pageSize?: number;
  soft?: boolean;
}

export default function ProductSection({
  title,
  subtitle = '',
  tab,
  ctaLabel = 'View all',
  ctaHref = '/catalog',
  pageSize = 4,
  soft = false,
}: Props) {
  const list = useMemo(() => products.filter((p) => p.tab === tab), [tab]);
  const totalPages = Math.max(1, Math.ceil(list.length / pageSize));
  const [page, setPage] = useState(0);
  const safePage = Math.min(page, totalPages - 1);
  const start = safePage * pageSize;
  const visible = list.slice(start, start + pageSize);

  return (
    <section
      className={`product-section${soft ? ' product-section--soft' : ''}`}
      aria-labelledby={`${tab}-title`}
    >
      <div className="container">
        <div className="product-section__head">
          <div>
            <h2 id={`${tab}-title`} className="section-title">
              {title}
            </h2>
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
            <div className="section-rule" aria-hidden />
          </div>

          <div className="product-section__nav">
            <a href={ctaHref} className="section-link">
              {ctaLabel}
              <Icon name="arrow-right" size={16} />
            </a>
            <div className="product-section__pager">
              <button
                type="button"
                onClick={() => setPage(Math.max(0, safePage - 1))}
                disabled={safePage === 0}
                aria-label="Previous page"
              >
                <Icon name="chevron-left" size={16} />
              </button>
              <button
                type="button"
                onClick={() => setPage(Math.min(totalPages - 1, safePage + 1))}
                disabled={safePage >= totalPages - 1}
                aria-label="Next page"
              >
                <Icon name="chevron-right" size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="product-grid">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="product-section__dots" role="tablist" aria-label="Pages">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPage(idx)}
                className={`product-section__dot${idx === safePage ? ' is-active' : ''}`}
                aria-label={`Page ${idx + 1}`}
                role="tab"
                aria-selected={idx === safePage}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
