import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      state.push(action.payload);
    },
    remove(state, action) {
      return state.filter((item) => item.itemData.id !== action.payload);
    },
    updateCart: (state, action) => {
      return action.payload; // Update cart with new array of items
    },
  },
});

export const { add, remove, updateCart } = cartSlice.actions;
export default cartSlice.reducer;
