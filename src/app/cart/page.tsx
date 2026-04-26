import Cart from "../../components/Cart/Cart"
import Hero from "../../components/Hero"

export const metadata = {
    title: "Cart - Losode",
    description: "View and manage your items in the cart",
};

const CartPage = () => {
    return (
        <>
            <Hero />
            <Cart />
        </>
    )
}

export default CartPage