export interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaystackInitializeRequest {
  email: string;
  amount: number;
  reference: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface PaystackInitializeResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface PaystackVerifyResponse {
  status: boolean;
  message: string;
  data: {
    reference: string;
    status: "success" | "failed" | "pending";
    amount: number;
    paid_at: string;
    customer: {
      email: string;
      customer_code: string;
    };
  };
}

export interface Order {
  id: string;
  reference: string;
  items: Array<{
    productId: number;
    title: string;
    price: number;
    quantity: number;
  }>;
  totalAmount: number;
  customerInfo: CheckoutFormData;
  paymentStatus: "pending" | "completed" | "failed";
  createdAt: string;
  paidAt?: string;
}

export interface PaymentInitiateRequest {
  checkoutForm: CheckoutFormData;
  cartItems: Array<{
    productId: number;
    product: { title: string; price: number };
    quantity: number;
  }>;
}

export interface PaymentVerifyRequest {
  reference: string;
}
