import { NextRequest, NextResponse } from "next/server";
import {
  initializePayment,
  generatePaymentReference,
  calculateTotalAmount,
} from "../../../../lib/paystack";
import { PaymentInitiateRequest } from "../../../../types/paystack";

export async function POST(request: NextRequest) {
  try {
    const body: PaymentInitiateRequest = await request.json();

    // Validate input
    if (!body.checkoutForm || !body.cartItems || body.cartItems.length === 0) {
      return NextResponse.json(
        { error: "Invalid checkout data" },
        { status: 400 }
      );
    }

    const { checkoutForm, cartItems } = body;
    const reference = generatePaymentReference();

    // Calculate total amount
    const totalAmount = calculateTotalAmount(
      cartItems.map((item) => ({
        price: item.product.price,
        quantity: item.quantity,
      }))
    );

    if (totalAmount <= 0) {
      return NextResponse.json(
        { error: "Invalid cart total" },
        { status: 400 }
      );
    }

    // Prepare metadata for Paystack
    const metadata = {
      customer_email: checkoutForm.email,
      customer_name: `${checkoutForm.firstName} ${checkoutForm.lastName}`,
      customer_phone: checkoutForm.phone,
      address: checkoutForm.address,
      city: checkoutForm.city,
      state: checkoutForm.state,
      zip_code: checkoutForm.zipCode,
      country: checkoutForm.country,
      items_count: cartItems.length,
      items: cartItems.map((item) => ({
        id: item.productId,
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
      })),
    };

    // Initialize payment with Paystack
    const response = await initializePayment(
      checkoutForm.email,
      totalAmount,
      reference,
      metadata
    );

    if (!response.status) {
      return NextResponse.json(
        { error: response.message || "Failed to initialize payment" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        reference,
        authorization_url: response.data.authorization_url,
        access_code: response.data.access_code,
        totalAmount,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Payment initiation error:", error);
    return NextResponse.json(
      {
        error: (error as Error).message || "Failed to process payment",
        details: (error as { response?: { data?: unknown } }).response?.data || null,
      },
      { status: 500 }
    );
  }
}
