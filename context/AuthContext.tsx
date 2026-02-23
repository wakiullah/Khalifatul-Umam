"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, logoutUser } from "@/services/auth.api";

interface User {
  _id: string;
  phone: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  checkUser: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // অ্যাপ লোড হওয়ার সাথে সাথে ইউজার চেক করবে
  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const user = await getCurrentUser();
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, checkUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// কাস্টম হুক যাতে যেকোনো পেজ থেকে সহজে কল করা যায়
export const useAuth = () => useContext(AuthContext);
