"use client"

import Link from "next/link"
import Image from "next/image"
import appLogo from "../assets/app-logo.svg"
import { useSelector } from "react-redux"
import { selectCartItems } from "../lib/store/selectors/cartSelectors"
import { RootState } from "../lib/store/store"
import { UserSwitchOutlined, HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons"

const Header = () => {
    const items = useSelector((state: RootState) => selectCartItems(state));

    return (
        <>
            <div className="bg-white h-6 py-9 fixed top-0 z-10 w-full flex  shadow-md">
                <div className="max-w-7xl px-4 mx-auto flex w-full items-center justify-between">
                    <div className="flex gap-2">
                        <Image src={appLogo} alt="app-logo" />
                        <span className="font-bold font-montserrat text-2xl">Losode</span>
                    </div>
                    <div>
                        <nav className="flex gap-12 font-poppins font-medium text-[16px]">
                            <Link href="/" className="cursor-pointer transform hover:scale-110">Home</Link>
                            <Link href="/products" className="cursor-pointer transform hover:scale-110">Shop</Link>
                            <Link href="/cart" className="cursor-pointer transform hover:scale-110">Cart</Link>
                            <Link href="/contact" className="cursor-pointer transform hover:scale-110">Contact</Link>
                        </nav>
                    </div>
                    <div className="flex justify-center gap-7">
                        <span><UserSwitchOutlined /></span>
                        <span><HeartOutlined /></span>
                        <span className="relative cursor-pointer">
                            <Link href="/cart">
                                <ShoppingCartOutlined />
                                {items.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {items.length}
                                    </span>
                                )}</Link>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header