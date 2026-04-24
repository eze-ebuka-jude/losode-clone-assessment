"use client"

// import { useState } from "react"
import ViewListIcon from "../../assets/view-list.svg"
import GridIcon from "../../assets/grid.svg"
import FilterIcon from "../../assets/filter.svg"
import Image from "next/image"
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../lib/api";
import ProductCardSkeleton from "../skeletons/ProductCardSkeleton"
// import prodData from "../../data/shopProductData"
import type { ProductDataType } from "../../types/productDataType"
import { useState } from "react"
import Link from "next/link"
// import { IoMdHeartEmpty } from "react-icons/io"
// import { IoShareSocialOutline } from "react-icons/io5"
// import { MdOutlineCompareArrows } from "react-icons/md"
// import { Link } from "react-router"

interface ProductsData {
    products: ProductDataType[];
    total: number;
    skip: number;
    limit: number;
}

const ProductsSection = () => {
    const [offset, setOffset] = useState<number>(0)
    const [limit, setLimit] = useState<number>(16)

    const { data, isLoading, isError } = useQuery<ProductsData>({
        queryKey: ["products"],
        queryFn: getProducts,
    });

    if (isError) return <p className="p-6">Something went wrong</p>;

    console.log("THE RESULT", data);

    return (
        <>
            <div className="bg-[#F9F1E7] w-full -mt-1">
                <div className="flex items-center justify-between max-w-7xl px-4 py-6 mx-auto">
                    <div className="flex  items-start gap-8">
                        <div className="flex items-center gap-7">
                            <span className="flex gap-2 font-poppins font-medium text-md">
                                <Image src={FilterIcon} alt="filter-icon" />
                                Filter
                            </span>
                            <span><Image src={GridIcon} alt="grid-icon" /></span>
                            <span><Image src={ViewListIcon} alt="view-list-icon" /></span>
                        </div>
                        <div className="bg-[#9F9F9F] border-[#9F9F9F] w-0.5 h-8"></div>
                        <div className="font-poppins mt-1">
                            <span className="font-semibold text-[12px]">Showing 1 - 16 of 32 results</span>
                        </div>
                    </div>

                    <div className="flex items-start gap-6 font-poppins">
                        <div className="flex gap-4 items-center justify-center">
                            <span className="font-medium">Show</span>
                            <div className="bg-[#FFFFFF] px-3 py-2 text-[#9F9F9F]">16</div>
                        </div>
                        <div className="flex gap-4 items-center justify-center">
                            <span className="font-medium">Short by</span>
                            <div className="bg-[#FFFFFF] pr-8 pl-4 py-2 text-[#9F9F9F]">Default</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl px-4 py-6 mx-auto my-12">
                {isLoading && (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                        {Array.from({ length: 16 }).map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                )}
                <div className="grid grid-cols-4 gap-8">
                    {data && data?.products?.map(prod => (
                        <Link className="relative group overflow-hidden cursor-pointer" key={prod.title} href={`/products/${prod.id}`}>
                            <div className="relative">
                                <Image src={prod.images[0]} alt={prod.title} className="w-full" width={100} height={100} />
                            </div>
                            <div className="my-4 font-poppins px-6">
                                <h6 className="font-semibold text-md">{prod.title}</h6>
                                <p className="font-medium text-[10px] text-[#898989] py-2">{prod.description.slice(0, 150)}</p>
                                <div className="flex items-start gap-6">
                                    <span className="text-[#3A3A3A] text-sm font-semibold">${prod.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Pagination links */}
                <div className="flex items-center justify-center mx-auto gap-4 mt-12">
                    <span className="bg-[#B88E2F] px-4 py-2 rounded-sm text-white">1</span>
                    <span className="bg-[#F9F1E7] px-4 py-2 rounded-sm">2</span>
                    <span className="bg-[#F9F1E7] px-4 py-2 rounded-sm">3</span>
                    <span className="bg-[#F9F1E7] px-4 py-2 rounded-sm">Next</span>
                </div>
            </div>
        </>
    )
}

export default ProductsSection