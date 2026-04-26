import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState, CartItem } from "../../../types/cartTypes";
import { ProductDataType } from "../../../types/productDataType";

const initialState: CartState = {
  items: [],
  status: "idle",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{ product: ProductDataType; quantity: number }>
    ) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === product.id
      );

      if (existingItem) {
        // Update quantity if item already exists
        existingItem.quantity += quantity;
      } else {
        // Add new item
        state.items.push({
          productId: product.id,
          quantity,
          product,
        });
      }
    },

    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.productId === productId);

      if (item) {
        if (quantity <= 0) {
          state.items = state.items.filter(
            (item) => item.productId !== productId
          );
        } else {
          item.quantity = quantity;
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
    },

    setStatus: (state, action: PayloadAction<"idle" | "loading">) => {
      state.status = action.payload;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart, setStatus } =
  cartSlice.actions;
export default cartSlice.reducer;
