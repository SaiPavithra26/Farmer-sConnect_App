export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  images: string[];
  farmerId: string;
  farmerName: string;
  farmerImage?: string;
  farmLocation: string;
  stock: number;
  isOrganic: boolean;
  harvestDate: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}