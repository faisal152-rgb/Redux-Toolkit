import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { additem, deleteitem } from "../Redux/slice"
import { fetchProducts } from "../Redux/productslice"

function Home() {
  const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart.item)
  const { items: products, status } = useSelector((state) => state.products)

  useEffect(() => {
    if (status === "idle" || !status) {
      dispatch(fetchProducts())
    }
  }, [dispatch, status])

  // Get the first product as the featured trending product
  const featuredProduct = products && products.length > 0 ? products[0] : null
  // Get the next few products for a top picks preview
  const topProducts = products && products.length > 1 ? products.slice(1) : []

  return (
    <div className="home-page">
      <div className="home-container">
        <div className="section-header">
          <h2>Trending Product</h2>
          <Link to="/Products" className="view-all-link">View all products →</Link>
        </div>

        {status === "loading" && !featuredProduct && (
          <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
            Loading trending product...
          </div>
        )}

        {featuredProduct && (
          <div className="featured-card">
            <div className="featured-image-container">
              <img
                src={featuredProduct.thumbnail}
                alt={featuredProduct.title}
              />
            </div>
            <div className="featured-details">
              <span className="product-badge">{featuredProduct.category} • Top Pick</span>
              <h2>{featuredProduct.title}</h2>
              <p className="featured-description">
                {featuredProduct.description}
              </p>
              <div className="featured-price-row">
                <div className="price-tag">
                  <span className="current-price">${featuredProduct.price}</span>
                  {featuredProduct.discountPercentage && (
                    <span className="discountPercentage">
                      {featuredProduct.discountPercentage}% OFF
                    </span>
                  )}
                </div>
{
                       cartItems.find(cart => cart.id === featuredProduct.id)?
                      <button
                        className="btn btn-danger"
                        onClick={() => dispatch(deleteitem(featuredProduct))}
                      >
                        Remove from Cart
                      </button>
                      :
                      <button
                        className="btn btn-primary"
                        onClick={() => dispatch(additem(featuredProduct))}
                      >
                        Add to Cart
                      </button>
                      }
              </div>
            </div>
          </div>
        )}

        {/* Top Picks Preview */}
        {topProducts.length > 0 && (
          <div style={{ marginTop: "3.5rem" }}>
            <div className="section-header">
              <h2>Popular Highlights</h2>
              <Link to="/Products" className="view-all-link">See more →</Link>
            </div>
            <div className="product-grid">
              {topProducts.map((item) => (
                <div className="product-card" key={item.id}>
                  <div className="product-image-wrapper">
                    <img
                      className="product-image"
                      src={item.thumbnail}
                      alt={item.title}
                    />
                  </div>
                  <div className="product-item-details">
                    <span className="product-category">{item.category}</span>
                    <h2 className="product-title">{item.title}</h2>
                    <p className="product-description">{item.description}</p>
                    <div className="product-card-footer">
                      <span className="product-price">${item.price}</span>
                      <span className="discountPercentage">{item.discountPercentage}% OFF</span>
                      {
                       cartItems.find(cart => cart.id === item.id)?
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
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home