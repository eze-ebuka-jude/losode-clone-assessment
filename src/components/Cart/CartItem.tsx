"use client";

import { CartItem as CartItemType } from "../../types/cartTypes";
import { useDispatch } from "react-redux";
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
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 py-4 sm:py-6 border-b border-gray-200 last:border-b-0">
            {/* Product Image */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 bg-gray-100 rounded">
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
                <h3 className="font-poppins font-medium text-sm sm:text-base text-gray-800 mb-1 sm:mb-2 line-clamp-2">
                    {item.product.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 line-clamp-2">
                    {item.product.description}
                </p>
                <p className="font-poppins font-semibold text-accent text-sm sm:text-base">
                    $ {item.product.price.toFixed(2)}
                </p>
            </div>

            {/* Quantity Controls & Total */}
            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-end gap-2 sm:gap-4">
                <div className="flex items-center border border-gray-300 rounded text-sm">
                    <button
                        onClick={() => handleUpdateQuantity(item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="p-1 sm:p-2 text-gray-600 cursor-pointer disabled:text-gray-300 hover:bg-gray-100 transition"
                        aria-label="Decrease quantity"
                    >
                        <MinusOutlined className="text-xs sm:text-base" />
                    </button>
                    <input
                        type="number"
                        min="1"
                        max={item.product.stock}
                        value={item.quantity}
                        onChange={(e) => handleUpdateQuantity(parseInt(e.target.value, 10))}
                        className="w-10 sm:w-12 text-center border-x border-gray-300 focus:outline-none font-poppins text-sm py-1"
                    />
                    <button
                        onClick={() => handleUpdateQuantity(item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                        className="p-1 sm:p-2 text-gray-600 cursor-pointer disabled:text-gray-300 hover:bg-gray-100 transition"
                        aria-label="Increase quantity"
                    >
                        <PlusOutlined className="text-xs sm:text-base" />
                    </button>
                </div>

                {/* Item Total & Delete */}
                <div className="text-right flex items-center gap-2 sm:gap-4">
                    <p className="font-poppins font-semibold text-gray-800 text-sm sm:text-base">
                        $ {itemTotal.toFixed(2)}
                    </p>
                    <button
                        onClick={handleRemove}
                        className="text-red-500 cursor-pointer hover:text-red-700 transition text-lg"
                        aria-label="Remove item"
                    >
                        <DeleteOutlined />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
