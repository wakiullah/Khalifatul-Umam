"use server";

import { SettingsResponse, UpdateSettingsRequest } from "@/type/settings";
import {
  API_BASE_URL,
  getPublicHeaders,
  getAuthHeaders,
} from "@/lib/api-client";

export async function getSettings(): Promise<SettingsResponse> {
  const res = await fetch(`${API_BASE_URL}/public/settings`, {
    cache: "no-store",
  });
  return res.json();
}

export async function updateSettings(
  data: UpdateSettingsRequest,
): Promise<SettingsResponse> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/dashboard/settings`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(data),
  });
  return res.json();
}
