import { NavLink, Link } from "react-router-dom"
import { useSelector } from "react-redux"

function Header() {
  const cartItems = useSelector((state) => state.cart.item)


  return (
    <header className="header-container">
      <div className="header-section">
        <Link to="/" className="header-brand">
          <div className="header-logo-icon">🛍️</div>
          <h1 className="header-title">ShopZone</h1>
        </Link>
      </div>
      <nav className="header-bar">
        <ul>
          <li>
            <NavLink to="/" className="nav-link">Home</NavLink>
          </li>
          <li>
            <NavLink to="/Products" className="nav-link">Products</NavLink>
          </li>
          <li>
            <Link to="/Cart" className="cart-link">
              <svg className="cart-icon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="21" r="1"/>
                <circle cx="19" cy="21" r="1"/>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
              </svg>
              {cartItems.length > 0 && (
                <span className="cart-badge">{cartItems.length?cartItems.length:0}</span>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header