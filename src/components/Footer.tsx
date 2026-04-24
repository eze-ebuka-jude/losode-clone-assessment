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
            <div className="bg-[#FAF3EA] px-6 py-12">
                <div className="max-w-7xl mx-auto grid grid-cols-4 gap-6">
                    <div className="flex items-center justify-center gap-4">
                        <Image src={Trophy} alt="trophy-img" height={60} width={60} />
                        <div className="flex flex-col gap-2">
                            <h6 className="text-[#242424] font-semibold text-xl">High Quality</h6>
                            <span className="text-[#898989] font-medium text-md">crafted from top materials</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                        <Image src={Guarantee} alt="guarantee-img" height={60} width={60} />
                        <div className="flex flex-col gap-2">
                            <h6 className="text-[#242424] font-semibold text-xl">Waranty Protection</h6>
                            <span className="text-[#898989] font-medium text-md">Over 2 years</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                        <Image src={Shipping} alt="shipping-img" height={60} width={60} />
                        <div className="flex flex-col gap-2">
                            <h6 className="text-[#242424] font-semibold text-xl">Free Shipping</h6>
                            <span className="text-[#898989] font-medium text-md">Order over $ 150</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                        <Image src={CustomerSupport} alt="support-img" height={60} width={60} />
                        <div className="flex flex-col gap-2">
                            <h6 className="text-[#242424] font-semibold text-xl">24 / 7 Support</h6>
                            <span className="text-[#898989] font-medium text-md">Dedicated support</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-2 border border-b-0 bg-black text-white border-l-0 border-r-0 border-t-gray-400">
                <div className="max-w-7xl px-4 mx-auto pt-12 pb-8">
                    <div className="grid grid-cols-4 gap-12 items-start w-[85%]">
                        <div className="flex flex-col gap-8 w-full items-start justify-between font-poppins">
                            <h5 className="text-2xl font-bold">Losode.</h5>
                            <span className="font-extralight text-[12px] text-[#9F9F9F]">400 University Drive Suite 200 Coral <br /> Gables, <br />FL 33134 USA</span>
                        </div>

                        <div className="flex flex-col gap-8 items-start justify-between font-poppins">
                            <h5 className="text-md text-[#9F9F9F] font-medium">Links</h5>
                            <nav className="flex flex-col gap-12 font-poppins font-medium text-[16px]">
                                <Link href="#" className="cursor-pointer transform hover:scale-110">Home</Link>
                                <Link href="/products" className="cursor-pointer transform hover:scale-110">Shop</Link>
                                <Link href="/cart" className="cursor-pointer transform hover:scale-110">Cart</Link>
                                <Link href="#" className="cursor-pointer transform hover:scale-110">Contact</Link>
                            </nav>
                        </div>

                        <div className="flex flex-col gap-8 items-start justify-between font-poppins">
                            <h5 className="text-md text-[#9F9F9F] font-medium">Help</h5>
                            <nav className="flex flex-col gap-12 font-poppins font-medium text-[16px]">
                                <Link href="#" className="cursor-pointer transform hover:scale-110">Payment Options</Link>
                                <Link href="#" className="cursor-pointer transform hover:scale-110">Returns</Link>
                                <Link href="#" className="cursor-pointer transform hover:scale-110">Privacy Policies</Link>
                            </nav>
                        </div>

                        <div className="flex flex-col gap-8 items-start justify-between font-poppins">
                            <h5 className="text-md text-[#9F9F9F] font-medium">Newsletter</h5>
                            <form>
                                <div className="flex gap-4 justify-center items-center">
                                    <input type="email" placeholder="Enter Your Email Address" className="border-x-none outline-none border-b-2 border-b-[#ffffff] text-sm py-1 pr-12 text-[#9F9F9F]" />
                                    <button className="border-x-none outline-none border-b-2 border-b-[#ffffff] p-1 mb-1">SUBSCRIBE</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <hr className="w-full h-8 border-[#D9D9D9] mt-12 mb-4" />

                    <span className="font-medium text-[#ffffff] font-poppins text-sm">2026 losode. All rights reserved</span>
                </div>
            </div>
        </>
    )
}

export default Footer