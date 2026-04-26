"use client";

import { useSelector } from "react-redux";
import { selectCartItems, selectIsCartEmpty } from "../../lib/store/selectors/cartSelectors";
import { RootState } from "../../lib/store/store";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import EmptyCart from "./EmptyCart";
import { CartItem as CartItemType } from "@/src/types/cartTypes";

const Cart = () => {
    const items = useSelector((state: RootState) => selectCartItems(state));
    const isEmpty = useSelector((state: RootState) => selectIsCartEmpty(state));

    if (isEmpty) {
        return <EmptyCart />;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="font-poppins font-bold text-3xl mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg p-6">
                        <div className="space-y-6">
                            {items.map((item: CartItemType) => (
                                <CartItem key={item.productId} item={item} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Cart Summary */}
                <div className="lg:col-span-1">
                    <CartSummary />
                </div>
            </div>
        </div>
    );
};

export default Cart;