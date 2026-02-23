export interface GalleryData {
  _id: string;
  title: string;
  description?: string;
  image_url: string;
  category: string;
  views: number;
  is_published: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GalleryResponse {
  success: boolean;
  message: string;
  data: GalleryData;
}

export interface GalleryListResponse {
  success: boolean;
  message: string;
  data: GalleryData[];
}

export interface CreateGalleryRequest {
  title: string;
  description: string;
  image_url: string;
  category?: string;
  is_published?: boolean;
  views?: number;
}