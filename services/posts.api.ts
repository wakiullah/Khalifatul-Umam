"use server";

import {
  CreatePostRequest,
  PostListResponse,
  PostResponse,
  UpdatePostRequest,
} from "@/type/post";
import {
  API_BASE_URL,
  getPublicHeaders,
  getAuthHeaders,
} from "@/lib/api-client";

export async function getPostsData(): Promise<PostListResponse> {
  const res = await fetch(`${API_BASE_URL}/public/posts`, {
    cache: "no-store",
  });
  return res.json();
}

export async function getSinglePostData(id: string): Promise<PostResponse> {
  const res = await fetch(`${API_BASE_URL}/public/posts/${id}`, {
    cache: "no-store",
  });
  return res.json();
}

export async function createPost(
  data: CreatePostRequest,
): Promise<PostResponse> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/dashboard/posts`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updatePost(
  id: string,
  data: UpdatePostRequest,
): Promise<PostResponse> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/dashboard/posts/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deletePost(id: string): Promise<PostResponse> {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/dashboard/posts/${id}`, {
    method: "DELETE",
    headers,
  });
  return res.json();
}
