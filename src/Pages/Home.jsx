import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { addToCart } from "../Redux/slice"

function Home() {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.cart.products)
  const [addedId, setAddedId] = useState(null)

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
    setAddedId(product.id)
    setTimeout(() => setAddedId(null), 1200)
  }

  return (
    <div className="home-container">
      {/* Hero Promo Banner (Shopify Style) */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="promo-badge">🔥 LIMITED TIME FLASH SALE</span>
          <h1 className="hero-heading">Upgrade Your Gear With Premium Essentials</h1>
          <p className="hero-description">
            Discover top-tier audio, smart wearables, and desktop gear with verified warranty and express delivery.
          </p>
          <div className="hero-buttons">
            <Link to="/Products" className="btn btn-primary-dark">
              Shop All Deals
            </Link>
            <Link to="/Products" className="btn btn-outline">
              New Arrivals
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Highlights Bar (Amazon / Daraz Style) */}
      <section className="features-bar">
        <div className="feature-item">
          <span className="feature-icon">🚀</span>
          <div>
            <h4>Free Express Shipping</h4>
            <p>On orders above $50</p>
          </div>
        </div>
        <div className="feature-item">
          <span className="feature-icon">🛡️</span>
          <div>
            <h4>100% Authentic</h4>
            <p>Official manufacturer warranty</p>
          </div>
        </div>
        <div className="feature-item">
          <span className="feature-icon">🔄</span>
          <div>
            <h4>Easy 30-Day Returns</h4>
            <p>Hassle-free refund policy</p>
          </div>
        </div>
        <div className="feature-item">
          <span className="feature-icon">🔒</span>
          <div>
            <h4>Secure Checkout</h4>
            <p>SSL encrypted payments</p>
          </div>
        </div>
      </section>

      {/* Flash Sale / Featured Products Section */}
      <section className="products-section">
        <div className="section-title-wrap">
          <div>
            <h2 className="section-title">Today's Best Deals</h2>
            <p className="section-subtitle">Grab top-rated products at unbeatable discounted prices</p>
          </div>
          <Link to="/Products" className="btn-link">
            View All ({products.length}) &rarr;
          </Link>
        </div>

        <div className="products-grid">
          {products.slice(0, 4).map((product) => (
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

                {/* Rating & Reviews */}
                <div className="rating-box">
                  <span className="stars">★ {product.rating}</span>
                  <span className="reviews">({product.reviewsCount} reviews)</span>
                </div>

                {/* Pricing & Free delivery badge */}
                <div className="price-row">
                  <div className="price-group">
                    <span className="current-price">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="old-price">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <span className="free-shipping-tag">Free Delivery</span>
                </div>

                {/* Action button */}
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
      </section>
    </div>
  )
}

export default Home