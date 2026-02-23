"use server";

import {
  CreateNewsRequest,
  NewsListResponse,
  NewsResponse,
  UpdateNewsRequest,
} from "@/type/news";
import {
  API_BASE_URL,
  getPublicHeaders,
  getAuthHeaders,
} from "@/lib/api-client";

export async function getNewsData(): Promise<NewsListResponse> {
  const res = await fetch(`${API_BASE_URL}/public/news`, { cache: "no-store" });
  return res.json();
}

export async function getSingleNewsData(id: string): Promise<NewsResponse> {
  const res = await fetch(`${API_BASE_URL}/public/news/${id}`, {
    cache: "no-store",
  });
  return res.json();
}

export async function createNews(
  data: CreateNewsRequest,
): Promise<NewsResponse> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/dashboard/news`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateNews(
  id: string,
  data: UpdateNewsRequest,
): Promise<NewsResponse> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/dashboard/news/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteNews(id: string): Promise<NewsResponse> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/dashboard/news/${id}`, {
    method: "DELETE",
    headers,
  });
  return res.json();
}
