// src/app/actions/memberActions.ts
"use server";
import { revalidatePath } from "next/cache";
import { MemberData } from "@/type/member";

export type ActionResponse = {
  success: boolean;
  message: string;
  member?: MemberData;
};

export async function createMemberAction(
  data: MemberData,
): Promise<ActionResponse> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/members`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
