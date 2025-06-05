import axios from "axios";
import { getProducts, getProductById, createProduct } from "./productServices";
import { DataProduct } from "../types/index.types";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("productServices", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getProducts", () => {
    it("should return products and total from response", async () => {
      const mockData: DataProduct[] = [{ id: 1, title: "Test Product", price: 100, description: "", category: { id: 1, name: "", image: "" }, categoryId: 1, images: [] }];
      mockedAxios.get.mockResolvedValueOnce({
        data: mockData,
        headers: { "x-total-count": "1" },
      });

      const result = await getProducts(10, 0, "");
      expect(result).toEqual({ products: mockData, total: "1" });
      expect(mockedAxios.get).toHaveBeenCalled();
    });

    it("should handle errors and return empty list", async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error("Network Error"));

      const result = await getProducts();
      expect(result).toEqual({ products: [], total: 0 });
    });
  });

  describe("getProductById", () => {
    it("should return a product by ID", async () => {
      const mockProduct: DataProduct = { id: 1, title: "Test", price: 100, description: "", category: { id: 1, name: "", image: "" }, categoryId: 1, images: [] };
      mockedAxios.get.mockResolvedValueOnce({ data: mockProduct });

      const result = await getProductById(1);
      expect(result).toEqual(mockProduct);
    });

    it("should handle errors and return null", async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error("Error"));

      const result = await getProductById(999);
      expect(result).toBeNull();
    });
  });

  describe("createProduct", () => {
    it("should create and return a product", async () => {
      const inputProduct = { title: "New", price: 50, description: "", category: { id: 1, name: "", image: "" }, categoryId: 1, images: [] };
      const createdProduct = { ...inputProduct, id: 2 };

      mockedAxios.post.mockResolvedValueOnce({ data: createdProduct });

      const result = await createProduct(inputProduct);
      expect(result).toEqual(createdProduct);
    });

    it("should handle errors and return null", async () => {
      mockedAxios.post.mockRejectedValueOnce(new Error("Error"));

      const result = await createProduct({
        title: "Fail",
        price: 0,
        description: "",
        category: { id: 1, name: "", image: "" },
        categoryId: 1,
        images: [],
      });

      expect(result).toBeNull();
    });
  });
});
