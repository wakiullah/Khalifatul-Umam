import BooksManager from "@/components/dashboard/BooksManager";
import { getBooksData } from "@/services/books.api";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Star, Eye, EyeOff } from "lucide-react";

export default async function BooksPage() {
  const { data } = await getBooksData();

  const latestUpdate = data.reduce(
    (latest, book) =>
      new Date(book.updatedAt) > new Date(latest) ? book.updatedAt : latest,
    "",
  );
  const key = `${data.length}-${latestUpdate}`;

  const featuredCount = data.filter((b) => b.is_featured).length;
  const publishedCount = data.filter((b) => b.is_published).length;
  const draftCount = data.length - publishedCount;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-arabic">
            বইসমূহ ম্যানেজমেন্ট
          </h2>
          <p className="text-muted-foreground">হযরত মুজাদ্দিদের রচিত বইসমূহ</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold">{data.length}</div>
              <p className="text-sm text-muted-foreground">মোট বই</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <Star className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <div className="text-2xl font-bold">{featuredCount}</div>
              <p className="text-sm text-muted-foreground">ফিচার্ড</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
              <Eye className="h-5 w-5 text-green-500" />
            </div>
            <div>
              <div className="text-2xl font-bold">{publishedCount}</div>
              <p className="text-sm text-muted-foreground">প্রকাশিত</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
              <EyeOff className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <div className="text-2xl font-bold">{draftCount}</div>
              <p className="text-sm text-muted-foreground">ড্রাফট</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <BooksManager key={key} initialData={data} />
    </div>
  );
}
