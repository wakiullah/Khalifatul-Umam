"use server";

import { cookies } from "next/headers";
import {
  API_BASE_URL,
  getAuthHeadersWithOptionalToken,
  getAuthHeaders,
} from "@/lib/api-client";
import {
  CreateForumPostRequest,
  ForumPostListResponse,
  ForumCommentListResponse,
  ForumCommentResponse,
} from "@/type/forum";

export async function getFormPostsPublicData(
  page: number = 1,
  limit: number = 3,
): Promise<ForumPostListResponse> {
  const headers = await getAuthHeadersWithOptionalToken();

  const res = await fetch(
    `${API_BASE_URL}/public/forum/posts?page=${page}&limit=${limit}`,
    {
      headers,
      cache: "no-store",
    },
  );
  return res.json();
}

export async function createForumPost(data: CreateForumPostRequest) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/public/forum/posts`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteForumPost(id: string) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/public/forum/posts/${id}`, {
    method: "DELETE",
    headers,
  });
  return res.json();
}

export async function updateForumPost(
  id: string,
  data: Partial<CreateForumPostRequest>,
) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/public/forum/posts/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getForumPostComments(
  postId: string,
): Promise<ForumCommentListResponse> {
  const res = await fetch(
    `${API_BASE_URL}/public/forum/posts/${postId}/comments`,
    {
      cache: "no-store",
    },
  );
  return res.json();
}

export async function addForumPostComment(
  postId: string,
  comment: string,
  userId: string,
): Promise<ForumCommentResponse> {
  const headers = await getAuthHeaders();
  console.log("Adding comment:", { postId, comment, userId });
  const res = await fetch(`${API_BASE_URL}/public/forum/comments`, {
    method: "POST",
    headers,
    body: JSON.stringify({ content: comment, author: userId, postId }),
  });
  return res.json();
}

export async function addForumPostReaction(
  postId: string,
  reaction: string,
  userId: string,
) {
  const headers = await getAuthHeaders();
  console.log("Adding reaction:", { postId, reaction, userId });
  const res = await fetch(
    `${API_BASE_URL}/public/forum/posts/${postId}/react`,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ reactionType: reaction, userId }),
    },
  );
  console.log("Reaction response:", res);
  return res.json();
}
