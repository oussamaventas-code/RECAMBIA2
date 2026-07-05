export type StockLevel = "alto" | "bajo" | "agotado";

export interface Brand {
  slug: string;
  name: string;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  refCount: number;
}

export interface Vehicle {
  plate: string;
  make: string;
  model: string;
  engine: string;
  year: number;
}

export interface Review {
  id: string;
  author: string;
  vehicle: string;
  part: string;
  rating: number;
  text: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  brand: string;
  oemRef: string;
  equivalentRefs: string[];
  price: number;
  compareAtPrice?: number;
  stock: StockLevel;
  deliveryTomorrow: boolean;
  images: string[];
  compatibleWith: string[];
  specs: ProductSpec[];
  crossSell: string[];
  rating: number;
  reviewCount: number;
}
