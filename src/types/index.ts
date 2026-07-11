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
  // Pack/kit genérico (no ligado a una referencia OEM exacta) en vez de
  // pieza de encaje preciso — ver PACK_BADGE en ProductCard.
  isPack?: boolean;
}
