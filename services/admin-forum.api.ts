"use server";

import {
  API_BASE_URL,
  getAuthHeaders,
  getAuthHeadersWithOptionalToken,
} from "@/lib/api-client";
import {
  ForumPostListResponse,
  ForumCommentListResponse,
  CreateForumPostRequest,
} from "@/type/forum";
import { revalidatePath } from "next/cache";

// Get all forum posts for admin (with pagination)
export async function getAdminForumPosts(
  page: number = 1,
  limit: number = 10,
): Promise<ForumPostListResponse> {
  const headers = await getAuthHeaders();

  const res = await fetch(
    `${API_BASE_URL}/dashboard/forum/posts?page=${page}&limit=${limit}`,
    {
      headers,
      cache: "no-store",
    },
  );
  return res.json();
}

// Get all comments for admin
export async function getAdminForumComments(): Promise<ForumCommentListResponse> {
  const headers = await getAuthHeadersWithOptionalToken();

  const res = await fetch(`${API_BASE_URL}/dashboard/forum/comments`, {
    headers,
    cache: "no-store",
  });
  return res.json();
}

// Update forum post status (admin only)
export async function updateForumPostStatus(
  postId: string,
  status: string,
): Promise<{ success: boolean; message?: string }> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/dashboard/forum/posts/${postId}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ status }),
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/dashboard/forum");
    }

    return result;
  } catch (error) {
    console.error("Error updating post status:", error);
    return { success: false, message: "Failed to update post status" };
  }
}

// Delete forum post (admin only)
export async function deleteForumPostAdmin(
  postId: string,
): Promise<{ success: boolean; message?: string }> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/dashboard/forum/posts/${postId}`, {
      method: "DELETE",
      headers,
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/dashboard/forum");
    }

    return result;
  } catch (error) {
    console.error("Error deleting post:", error);
    return { success: false, message: "Failed to delete post" };
  }
}

// Update forum post (admin only)
export async function updateForumPostAdmin(
  postId: string,
  data: Partial<CreateForumPostRequest>,
): Promise<{ success: boolean; message?: string }> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/dashboard/forum/posts/${postId}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/dashboard/forum");
    }

    return result;
  } catch (error) {
    console.error("Error updating post:", error);
    return { success: false, message: "Failed to update post" };
  }
}

// Delete comment (admin only)
export async function deleteForumCommentAdmin(
  commentId: string,
): Promise<{ success: boolean; message?: string }> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(
      `${API_BASE_URL}/dashboard/forum/comments/${commentId}`,
      {
        method: "DELETE",
        headers,
      },
    );

    const result = await res.json();

    if (result.success) {
      revalidatePath("/dashboard/forum");
    }

    return result;
  } catch (error) {
    console.error("Error deleting comment:", error);
    return { success: false, message: "Failed to delete comment" };
  }
}

// Get forum stats
export async function getForumStats(): Promise<{
  data: {
    totalPosts: number;
    totalComments: number;
    reportedPosts: number;
    activeUsers: number;
  };
}> {
  const headers = await getAuthHeaders();

  const res = await fetch(`${API_BASE_URL}/dashboard/forum/stats`, {
    headers,
    cache: "no-store",
  });
  return res.json();
}
