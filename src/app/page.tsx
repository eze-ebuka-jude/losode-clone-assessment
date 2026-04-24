import { Suspense } from "react";
import ProductsSection from "../components/Shop/ProductsSection";
import Hero from "../components/Hero";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<p>Loading movies...</p>}>
        <Hero />
        <ProductsSection />
      </Suspense>
    </>
  );
}
