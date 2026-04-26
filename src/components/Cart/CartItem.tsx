"use client";

import { CartItem as CartItemType } from "../../types/cartTypes";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, updateQuantity } from "../../lib/store/slices/cartSlice";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import Image from "next/image";
import { AppDispatch } from "../../lib/store/store";

interface CartItemProps {
    item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleRemove = () => {
        dispatch(removeItem(item.productId));
    };

    const handleUpdateQuantity = (newQuantity: number) => {
        if (newQuantity > 0 && newQuantity <= item.product.stock) {
            dispatch(updateQuantity({ productId: item.productId, quantity: newQuantity }));
        }
    };

    const itemTotal = item.product.price * item.quantity;

    return (
        <div className="flex gap-6 py-6 border-b border-gray-200">
            {/* Product Image */}
            <div className="w-24 h-24 shrink-0 bg-gray-100 rounded">
                <Image
                    src={item.product.thumbnail || item.product.images?.[0] || ""}
                    alt={item.product.title}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover rounded"
                />
            </div>

            {/* Product Details */}
            <div className="grow">
                <h3 className="font-poppins font-medium text-gray-800 mb-2">
                    {item.product.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {item.product.description}
                </p>
                <p className="font-poppins font-semibold text-[#B88E5F]">
                    Rs. {item.product.price.toFixed(2)}
                </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex flex-col items-end gap-4">
                <div className="flex items-center border border-gray-300 rounded">
                    <button
                        onClick={() => handleUpdateQuantity(item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="p-2 text-gray-600 disabled:text-gray-300"
                        aria-label="Decrease quantity"
                    >
                        <MinusOutlined />
                    </button>
                    <input
                        type="number"
                        min="1"
                        max={item.product.stock}
                        value={item.quantity}
                        onChange={(e) => handleUpdateQuantity(parseInt(e.target.value, 10))}
                        className="w-12 text-center border-x border-gray-300 focus:outline-none font-poppins"
                    />
                    <button
                        onClick={() => handleUpdateQuantity(item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                        className="p-2 text-gray-600 disabled:text-gray-300"
                        aria-label="Increase quantity"
                    >
                        <PlusOutlined />
                    </button>
                </div>

                {/* Item Total & Delete */}
                <div className="text-right">
                    <p className="font-poppins font-semibold text-gray-800 mb-2">
                        Rs. {itemTotal.toFixed(2)}
                    </p>
                    <button
                        onClick={handleRemove}
                        className="text-red-500 hover:text-red-700 transition"
                        aria-label="Remove item"
                    >
                        <DeleteOutlined className="text-lg" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
