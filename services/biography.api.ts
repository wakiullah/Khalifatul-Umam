"use server";

import { BiographyResponse } from "@/type/biography";

export async function getBiographyData(): Promise<BiographyResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/dashboard/biography`,
  );
  return res.json();
}

export async function updateBiographyData(data: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/dashboard/biography`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
  );
  return res.json();
}
