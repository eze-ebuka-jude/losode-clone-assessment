import { createSelector } from "@reduxjs/toolkit";
import { CartState } from "../../types/cartTypes";

const selectCartState = (state: { cart: CartState }) => state.cart;

export const selectCartItems = createSelector(
  [selectCartState],
  (cart) => cart.items
);

export const selectCartCount = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity, 0)
);

export const selectSubtotal = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0)
);

export const selectTax = createSelector([selectSubtotal], (subtotal) => {
  const taxRate = 0.1; // 10% tax
  return Math.round(subtotal * taxRate * 100) / 100;
});

export const selectTotal = createSelector(
  [selectSubtotal, selectTax],
  (subtotal, tax) => {
    return Math.round((subtotal + tax) * 100) / 100;
  }
);

export const selectIsCartEmpty = createSelector(
  [selectCartItems],
  (items) => items.length === 0
);

export const selectCartItemById = (productId: number) =>
  createSelector([selectCartItems], (items) =>
    items.find((item) => item.productId === productId)
  );

export const selectCartStatus = createSelector(
  [selectCartState],
  (cart) => cart.status
);
