// Import test tools
import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import ProductList from "./ProductList";

// Mock the getProducts function from productServices
jest.mock("../services/productServices", () => ({
  getProducts: jest.fn(),
}));

// Now import getProducts after mocking it above
import { getProducts } from "../services/productServices";

// Mock simple versions of child components
jest.mock("./ProductCard", () => ({ product }: any) => (
  <div>{product.title}</div>
));
jest.mock("./SearchBar", () => ({ handleSearch }: any) => (
  <input
    data-testid="search-bar"
    placeholder="Search..."
    onChange={(e) => handleSearch(e.target.value)}
  />
));
jest.mock("./LoadingSpinner", () => () => <div>Loading...</div>);
jest.mock("./NotFound", () => () => <div>No products found</div>);

// Test starts here
describe("ProductList Component", () => {
  // Sample mock product
  const mockProducts = [
    {
      id: 1,
      title: "Test Product",
      price: 100,
      description: "Sample",
      category: { id: 1, name: "Category", image: "" },
      images: [],
    },
  ];

  // Reset mocks before each test
  beforeEach(() => {
    (getProducts as jest.Mock).mockResolvedValue({
      products: mockProducts,
      total: 1,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Show loading, then show product
  it("should show loading first, then render products", async () => {
    render(<ProductList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/test product/i)).toBeInTheDocument();
    });
  });

  // Test 2: If API returns no products
  it("should show NotFound when no products are returned", async () => {
    (getProducts as jest.Mock).mockResolvedValueOnce({
      products: [],
      total: 0,
    });

    render(<ProductList />);

    await waitFor(() => {
      expect(screen.getByText(/no products found/i)).toBeInTheDocument();
    });
  });

  // Test 3: Test the search input
  it("should trigger search and update product list", async () => {
    render(<ProductList />);

    const searchInput = screen.getByTestId("search-bar");

    // Simulate entering text to search
    fireEvent.change(searchInput, { target: { value: "shoes" } });

    await waitFor(() => {
      expect(screen.getByText(/test product/i)).toBeInTheDocument();
    });
  });
});
