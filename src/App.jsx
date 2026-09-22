import React from "react"
import { Routes, Route } from "react-router-dom"
import Header from "./Components/Header"
import Home from "./Pages/Home"
import Products from "./Pages/Product"
import Cart from "./Pages/Cart"

function App() {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/Cart" element={<Cart />} />
        </Routes>
      </main>
    </div>
  )
}

export default App