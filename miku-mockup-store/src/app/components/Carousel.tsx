'use client';

import { useState } from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { DataProduct } from "../types/index.types";

export default function Carousel({ data }: { data: DataProduct }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < data.images.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-row justify-center items-center">
      <button
        onClick={handlePrev}
        disabled={currentIndex === 0}
        className="disabled:opacity-30 disabled:cursor-not-allowed hover:cursor-pointer"
      >
        <FaAngleDoubleLeft className="text-xl lg:text-3xl text-white md:text-teal-700 mr-4 lg:mr-10 hover:text-teal-900"/>
      </button>

      <img
        width={350}
        height={200}
        src={data.images[currentIndex]}
        alt={data.title}
        className="object-cover rounded-lg"
      />

      <button
        onClick={handleNext}
        disabled={currentIndex === data.images.length - 1}
        className="disabled:opacity-30 disabled:cursor-not-allowed hover:cursor-pointer"
      >
        <FaAngleDoubleRight className="text-xl lg:text-3xl text-white md:text-teal-700 ml-4 lg:ml-10 hover:text-teal-900"/>
      </button>
    </div>
  );
};


