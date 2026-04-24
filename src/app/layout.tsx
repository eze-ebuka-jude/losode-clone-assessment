import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "../components/Navbar";
import "./globals.css";
import Footer from "../components/Footer";
import Providers from "./providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Losode Fashion App",
  description: "A clothing brand app that displays different clothings and allow search your favorite",
  icons: {
    icon: "/icon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body className={`${poppins.className}`}>
        <Navbar />
        <Providers>
          {children}
        </Providers>
        <Footer />
      </body>
    </html>
  );
}
