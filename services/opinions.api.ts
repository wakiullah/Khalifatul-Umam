"use server";

import { API_BASE_URL, getAuthHeaders } from "@/lib/api-client";
import {
  OpinionsListResponse,
  CreateOpinionRequest,
  OpinionResponse,
} from "@/type/opinions";

export async function getOpinionsData(): Promise<OpinionsListResponse> {
  const res = await fetch(`${API_BASE_URL}/public/opinions`, {
    cache: "no-store",
  });
  return res.json();
}

export async function createOpinion(
  data: CreateOpinionRequest,
): Promise<OpinionsListResponse> {
  const res = await fetch(`${API_BASE_URL}/public/opinions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Admin APIs
export async function getAllOpinions(): Promise<OpinionsListResponse> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/dashboard/opinions`, {
      headers,
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch opinions: ${res.status} ${res.statusText}`,
      );
    }

    const data = await res.json();
    return data;
  } catch (error) {
    // Return empty response on error
    return { success: false, count: 0, data: [] };
  }
}

export async function approveOpinion(id: string): Promise<OpinionResponse> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/dashboard/opinions/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ isApproved: true }),
  });
  return res.json();
}

export async function unapproveOpinion(id: string): Promise<OpinionResponse> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/dashboard/opinions/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ isApproved: false }),
  });
  return res.json();
}

export async function deleteOpinion(id: string): Promise<OpinionResponse> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/dashboard/opinions/${id}`, {
    method: "DELETE",
    headers,
  });
  return res.json();
}
