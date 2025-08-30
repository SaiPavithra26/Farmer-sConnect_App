
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: 'farmer' | 'customer';
  profileImage?: string;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  farmerProfile?: {
    farmName: string;
    farmSize: string;
    experience: string;
    specialization: string[];
    certifications: string[];
    bio: string;
  };
  createdAt: string;
  updatedAt: string;
}