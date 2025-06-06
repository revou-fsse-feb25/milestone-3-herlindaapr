'use client';

import { PiShoppingCartSimpleFill } from 'react-icons/pi';
import Link from 'next/link';
import { useCart } from '../contexts/CartContext';
import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { totalItems } = useCart();
  const [isCartHighlighted, setIsCartHighlighted] = useState(false);
  const [prevTotalItems, setPrevTotalItems] = useState(0);
  const { data: session, status } = useSession();
  const [hasMounted, setHasMounted] = useState(false);
  
  const isLoadingSession = status === 'loading';
  const isAuthenticated = !!session;
  const isAdmin = session?.user?.role === 'admin';

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (totalItems > prevTotalItems) {
      setIsCartHighlighted(true);
      const timer = setTimeout(() => setIsCartHighlighted(false), 300);
      return () => clearTimeout(timer);
    }
    setPrevTotalItems(totalItems);
  }, [totalItems, prevTotalItems]);

  if (!hasMounted) return null;

  return (
    <nav className="fixed flex flex-row items-center top-0 z-10 bg-white w-full max-h-max px-4 py-1">
      <div className="flex-shrink-0">
        <Link href="/home" className="self-center">
          <img
            src="/logo.png"
            alt="Logo Apps"
            className="w-11 h-11"
          />
        </Link>
      </div>

      <Link
        href="/cart" aria-label="Cart"
        className={`relative p-2 text-text-light hover:text-primary-light dark:hover:text-primary-dark transition-colors ${
          isCartHighlighted ? 'animate-pulse' : ''
        }`}
      >
        <PiShoppingCartSimpleFill className="self-center text-teal-800 text-3xl mx-2 hover:text-teal-950" />
        {totalItems > 0 && (
          <span
            className={`absolute top-0 right-0 inline-flex items-center justify-center mt-2 mr-2.5 px-2 py-1 text-xs font-bold leading-none text-black transform translate-x-1/2 -translate-y-1/2 bg-teal-500 rounded-full ${
              isCartHighlighted ? 'animate-bounce' : ''
            }`}
          >
            {totalItems}
          </span>
        )}
      </Link>

      <div className="hidden sm:ml-6 sm:flex sm:space-x-8 min-w-[80px]">
        {isLoadingSession ? (
          <div className="text-sm text-gray-300">...</div>
        ) : isAdmin ? (
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
        ) : null}
      </div>

      <div className="hidden sm:ml-6 sm:flex sm:items-center min-w-[180px]">
        <div className="ml-3 relative">
          <div className="flex items-center gap-4 w-max">
            <span className="text-sm text-teal-400 mt-1">
              {isLoadingSession
                ? '...'
                : session?.user?.name || session?.user?.email || ''}
              {!isLoadingSession && isAdmin && (
                <span className="ml-2 text-xs text-teal-700">(Admin)</span>
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="hidden w-full sm:ml-10 sm:flex sm:space-x-8 justify-end min-w-[150px]">
        {isLoadingSession ? (
          <span className="text-sm text-gray-300">...</span>
        ) : isAuthenticated ? (
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="text-sm text-red-400 hover:text-red-300 transition-colors"
          >
            Sign out
          </button>
        ) : (
          <div className="py-1 px-1.5 self-center font-semibold flex flex-row">
            <Link href="/register" className="text-teal-800 text-sm hover:cursor-pointer hover:underline">
              Sign Up
            </Link>
            <p className="text-gray-400 mx-1 select-none">|</p>
            <Link href="/login" className="text-teal-800 text-sm hover:cursor-pointer hover:underline">
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
