// app/product/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../../../lib/api";
import ProductDetailSkeleton from "../../../components/skeletons/ProductDetailSkeleton";
import Image from "next/image";

export default function ProductDetail() {
    const params = useParams();
    const id = params.id as string;

    const { data, isLoading, isError } = useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductById(id),
    });

    if (isLoading) return <ProductDetailSkeleton />;
    if (isError) return <p className="p-6">Failed to load product</p>;

    return (
        <div className="p-6 max-w-4xl mx-auto mt-36 mb-12">
            <Image
                src={data.images[0]}
                width={100}
                height={200}
                alt={data.title}
                className="w-full h-80 object-cover"
            />

            <h1 className="text-2xl font-bold mt-4">{data.title}</h1>
            <p className="text-gray-600 mt-2">{data.description}</p>
            <p className="text-xl text-green-600 mt-4">${data.price}</p>

            <button className="mt-6 px-6 py-2 bg-black text-white rounded">
                Add to Cart
            </button>
        </div>
    );
}