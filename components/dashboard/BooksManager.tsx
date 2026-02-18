"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Trash2,
  MoreVertical,
  Star,
  Eye,
  EyeOff,
  Edit,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { BookData, CreateBookRequest } from "@/type/book";
import { BookFormData, BookModal } from "./books/BookModal";
import { Badge } from "@/components/ui/badge";
import { createBook, deleteBook, updateBook } from "@/services/books.api";

interface Book {
  id: string;
  title: string;
  arabic_title: string | null;
  description: string;
  volumes: string | null;
  language: string | null;
  is_featured: boolean;
  is_published: boolean;
}

interface BooksManagerProps {
  initialData: BookData[];
}

const BooksManager = ({ initialData }: BooksManagerProps) => {
  const router = useRouter();
  const [books, setBooks] = useState<Book[]>(
    initialData.map((b) => ({
      id: b._id,
      title: b.title,
      arabic_title: b.arabic_title,
      description: b.description,
      volumes: b.volumes,
      language: b.language,
      is_featured: b.is_featured,
      is_published: b.is_published,
    })),
  );
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isBookEditing, setIsBookEditing] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const handleAddBook = async (data: BookFormData) => {
    try {
      const newBookData: CreateBookRequest = {
        title: data.title,
        arabic_title: data.arabic_title || "",
        description: data.description,
        volumes: data.volumes || "1 Volume",
        language: data.language || "Bengali",
        is_featured: data.is_featured || false,
        is_published: data.is_published || true,
      };

      const promise = createBook(newBookData);
      toast.promise(promise, {
        loading: "নতুন বই যোগ করা হচ্ছে...",
        success: (result) => {
          if (result.success) {
            router.refresh();
            setIsAddingNew(false);
            return "নতুন বই সফলভাবে যোগ করা হয়েছে";
          } else {
            throw new Error(result.message || "বই যোগ করতে ব্যর্থ হয়েছে");
          }
        },
        error: (err) => err.message || "কিছু একটা ভুল হয়েছে",
      });
    } catch (error) {
      console.error(error);
      toast.error("বই যোগ করার অনুরোধ করা যায়নি");
    }
  };

  const handleDeleteBook = async (id: string) => {
    const originalBooks = [...books];
    setBooks(books.filter((b) => b.id !== id));

    try {
      const result = await deleteBook(id);
      if (result.success) {
        toast.success("বই সফলভাবে মুছে ফেলা হয়েছে");
        router.refresh();
      } else {
        setBooks(originalBooks);
        toast.error(result.message || "বই মুছতে ব্যর্থ হয়েছে");
      }
    } catch (error) {
      setBooks(originalBooks);
      toast.error("কিছু একটা ভুল হয়েছে");
      console.error(error);
    }
  };

  const handleToggleFeatured = async (id: string) => {
    const bookToUpdate = books.find((b) => b.id === id);
    if (!bookToUpdate) return;

    const originalBooks = [...books];
    const newFeaturedStatus = !bookToUpdate.is_featured;

    setBooks(
      books.map((b) =>
        b.id === id ? { ...b, is_featured: newFeaturedStatus } : b,
      ),
    );

    try {
      const result = await updateBook(id, { is_featured: newFeaturedStatus });
      if (result.success) {
        toast.success("ফিচার্ড স্ট্যাটাস আপডেট হয়েছে");
        router.refresh();
      } else {
        setBooks(originalBooks);
        toast.error(result.message || "আপডেট করতে ব্যর্থ হয়েছে");
      }
    } catch (error) {
      setBooks(originalBooks);
      toast.error("কিছু একটা ভুল হয়েছে");
      console.error(error);
    }
  };

  const handleTogglePublished = async (id: string) => {
    const bookToUpdate = books.find((b) => b.id === id);
    if (!bookToUpdate) return;

    const originalBooks = [...books];
    const newPublishedStatus = !bookToUpdate.is_published;

    setBooks(
      books.map((b) =>
        b.id === id ? { ...b, is_published: newPublishedStatus } : b,
      ),
    );

    try {
      const result = await updateBook(id, { is_published: newPublishedStatus });
      if (result.success) {
        toast.success("প্রকাশনার স্ট্যাটাস আপডেট হয়েছে");
        router.refresh();
      } else {
        setBooks(originalBooks);
        toast.error(result.message || "আপডেট করতে ব্যর্থ হয়েছে");
      }
    } catch (error) {
      setBooks(originalBooks);
      toast.error("কিছু একটা ভুল হয়েছে");
      console.error(error);
    }
  };

  const handleUpdateBook = async (bookData: BookFormData) => {
    if (!editingBook) {
      toast.error("কোনো বই সম্পাদনার জন্য নির্বাচিত হয়নি");
      return;
    }
    const id = editingBook.id;

    const originalBooks = [...books];
    setBooks(
      books.map((book) =>
        book.id === id
          ? {
              ...book,
              ...bookData,
              arabic_title: bookData.arabic_title ?? null,
            }
          : book,
      ),
    );
    setIsBookEditing(false);

    try {
      const result = await updateBook(id, bookData);
      if (result.success) {
        toast.success("বই সফলভাবে আপডেট করা হয়েছে");
        router.refresh();
        setEditingBook(null);
      } else {
        setBooks(originalBooks);
        toast.error(result.message || "আপডেট করতে ব্যর্থ হয়েছে");
      }
    } catch (error) {
      setBooks(originalBooks);
      toast.error("কিছু একটা ভুল হয়েছে");
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Books Grid */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <div>
            <CardTitle>সকল বই</CardTitle>
            <CardDescription>বইসমূহ সম্পাদনা ও পরিচালনা করুন</CardDescription>
          </div>
          <BookModal
            open={isAddingNew}
            onOpenChange={setIsAddingNew}
            onSave={handleAddBook}
          >
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              নতুন বই
            </Button>
          </BookModal>
        </CardHeader>
        <CardContent>
          {books.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              কোনো বই নেই। উপরে "নতুন বই" বাটনে ক্লিক করে যোগ করুন।
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {books.map((book) => (
                <Card
                  key={book.id}
                  className={`relative ${!book.is_published ? "opacity-60" : ""}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex gap-2">
                        {book.is_featured && (
                          <Badge variant="default" className="bg-yellow-500">
                            <Star className="h-3 w-3 mr-1" />
                            ফিচার্ড
                          </Badge>
                        )}
                        {!book.is_published && (
                          <Badge variant="secondary">ড্রাফট</Badge>
                        )}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleToggleFeatured(book.id)}
                          >
                            <Star className="h-4 w-4 mr-2" />
                            {book.is_featured
                              ? "ফিচার্ড বাতিল"
                              : "ফিচার্ড করুন"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleTogglePublished(book.id)}
                          >
                            {book.is_published ? (
                              <>
                                <EyeOff className="h-4 w-4 mr-2" />
                                অপ্রকাশিত করুন
                              </>
                            ) : (
                              <>
                                <Eye className="h-4 w-4 mr-2" />
                                প্রকাশ করুন
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-primary"
                            onClick={() => {
                              setEditingBook(book);
                              setIsBookEditing(true);
                            }}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            সম্পাদনা করুন
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteBook(book.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            মুছে ফেলুন
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold line-clamp-1">
                        {book.title}
                      </h3>
                      {book.arabic_title && (
                        <p
                          className="text-sm font-arabic text-muted-foreground"
                          dir="rtl"
                        >
                          {book.arabic_title}
                        </p>
                      )}
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {book.description}
                      </p>
                      <div className="flex gap-2 pt-2">
                        <Badge variant="outline">{book.volumes}</Badge>
                        <Badge variant="outline">{book.language}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      {editingBook && (
        <BookModal
          open={isBookEditing}
          onOpenChange={(isOpen) => {
            setIsBookEditing(isOpen);
            if (!isOpen) {
              setEditingBook(null);
            }
          }}
          onSave={handleUpdateBook}
          initialData={{
            title: editingBook.title,
            arabic_title: editingBook.arabic_title || "",
            description: editingBook.description,
            volumes: editingBook.volumes || "",
            language: editingBook.language || "",
            is_featured: editingBook.is_featured,
            is_published: editingBook.is_published,
          }}
        />
      )}
    </div>
  );
};

export default BooksManager;
