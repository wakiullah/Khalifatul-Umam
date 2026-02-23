"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Edit,
  Trash2,
  MoreVertical,
  Search,
  Eye,
  Calendar,
  User,
  Loader2,
  EyeOff,
  Star,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { PostData } from "@/type/post";
import { createPost, deletePost, updatePost } from "@/services/posts.api";

const postCategories = [
  "General",
  "জীবনী",
  "শিক্ষা",
  "ইতিহাস",
  "আধ্যাত্মিকতা",
  "অবদান",
];

const PostsManager = ({ initialData }: { initialData: PostData[] }) => {
  const router = useRouter();
  const [posts, setPosts] = useState<PostData[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<PostData | null>(null);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    excerpt: "",
    image_url: "",
    author_name: "Admin",
    category: "General",
    status: "draft",
    is_featured: false,
  });

  useEffect(() => {
    if (initialData) setPosts(initialData);
  }, [initialData]);

  const handleAddPost = async () => {
    if (!newPost.title) {
      console.log("Add post failed: Missing title");
      toast.error("শিরোনাম আবশ্যক");
      return;
    }

    setSaving(true);
    try {
      const res = await createPost({
        title: newPost.title,
        content: newPost.content,
        excerpt: newPost.excerpt,
        image_url: newPost.image_url,
        author_name: newPost.author_name || "Admin",
        category: newPost.category,
        status: newPost.status,
        is_featured: newPost.is_featured,
      });

      if (res.success) {
        setPosts([res.data, ...posts]);
        router.refresh();

        toast.success("নতুন পোস্ট তৈরি হয়েছে");
        setNewPost({
          title: "",
          content: "",
          excerpt: "",
          image_url: "",
          author_name: "Admin",
          category: "General",
          status: "draft",
          is_featured: false,
        });
        setIsAddDialogOpen(false);
      } else {
        toast.error(res.message || "পোস্ট তৈরি ব্যর্থ");
      }
    } catch (error: any) {
      console.error("Failed to add post:", error);
      toast.error("পোস্ট তৈরি ব্যর্থ: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePost = async () => {
    if (!editingPost) return;

    setSaving(true);
    try {
      const res = await updatePost(editingPost._id, {
        title: editingPost.title,
        content: editingPost.content,
        excerpt: editingPost.excerpt,
        image_url: editingPost.image_url,
        author_name: editingPost.author_name,
        category: editingPost.category,
        status: editingPost.status,
        is_featured: editingPost.is_featured,
      });

      if (res.success) {
        setPosts(posts.map((p) => (p._id === editingPost._id ? res.data : p)));
        toast.success("পোস্ট আপডেট হয়েছে");
        setEditingPost(null);
        router.refresh();
      } else {
        toast.error(res.message || "আপডেট ব্যর্থ");
      }
    } catch (error: any) {
      console.error("Failed to update post:", error);
      toast.error("আপডেট ব্যর্থ: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      const res = await deletePost(id);
      if (res.success) {
        setPosts(posts.filter((p) => p._id !== id));
        toast.success("পোস্ট মুছে ফেলা হয়েছে");
        router.refresh();
      } else {
        toast.error(res.message || "মুছতে ব্যর্থ");
      }
    } catch (error: any) {
      console.error("Failed to delete post:", error);
      toast.error("মুছতে ব্যর্থ: " + error.message);
    }
  };

  const getStatusBadge = (status: string = "draft") => {
    const variants: Record<
      string,
      "default" | "secondary" | "destructive" | "outline"
    > = {
      published: "default",
      draft: "secondary",
      review: "outline",
    };
    const labels: Record<string, string> = {
      published: "প্রকাশিত",
      draft: "ড্রাফট",
      review: "রিভিউ",
    };
    return (
      <Badge variant={variants[status] || "default"}>
        {labels[status] || status}
      </Badge>
    );
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.author_name || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const publishedCount = posts.filter((p) => p.status === "published").length;
  const draftCount = posts.filter((p) => p.status === "draft").length;
  const totalViews = posts.reduce((acc, p) => acc + (p.views || 0), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">পোস্ট ম্যানেজমেন্ট</h1>
          <p className="text-muted-foreground mt-1">
            সমস্ত পোস্ট দেখুন এবং পরিচালনা করুন
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              নতুন পোস্ট
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>নতুন পোস্ট তৈরি করুন</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>শিরোনাম</Label>
                <Input
                  placeholder="পোস্টের শিরোনাম লিখুন"
                  value={newPost.title}
                  onChange={(e) =>
                    setNewPost({ ...newPost, title: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>ক্যাটাগরি</Label>
                  <Select
                    value={newPost.category}
                    onValueChange={(value) =>
                      setNewPost({ ...newPost, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="ক্যাটাগরি নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      {postCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>স্ট্যাটাস</Label>
                  <Select
                    value={newPost.status}
                    onValueChange={(value) =>
                      setNewPost({ ...newPost, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="স্ট্যাটাস নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">ড্রাফট</SelectItem>
                      <SelectItem value="review">রিভিউ</SelectItem>
                      <SelectItem value="published">প্রকাশিত</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>বিষয়বস্তু</Label>
                <RichTextEditor
                  content={newPost.content}
                  onChange={(content) => setNewPost({ ...newPost, content })}
                  placeholder="পোস্টের বিষয়বস্তু লিখুন..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>ফিচার ইমেজ URL</Label>
                  <Input
                    placeholder="https://example.com/image.jpg"
                    value={newPost.image_url}
                    onChange={(e) =>
                      setNewPost({ ...newPost, image_url: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>লেখক</Label>
                  <Input
                    placeholder="লেখকের নাম"
                    value={newPost.author_name}
                    onChange={(e) =>
                      setNewPost({ ...newPost, author_name: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={newPost.is_featured}
                  onCheckedChange={(checked) =>
                    setNewPost({ ...newPost, is_featured: checked })
                  }
                />
                <Label>ফিচার্ড পোস্ট</Label>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  বাতিল
                </Button>
                <Button onClick={handleAddPost} disabled={saving}>
                  {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  পোস্ট তৈরি করুন
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">মোট পোস্ট</p>
                <h3 className="text-2xl font-bold">{posts.length}</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Edit className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">প্রকাশিত</p>
                <h3 className="text-2xl font-bold">{publishedCount}</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                <Eye className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">ড্রাফট</p>
                <h3 className="text-2xl font-bold">{draftCount}</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                <EyeOff className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">মোট ভিউ</p>
                <h3 className="text-2xl font-bold">
                  {totalViews.toLocaleString()}
                </h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Eye className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="পোস্ট সার্চ করুন..."
                className="pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="স্ট্যাটাস ফিল্টার" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব স্ট্যাটাস</SelectItem>
                <SelectItem value="published">প্রকাশিত</SelectItem>
                <SelectItem value="draft">ড্রাফট</SelectItem>
                <SelectItem value="review">রিভিউ</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Posts Table */}
      <Card>
        <CardHeader>
          <CardTitle>সমস্ত পোস্ট</CardTitle>
          <CardDescription>
            {filteredPosts.length}টি পোস্ট পাওয়া গেছে
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              কোনো পোস্ট নেই। উপরে "নতুন পোস্ট" বাটনে ক্লিক করে যোগ করুন।
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>শিরোনাম</TableHead>
                  <TableHead>লেখক</TableHead>
                  <TableHead>ক্যাটাগরি</TableHead>
                  <TableHead>তারিখ</TableHead>
                  <TableHead>স্ট্যাটাস</TableHead>
                  <TableHead>ভিউ</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.map((post) => (
                  <TableRow
                    key={post._id}
                    className={post.status !== "published" ? "opacity-60" : ""}
                  >
                    <TableCell className="font-medium max-w-[200px]">
                      <div className="flex items-center gap-2">
                        {post.is_featured && (
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                        )}
                        <span className="truncate">{post.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {post.author_name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{post.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.createdAt).toLocaleDateString("bn-BD")}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(post.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                        {post.views}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => setEditingPost(post)}
                          >
                            <Edit className="h-4 w-4 ml-2" />
                            এডিট
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDeletePost(post._id)}
                          >
                            <Trash2 className="h-4 w-4 ml-2" />
                            ডিলিট
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog
        open={!!editingPost}
        onOpenChange={(open) => !open && setEditingPost(null)}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>পোস্ট এডিট করুন</DialogTitle>
          </DialogHeader>
          {editingPost && (
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>শিরোনাম</Label>
                <Input
                  value={editingPost.title}
                  onChange={(e) =>
                    setEditingPost({ ...editingPost, title: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>ক্যাটাগরি</Label>
                  <Select
                    value={editingPost.category}
                    onValueChange={(value) =>
                      setEditingPost({ ...editingPost, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {postCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>স্ট্যাটাস</Label>
                  <Select
                    value={editingPost.status}
                    onValueChange={(value) =>
                      setEditingPost({ ...editingPost, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">ড্রাফট</SelectItem>
                      <SelectItem value="review">রিভিউ</SelectItem>
                      <SelectItem value="published">প্রকাশিত</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>বিষয়বস্তু</Label>
                <RichTextEditor
                  content={editingPost.content || ""}
                  onChange={(content) =>
                    setEditingPost({ ...editingPost, content })
                  }
                  placeholder="পোস্টের বিষয়বস্তু লিখুন..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>ফিচার ইমেজ URL</Label>
                  <Input
                    value={editingPost.image_url || ""}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        image_url: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>লেখক</Label>
                  <Input
                    value={editingPost.author_name}
                    onChange={(e) =>
                      setEditingPost({
                        ...editingPost,
                        author_name: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={editingPost.is_featured}
                  onCheckedChange={(checked) =>
                    setEditingPost({ ...editingPost, is_featured: checked })
                  }
                />
                <Label>ফিচার্ড পোস্ট</Label>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setEditingPost(null)}>
                  বাতিল
                </Button>
                <Button onClick={handleUpdatePost} disabled={saving}>
                  {saving && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                  আপডেট করুন
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostsManager;
