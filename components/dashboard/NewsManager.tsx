"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { NewsData, CreateNewsRequest } from "@/type/news";
import { createNews, deleteNews, updateNews } from "@/services/news.api";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Calendar,
  Clock,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Reusable UI Components for this file
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "destructive" | "outline";
}

const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
  type = "button",
  ...props
}: ButtonProps) => {
  const baseStyle =
    "px-4 py-2 rounded-md font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm";
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-gray-300 bg-white hover:bg-gray-100 text-gray-700",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant as keyof typeof variants]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = ({ label, ...props }: InputProps) => (
  <div className="space-y-2">
    {label && (
      <label className="text-sm font-medium leading-none">{label}</label>
    )}
    <input
      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      {...props}
    />
  </div>
);

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Textarea = ({ label, ...props }: TextareaProps) => (
  <div className="space-y-2">
    {label && (
      <label className="text-sm font-medium leading-none">{label}</label>
    )}
    <textarea
      className="flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      {...props}
    />
  </div>
);

export default function NewsManager({
  initialData,
  currentPage = 1,
  totalPages = 1,
}: {
  initialData: NewsData[];
  currentPage?: number;
  totalPages?: number;
}) {
  const router = useRouter();
  const [news, setNews] = useState<NewsData[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsData | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<CreateNewsRequest>({
    title: "",
    excerpt: "",
    category: "General",
    image_url: "",
    author: "",
    read_time: "",
    is_featured: false,
    is_published: true,
  });

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      category: "General",
      image_url: "",
      author: "",
      read_time: "",
      is_featured: false,
      is_published: true,
    });
    setEditingNews(null);
  };

  const handleOpenModal = (newsItem?: NewsData) => {
    if (newsItem) {
      setEditingNews(newsItem);
      setFormData({
        title: newsItem.title,
        excerpt: newsItem.excerpt,
        category: newsItem.category,
        image_url: newsItem.image_url || "",
        author: newsItem.author || "",
        read_time: newsItem.read_time || "",
        is_featured: newsItem.is_featured,
        is_published: newsItem.is_published,
      });
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (editingNews) {
        const res = await updateNews(editingNews._id, formData);
        if (res.success) {
          setNews(news.map((n) => (n._id === editingNews._id ? res.data : n)));
          setIsModalOpen(false);
          resetForm();
          router.refresh();
        }
      } else {
        const res = await createNews(formData);
        if (res.success) {
          setNews([res.data, ...news]);
          setIsModalOpen(false);
          resetForm();
          router.refresh();
        }
      }
    } catch (error) {
      console.error("Error saving news:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setDeletingId(id);
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    setIsLoading(true);
    try {
      const res = await deleteNews(deletingId);
      if (res.success) {
        setNews(news.filter((n) => n._id !== deletingId));
        router.refresh();
        setDeletingId(null);
      }
    } catch (error) {
      console.error("Error deleting news:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">সংবাদ ব্যবস্থাপনা</h2>
          <p className="text-muted-foreground">সংবাদ এবং আপডেট পরিচালনা করুন</p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          <Plus className="h-4 w-4" /> নতুন সংবাদ
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {news.map((item) => (
          <div
            key={item._id}
            className="rounded-lg border bg-white shadow-sm flex flex-col overflow-hidden"
          >
            {item.image_url && (
              <div className="aspect-video w-full overflow-hidden bg-gray-100">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="h-full w-full object-cover transition-all hover:scale-105"
                />
              </div>
            )}
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-gray-100 text-gray-800">
                  {item.category}
                </span>
                {item.is_featured && (
                  <span className="text-yellow-600 text-xs font-bold flex items-center gap-1">
                    ★ ফিচার্ড
                  </span>
                )}
              </div>
              <h3 className="text-xl font-semibold leading-none tracking-tight mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-1">
                {item.excerpt}
              </p>

              <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(item.createdAt).toLocaleDateString()}
                </div>
                {item.read_time && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {item.read_time}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 pt-4 border-t mt-auto">
                <Button
                  variant="outline"
                  className="flex-1 h-8 text-xs"
                  onClick={() => handleOpenModal(item)}
                >
                  <Pencil className="h-3 w-3 mr-1" /> সম্পাদনা
                </Button>
                <Button
                  variant="destructive"
                  className="h-8 w-8 p-0 justify-center"
                  onClick={() => handleDelete(item._id)}
                >
                  <Trash2 className="h-3 w-3 bg-white" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t pt-6">
          <p className="text-sm text-gray-600">
            পৃষ্ঠা {currentPage} / {totalPages}
          </p>

          <div className="flex items-center gap-2">
            {currentPage > 1 ? (
              <Link
                href={`/dashboard/news?page=${currentPage - 1}`}
                className="inline-flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                পূর্ববর্তী
              </Link>
            ) : (
              <button
                disabled
                className="inline-flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-md text-gray-400 text-sm font-medium cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
                পূর্ববর্তী
              </button>
            )}

            <div className="flex items-center gap-1">
              {currentPage > 2 && (
                <>
                  <Link
                    href="/dashboard/news?page=1"
                    className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 text-sm transition-colors"
                  >
                    1
                  </Link>
                  {currentPage > 3 && (
                    <span className="px-2 text-gray-400">...</span>
                  )}
                </>
              )}

              {currentPage > 1 && (
                <Link
                  href={`/dashboard/news?page=${currentPage - 1}`}
                  className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 text-sm transition-colors"
                >
                  {currentPage - 1}
                </Link>
              )}

              <span className="px-3 py-1.5 border border-black bg-black text-white rounded text-sm font-medium">
                {currentPage}
              </span>

              {currentPage < totalPages && (
                <Link
                  href={`/dashboard/news?page=${currentPage + 1}`}
                  className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 text-sm transition-colors"
                >
                  {currentPage + 1}
                </Link>
              )}

              {currentPage < totalPages - 1 && (
                <>
                  {currentPage < totalPages - 2 && (
                    <span className="px-2 text-gray-400">...</span>
                  )}
                  <Link
                    href={`/dashboard/news?page=${totalPages}`}
                    className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 text-sm transition-colors"
                  >
                    {totalPages}
                  </Link>
                </>
              )}
            </div>

            {currentPage < totalPages ? (
              <Link
                href={`/dashboard/news?page=${currentPage + 1}`}
                className="inline-flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium transition-colors"
              >
                পরবর্তী
                <ChevronRight className="h-4 w-4" />
              </Link>
            ) : (
              <button
                disabled
                className="inline-flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-md text-gray-400 text-sm font-medium cursor-not-allowed"
              >
                পরবর্তী
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="text-lg font-bold">
                  {editingNews ? "সংবাদ সম্পাদনা" : "নতুন সংবাদ তৈরি"}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="শিরোনাম"
                  value={formData.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
                <Textarea
                  label="সারাংশ"
                  value={formData.excerpt}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="ক্যাটাগরি"
                    value={formData.category}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="পড়ার সময়"
                    value={formData.read_time}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormData({ ...formData, read_time: e.target.value })
                    }
                    placeholder="e.g. 5 min read"
                  />
                </div>
                <Input
                  label="ছবির URL"
                  value={formData.image_url}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, image_url: e.target.value })
                  }
                />
                <Input
                  label="লেখক"
                  value={formData.author}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                />

                <div className="flex items-center gap-4 pt-2">
                  <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.is_featured}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          is_featured: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300 text-black focus:ring-black"
                    />
                    ফিচার্ড
                  </label>
                  <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.is_published}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          is_published: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300 text-black focus:ring-black"
                    />
                    প্রকাশিত
                  </label>
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                  >
                    বাতিল
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading && (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    )}
                    {editingNews ? "আপডেট" : "তৈরি করুন"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <Dialog
        open={!!deletingId}
        onOpenChange={(open) => !open && setDeletingId(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>আপনি কি নিশ্চিত?</DialogTitle>
            <DialogDescription>
              আপনি কি নিশ্চিত যে আপনি এই সংবাদটি মুছে ফেলতে চান? এই ক্রিয়াটি
              ফিরিয়ে আনা যাবে না।
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setDeletingId(null)}>
              বাতিল
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              মুছে ফেলুন
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
