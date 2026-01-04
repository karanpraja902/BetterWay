import { useCart } from '../../context/CartContext';
import './CartItem.css';

export const CartItem = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();

    const handleDecrease = () => {
        updateQuantity(item.id, item.quantity - 1);
    };

    const handleIncrease = () => {
        if (item.quantity < item.stock) {
            updateQuantity(item.id, item.quantity + 1);
        }
    };

    const handleRemove = () => {
        removeFromCart(item.id);
    };

    return (
        <li className="cart-item">
            <img src={item.thumbnail} alt={item.title} className="cart-item-image" />

            <div className="cart-item-details">
                <h4 className="cart-item-title">{item.title}</h4>
                <span className="cart-item-price">${item.price.toFixed(2)}</span>
            </div>

            <div className="cart-item-actions">
                <div className="quantity-controls">
                    <button
                        className="quantity-btn"
                        onClick={handleDecrease}
                        aria-label="Decrease quantity"
                    >
                        −
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                        className="quantity-btn"
                        onClick={handleIncrease}
                        disabled={item.quantity >= item.stock}
                        aria-label="Increase quantity"
                    >
                        +
                    </button>
                </div>

                <div className="cart-item-subtotal">
                    ${(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                    className="remove-btn"
                    onClick={handleRemove}
                    aria-label="Remove item"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                </button>
            </div>
        </li>
    );
};
