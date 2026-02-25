"use server";

import {
  API_BASE_URL,
  getPublicHeaders,
  getAuthHeaders,
} from "@/lib/api-client";
import {
  MembersListResponse,
  CreateMemberRequest,
  MemberResponse,
  UpdateMemberRequest,
} from "@/type/member";

// Public API - Anyone can submit member application
export async function createMemberApplication(
  data: CreateMemberRequest,
): Promise<MemberResponse> {
  const headers = await getPublicHeaders();
  const res = await fetch(`${API_BASE_URL}/public/members`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  return res.json();
}

// Admin APIs - Protected routes
export async function getAllMembers(): Promise<MembersListResponse> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/public/members`, {
      headers,
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch members: ${res.status} ${res.statusText}`,
      );
    }

    const data = await res.json();
    return data;
  } catch {
    return {
      data: [],
      meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
    };
  }
}

export async function getMemberById(id: string): Promise<MemberResponse> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/dashboard/members/${id}`, {
    headers,
    cache: "no-store",
  });
  return res.json();
}

export async function updateMember(
  id: string,
  data: UpdateMemberRequest,
): Promise<MemberResponse> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/dashboard/members/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function approveMember(id: string): Promise<MemberResponse> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/dashboard/members/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ status: "Approved" }),
  });
  return res.json();
}

export async function rejectMember(id: string): Promise<MemberResponse> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/dashboard/members/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ status: "Rejected" }),
  });
  return res.json();
}

export async function deleteMember(id: string): Promise<MemberResponse> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/dashboard/members/${id}`, {
    method: "DELETE",
    headers,
  });
  return res.json();
}
