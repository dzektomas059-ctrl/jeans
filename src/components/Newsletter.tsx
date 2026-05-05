import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Введите корректный email');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <section style={{
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d1a1a 100%)',
      padding: '70px 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative elements */}
      <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(200,16,46,0.08)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-80px', left: '-60px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(200,16,46,0.05)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(200,16,46,0.15)', border: '1px solid rgba(200,16,46,0.3)', borderRadius: '20px', padding: '6px 16px', marginBottom: '20px' }}>
          <span style={{ color: '#c8102e', fontSize: '16px' }}>✉</span>
          <span style={{ color: '#c8102e', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>Рассылка</span>
        </div>

        <h2 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 800, fontSize: 'clamp(24px, 4vw, 36px)', color: '#fff', marginBottom: '12px', lineHeight: 1.2 }}>
          Подпишитесь на новости
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', marginBottom: '32px', lineHeight: 1.6 }}>
          Узнавайте первыми о новых коллекциях, акциях и специальных предложениях. <strong style={{ color: 'rgba(255,255,255,0.8)' }}>Скидка 10%</strong> на первый заказ при подписке!
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', gap: '0', maxWidth: '480px', margin: '0 auto', boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(''); }}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="Ваш email адрес"
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    fontSize: '14px',
                    border: `2px solid ${error ? '#c8102e' : focused ? 'rgba(200,16,46,0.5)' : 'transparent'}`,
                    borderRight: 'none',
                    borderRadius: '4px 0 0 4px',
                    outline: 'none',
                    background: '#fff',
                    color: '#1a1a1a',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                />
                {error && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, color: '#ff6b6b', fontSize: '12px', marginTop: '4px', textAlign: 'left' }}>
                    {error}
                  </div>
                )}
              </div>
              <button type="submit"
                style={{
                  padding: '16px 28px',
                  background: '#c8102e',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0 4px 4px 0',
                  cursor: 'pointer',
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 700,
                  fontSize: '14px',
                  letterSpacing: '0.5px',
                  whiteSpace: 'nowrap',
                  transition: 'background 0.2s',
                  flexShrink: 0
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#a00e26'}
                onMouseLeave={e => e.currentTarget.style.background = '#c8102e'}>
                Подписаться
              </button>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px', marginTop: '14px' }}>
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </form>
        ) : (
          <div style={{ background: 'rgba(58,124,58,0.2)', border: '1px solid rgba(58,124,58,0.4)', borderRadius: '8px', padding: '24px 32px', animation: 'fadeIn 0.4s ease' }}>
            <div style={{ fontSize: '36px', marginBottom: '12px' }}>🎉</div>
            <h3 style={{ fontFamily: 'Raleway, sans-serif', fontWeight: 700, fontSize: '20px', color: '#fff', marginBottom: '8px' }}>Спасибо за подписку!</h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>Промокод на скидку 10% отправлен на <strong style={{ color: '#fff' }}>{email}</strong></p>
          </div>
        )}

        {/* SOCIAL */}
        <div style={{ marginTop: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>Мы в соцсетях:</span>
          {[
            { name: 'Instagram', icon: '📸', color: '#E1306C' },
            { name: 'VK', icon: '💙', color: '#4680C2' },
            { name: 'Telegram', icon: '✈️', color: '#0088cc' },
            { name: 'YouTube', icon: '▶️', color: '#FF0000' },
          ].map(social => (
            <a key={social.name} href="#"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', fontSize: '18px', transition: 'all 0.2s', textDecoration: 'none' }}
              title={social.name}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.transform = 'none'; }}>
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}
