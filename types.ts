export interface UserProfile {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
}

export interface UserSession {
  user: {
    id: string;
    name: string;
    image: string;
  } | null; // user может быть null
}

export interface ClothImage {
  id: number;
  url: string | null;
  postId: number | null;
  clothId: number | null;
}

export interface Cloth {
  id: number;
  name: string;
  rating: number;
  isAd: string;
  userId: string | null;
  image: ClothImage[];
}

export interface OutfitType {
  id: number;
  title?: string;
  description?: string;
  cloths: Cloth[];
}