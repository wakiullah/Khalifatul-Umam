"use server";

import { CreateDownloadRequest, DownloadsResponse } from "@/type/downloads";
import {
  API_BASE_URL,
  getPublicHeaders,
  getAuthHeaders,
} from "@/lib/api-client";

export async function getDownloadsData(): Promise<DownloadsResponse> {
  const res = await fetch(`${API_BASE_URL}/public/downloads`, {
    cache: "no-store",
  });
  return res.json();
}

export async function createDownload(data: CreateDownloadRequest) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/dashboard/downloads`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateDownload(
  id: string,
  data: Partial<CreateDownloadRequest>,
) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/dashboard/downloads/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteDownload(id: string) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/dashboard/downloads/${id}`, {
    method: "DELETE",
    headers,
  });
  return res.json();
}
