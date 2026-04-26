"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../lib/store/store";
import {
    setCheckoutForm,
    setProcessing,
    setError,
    setPaymentReference,
    setOrder,
    clearCheckout,
    resetError,
} from "../../lib/store/slices/checkoutSlice";
import PaymentForm from "./PaymentForm";
import OrderSummary from "./OrderSummary";
import PaymentError from "./PaymentError";
import { CheckoutFormData } from "../../types/paystack";
import { Spin } from "antd";

type CheckoutStep = "form" | "payment" | "error";

const Checkout: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch<AppDispatch>();

    const { items: cartItems } = useSelector(
        (state: RootState) => state.cart
    );
    const { form, isProcessing, error } = useSelector(
        (state: RootState) => state.checkout
    );

    const [step, setStep] = useState<CheckoutStep>("form");
    const [isVerifying, setIsVerifying] = useState(false);

    // Redirect to cart if no items
    useEffect(() => {
        if (cartItems.length === 0 && step === "form") {
            router.push("/cart");
        }
    }, [cartItems, step, router]);

    const handleFormSubmit = async (formData: CheckoutFormData) => {
        try {
            dispatch(setCheckoutForm(formData));
            dispatch(setProcessing(true));
            dispatch(resetError());

            // Call payment initiation API
            const response = await fetch("/api/payment/initiate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    checkoutForm: formData,
                    cartItems,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.error || "Failed to initialize payment"
                );
            }

            dispatch(setPaymentReference(data.reference));
            dispatch(setProcessing(false));

            // Redirect to Paystack payment page
            if (data.authorization_url) {
                window.location.href = data.authorization_url;
            }
        } catch (err: unknown) {
            const errorMessage = (err as { message: string }).message || "Failed to process checkout";
            dispatch(setError(errorMessage));
            setStep("error");
        }
    };

    const verifyPayment = useCallback(async (reference: string) => {
        try {
            setIsVerifying(true);
            dispatch(setProcessing(true));

            const response = await fetch("/api/payment/verify", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ reference }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Payment verification failed");
            }

            if (!data.success) {
                dispatch(setError(data.message || "Payment was not successful"));
                setStep("error");
                return;
            }

            // Create order object
            const orderData = {
                id: reference,
                reference: data.reference,
                items: cartItems.map((item) => ({
                    productId: item.productId,
                    title: item.product.title,
                    price: item.product.price,
                    quantity: item.quantity,
                })),
                totalAmount: data.amount,
                customerInfo: form || ({} as CheckoutFormData),
                paymentStatus: "completed" as const,
                createdAt: new Date().toISOString(),
                paidAt: new Date().toISOString(),
            };

            dispatch(setOrder(orderData));

            // Redirect to confirmation page after order is set
            router.push("/confirmation");
        } catch (err: unknown) {
            const errorMessage = (err as { message: string }).message || "Failed to verify payment";
            dispatch(setError(errorMessage));
            setStep("error");
        } finally {
            setIsVerifying(false);
            dispatch(setProcessing(false));
        }
    }, [cartItems, form, dispatch, router]);

    // Verify payment when redirected from Paystack with reference
    useCallback(() => {
        const reference = searchParams.get("reference");
        if (reference && step === "form") {
            verifyPayment(reference);
        }
    }, [searchParams, step, verifyPayment]);

    const handleRetryPayment = () => {
        dispatch(resetError());
        setStep("form");
    };

    const handleCancelCheckout = () => {
        dispatch(clearCheckout());
        dispatch(resetError());
        router.push("/cart");
    };

    if (isVerifying) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spin size="large" tip="Verifying payment..." />
            </div>
        );
    }

    if (cartItems.length === 0 && step === "form") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 sm:py-12 mt-4 sm:mt-6">
            <div className="max-w-7xl mx-auto px-3 sm:px-4">
                {step === "form" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                        <PaymentForm
                            onSubmit={handleFormSubmit}
                            isLoading={isProcessing}
                            error={error}
                        />
                        <OrderSummary
                            items={cartItems}
                            onPayNow={() => {
                                // Form submission is handled by the form component
                            }}
                            isLoading={isProcessing}
                        />
                    </div>
                )}

                {step === "error" && (
                    <div className="flex justify-center">
                        <PaymentError
                            error={error || "An error occurred"}
                            onRetry={handleRetryPayment}
                            onCancel={handleCancelCheckout}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Checkout;