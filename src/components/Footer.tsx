import { Link } from 'react-router-dom';
import { footerColumns, paymentMethods } from '../data/footer';
import Icon from './Icon';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand-col">
            <div className="footer__brand">CONTE</div>
            <p className="footer__about">
              European premium hosiery, lingerie and clothing — proudly crafted since 1974.
              Comfort, fit and style for every day.
            </p>
            <div className="footer__contacts">
              <a href="tel:+48500503636" className="footer__contact">
                <Icon name="phone" size={16} />
                +48 500 503 636
              </a>
              <a href="mailto:hello@conteshop.com" className="footer__contact">
                <Icon name="mail" size={16} />
                hello@conteshop.com
              </a>
              <span className="footer__contact" style={{ cursor: 'default' }}>
                <Icon name="clock" size={16} />
                Mon–Fri 9:00 – 18:00 CET
              </span>
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="footer__col-title">{col.title}</h4>
              <ul className="footer__col-list">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('/') ? (
                      <Link to={link.href}>{link.label}</Link>
                    ) : (
                      <a href={link.href}>{link.label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer__bottom">
          <div className="footer__pay" aria-label="Accepted payment methods">
            <span className="footer__pay-label">We accept</span>
            {paymentMethods.map((m) => (
              <span key={m.name} className="footer__pay-icon" title={m.name}>
                {m.label}
              </span>
            ))}
          </div>

          <div className="footer__social">
            <span className="footer__social-label">Follow</span>
            <a className="footer__social-icon" href="https://instagram.com" aria-label="Instagram">
              <Icon name="instagram" size={14} />
            </a>
            <a className="footer__social-icon" href="https://facebook.com" aria-label="Facebook">
              <Icon name="facebook" size={14} />
            </a>
            <a className="footer__social-icon" href="https://youtube.com" aria-label="YouTube">
              <Icon name="youtube" size={14} />
            </a>
            <a className="footer__social-icon" href="https://tiktok.com" aria-label="TikTok">
              <Icon name="tiktok" size={14} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer__copy">
        <div className="container footer__copy-inner">
          <span className="footer__copy-text">
            © {new Date().getFullYear()} Conte. All rights reserved.
          </span>
          <div className="footer__copy-links">
            <Link to="/terms">Terms</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/cookies">Cookies</Link>
            <Link to="/sitemap">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
