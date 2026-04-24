import Link from "next/link"
import Image from "next/image"
import appLogo from "../assets/app-logo.svg"
import { SearchOutlined, HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons"

const Header = () => {
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
                        <span><SearchOutlined /></span>
                        <span><HeartOutlined /></span>
                        <span><ShoppingCartOutlined /></span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header