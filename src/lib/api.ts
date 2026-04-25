import axios from "axios";
import { ProductDataType } from "../types/productDataType";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export interface ProductsResponse {
  products: ProductDataType[];
  total: number;
  skip: number;
  limit: number;
}

export interface CategoryOption {
  label: string;
  value: string;
}

type Params = {
  limit: number;
  skip: number;
  q?: string;
};

export const getProducts = async (
  page: number,
  limit: number,
  search: string,
  category?: string
) => {
  const skip = (page - 1) * limit;

  let url = `${API_URL}/products`;
  const params: Params = { limit, skip };

  if (search) {
    url = `${API_URL}/products/search`;
    params.q = search;
  }

  else if (category && category !== "all") {
    url = `${API_URL}/products/category/${category}`;
  }

  const { data } = await axios.get(url, { params });

  return data;
};

export const getProductById = async (id: string) => {
  const { data } = await axios.get(
    `${API_URL}/products/${id}`
  );
  return data;
};

export const getCategories = async (): Promise<CategoryOption[]> => {
  const { data } = await axios.get(
    `${API_URL}/products/categories`
  );

  return data
};