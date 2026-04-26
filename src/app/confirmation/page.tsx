import Hero from "../../components/Hero";
import Confirmation from "../../components/Checkout/Confirmation";

export const metadata = {
    title: "Order Confirmation - Losode",
    description: "Your order has been confirmed",
};

export default function ConfirmationPage() {

    return (

        <>
            <Hero />
            <Confirmation />
        </>
    );
}
