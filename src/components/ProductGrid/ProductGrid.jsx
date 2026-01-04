import { ProductCard } from '../ProductCard/ProductCard';
import './ProductGrid.css';

export const ProductGrid = ({ products, loading, error }) => {
    if (loading) {
        return (
            <div className="loading-container">
                <div className="loader"></div>
                <p>Loading products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="empty-state">
                <span className="empty-state-icon">⚠️</span>
                <h3>Error Loading Products</h3>
                <p>{error}</p>
            </div>
        );
    }

    if (!products || products.length === 0) {
        return (
            <div className="empty-state">
                <span className="empty-state-icon">🔍</span>
                <h3>No Products Found</h3>
                <p>Try adjusting your search or filters</p>
            </div>
        );
    }

    return (
        <section className="product-grid-container">
            <div className="product-count">
                Showing <strong>{products.length}</strong> products
            </div>
            <div className="product-grid">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};
