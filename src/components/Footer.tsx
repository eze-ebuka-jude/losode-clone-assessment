"use client"

import Image from "next/image"
import Link from "next/link"
import Trophy from "../assets/trophy.svg"
import Guarantee from "../assets/guarantee.svg"
import Shipping from "../assets/shipping.svg"
import CustomerSupport from "../assets/customer-support.svg"

const Footer = () => {
    return (
        <>
            <div className="bg-[#F9F1E7] px-3 sm:px-4 py-8 sm:py-12 lg:flex hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    <div className="flex items-center justify-center gap-3 sm:gap-4">
                        <Image src={Trophy} alt="trophy-img" height={60} width={60} className="w-12 h-12 sm:w-15 sm:h-15" />
                        <div className="flex flex-col gap-1 sm:gap-2">
                            <h6 className="text-gray-900 font-semibold text-sm sm:text-lg md:text-xl">High Quality</h6>
                            <span className="text-secondary font-medium text-xs sm:text-sm md:text-base">crafted from top materials</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-3 sm:gap-4">
                        <Image src={Guarantee} alt="guarantee-img" height={60} width={60} className="w-12 h-12 sm:w-15 sm:h-15" />
                        <div className="flex flex-col gap-1 sm:gap-2">
                            <h6 className="text-gray-900 font-semibold text-sm sm:text-lg md:text-xl">Warranty Protection</h6>
                            <span className="text-secondary font-medium text-xs sm:text-sm md:text-base">Over 2 years</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-3 sm:gap-4">
                        <Image src={Shipping} alt="shipping-img" height={60} width={60} className="w-12 h-12 sm:w-15 sm:h-15" />
                        <div className="flex flex-col gap-1 sm:gap-2">
                            <h6 className="text-gray-900 font-semibold text-sm sm:text-lg md:text-xl">Free Shipping</h6>
                            <span className="text-secondary font-medium text-xs sm:text-sm md:text-base">Order over $ 150</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-3 sm:gap-4">
                        <Image src={CustomerSupport} alt="support-img" height={60} width={60} className="w-12 h-12 sm:w-15 sm:h-15" />
                        <div className="flex flex-col gap-1 sm:gap-2">
                            <h6 className="text-gray-900 font-semibold text-sm sm:text-lg md:text-xl">24 / 7 Support</h6>
                            <span className="text-secondary font-medium text-xs sm:text-sm md:text-base">Dedicated support</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-400 bg-black text-white">
                <div className="max-w-7xl px-3 sm:px-4 mx-auto pt-8 sm:pt-12 pb-6 sm:pb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
                        <div className="flex flex-col gap-6 sm:gap-8 items-start font-poppins text-center sm:text-left">
                            <h5 className="text-xl sm:text-2xl font-bold">Losode.</h5>
                            <span className="font-extralight text-xs sm:text-sm text-secondary">
                                400 University Drive Suite 200 Coral Gables, FL 33134 USA
                            </span>
                        </div>

                        <div className="flex flex-col gap-6 sm:gap-8 items-start font-poppins">
                            <h5 className="text-sm sm:text-base font-medium text-secondary">Links</h5>
                            <nav className="flex flex-col gap-3 sm:gap-4 md:gap-6 font-poppins font-medium text-xs sm:text-sm">
                                <Link href="#" className="cursor-pointer transform hover:scale-110 transition">Home</Link>
                                <Link href="/products" className="cursor-pointer transform hover:scale-110 transition">Shop</Link>
                                <Link href="/cart" className="cursor-pointer transform hover:scale-110 transition">Cart</Link>
                                <Link href="/contact" className="cursor-pointer transform hover:scale-110 transition">Contact</Link>
                            </nav>
                        </div>

                        <div className="flex flex-col gap-6 sm:gap-8 items-start font-poppins">
                            <h5 className="text-sm sm:text-base font-medium text-secondary">Help</h5>
                            <nav className="flex flex-col gap-3 sm:gap-4 md:gap-6 font-poppins font-medium text-xs sm:text-sm">
                                <Link href="#" className="cursor-pointer transform hover:scale-110 transition">Payment Options</Link>
                                <Link href="#" className="cursor-pointer transform hover:scale-110 transition">Returns</Link>
                                <Link href="#" className="cursor-pointer transform hover:scale-110 transition">Privacy Policies</Link>
                            </nav>
                        </div>

                        <div className="flex flex-col gap-6 sm:gap-8 items-start font-poppins">
                            <h5 className="text-sm sm:text-base font-medium text-secondary">Newsletter</h5>
                            <form className="w-full">
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 items-stretch sm:items-center">
                                    <input
                                        type="email"
                                        placeholder="Enter Your Email"
                                        className="border-x-none outline-none border-b-2 border-b-white bg-black text-xs sm:text-sm py-2 px-0 sm:pr-3 text-white placeholder-secondary flex-1"
                                    />
                                    <button className="border-x-none outline-none border-b-2 border-b-white bg-black p-2 text-xs sm:text-sm font-semibold text-white hover:text-accent transition">
                                        SUBSCRIBE
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <hr className="border-secondary my-6 sm:my-8" />

                    <span className="font-medium text-white font-poppins text-xs sm:text-sm text-center sm:text-left block">
                        © 2026 losode. All rights reserved
                    </span>
                </div>
            </div>
        </>
    )
}

export default Footer