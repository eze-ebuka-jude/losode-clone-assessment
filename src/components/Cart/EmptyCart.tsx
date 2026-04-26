"use client";

import Link from "next/link";
import { ShoppingCartOutlined } from "@ant-design/icons";

const EmptyCart = () => {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <ShoppingCartOutlined className="text-6xl text-gray-300 mb-6" />
            <h3 className="font-poppins font-semibold text-2xl text-gray-800 mb-3">
                Your Cart is Empty
            </h3>
            <p className="font-poppins text-gray-600 mb-8">
                Add some products to get started
            </p>
            <Link
                href="/products"
                className="bg-[#B88E5F] hover:bg-[#a07d51] text-white font-poppins font-medium px-8 py-3 rounded transition duration-300"
            >
                Continue Shopping
            </Link>
        </div>
    );
};

export default EmptyCart;
