"use client";

import { useState, useTransition } from "react";
import {
  Edit,
  Trash2,
  MoreVertical,
  Search,
  MessageSquare,
  Users,
  Clock,
  Eye,
  Flag,
  CheckCircle,
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
import { Textarea } from "@/components/ui/textarea";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ForumPostData, ForumCommentData } from "@/type/forum";
import {
  deleteForumPostAdmin,
  updateForumPostAdmin,
  updateForumPostStatus,
  deleteForumCommentAdmin,
} from "@/services/admin-forum.api";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface ForumManagerProps {
  initialPosts: ForumPostData[];
  initialComments: ForumCommentData[];
  stats: {
    totalPosts: number;
    totalComments: number;
    activeUsers: number;
    reportedPosts: number;
  };
}

const ForumManager = ({
  initialPosts,
  initialComments,
  stats,
}: ForumManagerProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<ForumPostData | null>(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    category: "",
    content: "",
  });
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: "bg-green-500/10 text-green-500",
      reported: "bg-red-500/10 text-red-500",
      closed: "bg-gray-500/10 text-gray-500",
      pending: "bg-yellow-500/10 text-yellow-500",
      approved: "bg-green-500/10 text-green-500",
    };

    const labels: Record<string, string> = {
      active: "সক্রিয়",
      reported: "রিপোর্টেড",
      closed: "বন্ধ",
      pending: "পেন্ডিং",
      approved: "অনুমোদিত",
    };

    return (
      <Badge className={styles[status] || ""}>{labels[status] || status}</Badge>
    );
  };

  const filteredPosts = initialPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || post.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleViewPost = (post: ForumPostData) => {
    setSelectedPost(post);
    setIsViewDialogOpen(true);
  };

  const handleEditPost = (post: ForumPostData) => {
    setSelectedPost(post);
    setEditFormData({
      title: post.title,
      category: post.category,
      content: post.content,
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedPost) return;

    startTransition(async () => {
      const result = await updateForumPostAdmin(selectedPost._id, editFormData);

      if (result.success) {
        toast({
          title: "সফল",
          description: "পোস্ট সফলভাবে আপডেট করা হয়েছে।",
        });
        setIsEditDialogOpen(false);
        setSelectedPost(null);
        router.refresh();
      } else {
        toast({
          title: "ত্রুটি",
          description: result.message || "পোস্ট আপডেট করতে সমস্যা হয়েছে।",
          variant: "destructive",
        });
      }
    });
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm("আপনি কি নিশ্চিত এই পোস্টটি ডিলিট করতে চান?")) return;

    startTransition(async () => {
      const result = await deleteForumPostAdmin(postId);

      if (result.success) {
        toast({
          title: "সফল",
          description: "পোস্ট সফলভাবে ডিলিট করা হয়েছে।",
        });
        router.refresh();
      } else {
        toast({
          title: "ত্রুটি",
          description: result.message || "পোস্ট ডিলিট করতে সমস্যা হয়েছে।",
          variant: "destructive",
        });
      }
    });
  };

  const handleChangeStatus = async (postId: string, newStatus: string) => {
    startTransition(async () => {
      const result = await updateForumPostStatus(postId, newStatus);

      if (result.success) {
        toast({
          title: "সফল",
          description: "স্ট্যাটাস সফলভাবে পরিবর্তন করা হয়েছে।",
        });
        router.refresh();
      } else {
        toast({
          title: "ত্রুটি",
          description:
            result.message || "স্ট্যাটাস পরিবর্তন করতে সমস্যা হয়েছে।",
          variant: "destructive",
        });
      }
    });
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm("আপনি কি নিশ্চিত এই মন্তব্যটি ডিলিট করতে চান?")) return;

    startTransition(async () => {
      const result = await deleteForumCommentAdmin(commentId);

      if (result.success) {
        toast({
          title: "সফল",
          description: "মন্তব্য সফলভাবে ডিলিট করা হয়েছে।",
        });
        router.refresh();
      } else {
        toast({
          title: "ত্রুটি",
          description: result.message || "মন্তব্য ডিলিট করতে সমস্যা হয়েছে।",
          variant: "destructive",
        });
      }
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">ফোরাম ম্যানেজমেন্ট</h1>
          <p className="text-muted-foreground mt-1">
            ফোরাম পোস্ট এবং মন্তব্য পরিচালনা করুন
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">মোট পোস্ট</p>
                <h3 className="text-2xl font-bold">{stats.totalPosts}</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <MessageSquare className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">মোট মন্তব্য</p>
                <h3 className="text-2xl font-bold">{stats.totalComments}</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                <MessageSquare className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">সক্রিয় সদস্য</p>
                <h3 className="text-2xl font-bold">{stats.reportedPosts}</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">রিপোর্টেড</p>
                <h3 className="text-2xl font-bold">{stats.reportedPosts}</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                <Flag className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Posts and Comments */}
      <Tabs defaultValue="posts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="posts">ফোরাম পোস্ট</TabsTrigger>
          <TabsTrigger value="comments">মন্তব্যসমূহ</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
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
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="ক্যাটাগরি ফিল্টার" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">সব ক্যাটাগরি</SelectItem>
                    <SelectItem value="প্রশ্ন-উত্তর">প্রশ্ন-উত্তর</SelectItem>
                    <SelectItem value="আলোচনা">আলোচনা</SelectItem>
                    <SelectItem value="অভিজ্ঞতা">অভিজ্ঞতা</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Forum Posts Table */}
          <Card>
            <CardHeader>
              <CardTitle>ফোরাম পোস্টসমূহ</CardTitle>
              <CardDescription>
                {filteredPosts.length}টি পোস্ট পাওয়া গেছে
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>শিরোনাম</TableHead>
                    <TableHead>লেখক</TableHead>
                    <TableHead>ক্যাটাগরি</TableHead>
                    <TableHead>তারিখ</TableHead>
                    <TableHead>মন্তব্য</TableHead>
                    <TableHead>ভিউ</TableHead>
                    <TableHead>স্ট্যাটাস</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.map((post) => (
                    <TableRow key={post._id}>
                      <TableCell className="font-medium max-w-[200px]">
                        <div className="truncate">{post.title}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {post.author.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {post.author}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{post.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                          <Clock className="h-4 w-4" />
                          {formatDate(post.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          {post.commentsCount}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4 text-muted-foreground" />
                          {post.views}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(post.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              disabled={isPending}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleViewPost(post)}
                            >
                              <Eye className="h-4 w-4 ml-2" />
                              দেখুন
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleEditPost(post)}
                            >
                              <Edit className="h-4 w-4 ml-2" />
                              এডিট
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() =>
                                handleChangeStatus(post._id, "closed")
                              }
                            >
                              <CheckCircle className="h-4 w-4 ml-2" />
                              বন্ধ করুন
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
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comments" className="space-y-4">
          {/* Comments Table */}
          <Card>
            <CardHeader>
              <CardTitle>সাম্প্রতিক মন্তব্যসমূহ</CardTitle>
              <CardDescription>মন্তব্য মডারেশন এবং পরিচালনা</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>মন্তব্য</TableHead>
                    <TableHead>লেখক</TableHead>
                    <TableHead>পোস্ট</TableHead>
                    <TableHead>তারিখ</TableHead>
                    <TableHead>স্ট্যাটাস</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {initialComments.map((comment) => (
                    <TableRow key={comment._id}>
                      <TableCell className="max-w-[250px]">
                        <div className="truncate">{comment.content}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {comment.author.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {comment.author}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[150px]">
                        <div className="truncate text-muted-foreground">
                          {typeof comment.postId === "string"
                            ? comment.postId
                            : comment.postId?.title ||
                              comment.postId?._id ||
                              "N/A"}
                        </div>
                      </TableCell>
                      <TableCell>{formatDate(comment.createdAt)}</TableCell>
                      <TableCell>{getStatusBadge(comment.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              disabled={isPending}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDeleteComment(comment._id)}
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* View Post Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>পোস্ট বিস্তারিত</DialogTitle>
          </DialogHeader>
          {selectedPost && (
            <div className="space-y-4 mt-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {selectedPost.author.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedPost.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(selectedPost.createdAt)}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{selectedPost.title}</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{selectedPost.category}</Badge>
                  {getStatusBadge(selectedPost.status)}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-lg font-bold">
                    <Eye className="h-4 w-4" />
                    {selectedPost.views}
                  </div>
                  <p className="text-sm text-muted-foreground">ভিউ</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-lg font-bold">
                    <MessageSquare className="h-4 w-4" />
                    {selectedPost.commentsCount}
                  </div>
                  <p className="text-sm text-muted-foreground">মন্তব্য</p>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold">
                    {formatDate(selectedPost.createdAt)}
                  </div>
                  <p className="text-sm text-muted-foreground">তারিখ</p>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {selectedPost.content}
                </p>
              </div>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => setIsViewDialogOpen(false)}
                >
                  বন্ধ করুন
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Post Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>পোস্ট সম্পাদনা</DialogTitle>
          </DialogHeader>
          {selectedPost && (
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>শিরোনাম</Label>
                <Input
                  value={editFormData.title}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>বিষয়বস্তু</Label>
                <Textarea
                  rows={5}
                  value={editFormData.content}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      content: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>ক্যাটাগরি</Label>
                <Select
                  value={editFormData.category}
                  onValueChange={(val) =>
                    setEditFormData({ ...editFormData, category: val })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="General">General</SelectItem>
                    <SelectItem value="ইবাদত">ইবাদত</SelectItem>
                    <SelectItem value="আকিদা">আকিদা</SelectItem>
                    <SelectItem value="সমাজ">সমাজ</SelectItem>
                    <SelectItem value="অন্যান্য">অন্যান্য</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                  disabled={isPending}
                >
                  বাতিল
                </Button>
                <Button onClick={handleSaveEdit} disabled={isPending}>
                  {isPending ? "সেভ হচ্ছে..." : "সেভ করুন"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ForumManager;
