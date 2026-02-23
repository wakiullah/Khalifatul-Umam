export interface NewsData {
  _id: string;
  title: string;
  excerpt: string;
  image_url?: string;
  author?: string;
  category: string;
  read_time?: string;
  is_featured: boolean;
  is_published: boolean;
  published_at?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface NewsResponse {
  success: boolean;
  message: string;
  data: NewsData;
}

export interface NewsListResponse {
  success: boolean;
  count?: number;
  message?: string;
  data: NewsData[];
}

export interface CreateNewsRequest {
  title: string;
  excerpt: string;
  image_url?: string;
  author?: string;
  category: string;
  read_time?: string;
  is_featured?: boolean;
  is_published?: boolean;
  published_at?: string;
}

export type UpdateNewsRequest = Partial<CreateNewsRequest>;
