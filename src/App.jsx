import { Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import Products from "./Pages/Product"
import Cart from "./Pages/Cart"
import Header from "./Components/Header"

function App() {
  return (
    
    <>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Cart" element={<Cart />} />
      </Routes>
    </>
  )
}

export default App