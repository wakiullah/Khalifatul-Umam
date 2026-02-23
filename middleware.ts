import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  // ১. লগইন থাকা অবস্থায় Auth Page (Login/Signup) এ যেতে চাইলে Redirect করবে
  const isAuthPage =
    pathname === "/login" || pathname === "/signup" || pathname === "/register";

  if (isAuthPage) {
    if (token) {
      try {
        const secret = new TextEncoder().encode(
          process.env.JWT_SECRET || "secret",
        );
        await jwtVerify(token, secret);

        // টোকেন ভ্যালিড হলে ড্যাশবোর্ডে পাঠিয়ে দিবে
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } catch (error) {
        // টোকেন ইনভ্যালিড বা এক্সপায়ার্ড হলে লগইন পেজেই থাকতে দিবে
      }
    }
    // টোকেন না থাকলে স্বাভাবিকভাবে লগইন পেজে যেতে দিবে
    return NextResponse.next();
  }

  // ২. ড্যাশবোর্ড বা প্রোটেক্টেড রাউট চেক
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const secret = new TextEncoder().encode(
        process.env.JWT_SECRET || "secret",
      );
      const { payload } = await jwtVerify(token, secret);

      // রোল চেক (যদি প্রয়োজন হয়)
      if (payload.role !== "admin") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // matcher এ login, signup এবং register রাউটগুলোও যুক্ত করতে হবে
  matcher: ["/dashboard/:path*", "/login", "/signup", "/register"],
};
