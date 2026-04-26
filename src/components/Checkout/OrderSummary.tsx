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
        <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Order Summary</h2>

            <div className="space-y-4 mb-4">
                {items.map((item) => (
                    <div key={item.productId} className="flex justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-700">
                                {item.product.title}
                            </p>
                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-semibold text-gray-800">
                            ₦{(item.product.price * item.quantity).toLocaleString("en-NG")}
                        </p>
                    </div>
                ))}
            </div>

            <Divider className="my-4" />

            <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium">₦{subtotal.toLocaleString("en-NG")}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (5%):</span>
                    <span className="font-medium">₦{tax.toLocaleString("en-NG")}</span>
                </div>
            </div>

            <Divider className="my-4" />

            <div className="flex justify-between mb-6">
                <span className="text-lg font-bold text-gray-800">Total:</span>
                <span className="text-lg font-bold text-green-600">
                    ₦{total.toLocaleString("en-NG")}
                </span>
            </div>

            <Button
                type="primary"
                size="large"
                className="w-full h-12 text-base font-semibold"
                onClick={onPayNow}
                loading={isLoading}
                disabled={isLoading || items.length === 0}
            >
                {isLoading ? "Processing Payment..." : "Pay Now"}
            </Button>

            <p className="text-xs text-gray-500 text-center mt-4">
                Your payment is secured by Paystack
            </p>
        </div>
    );
};

export default OrderSummary;
