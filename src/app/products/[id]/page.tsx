// app/products/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../../lib/store/store';
import { getProductById, getSimilarProducts } from "../../../lib/api";
import ProductDetailSkeleton from "../../../components/skeletons/ProductDetailSkeleton";
import { addItem } from "../../../lib/store/slices/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { StarOutlined, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import type { ProductDataType } from "../../../types/productDataType";
import { useNotification } from "../../../hooks/Notification";

export default function ProductDetail() {
    const params = useParams();
    const dispatch = useDispatch();
    const id = params.id as string;

    const [quantity, setQuantity] = useState(1);
    const [mainImageIndex, setMainImageIndex] = useState(0);
    const [isAdding, setIsAdding] = useState(false);
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const prevLengthRef = useRef(true);

    const { api, contextHolder } = useNotification()

    const { data: product, isLoading, isError } = useQuery<ProductDataType>({
        queryKey: ["product", id],
        queryFn: () => getProductById(id),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
    });

    const { data: similarProductsData } = useQuery({
        queryKey: ["similar-products", product?.category, id],
        queryFn: () =>
            getSimilarProducts(product!.category, product!.id, 4),
        enabled: !!product?.category,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
    });

    const similarProducts = similarProductsData?.products || [];

    const handleAddToCart = async () => {
        if (!product) return;
        setIsAdding(true);
        try {
            dispatch(
                addItem({
                    product,
                    quantity,
                })
            );
            setQuantity(1);
        } finally {
            setIsAdding(false);
        }
    };

    useEffect(() => {
        if (prevLengthRef.current) {
            prevLengthRef.current = false;
            return;
        }

        if (cartItems.length > 0 || (cartItems.length === 0 && prevLengthRef.current === false)) {
            api.success({
                title: 'Added to Cart',
                description: `Your item has been added to your cart 🛒`,
                placement: 'topRight',
            });
        }
    }, [cartItems, api])

    if (isLoading) return <ProductDetailSkeleton />;

    if (isError || !product) {
        return (
            <div className="p-6 max-w-6xl mx-auto mt-36 mb-12 text-center">
                <div className="bg-red-50 border border-red-200 rounded-lg p-8">
                    <CloseCircleOutlined className="text-4xl text-red-600 mb-4" />
                    <h1 className="text-3xl font-bold text-red-600 mb-2">
                        Product Not Found
                    </h1>
                    <p className="text-gray-600 mb-6">
                        The product you&apos;re looking for doesn&apos;t exist or has been removed.
                    </p>
                    <Link
                        href="/products"
                        className="inline-block px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition"
                    >
                        Back to Products
                    </Link>
                </div>
            </div>
        );
    }

    const isOutOfStock = product.stock === 0;
    const hasDiscount = product.discountPercentage > 0;
    const discountedPrice = product.price * (1 - product.discountPercentage / 100);
    const images = product.images || [product.thumbnail];

    return (
        <>
            {contextHolder}
            <div className="min-h-screen bg-white mt-20 sm:mt-24 md:mt-28 mb-8 sm:mb-12">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 lg:py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 items-start justify-center gap-6 sm:gap-8 lg:gap-12">
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 order-2 md:order-1">
                            {images.length > 1 && (
                                <div className="flex sm:flex-col gap-2 sm:gap-3 overflow-x-auto sm:overflow-y-auto order-2 sm:order-1">
                                    {images.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setMainImageIndex(index)}
                                            className={`shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded cursor-pointer border-2 overflow-hidden transition ${mainImageIndex === index
                                                ? "border-black"
                                                : "border-gray-200 hover:border-gray-400"
                                                }`}
                                        >
                                            <Image
                                                src={img}
                                                alt={`${product.title} thumbnail ${index + 1}`}
                                                width={80}
                                                height={80}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}

                            <div className="rounded-lg overflow-hidden order-1 sm:order-2 flex-1">
                                <Image
                                    src={images[mainImageIndex]}
                                    alt={product.title}
                                    width={500}
                                    height={500}
                                    priority
                                    className="w-full h-auto object-cover aspect-square"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col order-1 md:order-2">
                            <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide mb-2 sm:mb-3">
                                {product.category}
                            </p>

                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                                {product.title}
                            </h1>

                            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <StarOutlined
                                            key={i}
                                            className={`text-base sm:text-lg ${i < Math.round(product.rating)
                                                ? "text-yellow-400!"
                                                : "text-gray-300!"
                                                }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-xs sm:text-sm text-gray-600">
                                    ({product.rating}/5)
                                </span>
                            </div>

                            <div className="flex items-baseline gap-2 sm:gap-4 mb-4 sm:mb-6 flex-wrap">
                                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-black">
                                    ${discountedPrice.toFixed(2)}
                                </p>
                                {hasDiscount && (
                                    <>
                                        <p className="text-base sm:text-lg text-gray-400 line-through">
                                            ${product.price.toFixed(2)}
                                        </p>
                                        <span className="px-2 sm:px-3 py-1 bg-red-100 text-red-700 rounded font-bold text-xs sm:text-sm">
                                            -{product.discountPercentage}%
                                        </span>
                                    </>
                                )}
                            </div>

                            <div className="flex items-center gap-2 mb-4 sm:mb-6">
                                {isOutOfStock ? (
                                    <>
                                        <CloseCircleOutlined className="text-red-600 text-base sm:text-lg" />
                                        <span className="text-red-600 font-semibold text-sm sm:text-base">Out of Stock</span>
                                    </>
                                ) : (
                                    <>
                                        <CheckCircleOutlined className="text-green-600 text-base sm:text-lg" />
                                        <span className="text-green-600 font-semibold text-sm sm:text-base">
                                            In Stock ({product.stock} available)
                                        </span>
                                    </>
                                )}
                            </div>

                            <div className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-200">
                                <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Description</h3>
                                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-4">
                                    {product.description}
                                </p>
                            </div>

                            {product.tags && product.tags.length > 0 && (
                                <div className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-gray-200">
                                    <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {product.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm hover:bg-gray-200 transition cursor-pointer"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col gap-3 sm:gap-4 mb-8">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={isOutOfStock || isAdding}
                                    className={`w-full py-2 sm:py-3 font-semibold text-white! text-sm sm:text-base cursor-pointer rounded-lg transition ${isOutOfStock || isAdding
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-black hover:bg-gray-900"
                                        }`}
                                >
                                    {isAdding
                                        ? "Adding to Cart..."
                                        : isOutOfStock
                                            ? "Out of Stock"
                                            : "Add to Cart"}
                                </button>
                            </div>

                            <div className="pt-6 sm:pt-8 border-t border-gray-200 space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600">
                                <p>
                                    <span className="font-semibold text-gray-900">SKU:</span> {product.sku}
                                </p>
                                <p>
                                    <span className="font-semibold text-gray-900">Availability:</span>{" "}
                                    {product.availabilityStatus}
                                </p>
                                {product.warrantyInformation && (
                                    <p>
                                        <span className="font-semibold text-gray-900">Warranty:</span>{" "}
                                        {product.warrantyInformation}
                                    </p>
                                )}
                                {product.shippingInformation && (
                                    <p>
                                        <span className="font-semibold text-gray-900">Shipping:</span>{" "}
                                        {product.shippingInformation}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {similarProducts.length > 0 && (
                    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12 border-t border-gray-200">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-12">You may also be interested in these Products</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                            {similarProducts.map((similarProduct) => (
                                <Link
                                    key={similarProduct.id}
                                    href={`/products/${similarProduct.id}`}
                                    className="group"
                                >
                                    <div className=" rounded-lg overflow-hidden mb-3 sm:mb-4 group-hover:bg-gray-100 transition">
                                        <Image
                                            src={
                                                similarProduct.thumbnail ||
                                                similarProduct.images[0]
                                            }
                                            alt={similarProduct.title}
                                            width={250}
                                            height={250}
                                            className="w-full h-36 sm:h-40 md:h-56 object-cover group-hover:scale-105 transition duration-300"
                                        />
                                    </div>
                                    <h3 className="font-semibold text-xs sm:text-sm md:text-base text-gray-900 group-hover:text-black transition line-clamp-2 mb-1 sm:mb-2">
                                        {similarProduct.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-2 sm:mb-3">
                                        {similarProduct.description.slice(0, 35)}...
                                    </p>
                                    <p className="text-sm sm:text-lg font-bold text-black">
                                        $
                                        {(
                                            similarProduct.price *
                                            (1 - similarProduct.discountPercentage / 100)
                                        ).toFixed(2)}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}