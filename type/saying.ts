export interface SayingData {
  _id: string;
  arabic: string;
  translation: string;
  context?: string;
  is_featured: boolean;
  is_published: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SayingResponse {
  success: boolean;
  message: string;
  data: SayingData;
}

export interface SayingListResponse {
  success: boolean;
  count?: number;
  message?: string;
  data: SayingData[];
}

export interface CreateSayingRequest {
  arabic: string;
  translation: string;
  context?: string;
  is_featured?: boolean;
  is_published?: boolean;
}

export type UpdateSayingRequest = Partial<CreateSayingRequest>;
