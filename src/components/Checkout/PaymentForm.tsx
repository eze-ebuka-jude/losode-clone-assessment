"use client";

import React from "react";
import { Form, Input, Button, message, Spin } from "antd";
import { CheckoutFormData } from "../../types/paystack";

interface PaymentFormProps {
    onSubmit: (formData: CheckoutFormData) => void;
    isLoading: boolean;
    error?: string | null;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
    onSubmit,
    isLoading,
    error,
}) => {
    const [form] = Form.useForm();

    const handleSubmit = (values: CheckoutFormData) => {
        onSubmit(values);
    };

    React.useEffect(() => {
        if (error) {
            message.error(error);
        }
    }, [error]);

    return (
        <div className="w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
                Shipping Information
            </h2>

            <Spin spinning={isLoading}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    className="space-y-4"
                    disabled={isLoading}
                >
                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item
                            name="firstName"
                            label="First Name"
                            rules={[
                                { required: true, message: "First name is required" },
                                { min: 2, message: "Must be at least 2 characters" },
                            ]}
                        >
                            <Input placeholder="John" />
                        </Form.Item>

                        <Form.Item
                            name="lastName"
                            label="Last Name"
                            rules={[
                                { required: true, message: "Last name is required" },
                                { min: 2, message: "Must be at least 2 characters" },
                            ]}
                        >
                            <Input placeholder="Doe" />
                        </Form.Item>
                    </div>

                    <Form.Item
                        name="email"
                        label="Email Address"
                        rules={[
                            { required: true, message: "Email is required" },
                            { type: "email", message: "Invalid email format" },
                        ]}
                    >
                        <Input placeholder="john@example.com" />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[
                            { required: true, message: "Phone number is required" },
                            {
                                pattern: /^[\d\s\-\+\(\)]{10,}$/,
                                message: "Invalid phone number",
                            },
                        ]}
                    >
                        <Input placeholder="+234 XXX XXX XXXX" />
                    </Form.Item>

                    <Form.Item
                        name="address"
                        label="Street Address"
                        rules={[
                            { required: true, message: "Address is required" },
                            { min: 5, message: "Address must be at least 5 characters" },
                        ]}
                    >
                        <Input placeholder="123 Main Street" />
                    </Form.Item>

                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item
                            name="city"
                            label="City"
                            rules={[{ required: true, message: "City is required" }]}
                        >
                            <Input placeholder="Lagos" />
                        </Form.Item>

                        <Form.Item
                            name="state"
                            label="State/Province"
                            rules={[{ required: true, message: "State is required" }]}
                        >
                            <Input placeholder="Lagos" />
                        </Form.Item>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item
                            name="zipCode"
                            label="Postal Code"
                            rules={[{ required: true, message: "Postal code is required" }]}
                        >
                            <Input placeholder="100001" />
                        </Form.Item>

                        <Form.Item
                            name="country"
                            label="Country"
                            rules={[{ required: true, message: "Country is required" }]}
                        >
                            <Input placeholder="Nigeria" />
                        </Form.Item>
                    </div>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full h-10 text-base font-semibold"
                            loading={isLoading}
                            disabled={isLoading}
                        >
                            {isLoading ? "Processing..." : "Continue to Payment"}
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>

            {error && (
                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}
        </div>
    );
};

export default PaymentForm;
