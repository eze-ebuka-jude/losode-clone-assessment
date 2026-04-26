"use client";

import React from "react";
import { Result, Button, Space } from "antd";

interface PaymentErrorProps {
    error: string;
    onRetry: () => void;
    onCancel: () => void;
}

const PaymentError: React.FC<PaymentErrorProps> = ({
    error,
    onRetry,
    onCancel,
}) => {
    return (
        <div className="w-full max-w-md mx-auto">
            <Result
                status="error"
                title="Payment Failed"
                subTitle={error || "An error occurred during payment. Please try again."}
                extra={
                    <Space>
                        <Button type="default" size="large" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button type="primary" size="large" onClick={onRetry}>
                            Retry Payment
                        </Button>
                    </Space>
                }
            />

            <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-sm text-yellow-800">
                    <span className="font-semibold">Note:</span> If the amount was deducted
                    from your account but you didn&apos;t receive a confirmation, please contact
                    our support team with your transaction reference.
                </p>
            </div>
        </div>
    );
};

export default PaymentError;
