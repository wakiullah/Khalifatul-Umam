"use client";

console.log("Dashboard component loaded:", "components/dashboard/ForumManager.tsx");

import { useState } from "react";
import { Plus, Edit, Trash2, MoreVertical, Search, MessageSquare, Users, Clock, Eye, Flag, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const ForumManager = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<typeof forumPosts[0] | null>(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    category: "",
    status: ""
  });

  // Sample forum posts data
  const forumPosts = [
    { 
      id: 1, 
      title: "মকতুবাত পড়ার সঠিক পদ্ধতি কী?", 
      author: "আব্দুল্লাহ", 
      date: "২০২৪-১২-১৫", 
      category: "প্রশ্ন-উত্তর",
      comments: 12,
      views: 234,
      status: "সক্রিয়"
    },
    { 
      id: 2, 
      title: "নকশবন্দী সিলসিলার বিশেষত্ব", 
      author: "মুহাম্মদ", 
      date: "২০২৪-১২-১৪", 
      category: "আলোচনা",
      comments: 8,
      views: 156,
      status: "সক্রিয়"
    },
    { 
      id: 3, 
      title: "ইমাম রব্বানী'র শিক্ষা আজকের প্রেক্ষাপটে", 
      author: "ফাতিমা", 
      date: "২০২৪-১২-১৩", 
      category: "আলোচনা",
      comments: 23,
      views: 567,
      status: "সক্রিয়"
    },
    { 
      id: 4, 
      title: "তাসাউফ শিক্ষার জন্য কোন বই পড়া উচিত?", 
      author: "উমর", 
      date: "২০২৪-১২-১২", 
      category: "প্রশ্ন-উত্তর",
      comments: 5,
      views: 89,
      status: "রিপোর্টেড"
    },
    { 
      id: 5, 
      title: "সিরহিন্দ শরীফ যিয়ারতের অভিজ্ঞতা", 
      author: "খাদিজা", 
      date: "২০২৪-১২-১১", 
      category: "অভিজ্ঞতা",
      comments: 15,
      views: 345,
      status: "সক্রিয়"
    },
  ];

  // Sample comments data
  const recentComments = [
    { 
      id: 1, 
      content: "অত্যন্ত তথ্যবহুল পোস্ট। জাযাকাল্লাহু খাইরান।", 
      author: "ফাতিমা", 
      postTitle: "মকতুবাত পড়ার সঠিক পদ্ধতি কী?",
      date: "২০২৪-১২-১৫",
      status: "অনুমোদিত"
    },
    { 
      id: 2, 
      content: "এই বিষয়ে আরও বিস্তারিত জানতে চাই।", 
      author: "মুহাম্মদ", 
      postTitle: "নকশবন্দী সিলসিলার বিশেষত্ব",
      date: "২০২৪-১২-১৪",
      status: "পেন্ডিং"
    },
    { 
      id: 3, 
      content: "সুবহানাল্লাহ! অসাধারণ অভিজ্ঞতা শেয়ার করার জন্য ধন্যবাদ।", 
      author: "আয়েশা", 
      postTitle: "সিরহিন্দ শরীফ যিয়ারতের অভিজ্ঞতা",
      date: "২০২৪-১২-১৩",
      status: "অনুমোদিত"
    },
  ];

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      "সক্রিয়": "bg-green-500/10 text-green-500",
      "রিপোর্টেড": "bg-red-500/10 text-red-500",
      "বন্ধ": "bg-gray-500/10 text-gray-500",
      "অনুমোদিত": "bg-green-500/10 text-green-500",
      "পেন্ডিং": "bg-yellow-500/10 text-yellow-500",
    };
    return <Badge className={styles[status] || ""}>{status}</Badge>;
  };

  const filteredPosts = forumPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || post.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleViewPost = (post: typeof forumPosts[0]) => {
    setSelectedPost(post);
    setIsViewDialogOpen(true);
  };

  const handleEditPost = (post: typeof forumPosts[0]) => {
    setSelectedPost(post);
    setEditFormData({
      title: post.title,
      category: post.category,
      status: post.status
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    // UI only - would save to database in real implementation
    setIsEditDialogOpen(false);
    setSelectedPost(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">ফোরাম ম্যানেজমেন্ট</h1>
          <p className="text-muted-foreground mt-1">ফোরাম পোস্ট এবং মন্তব্য পরিচালনা করুন</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              নতুন ক্যাটাগরি
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>নতুন ফোরাম ক্যাটাগরি</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>ক্যাটাগরির নাম</Label>
                <Input placeholder="ক্যাটাগরির নাম লিখুন" />
              </div>
              <div className="space-y-2">
                <Label>বিবরণ</Label>
                <Textarea placeholder="ক্যাটাগরির বিবরণ লিখুন..." />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  বাতিল
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>
                  ক্যাটাগরি তৈরি করুন
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
                <h3 className="text-2xl font-bold">{forumPosts.length}</h3>
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
                <h3 className="text-2xl font-bold">{forumPosts.reduce((acc, p) => acc + p.comments, 0)}</h3>
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
                <h3 className="text-2xl font-bold">৮৫৬</h3>
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
                <h3 className="text-2xl font-bold">{forumPosts.filter(p => p.status === "রিপোর্টেড").length}</h3>
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
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
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
              <CardDescription>{filteredPosts.length}টি পোস্ট পাওয়া গেছে</CardDescription>
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
                    <TableRow key={post.id}>
                      <TableCell className="font-medium max-w-[200px]">
                        <div className="truncate">{post.title}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">{post.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {post.author}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{post.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {post.date}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          {post.comments}
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
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewPost(post)}>
                              <Eye className="h-4 w-4 ml-2" />
                              দেখুন
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditPost(post)}>
                              <Edit className="h-4 w-4 ml-2" />
                              এডিট
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CheckCircle className="h-4 w-4 ml-2" />
                              বন্ধ করুন
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
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
                  {recentComments.map((comment) => (
                    <TableRow key={comment.id}>
                      <TableCell className="max-w-[250px]">
                        <div className="truncate">{comment.content}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">{comment.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {comment.author}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[150px]">
                        <div className="truncate text-muted-foreground">{comment.postTitle}</div>
                      </TableCell>
                      <TableCell>{comment.date}</TableCell>
                      <TableCell>{getStatusBadge(comment.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <CheckCircle className="h-4 w-4 ml-2" />
                              অনুমোদন
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
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
                  <AvatarFallback>{selectedPost.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedPost.author}</p>
                  <p className="text-sm text-muted-foreground">{selectedPost.date}</p>
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
                    {selectedPost.comments}
                  </div>
                  <p className="text-sm text-muted-foreground">মন্তব্য</p>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold">{selectedPost.date}</div>
                  <p className="text-sm text-muted-foreground">তারিখ</p>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-muted-foreground">এই পোস্টের বিষয়বস্তু এখানে দেখানো হবে। বর্তমানে এটি শুধুমাত্র UI ডেমো।</p>
              </div>
              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
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
                  onChange={(e) => setEditFormData({...editFormData, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>ক্যাটাগরি</Label>
                <Select value={editFormData.category} onValueChange={(val) => setEditFormData({...editFormData, category: val})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="প্রশ্ন-উত্তর">প্রশ্ন-উত্তর</SelectItem>
                    <SelectItem value="আলোচনা">আলোচনা</SelectItem>
                    <SelectItem value="অভিজ্ঞতা">অভিজ্ঞতা</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>স্ট্যাটাস</Label>
                <Select value={editFormData.status} onValueChange={(val) => setEditFormData({...editFormData, status: val})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="সক্রিয়">সক্রিয়</SelectItem>
                    <SelectItem value="বন্ধ">বন্ধ</SelectItem>
                    <SelectItem value="রিপোর্টেড">রিপোর্টেড</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  বাতিল
                </Button>
                <Button onClick={handleSaveEdit}>
                  সংরক্ষণ করুন
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
