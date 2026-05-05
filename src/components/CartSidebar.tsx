import { useApp } from '../context/useApp';
import { useScrollLock } from '../hooks/useScrollLock';
import { useEscapeKey } from '../hooks/useEscapeKey';
import Icon from './Icon';

export default function CartSidebar() {
  const {
    cartOpen,
    setCartOpen,
    cart,
    updateQty,
    removeFromCart,
    cartTotal,
    cartCount,
  } = useApp();

  useScrollLock(cartOpen);
  useEscapeKey(cartOpen, () => setCartOpen(false));

  const close = () => setCartOpen(false);

  return (
    <>
      <div
        className={`cart-overlay${cartOpen ? ' is-open' : ''}`}
        onClick={close}
        aria-hidden
      />
      <aside
        className={`cart${cartOpen ? ' is-open' : ''}`}
        aria-hidden={!cartOpen}
        aria-label="Shopping bag"
      >
        <div className="cart__head">
          <div>
            <div className="cart__title">Shopping bag</div>
            <div className="cart__count">{cartCount} items</div>
          </div>
          <button
            type="button"
            className="cart__close"
            onClick={close}
            aria-label="Close cart"
          >
            ×
          </button>
        </div>

        <div className="cart__body">
          {cart.length === 0 ? (
            <div className="cart__empty">
              <Icon name="cart" size={48} />
              <h3 style={{ fontSize: 16, color: '#1a1a1a' }}>Your bag is empty</h3>
              <p style={{ fontSize: 13 }}>
                Looks like you haven't added anything yet. Let's fix that.
              </p>
              <button
                type="button"
                className="btn btn--primary"
                onClick={close}
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <ul className="cart__items">
              {cart.map((item) => (
                <li key={item.id} className="cart__item">
                  <img src={item.image} alt="" className="cart__item-img" />
                  <div className="cart__item-body">
                    <div className="cart__item-name">{item.name}</div>
                    {item.size && (
                      <div className="cart__item-size">Size: {item.size}</div>
                    )}
                    <div className="cart__item-row">
                      <div className="cart__qty" aria-label="Quantity">
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span>{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <span className="cart__item-price">
                        €{(item.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="cart__item-remove"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <Icon name="trash" size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart__foot">
            <div className="cart__total">
              <span className="cart__total-label">Total</span>
              <span className="cart__total-value">€{cartTotal.toFixed(2)}</span>
            </div>
            <p className="cart__hint">Shipping &amp; taxes calculated at checkout.</p>
            <button type="button" className="cart__checkout">
              Go to checkout
              <Icon name="arrow-right" size={16} />
            </button>
            <button type="button" className="cart__continue" onClick={close}>
              Continue shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
