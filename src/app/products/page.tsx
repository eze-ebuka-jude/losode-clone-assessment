import ProductsSection from "../../components/Shop/ProductsSection"
import Hero from "../../components/Hero"

export const metadata = {
    title: "Products - Losode",
    description: "Browse our selection of products at Losode",
};

const ShopPage = () => {
    return (
        <>
            <Hero />
            <ProductsSection />
        </>
    )
}

export default ShopPage