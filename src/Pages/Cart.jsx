import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from "../Redux/slice"

function Cart() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.cart)
  const [couponCode, setCouponCode] = useState("")
  const [discountApplied, setDiscountApplied] = useState(false)
  const [checkedOut, setCheckedOut] = useState(false)

  const rawSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountAmount = discountApplied ? rawSubtotal * 0.15 : 0
  const subtotal = rawSubtotal - discountAmount

  // Free shipping threshold = $50
  const freeShippingThreshold = 50
  const shipping = rawSubtotal >= freeShippingThreshold || rawSubtotal === 0 ? 0 : 4.99
  const tax = subtotal * 0.05
  const total = subtotal + shipping + tax
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - rawSubtotal)

  const handleApplyCoupon = (e) => {
    e.preventDefault()
    if (couponCode.trim().toLowerCase() === "save15" || couponCode.trim().toLowerCase() === "discount") {
      setDiscountApplied(true)
    } else {
      alert("Try entering code: SAVE15")
    }
  }

  const handleCheckout = () => {
    setCheckedOut(true)
    dispatch(clearCart())
  }

  if (checkedOut) {
    return (
      <div className="cart-page-wrapper">
        <div className="checkout-success-card">
          <div className="success-badge-icon">✅</div>
          <h2>Thank You For Your Order!</h2>
          <p className="order-number">Order #ORD-{Math.floor(100000 + Math.random() * 900000)}</p>
          <p className="success-desc">
            We have received your order and are preparing it for shipment. A confirmation email has been sent to your inbox.
          </p>
          <div className="success-actions">
            <Link
              to="/Products"
              className="btn btn-primary-dark"
              onClick={() => setCheckedOut(false)}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="cart-page-wrapper">
        <div className="empty-cart-card">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your Shopping Cart is Empty</h2>
          <p>
            Your cart is currently empty. Explore our top deals and find products you love!
          </p>
          <Link to="/Products" className="btn btn-primary-dark">
            Start Shopping Now
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page-wrapper">
      {/* Free Shipping Alert Bar (Daraz/Shopify style) */}
      <div className="shipping-progress-banner">
        {amountNeededForFreeShipping === 0 ? (
          <span>🎉 <strong>Congratulations!</strong> You qualify for <strong>FREE Shipping</strong>.</span>
        ) : (
          <span>
            🚚 Add <strong>${amountNeededForFreeShipping.toFixed(2)}</strong> more to get <strong>FREE Shipping</strong>!
          </span>
        )}
      </div>

      <div className="cart-layout-grid">
        {/* Left: Cart Items List */}
        <div className="cart-items-section">
          <div className="cart-section-header">
            <h2>Shopping Cart ({cart.reduce((s, i) => s + i.quantity, 0)} items)</h2>
            <button
              className="clear-all-link"
              onClick={() => dispatch(clearCart())}
            >
              Clear Cart
            </button>
          </div>

          <div className="cart-items-container">
            {cart.map((item) => (
              <div key={item.id} className="cart-item-row">
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-product-thumb"
                />

                <div className="cart-product-details">
                  <span className="cart-cat-badge">{item.category}</span>
                  <h3 className="cart-item-heading">{item.title}</h3>
                  <div className="stock-info">✓ In Stock & Ready to Ship</div>
                  <div className="mobile-price-row">
                    ${item.price.toFixed(2)} each
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="cart-qty-wrapper">
                  <div className="qty-selector">
                    <button
                      className="qty-change-btn"
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="qty-display">{item.quantity}</span>
                    <button
                      className="qty-change-btn"
                      onClick={() => dispatch(increaseQuantity(item.id))}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="item-delete-btn"
                    onClick={() => dispatch(removeFromCart(item.id))}
                    title="Remove item"
                  >
                    Remove
                  </button>
                </div>

                {/* Subtotal */}
                <div className="item-subtotal-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-continue-wrap">
            <Link to="/Products" className="continue-shopping-link">
              &larr; Continue Shopping
            </Link>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="order-summary-sidebar">
          <div className="summary-card">
            <h3 className="summary-heading">Order Summary</h3>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyCoupon} className="coupon-form">
              <input
                type="text"
                placeholder="Promo Code (try SAVE15)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="coupon-input"
              />
              <button type="submit" className="coupon-btn">
                Apply
              </button>
            </form>

            {discountApplied && (
              <div className="coupon-success-msg">
                ✓ 15% discount applied!
              </div>
            )}

            <div className="summary-breakdown">
              <div className="summary-line">
                <span>Items Subtotal</span>
                <span>${rawSubtotal.toFixed(2)}</span>
              </div>

              {discountApplied && (
                <div className="summary-line discount-line">
                  <span>Discount (15% OFF)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="summary-line">
                <span>Standard Delivery</span>
                <span>{shipping === 0 ? <strong style={{color: "#16a34a"}}>FREE</strong> : `$${shipping.toFixed(2)}`}</span>
              </div>

              <div className="summary-line">
                <span>Sales Tax (5%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="summary-hr"></div>

              <div className="summary-line total-line">
                <span>Estimated Total</span>
                <span className="total-highlight">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              className="checkout-btn"
              onClick={handleCheckout}
            >
              Proceed to Checkout &rarr;
            </button>

            {/* Trust Badges */}
            <div className="checkout-guarantee">
              <span>🔒 256-Bit SSL Encrypted Checkout</span>
              <span>💳 Visa, MasterCard, PayPal, Cash on Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart