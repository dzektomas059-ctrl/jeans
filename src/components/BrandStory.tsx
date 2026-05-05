import { Link } from 'react-router-dom';
import Icon from './Icon';

export default function BrandStory() {
  return (
    <section className="brand-story" aria-labelledby="brand-story-title">
      <div className="container brand-story__inner">
        <figure className="brand-story__media">
          <img src="/images/cat2.jpg" alt="Conte boutique interior" loading="lazy" decoding="async" />
        </figure>

        <div className="brand-story__content">
          <span className="brand-story__eyebrow">About the brand</span>
          <h2 id="brand-story-title" className="brand-story__title">
            Crafted with care since <em>1974</em>
          </h2>
          <p className="brand-story__text">
            Conte combines decades of European hosiery expertise with modern fashion design.
            Every collection is engineered for comfort, longevity and the kind of fit that lets
            you forget what you're wearing — and remember how good it feels.
          </p>

          <div className="brand-story__stats">
            <div>
              <div className="brand-story__stat-num">50+</div>
              <div className="brand-story__stat-label">Years of expertise</div>
            </div>
            <div>
              <div className="brand-story__stat-num">120</div>
              <div className="brand-story__stat-label">Brick &amp; mortar stores</div>
            </div>
            <div>
              <div className="brand-story__stat-num">35</div>
              <div className="brand-story__stat-label">Countries served</div>
            </div>
          </div>

          <Link to="/about" className="btn btn--ghost brand-story__cta">
            Learn more
            <Icon name="arrow-right" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
