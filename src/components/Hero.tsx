"use client"

import ShopHeroImg from "../assets/shop-hero-img.svg"
import Image from "next/image";
import appLogo from "../assets/app-logo.svg"
import { RightOutlined } from "@ant-design/icons";
import { usePathname } from "next/navigation";

const Hero = () => {
    const pathname = usePathname()

    console.log(pathname);

    return (
        <div className="relative md:mt-18 mt-16">
            <Image src={ShopHeroImg} alt="shop-hero-img" loading="eager" className="w-full h-auto" />
            <div className="absolute inset-0 flex flex-col justify-center items-center gap-2 sm:gap-3 md:gap-4">
                <Image src={appLogo} alt="app-logo" className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
                {(pathname === "/products" || pathname === "/") && (
                    <>
                        <h4 className="font-poppins font-medium text-2xl sm:text-3xl md:text-4xl text-black text-center px-2">Shop</h4>
                        <div className="flex gap-1 font-poppins text-xs sm:text-sm md:text-base -mt-4">
                            <span className="font-semibold">Home</span>
                            <span><RightOutlined className="mt-0.5" /></span>
                            <span>Shop</span>
                        </div>
                    </>
                )}

                {(pathname === "/cart") && (
                    <>
                        <h4 className="font-poppins font-medium text-2xl sm:text-3xl md:text-4xl text-black text-center px-2">Cart</h4>
                        <div className="flex gap-1 font-poppins text-xs sm:text-sm md:text-base -mt-4">
                            <span className="font-semibold">Home</span>
                            <span><RightOutlined className="mt-0.5" /></span>
                            <span>Cart</span>
                        </div>
                    </>
                )}

                {(pathname === "/checkout") && (
                    <>
                        <h4 className="font-poppins font-medium text-2xl sm:text-3xl md:text-4xl text-black text-center px-2">Checkout</h4>
                        <div className="flex gap-1 font-poppins text-xs sm:text-sm md:text-base -mt-4">
                            <span className="font-semibold">Home</span>
                            <span><RightOutlined className="mt-0.5" /></span>
                            <span>Checkout</span>
                        </div>
                    </>
                )}

                {(pathname === "/contact") && (
                    <>
                        <h4 className="font-poppins font-medium text-2xl sm:text-3xl md:text-4xl text-black text-center px-2">Contact</h4>
                        <div className="flex gap-1 font-poppins text-xs sm:text-sm md:text-base -mt-4">
                            <span className="font-semibold">Home</span>
                            <span><RightOutlined className="mt-0.5" /></span>
                            <span>Contact</span>
                        </div>
                    </>
                )}

                {(pathname === "/confirmation") && (
                    <>
                        <h4 className="font-poppins font-medium text-2xl sm:text-3xl md:text-4xl text-black text-center px-2">Order Confirmation</h4>
                        <div className="flex gap-1 font-poppins text-xs sm:text-sm md:text-base -mt-4">
                            <span className="font-semibold">Home</span>
                            <span><RightOutlined className="mt-0.5" /></span>
                            <span>Order Confirmation</span>
                        </div>
                    </>
                )}
            </div>

        </div>
    )
}

export default Hero