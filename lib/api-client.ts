import { cookies } from "next/headers";

/**
 * Get authorization headers with Bearer token from cookies
 * Used for protected dashboard API routes
 */
export async function getAuthHeaders(): Promise<HeadersInit> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function getAuthHeadersWithOptionalToken(): Promise<HeadersInit> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

/**
 * Get standard headers without authentication
 * Used for public API routes
 */
export async function getPublicHeaders(): Promise<HeadersInit> {
  return {
    "Content-Type": "application/json",
  };
}

/**
 * Base API URL
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
