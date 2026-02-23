"use server";

import {
  CreateSayingRequest,
  SayingListResponse,
  SayingResponse,
  UpdateSayingRequest,
} from "@/type/saying";
import {
  API_BASE_URL,
  getPublicHeaders,
  getAuthHeaders,
} from "@/lib/api-client";

export async function getSayingsData(): Promise<SayingListResponse> {
  const res = await fetch(`${API_BASE_URL}/public/sayings`, {
    cache: "no-store",
  });
  return res.json();
}

export async function getSingleSayingData(id: string): Promise<SayingResponse> {
  const res = await fetch(`${API_BASE_URL}/public/sayings/${id}`, {
    cache: "no-store",
  });
  return res.json();
}

export async function createSaying(
  data: CreateSayingRequest,
): Promise<SayingResponse> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/dashboard/sayings`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateSaying(
  id: string,
  data: UpdateSayingRequest,
): Promise<SayingResponse> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/dashboard/sayings/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteSaying(id: string): Promise<SayingResponse> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/dashboard/sayings/${id}`, {
    method: "DELETE",
    headers,
  });
  return res.json();
}
