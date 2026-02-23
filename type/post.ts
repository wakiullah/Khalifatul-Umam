export interface PostData {
  _id: string;
  title: string;
  content: string;
  excerpt?: string;
  image_url?: string;
  author_name?: string;
  category: string;
  status?: string;
  views?: number;
  is_featured?: boolean;
  published_at?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PostResponse {
  success: boolean;
  message: string;
  data: PostData;
}

export interface PostListResponse {
  success: boolean;
  count?: number;
  message?: string;
  data: PostData[];
}

export interface CreatePostRequest {
  title: string;
  content: string;
  excerpt?: string;
  image_url?: string;
  author_name?: string;
  category: string;
  status?: string;
  is_featured?: boolean;
}

export type UpdatePostRequest = Partial<CreatePostRequest>;
