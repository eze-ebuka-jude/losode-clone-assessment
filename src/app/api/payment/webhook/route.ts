import { NextRequest, NextResponse } from "next/server";
import { validatePaystackWebhook } from "../../../../lib/paystack";

/**
 * Webhook endpoint for Paystack payment events
 * Add this URL to your Paystack dashboard: https://yourdomain.com/api/payment/webhook
 */
export async function POST(request: NextRequest) {
  try {
    // Get signature from header
    const signature = request.headers.get("x-paystack-signature");

    if (!signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const body = await request.json();

    // Validate webhook signature
    const isValid = validatePaystackWebhook(body, signature);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 401 }
      );
    }

    const event = body.event;
    const paymentData = body.data;

    // Handle different Paystack events
    switch (event) {
      case "charge.success":
        // Payment was successful
        console.log("Payment successful:", paymentData.reference);
        // TODO: Update order status in database
        break;

      case "charge.failed":
        // Payment failed
        console.log("Payment failed:", paymentData.reference);
        // TODO: Update order status in database
        break;

      case "transfer.success":
        // Transfer to recipient successful
        console.log("Transfer successful:", paymentData.reference);
        break;

      case "transfer.failed":
        // Transfer failed
        console.log("Transfer failed:", paymentData.reference);
        break;

      default:
        console.log("Unhandled event:", event);
    }

    return NextResponse.json({ status: "success" }, { status: 200 });
  } catch (error: unknown) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      {
        error: (error as Error).message || "Webhook processing failed",
      },
      { status: 500 }
    );
  }
}
