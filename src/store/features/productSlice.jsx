import {
  createSlice,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  status: "idle",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.status = "Loading";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "idle";
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = "error";
      });
  },
});

export const {} = productSlice.actions;
export default productSlice.reducer;

export const getProducts = createAsyncThunk("products/get", async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  const result = await response.data;
  return result;
  //     try {
  //     const response = await axios.get("https://fakestoreapi.com/products");
  //     if (response.status == 200) {
  //       const result = await response.data;
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
});

// export function getProducts(){
//     return async function getProductsThunk(dispatch, getState){

//         dispatch(fetchProducts(result))
//     }
// }
