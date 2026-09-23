// Redux slice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  status: "idle", // "idle" | "loading" | "success" | "failed"
  error: null
}

export const fetchProducts = createAsyncThunk("Products", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.products;
  } catch (error) {
    return rejectWithValue(error.message || "Failed to fetch products");
  }
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message || "Connection was reset or failed";
      });
  }
});

export default productSlice.reducer;