"use server";

import {
  BooksResponse,
  CreateBookRequest,
  UpdateBookRequest,
} from "@/type/book";
import {
  API_BASE_URL,
  getPublicHeaders,
  getAuthHeaders,
} from "@/lib/api-client";

export async function getBooksData(): Promise<BooksResponse> {
  const res = await fetch(`${API_BASE_URL}/public/books`, {
    cache: "no-store",
  });
  return res.json();
}

export async function createBook(data: CreateBookRequest) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/dashboard/books`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateBook(id: string, data: Partial<UpdateBookRequest>) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/dashboard/books/${id}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteBook(id: string) {
  const headers = await getAuthHeaders();
  const res = await fetch(`${API_BASE_URL}/dashboard/books/${id}`, {
    method: "DELETE",
    headers,
  });
  return res.json();
}
