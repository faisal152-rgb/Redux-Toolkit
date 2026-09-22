import React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { setSearchQuery } from "../Redux/slice"

function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.cart)
  const searchQuery = useSelector((state) => state.cart.searchQuery)

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value))
    if (location.pathname !== "/Products" && e.target.value.trim() !== "") {
      navigate("/Products")
    }
  }

  return (
    <header className="header-wrapper">
      {/* Top Banner (Amazon/Daraz style) */}
      <div className="top-banner">
        <div className="container banner-content">
          <span>📦 <strong>FREE Express Shipping</strong> on all orders over $50</span>
          <div className="banner-links">
            <span>24/7 Support: 1-800-555-0199</span>
            <span>•</span>
            <span>Easy 30-Day Returns</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="main-navbar">
        <div className="container navbar-content">
          {/* Logo */}
          <Link to="/" className="brand-logo">
            <div className="brand-icon">🛍️</div>
            <div className="brand-text">
              <span className="brand-name">BAZAAR</span>
              <span className="brand-tag">EXPRESS</span>
            </div>
          </Link>

          {/* Search Bar (Daraz/Amazon style) */}
          <div className="search-bar-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search products, brands, electronics, gadgets..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="search-btn" aria-label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>

          {/* Nav Actions */}
          <div className="navbar-actions">
            <Link
              to="/"
              className={`nav-btn ${location.pathname === "/" ? "active" : ""}`}
            >
              Home
            </Link>
            <Link
              to="/Products"
              className={`nav-btn ${location.pathname === "/Products" ? "active" : ""}`}
            >
              Products
            </Link>

            {/* Cart Button */}
            <Link to="/Cart" className="cart-action-btn">
              <div className="cart-icon-wrapper">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
              </div>
              <div className="cart-text-info">
                <span className="cart-label">Cart</span>
                <span className="cart-total-preview">${totalAmount.toFixed(2)}</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header