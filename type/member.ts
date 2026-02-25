// Member Application Data
export interface MemberData {
  _id: string;
  full_name: string;
  father_name: string;
  mother_name: string;
  date_of_birth: string;
  gender: "পুরুষ" | "মহিলা";
  religion?: string;
  nationality?: string;
  nid_number?: string;
  phone: string;
  email?: string;
  present_address: string;
  permanent_address: string;
  occupation?: string;
  education?: string;
  blood_group?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-" | "";
  reason_to_join?: string;
  reference_name?: string;
  reference_phone?: string;
  status: "Pending" | "Approved" | "Rejected";
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

// Create Member Request (POST)
export interface CreateMemberRequest {
  full_name: string;
  father_name: string;
  mother_name: string;
  date_of_birth: string;
  gender: "পুরুষ" | "মহিলা";
  religion?: string;
  nationality?: string;
  nid_number?: string;
  phone: string;
  email?: string;
  present_address: string;
  permanent_address: string;
  occupation?: string;
  education?: string;
  blood_group?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-" | "";
  reason_to_join?: string;
  reference_name?: string;
  reference_phone?: string;
}

// Update Member Request (PATCH)
export interface UpdateMemberRequest {
  full_name?: string;
  father_name?: string;
  mother_name?: string;
  date_of_birth?: string;
  gender?: "পুরুষ" | "মহিলা";
  religion?: string;
  nationality?: string;
  nid_number?: string;
  phone?: string;
  email?: string;
  present_address?: string;
  permanent_address?: string;
  occupation?: string;
  education?: string;
  blood_group?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-" | "";
  reason_to_join?: string;
  reference_name?: string;
  reference_phone?: string;
  status?: "Pending" | "Approved" | "Rejected";
}

// API Response Types
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface MemberResponse {
  success: boolean;
  message?: string;
  data: MemberData;
}

export interface MembersListResponse {
  data: MemberData[];
  meta: PaginationMeta;
}
