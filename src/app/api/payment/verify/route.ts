import { NextRequest, NextResponse } from "next/server";
import { verifyPayment } from "../../../../lib/paystack";
import { PaymentVerifyRequest, Order } from "../../../../types/paystack";

type CustomerInfo = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};

export async function POST(request: NextRequest) {
  try {
    const body: PaymentVerifyRequest = await request.json();

    if (!body.reference) {
      return NextResponse.json(
        { error: "Payment reference is required" },
        { status: 400 }
      );
    }

    // Verify payment with Paystack
    const response = await verifyPayment(body.reference);

    if (!response.status) {
      return NextResponse.json(
        { error: "Payment verification failed" },
        { status: 400 }
      );
    }

    const paymentData = response.data;

    // Check if payment was successful
    if (paymentData.status !== "success") {
      return NextResponse.json(
        {
          success: false,
          status: paymentData.status,
          message: `Payment ${paymentData.status}`,
        },
        { status: 200 }
      );
    }

    // TODO: Save order to database here
    // For now, we'll just return the verified payment data
    const order: Order = {
      id: body.reference,
      reference: paymentData.reference,
      items: [], // This would come from your cart/database
      totalAmount: paymentData.amount / 100, // Convert from kobo to currency
      customerInfo: {} as CustomerInfo, // This would be stored in session/request
      paymentStatus: "completed",
      createdAt: new Date().toISOString(),
      paidAt: paymentData.paid_at,
    };

    return NextResponse.json(
      {
        success: true,
        status: paymentData.status,
        reference: paymentData.reference,
        amount: paymentData.amount / 100,
        order,
        message: "Payment verified successfully",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message || "Failed to verify payment",
        details: (error as { response?: { data?: unknown } }).response?.data || null,
      },
      { status: 500 }
    );
  }
}
