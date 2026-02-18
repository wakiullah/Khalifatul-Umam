export interface BookData {
  _id: string;
  title: string;
  arabic_title: string;
  description: string;
  volumes: string;
  language: string;
  is_featured: boolean;
  is_published: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface BooksResponse {
  success: boolean;
  count: number;
  data: BookData[];
}

export interface CreateBookRequest {
  title: string;
  arabic_title: string;
  description: string;
  volumes: string;
  language: string;
  is_featured: boolean;
  is_published: boolean;
}
export interface UpdateBookRequest {
  title?: string;
  arabic_title?: string;
  description?: string;
  volumes?: string;
  language?: string;
  is_featured?: boolean;
  is_published?: boolean;
}