import axios from "axios";
import {
  PaystackInitializeResponse,
  PaystackVerifyResponse,
} from "../types/paystack";
import crypto from "crypto";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

if (!PAYSTACK_SECRET_KEY) {
  throw new Error("PAYSTACK_SECRET_KEY is not defined");
}

export const paystackAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PAYSTACK_API_BASE,
  headers: {
    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
  },
});

export interface PaystackWebhookBody {
  event: string;
  data: Record<string, unknown>;
}

/**
 * Initialize payment transaction with Paystack
 */
export const initializePayment = async (
  email: string,
  amount: number,
  reference: string,
  metadata: Record<string, unknown>
): Promise<PaystackInitializeResponse> => {
  const response = await paystackAPI.post("/transaction/initialize", {
    email,
    amount: Math.round(amount * 100), // Convert to kobo
    reference,
    metadata,
    callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/confirmation`
  });

  return response.data;
};

/**
 * Verify payment transaction with Paystack
 */
export const verifyPayment = async (
  reference: string
): Promise<PaystackVerifyResponse> => {
  const response = await paystackAPI.get(`/transaction/verify/${reference}`);

  return response.data;
};

/**
 * Generate a unique reference for the transaction
 */
export const generatePaymentReference = (): string => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 9);
  return `ORD-${timestamp}-${random}`.toUpperCase();
};

/**
 * Calculate total amount from cart items
 */
export const calculateTotalAmount = (
  items: Array<{ price: number; quantity: number }>
): number => {
  return items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
};

/**
 * Validate webhook signature from Paystack
 */
export const validatePaystackWebhook = (
  body: PaystackWebhookBody,
  signature: string
): boolean => {
  const hash = crypto
    .createHmac("sha512", PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(body))
    .digest("hex");

  return hash === signature;
};
