"use client";

import React from "react";
import { Result, Button, Divider, Space } from "antd";
import { CheckCircleOutlined, CopyOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Order } from "../../types/paystack";

interface OrderConfirmationProps {
    order: Order;
    onBackHome?: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
    order,
    onBackHome,
}) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopyReference = () => {
        navigator.clipboard.writeText(order.reference);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <Result
                status="success"
                title="Payment Successful!"
                subTitle="Your order has been placed successfully. Thank you for your purchase."
                extra={
                    <Space>
                        <Link href="/">
                            <Button type="primary" size="large">
                                Continue Shopping
                            </Button>
                        </Link>
                    </Space>
                }
            />

            <div className="bg-white rounded-lg shadow-md p-6 mt-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    Order Details
                </h2>

                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <p className="text-sm text-gray-600 mb-2">Order Reference</p>
                        <div className="flex items-center gap-2">
                            <p className="text-lg font-mono font-semibold text-gray-800">
                                {order.reference}
                            </p>
                            <button
                                onClick={handleCopyReference}
                                className="p-1 hover:bg-gray-100 rounded transition"
                                title="Copy reference"
                            >
                                <CopyOutlined />
                            </button>
                        </div>
                        {copied && (
                            <p className="text-sm text-green-600 mt-1">Copied!</p>
                        )}
                    </div>

                    <div>
                        <p className="text-sm text-gray-600 mb-2">Order Date</p>
                        <p className="text-lg font-semibold text-gray-800">
                            {new Date(order.createdAt).toLocaleDateString("en-NG", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    </div>
                </div>

                <Divider />

                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">
                        Order Items
                    </h3>
                    <div className="space-y-3">
                        {order.items.map((item) => (
                            <div
                                key={item.productId}
                                className="flex justify-between items-center p-3 bg-gray-50 rounded"
                            >
                                <div>
                                    <p className="font-medium text-gray-800">{item.title}</p>
                                    <p className="text-sm text-gray-600">
                                        Qty: {item.quantity} × ₦{item.price.toLocaleString("en-NG")}
                                    </p>
                                </div>
                                <p className="font-semibold text-gray-800">
                                    ₦{(item.price * item.quantity).toLocaleString("en-NG")}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <Divider />

                <div className="flex justify-between items-center mb-6">
                    <p className="text-lg font-semibold text-gray-800">Total Amount</p>
                    <p className="text-2xl font-bold text-green-600">
                        ₦{order.totalAmount.toLocaleString("en-NG")}
                    </p>
                </div>

                <Divider />

                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">
                        Shipping Information
                    </h3>
                    <div className="space-y-2 text-gray-700">
                        <p>
                            <span className="font-medium">Name:</span>{" "}
                            {order.customerInfo.firstName} {order.customerInfo.lastName}
                        </p>
                        <p>
                            <span className="font-medium">Email:</span>{" "}
                            {order.customerInfo.email}
                        </p>
                        <p>
                            <span className="font-medium">Phone:</span>{" "}
                            {order.customerInfo.phone}
                        </p>
                        <p>
                            <span className="font-medium">Address:</span>{" "}
                            {order.customerInfo.address}
                        </p>
                        <p>
                            <span className="font-medium">City:</span>{" "}
                            {order.customerInfo.city}, {order.customerInfo.state}
                        </p>
                        <p>
                            <span className="font-medium">Postal Code:</span>{" "}
                            {order.customerInfo.zipCode}
                        </p>
                        <p>
                            <span className="font-medium">Country:</span>{" "}
                            {order.customerInfo.country}
                        </p>
                    </div>
                </div>

                <Divider />

                <div className="flex items-start gap-2 p-4 bg-blue-50 border border-blue-200 rounded">
                    <CheckCircleOutlined className="text-blue-600 mt-1" />
                    <div>
                        <p className="font-semibold text-blue-900 mb-1">
                            Payment Confirmed
                        </p>
                        <p className="text-sm text-blue-800">
                            A confirmation email has been sent to {order.customerInfo.email}.
                            You can use your order reference to track your order.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center">
                <Link href="/">
                    <Button type="default" size="large">
                        Back to Home
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default OrderConfirmation;
