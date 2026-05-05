import Icon from './Icon';

const advantages = [
  {
    icon: 'truck' as const,
    title: 'Free delivery',
    text: 'Free shipping for orders over €60 across the EU.',
  },
  {
    icon: 'refresh' as const,
    title: '30 day returns',
    text: 'Easy returns within 30 days, no questions asked.',
  },
  {
    icon: 'shield' as const,
    title: 'Quality guarantee',
    text: 'Made in Belarus since 1974 with premium yarns.',
  },
  {
    icon: 'card' as const,
    title: 'Secure checkout',
    text: 'Pay with Visa, Mastercard, PayPal, Apple Pay or Google Pay.',
  },
];

export default function Advantages() {
  return (
    <section className="section section--soft" aria-label="Why Conte">
      <div className="container">
        <div className="section-header" style={{ justifyContent: 'center', textAlign: 'center' }}>
          <div>
            <h2 className="section-title">Why shop at Conte</h2>
            <p className="section-subtitle">Quality, service and care since 1974</p>
            <div className="section-rule" aria-hidden style={{ marginInline: 'auto' }} />
          </div>
        </div>

        <div className="advantages__grid">
          {advantages.map((adv) => (
            <div key={adv.title} className="advantage">
              <div className="advantage__icon" aria-hidden>
                <Icon name={adv.icon} size={26} />
              </div>
              <h3 className="advantage__title">{adv.title}</h3>
              <p className="advantage__text">{adv.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
