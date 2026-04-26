"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import {
    selectSubtotal,
    selectTax,
    selectTotal,
} from "../../lib/store/selectors/cartSelectors";
import { RootState } from "../../lib/store/store";

const CartSummary = () => {
    const subtotal = useSelector((state: RootState) => selectSubtotal(state));
    const tax = useSelector((state: RootState) => selectTax(state));
    const total = useSelector((state: RootState) => selectTotal(state));

    return (
        <div className="bg-[#F9F1E7] rounded-lg p-6 h-fit">
            <h3 className="font-poppins font-semibold text-xl mb-6">Order Summary</h3>

            <div className="space-y-4 mb-6 pb-6 border-b border-gray-300">
                <div className="flex justify-between font-poppins text-gray-700">
                    <span>Subtotal:</span>
                    <span>$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-poppins text-gray-700">
                    <span>Tax (10%):</span>
                    <span>$ {tax.toFixed(2)}</span>
                </div>
            </div>

            <div className="flex justify-between mb-8">
                <span className="font-poppins font-semibold text-lg">Total:</span>
                <span className="font-poppins font-bold text-xl text-[#B88E5F]">
                    $ {total.toFixed(2)}
                </span>
            </div>

            <Link
                href="/checkout"
                className="w-full bg-[#B88E5F] hover:bg-[#a07d51] text-white font-poppins font-medium py-3 rounded transition duration-300 text-center block mb-4"
            >
                Proceed to Checkout
            </Link>

            <Link
                href="/products"
                className="w-full border-2 border-[#B88E5F] text-[#B88E5F] hover:bg-[#B88E5F] hover:text-white font-poppins font-medium py-3 rounded transition duration-300 text-center block"
            >
                Continue Shopping
            </Link>
        </div>
    );
};

export default CartSummary;
