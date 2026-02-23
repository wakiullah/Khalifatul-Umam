// src/app/actions/memberActions.ts
"use server";
import { revalidatePath } from "next/cache";
import { MemberData } from "@/type/member";
import {
  API_BASE_URL,
  getPublicHeaders,
  getAuthHeaders,
} from "@/lib/api-client";

export type ActionResponse = {
  success: boolean;
  message: string;
  member?: MemberData;
};

// Public route - anyone can create member application
export async function createMemberAction(
  data: MemberData,
): Promise<ActionResponse> {
  try {
    const headers = await getPublicHeaders();
    const res = await fetch(`${API_BASE_URL}/members`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    console.log(res);

    if (!res.ok) {
      return { success: false, message: "Failed to create member" };
    }

    // পেজ রিফ্রেশ করবে
    revalidatePath("/members");
    return { success: true, message: "Member created successfully" };
  } catch (error) {
    return { success: false, message: "Something went wrong" };
  }
}

// Protected route - only admins can view member applications
export async function getMembersData(): Promise<any> {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_BASE_URL}/members`, {
      headers,
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    return { success: false, message: "Failed to fetch members" };
  }
}
