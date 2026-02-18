"use server";

import { BooksResponse, CreateBookRequest, UpdateBookRequest } from "@/type/book";

export async function getBooksData(): Promise<BooksResponse> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/books`);
  return res.json();
}

export async function createBook(data:CreateBookRequest) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/books`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateBook(id: string, data: Partial<UpdateBookRequest>) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/books/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteBook(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/books/${id}`, {
    method: "DELETE",
  });
  return res.json();
}