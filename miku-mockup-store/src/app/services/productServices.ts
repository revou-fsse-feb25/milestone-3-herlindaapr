import axios from "axios";
import { DataProduct } from "../types/index.types";

const API_URL = "https://api.escuelajs.co/api/v1";


export async function getProducts(
  limit: number = 10,
  offset: number = 0,
  title: string = ""
): Promise<{ products: DataProduct[]; total: number }> {
  try {
    // If there's a title search, use the filter endpoint
    let url = `${API_URL}/products`;

    const searchParams = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString(),
      title: title ? encodeURIComponent(title) : "",
    });

  
    url = `${API_URL}/products?${searchParams}`;
     

    const response = await axios.get(url);

    return {
      products: response.data,
      total: response.headers["x-total-count"] || response.data.length,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], total: 0 };
  }
}

export async function getProductById(id: number): Promise<DataProduct | null> {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    return null;
  }
}

export async function createProduct(
  product: Omit<DataProduct, "id">
): Promise<DataProduct | null> {
  try {
    const response = await axios.post(`${API_URL}/products`, product);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    return null;
  }
}

export async function updateProduct(
  id: number,
  product: Partial<DataProduct>
): Promise<DataProduct | null> {
  try {
    const response = await axios.put(`${API_URL}/products/${id}`, product);
    return response.data;
  } catch (error) {
    console.error(`Error updating product with id ${id}:`, error);
    return null;
  }
}

export async function deleteProduct(id: number): Promise<boolean> {
  try {
    await axios.delete(`${API_URL}/products/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting product with id ${id}:`, error);
    return false;
  }
}
