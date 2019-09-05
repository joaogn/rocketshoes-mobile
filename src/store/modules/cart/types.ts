export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  amount: number;
  priceFormatterd?: string;
}

export interface Action {
  type: string;
  product: Product;
  id?: number;
  amount?: number;
}
