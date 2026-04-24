import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const getProducts = async () => {
  const { data } = await axios.get(
    `${API_URL}/products`
  );

  return data;
};

export const getProductById = async (id: string) => {
  const { data } = await axios.get(
    `${API_URL}/products/${id}`
  );
  return data;
};