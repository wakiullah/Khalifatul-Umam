export interface UserData {
  _id: string;
  phone: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UsersResponse {
  success: boolean;
  count: number;
  data: UserData[];
}
