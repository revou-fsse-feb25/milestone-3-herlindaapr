import axios from "axios";
import { DataCategory } from "../types/index.types";

const API_URL = "https://api.escuelajs.co/api/v1";


export async function getCategories(

): Promise<{ categories: DataCategory[]; total: number }> {
  try {
    let url = `${API_URL}/categories`;
    const response = await axios.get(url);

    return {
      categories: response.data,
      total: response.headers["x-total-count"] || response.data.length,
    };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { categories: [], total: 0 };
  }
}
