"use client";

import { useSearchParams } from 'next/navigation';
import { CheckCircleOutlined } from "@ant-design/icons";

const Confirmation = () => {
    const params = useSearchParams();

    const reference = params.get('reference');
    const trxref = params.get('trxref');

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="py-12">
                <div className="max-w-7xl mx-auto bg-linear-to-r from-green-50 to-emerald-50 border-b border-green-200 py-8">
                    <div className="max-w-4xl mx-auto px-4">
                        <div className="flex flex-col items-center justify-center space-y-4">
                            {/* Animated success icon */}
                            <div
                                className={`transform transition-all duration-500`}
                            >
                                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
                                    <CheckCircleOutlined className="text-4xl text-green-600" />
                                </div>
                            </div>

                            <div
                                className={`transform transition-all duration-700 delay-100`}
                            >
                                <h1 className="text-3xl font-bold text-gray-900 text-center">
                                    Payment Successful!
                                </h1>
                                <p className="text-gray-600 text-center mt-2">
                                    Your order has been confirmed
                                </p>
                            </div>

                            <div
                                className={`transform transition-all duration-900 delay-200 flex flex-col gap-6`}
                            >
                                <div className="bg-white rounded-lg px-4 py-2 border border-gray-200 shadow-sm">
                                    <p className="text-xs text-gray-500 mb-1">Order Reference</p>
                                    <p className="text-lg font-mono font-semibold text-gray-900">
                                        {reference}
                                    </p>
                                </div>

                                <div className="bg-white rounded-lg px-4 py-2 border border-gray-200 shadow-sm">
                                    <p className="text-xs text-gray-500 mb-1">Transaction Ref</p>
                                    <p className="text-lg font-mono font-semibold text-gray-900">
                                        {trxref}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Confirmation;