import Hero from "../../components/Hero";
import Checkout from "../../components/Checkout/Checkout";

export const metadata = {
    title: "Checkout - Losode",
    description: "Complete your purchase at Losode",
};

const CheckoutPage = () => {
    return (
        <>
            <Hero />
            <Checkout />;
        </>
    )
}

export default CheckoutPage