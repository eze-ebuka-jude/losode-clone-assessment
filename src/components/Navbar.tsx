"use client"

import Link from "next/link"
import Image from "next/image"
import appLogo from "../assets/app-logo.svg"
import { useSelector } from "react-redux"
import { selectCartItems } from "../lib/store/selectors/cartSelectors"
import { RootState } from "../lib/store/store"
import { UserSwitchOutlined, HeartOutlined, ShoppingCartOutlined, MenuOutlined, CloseOutlined } from "@ant-design/icons"
import { useState } from "react"

const Header = () => {
    const items = useSelector((state: RootState) => selectCartItems(state));
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <>
            <div className="bg-white py-4 sm:py-5 fixed top-0 z-10 w-full flex shadow-md">
                <div className="max-w-7xl px-3 sm:px-4 mx-auto flex w-full items-center justify-between">
                    {/* Logo */}
                    <div className="flex gap-1 sm:gap-2 items-center">
                        <Image src={appLogo} alt="app-logo" className="w-6 h-6 sm:w-8 sm:h-8" />
                        <span className="font-bold font-montserrat text-lg sm:text-xl md:text-2xl">Losode</span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex gap-6 lg:gap-12 font-poppins font-medium text-sm lg:text-base">
                        <Link href="/" className="cursor-pointer transform hover:scale-110 transition">Home</Link>
                        <Link href="/products" className="cursor-pointer transform hover:scale-110 transition">Shop</Link>
                        <Link href="/cart" className="cursor-pointer transform hover:scale-110 transition">Cart</Link>
                        <Link href="/contact" className="cursor-pointer transform hover:scale-110 transition">Contact</Link>
                    </nav>

                    {/* Icons */}
                    <div className="flex justify-center gap-3 sm:gap-5 lg:gap-7 items-center">
                        <span className="hidden sm:inline text-lg sm:text-xl"><UserSwitchOutlined /></span>
                        <span className="hidden sm:inline text-lg sm:text-xl"><HeartOutlined /></span>
                        <span className="relative cursor-pointer text-lg sm:text-xl">
                            <Link href="/cart">
                                <ShoppingCartOutlined />
                                {items.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-poppins text-[10px] font-bold">
                                        {items.length}
                                    </span>
                                )}
                            </Link>
                        </span>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={toggleMobileMenu}
                            className="md:hidden text-lg sm:text-xl transition-transform"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="fixed top-16 sm:top-[68px] left-0 right-0 bg-white shadow-lg z-9 md:hidden">
                    <nav className="flex flex-col gap-0 font-poppins font-medium py-4">
                        <Link
                            href="/"
                            className="px-4 py-3 cursor-pointer hover:bg-light-bg transition border-b border-gray-100"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/products"
                            className="px-4 py-3 cursor-pointer hover:bg-light-bg transition border-b border-gray-100"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Shop
                        </Link>
                        <Link
                            href="/cart"
                            className="px-4 py-3 cursor-pointer hover:bg-light-bg transition border-b border-gray-100"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Cart
                        </Link>
                        <Link
                            href="/contact"
                            className="px-4 py-3 cursor-pointer hover:bg-light-bg transition"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Contact
                        </Link>
                    </nav>
                </div>
            )}
        </>
    )
}

export default Header