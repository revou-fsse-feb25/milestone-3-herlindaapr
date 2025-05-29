"use client";

import { useCart } from "../contexts/CartContext";
import CartItemCard from "../components/CartItemCard";
import Link from "next/link";
import { motion } from "framer-motion";
import { PiShoppingCartSimpleFill } from "react-icons/pi";

export default function CartPage() {
  const { items, totalItems } = useCart();

  // Calculate total price
  const totalPrice = items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full mx-auto py-20 px-8 h-screen bg-gradient-to-bl from-teal-700 to-teal-950">
      <div className="w-1/2 self-center justify-self-center bg-card-light rounded-lg shadow-md p-6 border bg-white border-gray-200">
      <h1 className="text-3xl font-bold mb-8 text-text-light text-teal-950 text-center sm:text-left">
        My Cart
      </h1>
        {totalItems > 0 ? (
          <>
            <motion.div
              className="mb-6 space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {items.map((item) => (
                <motion.div key={item.product.id} variants={itemVariants}>
                  <CartItemCard item={item} />
                </motion.div>
              ))}
            </motion.div>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-teal-900">
                  Total:
                </span>
                <span className="text-xl font-bold text-teal-900">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <button className="w-full py-3 bg-teal-600 hover:bg-teal-800 text-white rounded-md font-bold shadow-md transition-all transform hover:scale-[1.01] active:scale-[0.99] hover:cursor-pointer">
                Checkout
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <PiShoppingCartSimpleFill className="self-center justify-self-center text-teal-700 text-4xl mx-2 animate-bounce" />
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold text-teal-900 mb-2">
                Your cart is empty
              </h2>
              <p className="text-teal-900 mb-6">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Link
                href="/home"
                className="inline-block py-3 px-6 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-md shadow-md transition-all transform hover:scale-105"
              >
                Browse Products
              </Link>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}