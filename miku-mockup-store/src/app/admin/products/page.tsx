"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ProductForm from "@/app/components/ProductForm";
import ProductTable from "@/app/components/ProductTable";
import AdminSidebar from "@/app/components/AdminSidebar";
import { DataProduct } from "@/app/types/index.types";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import NotFound from "@/app/components/NotFound";

export default function AdminProductsPage() {
  const { data: session } = useSession();
  const [products, setProducts] = useState<DataProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<DataProduct | undefined>(
    undefined
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const productsPerPage = 10;

  const fetchProducts = async (page: number = 1, search: string = "") => {
    setIsLoading(true);
    setError("");
    try {
      const offset = (page - 1) * productsPerPage;
      const response = await fetch(
        `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${productsPerPage}${
          search ? `&title=${encodeURIComponent(search)}` : ""
        }`
      );

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);

      // Get total count from headers or estimate from data length
      const totalCount = response.headers.get("x-total-count");
      setTotalProducts(totalCount ? parseInt(totalCount) : data.length * 10); // Assuming there are at least 10 pages
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products. Please try again later.");
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage, searchTerm);
  }, [currentPage, searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
    fetchProducts(1, searchTerm);
  };

  const handleCreateProduct = () => {
    setCurrentProduct(undefined);
    setShowForm(true);
  };

  const handleEditProduct = (product: DataProduct) => {
    setCurrentProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(
          `https://api.escuelajs.co/api/v1/products/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error(`Delete failed with status: ${response.status}`);
        }

        // Refresh the product list
        fetchProducts(currentPage, searchTerm);
      } catch (error) {
        console.error(`Error deleting product with id ${id}:`, error);
        setError("Failed to delete product. Please try again.");
      }
    }
  };

  const handleSubmitProduct = async (product: Partial<DataProduct>) => {
    try {
      let response;

      if (currentProduct) {
        // Update existing product
        response = await fetch(
          `https://api.escuelajs.co/api/v1/products/${currentProduct.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
          }
        );
      } else {
        // Create new product
        response = await fetch("https://api.escuelajs.co/api/v1/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        });
      }

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      setShowForm(false);
      fetchProducts(currentPage, searchTerm);
    } catch (error) {
      console.error("Error saving product:", error);
      setError("Failed to save product. Please try again.");
    }
  };

  const totalPages = Math.max(1, Math.ceil(totalProducts / productsPerPage));

  return (
    <div className="min-h-screen bg-teal-900">
      <div className="flex py-20">
        <AdminSidebar />
        <div className="flex-1 ml-64 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-white">
                Product Management
              </h1>
              <button
                onClick={handleCreateProduct}
                className="bg-teal-600 px-4 py-2 text-white rounded-md hover:bg-teal-950 transition-colors flex items-center gap-2 hover:cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Add Product
              </button>
            </div>

            {error && (
              <div className="bg-red-900/50 p-4 rounded-md mb-6 border border-red-500">
                <p className="text-sm text-red-200">{error}</p>
              </div>
            )}

            <div className="mb-6">
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="flex-1 bg-teal-950 border border-teal-700 rounded-md shadow-sm py-2 pl-10 pr-3 text-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm w-full"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-teal-700 px-4 py-2 text-gray-50 rounded-md hover:bg-teal-950 transition-colors hover:cursor-pointer"
                >
                  Search
                </button>
              </form>
            </div>

            {showForm ? (
              <div className="bg-teal-950 shadow overflow-hidden sm:rounded-lg p-6 border border-gray-700">
                <h2 className="text-lg font-medium text-white mb-4">
                  {currentProduct ? "Edit Product" : "Add New Product"}
                </h2>
                <ProductForm
                  product={currentProduct}
                  onSubmit={handleSubmitProduct}
                  onCancel={() => setShowForm(false)}
                />
              </div>
            ) : isLoading ? (
              <LoadingSpinner />
            ) : products.length === 0 ? (
              <div className="items-center justify-items-center py-20 bg-teal-950 rounded-lg border border-gray-700">
              <NotFound />
              </div>
            ) : (
              <div className="bg-gray-800 shadow overflow-hidden sm:rounded-lg border border-gray-700">
                <ProductTable
                  products={products}
                  onEdit={handleEditProduct}
                  onDelete={handleDeleteProduct}
                />

                {/* Pagination */}
                <div className="bg-gray-950 px-4 py-3 flex items-center justify-between border-t border-teal-700 sm:px-6">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-4 py-2 border rounded-md ${
                        currentPage === 1
                          ? "bg-teal-950 text-teal-400 cursor-not-allowed border-teal-950"
                          : "bg-teal-900 text-teal-200 hover:cursor-pointer hover:bg-teal-950 border-teal-900"
                      } transition-colors`}
                    >
                      Previous
                    </button>
                    <button
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className={`ml-3 relative inline-flex items-center px-4 py-2 border rounded-md ${
                        currentPage === totalPages
                          ? "bg-teal-700 text-teal-400 cursor-not-allowed border-teal-700"
                          : "bg-teal-700 text-teal-200 hover:cursor-pointer hover:bg-teal-600 border-teal-700"
                      } transition-colors`}
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-teal-300">
                        Showing{" "}
                        <span className="font-medium">
                          {(currentPage - 1) * productsPerPage + 1}
                        </span>{" "}
                        to{" "}
                        <span className="font-medium">
                          {Math.min(
                            currentPage * productsPerPage,
                            totalProducts
                          )}
                        </span>{" "}
                        of <span className="font-medium">{totalProducts}</span>{" "}
                        results
                      </p>
                    </div>
                    <div>
                      <nav
                        className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                        aria-label="Pagination"
                      >
                        <button
                          onClick={() =>
                            setCurrentPage(Math.max(1, currentPage - 1))
                          }
                          disabled={currentPage === 1}
                          className={`relative inline-flex items-center px-2 py-2 rounded-l-md border ${
                            currentPage === 1
                              ? "bg-teal-900 text-teal-400 cursor-not-allowed border-teal-600"
                              : "bg-teal-900 text-teal-300 hover:cursor-pointer hover:bg-teal-600 border-teal-600"
                          } transition-colors`}
                        >
                          <span className="sr-only">Previous</span>
                          &larr;
                        </button>

                        {/* Page numbers - limit to 5 pages for better UI */}
                        {[...Array(Math.min(5, totalPages))].map((_, i) => {
                          // Calculate page number to show
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }

                          return (
                            <button
                              key={i}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`relative inline-flex items-center px-4 py-2 border ${
                                currentPage === pageNum
                                  ? "bg-teal-600 border-teal-700 text-teal-100"
                                  : "bg-teal-900 border-teal-700 hover:cursor-pointer text-teal-100 hover:bg-teal-700"
                              } text-sm font-medium transition-colors`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}

                        <button
                          onClick={() =>
                            setCurrentPage(
                              Math.min(totalPages, currentPage + 1)
                            )
                          }
                          disabled={currentPage === totalPages}
                          className={`relative inline-flex items-center px-2 py-2 rounded-r-md border ${
                            currentPage === totalPages
                              ? "bg-teal-900 text-teal-400 cursor-not-allowed border-teal-600"
                              : "bg-teal-900 text-teal-300 hover:cursor-pointer hover:bg-teal-600 border-teal-600"
                          } transition-colors`}
                        >
                          <span className="sr-only">Next</span>
                          &rarr;
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}