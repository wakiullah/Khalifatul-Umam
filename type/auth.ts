export interface RegisterRequest {
  phone: string;
  password: string;
}

export interface LoginRequest {
  phone: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  data?: {
    _id: string;
    phone: string;
    role: string;
  };
}
