"use client";

import { useState, useEffect } from "react";
import { DataProduct, DataCategory } from "../types/index.types";
import { getCategories } from "../services/categoryServices";
import { get } from "http";

interface ProductFormProps {
  product?: DataProduct;
  onSubmit: (product: Partial<DataProduct>) => void;
  onCancel: () => void;
}

export default function ProductForm({
  product,
  onSubmit,
  onCancel,
}: ProductFormProps) {
  const [formData, setFormData] = useState<Partial<DataProduct>>({
    title: "",
    price: 0,
    description: "",
    categoryId: 0,
    images: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<DataCategory[]>([]);

  useEffect(() => {
    if (product) {
      
      setFormData({
        ...product,
        categoryId: product.category?.id || 0,
      });
    }
  }, [product]);

  useEffect(() => {
    getCategories().then((res) => { 
      setCategories(res.categories);
    })
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title?.trim()) {
      newErrors.title = "Title is required";
    }

    if (formData.price === undefined || formData.price < 0) {
      newErrors.price = "Price must be a positive number";
    }

    if (!formData.description?.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    console.log("Field changed:", value);

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }

    if (name === "price") {
      setFormData({
        ...formData,
        [name]: parseFloat(value) || 0,
      });
    } else if (name === "categoryId") {
      setFormData({
        ...formData,
        [name]: parseInt(value, 10) || 0,
      });
    } else if (name === "imageUrl") {
      // Handle image URL input
      setFormData({
        ...formData,
        images: [value, ...(formData.images?.slice(1) || [])],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // setIsSubmitting(true);
    console.log("Submitting form with data:", formData);
    try {
      onSubmit(formData);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-50"
        >
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={formData.title || ""}
          onChange={handleChange}
          required
          className={`mt-1 block w-full bg-teal-900 border ${
            errors.title ? "border-red-500" : "border-teal-700"
          } rounded-md shadow-sm py-2 px-3 text-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
          placeholder="Product title"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-50"
        >
          Price <span className="text-red-500">*</span>
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-50 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            name="price"
            id="price"
            value={formData.price || 0}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className={`block w-full pl-7 bg-teal-900 border ${
              errors.price ? "border-red-500" : "border-teal-700"
            } rounded-md shadow-sm py-2 px-3 text-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
            placeholder="0.00"
          />
        </div>
        {errors.price && (
          <p className="mt-1 text-sm text-red-500">{errors.price}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-200"
        >
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          id="description"
          value={formData.description || ""}
          onChange={handleChange}
          required
          rows={3}
          className={`mt-1 block w-full bg-teal-900 border ${
            errors.description ? "border-red-500" : "border-teal-700"
          } rounded-md shadow-sm py-2 px-3 text-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm`}
          placeholder="Product description"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="imageUrl"
          className="block text-sm font-medium text-gray-200"
        >
          Image URL
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            value={formData.images?.[0] || ""}
            onChange={handleChange}
            className="block w-full bg-teal-900 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <div className="mt-2">
          <div className="flex items-center space-x-2">
            <div className="h-16 w-16 rounded-md overflow-hidden border border-gray-700">
              <img
                src={formData.images?.[0]}
                alt="Product preview"
                className="h-full w-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/400";
                }}
              />
            </div>
            <span className="text-sm text-gray-50">Preview</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="categoryId"
            className="block text-sm font-medium text-gray-50"
          >
            Category ID
          </label>
          <select name="categoryId" 
            onChange={handleChange} 
            id="categoryId"
            value={formData.categoryId || 1}
            required
            className="mt-1 block w-full bg-teal-900 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm">
            {
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))
            }
          </select>
        </div>  
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-teal-700">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="bg-red-600 py-2 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-50 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 hover:cursor-pointer transition-colors  disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-teal-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 hover:cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Saving...</span>
            </>
          ) : (
            <>{product ? "Update" : "Create"}</>
          )}
        </button>
      </div>
    </form>
  );
}