import Icon from './Icon';

export default function PromoBanners() {
  return (
    <section className="section" aria-label="Featured promotions">
      <div className="container">
        <div className="promo-banners__grid">
          <a href="/sale" className="promo-banner">
            <img src="/images/banner1.jpg" alt="" className="promo-banner__img" loading="lazy" />
            <div className="promo-banner__overlay promo-banner__overlay--brand" />
            <div className="promo-banner__content">
              <span className="promo-banner__eyebrow">Big Sale · Limited time</span>
              <h3
                className="promo-banner__title"
                dangerouslySetInnerHTML={{ __html: 'Up to <em>−50%</em> off' }}
              />
              <p className="promo-banner__text">
                Refresh your wardrobe with hundreds of styles at special prices.
              </p>
              <span className="promo-banner__cta">
                Shop sale
                <Icon name="arrow-right" size={14} />
              </span>
            </div>
          </a>

          <div className="promo-banners__col">
            <a href="/collections/romance" className="promo-banner promo-banner--soft">
              <img src="/images/banner2.jpg" alt="" className="promo-banner__img" loading="lazy" />
              <div className="promo-banner__overlay" />
              <div className="promo-banner__content">
                <span className="promo-banner__eyebrow">New collection</span>
                <h3
                  className="promo-banner__title"
                  dangerouslySetInnerHTML={{ __html: 'Romance <em>SS25</em>' }}
                />
                <span className="promo-banner__cta">
                  Discover
                  <Icon name="arrow-right" size={14} />
                </span>
              </div>
            </a>

            <a href="/collections/sport" className="promo-banner">
              <img src="/images/cat3.jpg" alt="" className="promo-banner__img" loading="lazy" />
              <div className="promo-banner__overlay promo-banner__overlay--dark" />
              <div className="promo-banner__content">
                <span className="promo-banner__eyebrow">Sport · Activewear</span>
                <h3
                  className="promo-banner__title"
                  dangerouslySetInnerHTML={{ __html: 'Move <em>freely</em>' }}
                />
                <span className="promo-banner__cta promo-banner__cta--inverse">
                  Shop now
                  <Icon name="arrow-right" size={14} />
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
