"use server";

import { CreateGalleryRequest, GalleryListResponse } from "@/type/gallery";
import {
  API_BASE_URL,
  getPublicHeaders,
  getAuthHeaders,
} from "@/lib/api-client";

export async function getGalleryData(): Promise<GalleryListResponse> {
  const res = await fetch(`${API_BASE_URL}/public/gallery`, {
    cache: "no-store",
  });
  return res.json();
}

export async function createGallery(data: CreateGalleryRequest) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/dashboard/gallery`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateGallery(
  id: string,
  data: Partial<CreateGalleryRequest>,
) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/dashboard/gallery/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteGallery(id: string) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/dashboard/gallery/${id}`, {
    method: "DELETE",
    headers,
  });
  return res.json();
}
