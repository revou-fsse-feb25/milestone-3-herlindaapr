// __tests__/getCategories.test.ts
import axios from "axios";
import { getCategories } from "./categoryServices"; // Adjust path as needed
import { DataCategory } from "../types/index.types";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getCategories", () => {
  it("should return categories and total from response", async () => {
    const mockData: DataCategory[] = [
      { id: 1, name: "Electronics", slug: "electronics", image: "image1.jpg" },
      { id: 2, name: "Books", slug: "books", image: "image2.jpg" },
    ];

    mockedAxios.get.mockResolvedValueOnce({
      data: mockData,
      headers: {
        "x-total-count": 42,
      },
    });

    const result = await getCategories();

    expect(mockedAxios.get).toHaveBeenCalledWith("https://api.escuelajs.co/api/v1/categories");
    expect(result).toEqual({
      categories: mockData,
      total: 42,
    });
  });

  it("should fallback to response length if header is missing", async () => {
    const mockData: DataCategory[] = [
      { id: 1, name: "Toys", slug: "toys", image: "image3.jpg" },
      { id: 2, name: "Furniture", slug: "furniture", image: "image4.jpg" },
    ];

    mockedAxios.get.mockResolvedValueOnce({
      data: mockData,
      headers: {}, // No x-total-count
    });

    const result = await getCategories();

    expect(result.total).toBe(2);
    expect(result.categories).toEqual(mockData);
  });

  it("should return empty array and 0 total on error", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network error"));

    const result = await getCategories();

    expect(result).toEqual({
      categories: [],
      total: 0,
    });
  });
});
