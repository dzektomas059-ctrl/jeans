import Icon from './Icon';
import { stores } from '../data/stores';

export default function StoresSection() {
  return (
    <section className="section stores" aria-labelledby="stores-title">
      <div className="container">
        <div className="stores__head">
          <h2 id="stores-title" className="stores__title">
            Visit our stores
          </h2>
          <p className="stores__subtitle">
            Touch, try and feel the products in over 120 boutiques across Europe.
          </p>
        </div>

        <div className="stores__grid">
          {stores.map((store) => (
            <article key={store.city} className="store">
              <div className="store__city">{store.city}</div>
              <span className="store__count">{store.count} stores</span>
              <p className="store__address">{store.address}</p>
              <div className="store__hours">{store.hours}</div>
            </article>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <a href="/stores" className="stores__map-link">
            <Icon name="pin" size={16} />
            Find a store near you
          </a>
        </div>
      </div>
    </section>
  );
}
