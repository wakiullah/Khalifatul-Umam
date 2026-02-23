import Link from "next/link";

export default function DashboardNotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-background text-foreground p-4 text-center">
      <h1 className="text-4xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-xl font-semibold mb-4">
        ড্যাশবোর্ড পৃষ্ঠা পাওয়া যায়নি
      </h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        দুঃখিত, অনুরোধ করা ড্যাশবোর্ড রিসোর্সটি খুঁজে পাওয়া যায়নি।
      </p>
      <Link
        href="/dashboard"
        className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      >
        ড্যাশবোর্ডে ফিরে যান
      </Link>
    </div>
  );
}
