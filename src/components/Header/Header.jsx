import { useCart } from '../../context/CartContext';
import './Header.css';

export const Header = ({ onCartClick, isCartOpen }) => {
    const { totalItems } = useCart();

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-brand">
                    <span className="header-logo">🛒</span>
                    <h1 className="header-title">ShopVibe</h1>
                </div>

                <button
                    className={`cart-button ${isCartOpen ? 'active' : ''}`}
                    onClick={onCartClick}
                    aria-label="Toggle cart"
                >
                    <svg
                        className="cart-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                    {totalItems > 0 && (
                        <span className="cart-badge">{totalItems}</span>
                    )}
                </button>
            </div>
        </header>
    );
};
