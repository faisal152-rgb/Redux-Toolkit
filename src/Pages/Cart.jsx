import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { clearitem, deleteitem } from "../Redux/slice"
function Cart() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartItems = useSelector((state) => state.cart.item)

  return (
    <div className="cart-page">
      <div className="cart-header">
        <div>
          <h1>Shopping Cart</h1>
          <p className="cart-subtitle">Review your selected items</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginLeft: "auto" }}>
          <span className="total-items">Total items: {cartItems.length}</span>
          {cartItems.length > 0 && (
            <button
              className="btn btn-primary"
              onClick={() => dispatch(clearitem())}
            >
              Clear Cart
            </button>
          )}
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "3.5rem 1.5rem",
          backgroundColor: "var(--surface)",
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-sm)"
        }}>
          <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>🛒</div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "0.5rem" }}>Your cart is empty</h2>
          <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
            Looks like you haven't added any products to your cart yet.
          </p>
          <button className="btn btn-primary" onClick={() => navigate("/Products")}>
            Explore Products
          </button>
        </div>
      ) : (
        <div className="cart-list" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img className="cart-item-image" src={item.thumbnail} alt={item.title} />
              
              <div className="cart-item-details">
                <h3 className="cart-item-title">{item.title}</h3>
                {item.category && <span className="cart-item-category">{item.category}</span>}
                <div className="cart-item-meta">
                  <span className="product-price">${item.price}</span>
                  {item.discountPercentage && (
                    <span className="discountPercentage">{item.discountPercentage}% OFF</span>
                  )}
                  {item.rating && (
                    <span className="product-rating">⭐ {item.rating}</span>
                  )}
                </div>
              </div>

              <div className="cart-item-actions">
                <button
                  className="btn btn-danger"
                  onClick={() => dispatch(deleteitem(item))}
                >
                  Remove from Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Cart