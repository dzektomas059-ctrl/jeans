import { useState } from 'react';
import Icon from './Icon';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setError('Please enter your email');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Please enter a valid email');
      return;
    }
    setError(null);
    setSuccess(true);
    setEmail('');
  };

  return (
    <section className="newsletter" aria-labelledby="newsletter-title">
      <div className="newsletter__inner">
        <span className="newsletter__chip">
          <Icon name="mail" size={12} />
          Newsletter
        </span>
        <h2 id="newsletter-title" className="newsletter__title">
          Get <strong>−10%</strong> on your first order
        </h2>
        <p className="newsletter__text">
          Subscribe to learn about new arrivals, exclusive offers and special events from
          the world of <strong>Conte</strong>.
        </p>

        {success ? (
          <div className="newsletter__success">
            <div className="newsletter__success-emoji" aria-hidden>
              ✉️
            </div>
            <h3 style={{ color: '#fff', marginBottom: 6, fontSize: 18 }}>Thank you for subscribing!</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)' }}>
              Your discount code is on its way — check your inbox.
            </p>
          </div>
        ) : (
          <>
            <form className="newsletter__form" onSubmit={handleSubmit} noValidate>
              <input
                type="email"
                className="newsletter__input"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email"
                aria-invalid={!!error}
                aria-describedby={error ? 'newsletter-error' : undefined}
              />
              <button type="submit" className="newsletter__submit">
                Subscribe
              </button>
            </form>

            {error && (
              <div id="newsletter-error" className="newsletter__error" role="alert">
                {error}
              </div>
            )}

            <p className="newsletter__hint">
              By subscribing, you agree to our privacy policy. Unsubscribe any time.
            </p>
          </>
        )}

        <div className="newsletter__social">
          <span className="newsletter__social-label">Follow us</span>
          <a className="newsletter__social-icon" href="https://instagram.com" aria-label="Instagram">
            <Icon name="instagram" size={16} />
          </a>
          <a className="newsletter__social-icon" href="https://facebook.com" aria-label="Facebook">
            <Icon name="facebook" size={16} />
          </a>
          <a className="newsletter__social-icon" href="https://youtube.com" aria-label="YouTube">
            <Icon name="youtube" size={16} />
          </a>
          <a className="newsletter__social-icon" href="https://tiktok.com" aria-label="TikTok">
            <Icon name="tiktok" size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
