import { memo, useCallback } from 'react';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

export const ProductCard = memo(({ product }) => {
    const { addToCart, items } = useCart();

    const cartItem = items.find(item => item.id === product.id);
    const quantityInCart = cartItem?.quantity || 0;
    const availableStock = product.stock - quantityInCart;
    const isOutOfStock = availableStock <= 0;
    const canAddMore = availableStock > 0;

    const handleAddToCart = useCallback(() => {
        if (!isOutOfStock && canAddMore) {
            addToCart(product);
        }
    }, [addToCart, product, isOutOfStock, canAddMore]);

    return (
        <article className="product-card">
            <div className="product-image-container">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="product-image"
                    loading="lazy"
                />
                {product.discountPercentage > 10 && (
                    <span className="product-discount">
                        -{Math.round(product.discountPercentage)}%
                    </span>
                )}
            </div>

            <div className="product-content">
                <span className="badge badge-category">{product.category}</span>

                <h3 className="product-title">{product.title}</h3>

                <div className="product-price-row">
                    <span className="product-price">${product.price.toFixed(2)}</span>
                    <span className={`badge ${isOutOfStock ? 'badge-danger' : 'badge-success'}`}>
                        {isOutOfStock ? 'Out of Stock' : `${availableStock} in stock`}
                    </span>
                </div>

                <button
                    className="btn btn-primary product-add-btn"
                    onClick={handleAddToCart}
                    disabled={isOutOfStock || !canAddMore}
                >
                    {isOutOfStock
                        ? 'Out of Stock'
                        : !canAddMore
                            ? 'Max in Cart'
                            : quantityInCart > 0
                                ? `Add More (${quantityInCart} in cart)`
                                : 'Add to Cart'
                    }
                </button>
            </div>
        </article>
    );
});

ProductCard.displayName = 'ProductCard';
