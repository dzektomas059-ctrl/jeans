import { categories } from '../data/categories';
import Icon from './Icon';

export default function CategoryGrid() {
  return (
    <section className="section" aria-labelledby="categories-title">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 id="categories-title" className="section-title">
              Shop by category
            </h2>
            <p className="section-subtitle">Find what you love faster</p>
            <div className="section-rule" aria-hidden />
          </div>
          <a href="/catalog" className="section-link">
            All categories
            <Icon name="arrow-right" size={16} />
          </a>
        </div>

        <div className="cat-grid">
          {categories.map((cat) => (
            <a key={cat.id} href={cat.href} className="cat-card">
              <img src={cat.image} alt={cat.name} className="cat-card__img" loading="lazy" decoding="async" />
              <div className="cat-card__overlay" aria-hidden />
              <div className="cat-card__body">
                <span className="cat-card__name">{cat.name}</span>
                <span className="cat-card__count">{cat.count} products</span>
                <span className="cat-card__cta">
                  Shop now
                  <Icon name="arrow-right" size={14} />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
