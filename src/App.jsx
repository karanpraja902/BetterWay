import { useState, useMemo, useCallback } from 'react';
import { Header } from './components/Header/Header';
import { FilterBar } from './components/Filters/FilterBar';
import { ProductGrid } from './components/ProductGrid/ProductGrid';
import { Cart } from './components/Cart/Cart';
import { useProducts } from './hooks/useProducts';
import { useDebounce } from './hooks/useDebounce';
import './App.css';

function App() {
  // Fetch products
  const { products, loading, error } = useProducts();

  // Cart visibility
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  // Debounce search term
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Extract unique categories
  const categories = useMemo(() => {
    if (!products) return [];
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    return uniqueCategories.sort();
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let result = [...products];

    // Filter by search term
    if (debouncedSearch) {
      const searchLower = debouncedSearch.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(searchLower)
      );
    }

    // Filter by category
    if (category) {
      result = result.filter(p => p.category === category);
    }

    // Sort by price
    if (sortOrder === 'asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, debouncedSearch, category, sortOrder]);

  // Handlers
  const handleCartToggle = useCallback(() => {
    setIsCartOpen(prev => !prev);
  }, []);

  const handleCartClose = useCallback(() => {
    setIsCartOpen(false);
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchTerm('');
    setCategory('');
    setSortOrder('');
  }, []);

  return (
    <div className="app">
      <Header onCartClick={handleCartToggle} isCartOpen={isCartOpen} />

      <main className="main-content container">
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          category={category}
          onCategoryChange={setCategory}
          categories={categories}
          sortOrder={sortOrder}
          onSortChange={setSortOrder}
          onClearFilters={handleClearFilters}
        />

        <ProductGrid
          products={filteredProducts}
          loading={loading}
          error={error}
        />
      </main>

      <Cart isOpen={isCartOpen} onClose={handleCartClose} />
    </div>
  );
}

export default App;
