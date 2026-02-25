export interface Opinion {
  _id: string;
  name: string;
  location: string;
  title: string;
  text: string;
  rating: number;
  isApproved: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface OpinionsListResponse {
  success: boolean;
  count: number;
  data: Opinion[];
}

export interface OpinionResponse {
  success: boolean;
  data: Opinion;
}

export interface CreateOpinionRequest {
  name: string;
  email: string;
  location?: string;
  title?: string;
  opinion: string;
}

export interface UpdateOpinionRequest {
  name?: string;
  email?: string;
  location?: string;
  title?: string;
  opinion?: string;
  rating?: number;
  isApproved?: boolean;
}
