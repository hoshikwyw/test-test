export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  lastUpdated: string;
}

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Laptop",
    category: "Electronics",
    price: 999.99,
    stock: 15,
    lastUpdated: "2023-05-15",
  },
  {
    id: 2,
    name: "Smartphone",
    category: "Electronics",
    price: 699.99,
    stock: 32,
    lastUpdated: "2023-06-20",
  },
  {
    id: 3,
    name: "Desk Chair",
    category: "Furniture",
    price: 149.99,
    stock: 8,
    lastUpdated: "2023-04-10",
  },
  {
    id: 4,
    name: "Coffee Mug",
    category: "Kitchen",
    price: 12.99,
    stock: 45,
    lastUpdated: "2023-07-01",
  },
  {
    id: 5,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 199.99,
    stock: 22,
    lastUpdated: "2023-06-15",
  },
  // Add more products as needed
];
