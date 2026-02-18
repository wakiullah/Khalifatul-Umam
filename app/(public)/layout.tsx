import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen">
      <Header />
      {children}
      <Footer />
    </main>
  );
}

export default layout;
