"use client";

import React from "react";
import { Button, Divider, Empty } from "antd";
import { CartItem } from "../../types/cartTypes";

interface OrderSummaryProps {
    items: CartItem[];
    onPayNow: () => void;
    isLoading: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
    items,
    onPayNow,
    isLoading,
}) => {
    const subtotal = items.reduce((sum, item) => {
        return sum + item.product.price * item.quantity;
    }, 0);

    // Assuming 5% tax rate
    const taxRate = 0.05;
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    if (items.length === 0) {
        return (
            <div className="w-full max-w-md mx-auto">
                <Empty description="No items in cart" />
            </div>
        );
    }

    return (
        <div className="w-full bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">Order Summary</h2>

            <div className="space-y-3 sm:space-y-4 mb-4">
                {items.map((item) => (
                    <div key={item.productId} className="flex justify-between items-start gap-2 sm:gap-4">
                        <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm font-medium text-gray-700 line-clamp-2">
                                {item.product.title}
                            </p>
                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-gray-800 shrink-0">
                            ₦{(item.product.price * item.quantity).toLocaleString("en-NG")}
                        </p>
                    </div>
                ))}
            </div>

            <Divider className="my-3 sm:my-4" />

            <div className="space-y-2 mb-4">
                <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">₦{subtotal.toLocaleString("en-NG")}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">Tax (5%):</span>
                    <span className="font-medium">₦{tax.toLocaleString("en-NG")}</span>
                </div>
            </div>

            <Divider className="my-3 sm:my-4" />

            <div className="flex justify-between mb-4 sm:mb-6">
                <span className="font-bold text-gray-800 text-base sm:text-lg">Total:</span>
                <span className="font-bold text-green-600 text-base sm:text-lg">
                    ₦{total.toLocaleString("en-NG")}
                </span>
            </div>

            <Button
                type="primary"
                size="large"
                className="w-full h-10 sm:h-12 text-sm sm:text-base font-semibold"
                onClick={onPayNow}
                loading={isLoading}
                disabled={isLoading || items.length === 0}
            >
                {isLoading ? "Processing Payment..." : "Pay Now"}
            </Button>

            <p className="text-xs text-gray-500 text-center mt-3 sm:mt-4">
                Your payment is secured by Paystack
            </p>
        </div>
    );
};

export default OrderSummary;
