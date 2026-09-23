import { useDispatch, useSelector } from "react-redux"
import { additem, deleteitem } from "../Redux/slice"
import { fetchProducts } from "../Redux/productslice"
import { useEffect } from "react"

function Product() {
  const dispatch = useDispatch()
  const { items: products, status, error } = useSelector((state) => state.products)
    const cartItems = useSelector((state) => state.cart.item)

  useEffect(() => {
    if (status === "idle" || !status) {
      dispatch(fetchProducts())
    }
  }, [dispatch, status])

  return (
    <div className="product-page">
      <div className="page-header">
        <h1>Featured Products</h1>
        <p>Explore our curated collection of premium gadgets and tech essentials</p>
      </div>

      {status === "loading" && (
        <div style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--text-muted)", fontSize: "1.1rem" }}>
          <p>Loading products, please wait...</p>
        </div>
      )}

      {status === "failed" && (
        <div style={{
          maxWidth: "600px",
          margin: "2rem auto",
          padding: "2rem",
          textAlign: "center",
          backgroundColor: "#fee2e2",
          border: "1px solid #f87171",
          borderRadius: "12px",
          color: "#991b1b"
        }}>
          <h3 style={{ marginBottom: "0.5rem", fontSize: "1.25rem" }}>Unable to load products</h3>
          <p style={{ marginBottom: "1.25rem", fontSize: "0.95rem" }}>
            {error || "Connection was reset. Please check your internet connection or ad blocker."}
          </p>
          <button
            className="btn btn-primary"
            onClick={() => dispatch(fetchProducts())}
          >
            Retry Loading
          </button>
        </div>
      )}

      {status === "success" && (
        <div className="product-grid">
          {products && products.length > 0 ? (
            products.map((item) => (
              <div className="product-card" key={item.id}>
                <div className="product-image-wrapper">
                  <img
                    className="product-image"
                    src={item.thumbnail}
                    alt={item.title || "product image"}
                  />
                </div>
                <div className="product-item-details">
                  <h2 className="product-title">{item.title}</h2>
                  <span className="product-category">{item.category}</span>
                  <p className="product-description">{item.description}</p>
                  <div className="product-card-footer">
                    <span className="product-price">${item.price}</span>
                    <span className="discountPercentage">{item.discountPercentage}% OFF</span>
                    <span className="product-rating">⭐ {item.rating}</span>
                    {
                      cartItems.find(cart => cart.id === item.id) ?
                        <button
                          className="btn btn-danger"
                          onClick={() => dispatch(deleteitem(item))}
                        >
                          Remove from Cart
                        </button>
                        :
                        <button
                          className="btn btn-primary"
                          onClick={() => dispatch(additem(item))}
                        >
                          Add to Cart
                        </button>
                    }
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={{ textAlign: "center", gridColumn: "1 / -1", color: "var(--text-muted)" }}>
              No products found.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default Product