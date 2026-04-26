import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CheckoutFormData, Order } from "../../types/paystack";

export interface CheckoutState {
  form: CheckoutFormData | null;
  isProcessing: boolean;
  error: string | null;
  order: Order | null;
  paymentReference: string | null;
}

const initialState: CheckoutState = {
  form: null,
  isProcessing: false,
  error: null,
  order: null,
  paymentReference: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCheckoutForm: (state, action: PayloadAction<CheckoutFormData>) => {
      state.form = action.payload;
      state.error = null;
    },

    setProcessing: (state, action: PayloadAction<boolean>) => {
      state.isProcessing = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isProcessing = false;
    },

    setPaymentReference: (state, action: PayloadAction<string>) => {
      state.paymentReference = action.payload;
    },

    setOrder: (state, action: PayloadAction<Order>) => {
      state.order = action.payload;
      state.isProcessing = false;
      state.error = null;
    },

    clearCheckout: (state) => {
      state.form = null;
      state.error = null;
      state.paymentReference = null;
      state.order = null;
      state.isProcessing = false;
    },

    resetError: (state) => {
      state.error = null;
    },

    clearOrder: (state) => {
      state.order = null;
      state.paymentReference = null;
    },
  },
});

export const {
  setCheckoutForm,
  setProcessing,
  setError,
  setPaymentReference,
  setOrder,
  clearCheckout,
  resetError,
  clearOrder,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
