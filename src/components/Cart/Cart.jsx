import { useCart } from '../../context/CartContext';
import { CartItem } from './CartItem';
import './Cart.css';

export const Cart = ({ isOpen, onClose }) => {
    const { items, totalItems, totalPrice, clearCart } = useCart();

    return (
        <>
            {/* Overlay */}
            <div
                className={`cart-overlay ${isOpen ? 'active' : ''}`}
                onClick={onClose}
                aria-hidden={!isOpen}
            />

            {/* Cart Sidebar */}
            <aside className={`cart-sidebar ${isOpen ? 'open' : ''}`} aria-label="Shopping cart">
                <div className="cart-header">
                    <h2 className="cart-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                        Your Cart
                        {totalItems > 0 && <span className="cart-count">({totalItems})</span>}
                    </h2>
                    <button className="cart-close-btn" onClick={onClose} aria-label="Close cart">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <div className="cart-content">
                    {items.length === 0 ? (
                        <div className="cart-empty">
                            <span className="cart-empty-icon">🛒</span>
                            <h3>Your cart is empty</h3>
                            <p>Add some products to get started!</p>
                        </div>
                    ) : (
                        <ul className="cart-items">
                            {items.map(item => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        </ul>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-summary">
                            <div className="cart-summary-row">
                                <span>Items:</span>
                                <span>{totalItems}</span>
                            </div>
                            <div className="cart-summary-row cart-total">
                                <span>Total:</span>
                                <span className="cart-total-price">${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                        <button className="btn btn-primary checkout-btn">
                            Proceed to Checkout
                        </button>
                        <button className="btn btn-secondary clear-cart-btn" onClick={clearCart}>
                            Clear Cart
                        </button>
                    </div>
                )}
            </aside>
        </>
    );
};
