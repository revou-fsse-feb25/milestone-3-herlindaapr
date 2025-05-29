"use client";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import Image from "next/image";
import { useCart, Product } from "../contexts/CartContext";
import { useState, useRef } from "react";

type DataProduct = {
  product: Product;
};

const ButtonCart = ({ product }: DataProduct) => {
  const { addToCart } = useCart();
  const [isAnimating, setIsAnimating] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [dotPosition, setDotPosition] = useState({ top: 0, left: 0 });
  const [showDot, setShowDot] = useState(false);

  const handleAddToCart = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    // Create animation dot at button position
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDotPosition({
        top: rect.top + rect.height / 2,
        left: rect.left + rect.width / 2,
      });
      setShowDot(true);

      // Get cart icon position to animate towards
      const cartIcon = document.querySelector(".cart-icon");
      if (cartIcon) {
        const cartRect = cartIcon.getBoundingClientRect();
        const dot = document.createElement("div");
        dot.className = "cart-item-dot";
        dot.style.top = `${rect.top + rect.height / 2}px`;
        dot.style.left = `${rect.left + rect.width / 2}px`;
        document.body.appendChild(dot);

        // Animate the dot
        setTimeout(() => {
          dot.style.top = `${cartRect.top + cartRect.height / 2}px`;
          dot.style.left = `${cartRect.left + cartRect.width / 2}px`;
          dot.style.transform = "scale(0.5)";
          dot.style.transition =
            "all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
        }, 10);

        // Remove the dot and add to cart
        setTimeout(() => {
          document.body.removeChild(dot);
          addToCart(product);
          setIsAnimating(false);
          setShowDot(false);
        }, 500);
      } else {
        // Fallback if cart icon not found
        setTimeout(() => {
          addToCart(product);
          setIsAnimating(false);
          setShowDot(false);
        }, 800);
      }
    }
  };

    return (
        <button ref={buttonRef}
        onClick={handleAddToCart} className="flex self-end border-0 hover:cursor-pointer">
            <PiShoppingCartSimpleFill className="self-center text-teal-800 hover:text-teal-950 text-2xl lg:text-3xl mx-2" />
        </button>
    );
}

export default ButtonCart;