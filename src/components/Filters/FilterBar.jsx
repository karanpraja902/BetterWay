import './FilterBar.css';

export const FilterBar = ({
    searchTerm,
    onSearchChange,
    category,
    onCategoryChange,
    categories,
    sortOrder,
    onSortChange,
    onClearFilters,
}) => {
    const hasActiveFilters = searchTerm || category || sortOrder;

    return (
        <div className="filter-bar">
            <div className="filter-bar-inner">
                {/* Search Input */}
                <div className="filter-group search-group">
                    <label htmlFor="search" className="filter-label">Search</label>
                    <div className="search-input-wrapper">
                        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            id="search"
                            type="text"
                            className="input search-input"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                        />
                    </div>
                </div>

                {/* Category Filter */}
                <div className="filter-group">
                    <label htmlFor="category" className="filter-label">Category</label>
                    <div className="select-wrapper">
                        <select
                            id="category"
                            className="select"
                            value={category}
                            onChange={(e) => onCategoryChange(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </option>
                            ))}
                        </select>
                        <svg className="select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </div>
                </div>

                {/* Sort by Price */}
                <div className="filter-group">
                    <label htmlFor="sort" className="filter-label">Sort by Price</label>
                    <div className="select-wrapper">
                        <select
                            id="sort"
                            className="select"
                            value={sortOrder}
                            onChange={(e) => onSortChange(e.target.value)}
                        >
                            <option value="">Default</option>
                            <option value="asc">Low → High</option>
                            <option value="desc">High → Low</option>
                        </select>
                        <svg className="select-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </div>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                    <button className="btn btn-secondary clear-btn" onClick={onClearFilters}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                        Clear All
                    </button>
                )}
            </div>
        </div>
    );
};
