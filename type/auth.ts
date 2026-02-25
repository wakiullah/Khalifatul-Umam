export interface RegisterRequest {
  name: string;
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
    name: string;
    phone: string;
    role: string;
  };
}
