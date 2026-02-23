import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col">
        <div className="flex flex-1 flex-col items-center justify-center bg-background text-foreground p-4 text-center">
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">
            পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md">
            দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন তা আমরা খুঁজে পাইনি। এটি হয়তো সরানো
            হয়েছে বা এর অস্তিত্ব নেই।
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
