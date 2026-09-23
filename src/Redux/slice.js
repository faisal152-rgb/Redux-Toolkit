// src/Redux/slice.js
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  item: localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart")):[],
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    additem: (state, action) => {
      state.item.push(action.payload)
      localStorage.setItem("cart", JSON.stringify(state.item))
    },
    deleteitem: (state, action) => {
      const cartdata=state.item.filter((item) => item.id !== action.payload.id)
      state.item= cartdata
      localStorage.setItem("cart", JSON.stringify(state.item))
    },
    clearitem: (state) => {
      state.item = [];
      localStorage.setItem("cart", JSON.stringify(state.item))
    }
  }
})

export const { additem, deleteitem, clearitem } = cartSlice.actions
export default cartSlice.reducer
