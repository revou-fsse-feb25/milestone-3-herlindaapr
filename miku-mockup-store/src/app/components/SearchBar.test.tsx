// SearchBar.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar"; // Adjust the path as needed

describe("SearchBar", () => {
  it("renders input and button", () => {
    const mockHandleSearch = jest.fn();
    render(<SearchBar handleSearch={mockHandleSearch} />);

    expect(screen.getByPlaceholderText(/search for product/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("calls handleSearch with input value on click", () => {
    const mockHandleSearch = jest.fn();
    render(<SearchBar handleSearch={mockHandleSearch} />);

    const input = screen.getByPlaceholderText(/search for product/i);
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "laptop" } });
    fireEvent.click(button);

    expect(mockHandleSearch).toHaveBeenCalledWith("laptop");
  });

  it("calls handleSearch with empty string if input is only whitespace", () => {
    const mockHandleSearch = jest.fn();
    render(<SearchBar handleSearch={mockHandleSearch} />);

    const input = screen.getByPlaceholderText(/search for product/i);
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "    " } });
    fireEvent.click(button);

    expect(mockHandleSearch).toHaveBeenCalledWith("");
  });
});
