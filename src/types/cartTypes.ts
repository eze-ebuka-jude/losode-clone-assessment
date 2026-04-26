import { ProductDataType } from "./productDataType";

export interface CartItem {
  productId: number;
  quantity: number;
  product: ProductDataType;
}

export interface CartState {
  items: CartItem[];
  status: "idle" | "loading";
}
