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
        <div className="relative">
            <Image src={ShopHeroImg} alt="shop-hero-img" loading="eager" className="w-full" />
            <div className="absolute top-35 flex flex-col justify-center items-center gap-2 mx-auto w-full">
                <Image src={appLogo} alt="app-logo" />
                {(pathname === "/products" || "/") && (
                    <>
                        <h4 className="font-poppins font-medium text-3xl text-[#000000]">Shop</h4>
                        <div className="flex gap-1 font-poppins">
                            <span className="font-semibold text-sm">Home</span>
                            <span><RightOutlined className="mt-0.5" /></span>
                            <span className="text-sm">Shop</span>
                        </div>
                    </>
                )}

                {(pathname === "/cart") && (
                    <>
                        <h4 className="font-poppins font-medium text-3xl text-[#000000]">Cart</h4>
                        <div className="flex gap-1 font-poppins">
                            <span className="font-semibold text-sm">Home</span>
                            <span><RightOutlined className="mt-0.5" /></span>
                            <span className="text-sm">Cart</span>
                        </div>
                    </>
                )}

                {(pathname === "/checkout") && (
                    <>
                        <h4 className="font-poppins font-medium text-3xl text-[#000000]">Checkout</h4>
                        <div className="flex gap-1 font-poppins">
                            <span className="font-semibold text-sm">Home</span>
                            <span><RightOutlined className="mt-0.5" /></span>
                            <span className="text-sm">Checkout</span>
                        </div>
                    </>
                )}

                {(pathname === "/contact") && (
                    <>
                        <h4 className="font-poppins font-medium text-3xl text-[#000000]">Contact</h4>
                        <div className="flex gap-1 font-poppins">
                            <span className="font-semibold text-sm">Home</span>
                            <span><RightOutlined className="mt-0.5" /></span>
                            <span className="text-sm">Contact</span>
                        </div>
                    </>
                )}

                {(pathname === "/confirmation") && (
                    <>
                        <h4 className="font-poppins font-medium text-3xl text-[#000000]">Order Confirmation</h4>
                        <div className="flex gap-1 font-poppins">
                            <span className="font-semibold text-sm">Home</span>
                            <span><RightOutlined className="mt-0.5" /></span>
                            <span className="text-sm">Order Confirmation</span>
                        </div>
                    </>
                )}
            </div>

        </div>
    )
}

export default Hero