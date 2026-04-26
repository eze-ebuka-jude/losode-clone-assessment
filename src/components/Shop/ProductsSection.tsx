"use client"

import ViewListIcon from "../../assets/view-list.svg"
import GridIcon from "../../assets/grid.svg"
import FilterIcon from "../../assets/filter.svg"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query";
import ProductCardSkeleton from "../skeletons/ProductCardSkeleton"
import type { ProductDataType } from "../../types/productDataType"
import { useState } from "react"
import Link from "next/link"
import SearchBar from "../SearchBar"
import FilterModal from "./FilterModal"
import { useRouter, useSearchParams } from "next/navigation";
import { getProducts, getCategories } from "../../lib/api";

interface ProductsData {
    products: ProductDataType[];
    total: number;
    skip: number;
    limit: number;
}

const ProductsSection = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1)
    const router = useRouter();
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get("category") ?? "all";
    const priceParam = Number(searchParams.get("price")) || 1000;
    const [isOpen, setIsOpen] = useState(false);

    const limit = 16

    const { data: dataProduct, isLoading: loadingProducts, isError } = useQuery<ProductsData>({
        queryKey: ["products", page, search, categoryParam],
        queryFn: () => getProducts(page, limit, search, categoryParam === "all" ? undefined : categoryParam),
    });

    const totalPages = Math.ceil((dataProduct?.total || 0) / limit);

    const total = dataProduct?.total || 0;

    const start = total === 0 ? 0 : (page - 1) * limit + 1;
    const end = Math.min(page * limit, total);

    const { data: categories = [] } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
    });

    const handleApply = ({
        category,
        price,
    }: {
        category: string;
        price: number;
    }) => {
        setPage(1);

        const params = new URLSearchParams();

        if (category !== "all") params.set("category", category);
        if (price) params.set("price", String(price));

        router.push(`?${params.toString()}`);
    };

    if (isError) return <p className="p-6">Something went wrong</p>;

    console.log("THE RESULT", dataProduct, search);

    return (
        <>
            <div className="bg-[#F9F1E7] w-full! -mt-1">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between max-w-7xl px-3 sm:px-4 py-4 sm:py-6 mx-auto gap-4 sm:gap-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-4 w-full sm:w-auto">
                        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
                            <span className="flex gap-2 font-poppins font-medium text-sm md:text-base cursor-pointer hover:text-accent transition" onClick={() => setIsOpen(true)}>
                                <Image src={FilterIcon} alt="filter-icon" />
                                <span className="mt-1">Filter</span>
                            </span>
                            <span className="hidden sm:inline"><Image src={GridIcon} alt="grid-icon" className="w-5 h-5" /></span>
                            <span className="hidden sm:inline"><Image src={ViewListIcon} alt="view-list-icon" className="w-5 h-5" /></span>
                        </div>
                        <div className="hidden sm:block bg-secondary w-0.5 h-8"></div>
                        <div className="font-poppins">
                            <span className="font-semibold text-xs sm:text-sm">Showing {start} - {end} of {total} results</span>
                        </div>
                    </div>

                    <div className="w-full sm:w-auto">
                        <SearchBar onSearch={setSearch} setPage={setPage} setSearch={setSearch} />
                    </div>
                </div>
            </div>

            <FilterModal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                categories={categories}
                currentCategory={categoryParam}
                currentPrice={priceParam}
                onApply={handleApply}
            />

            <div className="max-w-7xl px-3 sm:px-4 py-6 mx-auto my-8 sm:my-12">
                {loadingProducts && (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 p-3 sm:p-6">
                        {Array.from({ length: 16 }).map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                    {dataProduct && dataProduct?.products.map(prod => (
                        <Link className="relative group overflow-hidden cursor-pointer" key={prod.title} href={`/products/${prod.id}`}>
                            <div className="relative overflow-hidden">
                                <Image src={prod.images[0]} alt={prod.title} className="w-full h-auto aspect-square object-cover" width={200} height={200} />
                            </div>
                            <div className="my-3 sm:my-4 font-poppins px-2 sm:px-3 md:px-4">
                                <h6 className="font-semibold text-xs sm:text-sm md:text-base line-clamp-2">{prod.title}</h6>
                                <p className="font-medium text-[9px] sm:text-[10px] md:text-xs text-secondary py-1 sm:py-2 line-clamp-2">{prod.description.slice(0, 150)}</p>
                                <div className="flex items-start gap-3 sm:gap-4">
                                    <span className="text-gray-700 text-xs sm:text-sm md:text-base font-semibold">${prod.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {!loadingProducts && dataProduct?.products.length === 0 && (
                    <div className="w-full mx-auto flex items-center justify-center py-12">
                        <p className="text-gray-500">No products found.</p>
                    </div>
                )}

                <div className="flex items-center justify-center mx-auto gap-2 sm:gap-4 mt-8 sm:mt-12 flex-wrap">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                        className="px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm border rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black hover:text-white transition"
                    >
                        Prev
                    </button>

                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                            pageNum = i + 1;
                        } else if (page <= 3) {
                            pageNum = i + 1;
                        } else if (page >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                        } else {
                            pageNum = page - 2 + i;
                        }
                        return (
                            <button
                                key={pageNum}
                                onClick={() => setPage(pageNum)}
                                className={`px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm border rounded cursor-pointer transition ${page === pageNum
                                    ? "bg-black text-white!"
                                    : "hover:border-black"
                                    }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage((p) => p + 1)}
                        className="px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm border rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black hover:text-white transition"
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    )
}

export default ProductsSection