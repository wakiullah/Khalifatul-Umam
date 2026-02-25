"use server";

import { BiographyData, BiographyResponse } from "@/type/biography";
import {
  API_BASE_URL,
  getPublicHeaders,
  getAuthHeaders,
} from "@/lib/api-client";

export async function getBiographyData(): Promise<BiographyResponse> {
  const res = await fetch(`${API_BASE_URL}/public/biography`, {
    cache: "no-store",
  });
  return res.json();
}

export async function updateBiographyData(data: Partial<BiographyData> | any) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/dashboard/biography`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(data),
  });
  return res.json();
}
