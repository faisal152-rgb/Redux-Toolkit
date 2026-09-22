import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addToCart, setSearchQuery } from "../Redux/slice"

function Product() {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.cart.products)
  const searchQuery = useSelector((state) => state.cart.searchQuery)

  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("featured")
  const [addedId, setAddedId] = useState(null)

  const categories = ["All", ...new Set(products.map((p) => p.category))]

  // Filter by category and search
  let filtered = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory
    const matchesSearch =
      searchQuery.trim() === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Sorting
  if (sortBy === "price-asc") {
    filtered = [...filtered].sort((a, b) => a.price - b.price)
  } else if (sortBy === "price-desc") {
    filtered = [...filtered].sort((a, b) => b.price - a.price)
  } else if (sortBy === "rating") {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating)
  }

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
    setAddedId(product.id)
    setTimeout(() => setAddedId(null), 1200)
  }

  return (
    <div className="product-page-container">
      {/* Page Header */}
      <div className="catalog-header">
        <div>
          <h1 className="catalog-title">All Products & Deals</h1>
          <p className="catalog-subtitle">
            Showing {filtered.length} products available for instant order
          </p>
        </div>

        {/* Sort Options */}
        <div className="sort-controls">
          <label htmlFor="sort-select">Sort By:</label>
          <select
            id="sort-select"
            className="sort-dropdown"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="featured">Featured & Best Deals</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Filter Row */}
      <div className="filters-bar">
        <div className="category-pill-group">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-pill ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {searchQuery && (
          <div className="active-search-indicator">
            <span>Filtering by: "<strong>{searchQuery}</strong>"</span>
            <button
              className="clear-search-btn"
              onClick={() => dispatch(setSearchQuery(""))}
            >
              ✕ Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Products Grid */}
      {filtered.length === 0 ? (
        <div className="no-products-found">
          <div className="no-icon">🔍</div>
          <h3>No products match your search</h3>
          <p>Try searching with different keywords or reset your category filter.</p>
          <button
            className="btn btn-primary-dark"
            onClick={() => {
              setSelectedCategory("All")
              dispatch(setSearchQuery(""))
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="products-grid">
          {filtered.map((product) => (
            <div key={product.id} className="store-product-card">
              <div className="card-image-box">
                {product.discount && (
                  <span className="discount-tag">{product.discount}</span>
                )}
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-img"
                  loading="lazy"
                />
              </div>

              <div className="card-info">
                <span className="product-category-label">{product.category}</span>
                <h3 className="product-name" title={product.title}>
                  {product.title}
                </h3>

                <div className="rating-box">
                  <span className="stars">★ {product.rating}</span>
                  <span className="reviews">({product.reviewsCount})</span>
                </div>

                <div className="price-row">
                  <div className="price-group">
                    <span className="current-price">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="old-price">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <span className="stock-status">✓ In Stock</span>
                </div>

                <button
                  className={`add-cart-btn ${addedId === product.id ? "btn-added" : ""}`}
                  onClick={() => handleAddToCart(product)}
                >
                  {addedId === product.id ? "✓ Added in Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Product