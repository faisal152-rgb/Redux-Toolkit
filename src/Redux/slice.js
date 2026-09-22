import { createSlice } from "@reduxjs/toolkit"

export const sampleProducts = [
  {
    id: 1,
    title: "Sony WH-1000XM4 Wireless Noise-Cancelling Headphones",
    price: 199.99,
    originalPrice: 279.99,
    rating: 4.8,
    reviewsCount: 1240,
    inStock: true,
    discount: "28% OFF",
    description: "Industry-leading noise canceling with Dual Noise Sensor technology and up to 30-hour battery life.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    category: "Electronics"
  },
  {
    id: 2,
    title: "Apple Watch Series 9 GPS 45mm Smartwatch",
    price: 329.00,
    originalPrice: 399.00,
    rating: 4.9,
    reviewsCount: 890,
    inStock: true,
    discount: "17% OFF",
    description: "Advanced health sensors, ECG, always-on Retina display, and carbon neutral case combinations.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
    category: "Wearables"
  },
  {
    id: 3,
    title: "Keychron K2 Wireless Mechanical Keyboard RGB",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.7,
    reviewsCount: 450,
    inStock: true,
    discount: "25% OFF",
    description: "Compact 75% layout with Gateron G Pro Brown switches, Bluetooth 5.1 and macOS/Windows compatibility.",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80",
    category: "Accessories"
  },
  {
    id: 4,
    title: "Logitech MX Master 3S Wireless Performance Mouse",
    price: 99.99,
    originalPrice: 129.99,
    rating: 4.9,
    reviewsCount: 2150,
    inStock: true,
    discount: "23% OFF",
    description: "8K DPI track-on-glass sensor, quiet clicks, and ultra-fast MagSpeed electromagnetic scrolling.",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80",
    category: "Accessories"
  },
  {
    id: 5,
    title: "JBL Flip 6 Waterproof Portable Bluetooth Speaker",
    price: 89.95,
    originalPrice: 129.95,
    rating: 4.6,
    reviewsCount: 680,
    inStock: true,
    discount: "30% OFF",
    description: "Bold audio sound with 2-way speaker system, IP67 waterproof and dustproof, 12-hour playtime.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop&q=80",
    category: "Electronics"
  },
  {
    id: 6,
    title: "Bellroy Classic Padded Laptop Backpack 20L",
    price: 139.00,
    originalPrice: 175.00,
    rating: 4.8,
    reviewsCount: 310,
    inStock: true,
    discount: "20% OFF",
    description: "Made from durable water-resistant recycled fabric with dedicated 16-inch protective laptop pocket.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80",
    category: "Fashion"
  },
  {
    id: 7,
    title: "Anker Prime 20,000mAh Power Bank (200W Output)",
    price: 109.99,
    originalPrice: 139.99,
    rating: 4.8,
    reviewsCount: 520,
    inStock: true,
    discount: "21% OFF",
    description: "Ultra-fast charging for laptops and phones with real-time smart digital display.",
    image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=600&auto=format&fit=crop&q=80",
    category: "Electronics"
  },
  {
    id: 8,
    title: "Hydro Flask 32 oz Wide Mouth Insulated Bottle",
    price: 34.95,
    originalPrice: 44.95,
    rating: 4.9,
    reviewsCount: 1890,
    inStock: true,
    discount: "22% OFF",
    description: "Keeps drinks cold up to 24 hours, pro-grade stainless steel with leak-proof Flex Cap.",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&auto=format&fit=crop&q=80",
    category: "Lifestyle"
  }
]

const initialState = {
  products: sampleProducts,
  cart: [],
  searchQuery: ""
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    addToCart: (state, action) => {
      const existingItem = state.cart.find((item) => item.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.cart.push({ ...action.payload, quantity: 1 })
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload)
    },
    increaseQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload)
      if (item) {
        item.quantity += 1
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload)
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1
        } else {
          state.cart = state.cart.filter((i) => i.id !== action.payload)
        }
      }
    },
    clearCart: (state) => {
      state.cart = []
    }
  }
})

export const {
  setSearchQuery,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart
} = cartSlice.actions

export default cartSlice.reducer
