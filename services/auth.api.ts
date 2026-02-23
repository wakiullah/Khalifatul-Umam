"use server";

import { AuthResponse, LoginRequest, RegisterRequest } from "@/type/auth";
import { cookies } from "next/headers";
import {
  API_BASE_URL,
  getPublicHeaders,
  getAuthHeaders,
} from "@/lib/api-client";

export async function registerUser(
  data: RegisterRequest,
): Promise<AuthResponse> {
  console.log(data);

  const headers = await getPublicHeaders();
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  console.log(res);
  return res.json();
}

export async function loginUser(data: LoginRequest): Promise<AuthResponse> {
  const headers = await getPublicHeaders();
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
    credentials: "include",
  });

  const result = await res.json();

  if (result?.success && result?.token) {
    const cookieStore = await cookies();
    cookieStore.set("token", result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 60 * 60, // ১ দিন (সেকেন্ডে)
    });
  }

  return result;
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers,
    });
    const result = await res.json();
    return result.success ? result.data : null;
  } catch (error) {
    return null;
  }
}
