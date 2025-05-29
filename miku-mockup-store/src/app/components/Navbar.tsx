"use client";

import { PiShoppingCartSimpleFill } from "react-icons/pi";
import Image from 'next/image'
import Link from "next/link";
import { useCart } from "../contexts/CartContext";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { div } from "framer-motion/client";


export default function Navbar() {
    const { totalItems } = useCart();
    const [isCartHighlighted, setIsCartHighlighted] = useState(false);
    const [prevTotalItems, setPrevTotalItems] = useState(0);
    const { data: session } = useSession();
    const isAdmin = session?.user?.role === "admin";
    const isAuthenticated = !!session;

    // Effect to highlight cart when items are added
    useEffect(() => {
        if (totalItems > prevTotalItems) {
        setIsCartHighlighted(true);
        const timer = setTimeout(() => {
            setIsCartHighlighted(false);
        }, 300);
        return () => clearTimeout(timer);
        }
        setPrevTotalItems(totalItems);
    }, [totalItems, prevTotalItems]);


    return (
        <nav className="fixed flex flex-row top-0 z-10 bg-white w-full max-h-max px-4 py-1">
          <>
            <Link href="/home" className="self-center">
              <div className="w-full">
                  <Image
                  src={"/logo.png"}
                  width={60}
                  height={55}
                  alt="Miku Mockup Store"
                  />
                </div>
              </Link>
            
            <Link
              href="/cart"
              className={`relative p-2 text-text-light hover:text-primary-light dark:hover:text-primary-dark transition-colors ${
                isCartHighlighted ? "animate-pulse" : ""
              }`}
            >
              <PiShoppingCartSimpleFill className="self-center text-teal-800 text-3xl mx-2 hover:text-teal-950" />
              {totalItems > 0 && (
                <span
                  className={`absolute top-0 right-0 inline-flex items-center justify-center mt-2 mr-2.5  px-2 py-1 text-xs font-bold leading-none text-black transform translate-x-1/2 -translate-y-1/2 bg-teal-500 rounded-full ${
                    isCartHighlighted ? "animate-bounce" : ""
                  }`}
                >
                  {totalItems}
                </span>
              )}
            </Link>

            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {isAdmin ? (
                  <Link
                    href="/admin"
                    className="text-teal-700 hover:underline-offset-4 hover:underline hover:text-teal-800 inline-flex items-center px-1 pt-1 text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                ) : isAuthenticated ? (
                  <Link
                    href="/home"
                    className="text-teal-700 hover:underline-offset-4 hover:underline hover:text-teal-800 inline-flex items-center px-1 pt-1 text-sm font-medium"
                  >
                    Home
                  </Link>
                ) : <></> }
            </div>
            
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <div className="ml-3 relative">
                <div className="flex items-center gap-4 w-max">
                  <span className="text-sm text-teal-400 mt-1">
                    {session?.user?.name || session?.user?.email}
                    {isAdmin && (
                      <span className="ml-2 text-xs text-teal-700">(Admin)</span>
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden w-full sm:ml-10 sm:flex sm:space-x-8 justify-end">
              {isAuthenticated ? (
                  <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="text-sm text-red-400 hover:text-red-300 transition-colors"
                  >
                    Sign out
                  </button>
              ) : (
                <div className="py-1 px-1.5 self-center font-semibold flex flex-row">
                  <Link href="/register" className="text-teal-800 text-sm hover:cursor-pointer hover:underline">Sign Up</Link>
                  <p className="text-gray-400 mx-1 select-none">|</p>
                  <Link href="/login" className="text-teal-800 text-sm hover:cursor-pointer hover:underline">Login</Link>
                </div>
              )}
            </div>
          </>
        </nav>
  );
}