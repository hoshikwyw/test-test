// types.ts
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface InvoiceData {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  customerEmail: string;
  date: string;
}