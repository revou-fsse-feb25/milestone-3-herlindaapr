"use client";

import Image from "next/image";
import { useCart, CartItem } from "../contexts/CartContext";
import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

type CartItemCardProps = {
  item: CartItem;
};

const CartItemCard = ({ item }: CartItemCardProps) => {
  const { addToCart, removeFromCart } = useCart();
  const { product, quantity } = item;
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAddToCart = () => {
    setIsAnimating(true);
    addToCart(product);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.id);
  };

  return (
    <div className="flex items-center py-4 border-b border-gray-200 bg-teal-800 hover:bg-gray-600 rounded-lg px-3 transition-colors last:border-b-0">
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="ml-4 flex-grow">
        <h3 className="text-sm font-medium text-white">
          {product.name}
        </h3>
        <p className="text-sm text-gray-50 font-medium">
          ${product.price.toFixed(2)}
        </p>
      </div>
      <div className="flex items-center">
        <button
          onClick={handleRemoveFromCart}
          className="p-1.5 text-white hover:text-red-500 transition-colors rounded-full hover:bg-red-100 dark:hover:bg-red-900/50"
          aria-label="Remove item"
        >
           <IoIosArrowBack className="text-xl text-white mr-4 lg:mr-10 hover:text-gray-400 hover:cursor-pointer"/>
        </button>
        <span className="mx-3 text-text-light text-white font-bold min-w-[1.5rem] text-center tabular-nums">
          {quantity}
        </span>
        <button
          onClick={handleAddToCart}
          disabled={isAnimating}
          className={`p-1.5 text-white hover:text-green-600 transition-colors rounded-full hover:bg-green-100 ${
            isAnimating ? "animate-pulse opacity-70" : ""
          }`}
          aria-label="Add item"
        >
            <IoIosArrowForward className="text-xl text-white ml-4 lg:ml-10 hover:text-gray-400 hover:cursor-pointer"/>
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;