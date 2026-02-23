"use server";

import { API_BASE_URL, getAuthHeaders } from "@/lib/api-client";
import { UsersResponse } from "@/type/user";

export async function getUsers(): Promise<UsersResponse> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/dashboard/users`, {
    headers,
    cache: "no-store",
  });
  return res.json();
}

export async function deleteUser(id: string) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/dashboard/users/${id}`, {
    method: "DELETE",
    headers,
  });
  return res.json();
}

export async function updateUserRole(id: string, role: string) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/dashboard/users/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ role }),
  });
  return res.json();
}
