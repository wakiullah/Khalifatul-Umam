"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  MessageSquare,
  Heart,
  User,
  Calendar,
  MapPin,
  Send,
  Plus,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  LogOut,
  Loader2,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { ForumPostData, ForumCommentData } from "@/type/forum";
import {
  createForumPost,
  addForumPostComment,
  getForumPostComments,
  addForumPostReaction,
} from "@/services/forum.api";
import { useRouter } from "next/navigation";

interface ForumPageContentProps {
  initialPosts: ForumPostData[];
  categories: string[];
}

export default function ForumPageContent({
  initialPosts,
  categories,
}: ForumPageContentProps) {
  const { toast } = useToast();

  const [posts, setPosts] = useState<ForumPostData[]>(initialPosts);
  const [comments, setComments] = useState<Record<string, ForumCommentData[]>>(
    {},
  );
  const [loadingComments, setLoadingComments] = useState<
    Record<string, boolean>
  >({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [newComment, setNewComment] = useState<{ [key: string]: string }>({});
  const [showNewPostDialog, setShowNewPostDialog] = useState(false);
  const { user, logout, loading } = useAuth();
  const [newPostForm, setNewPostForm] = useState({
    title: "",
    content: "",
    category: "General",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  console.log("Initial posts:", initialPosts);

  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

  const handleExpandPost = async (postId: string) => {
    if (expandedPost === postId) {
      setExpandedPost(null);
      return;
    }

    setExpandedPost(postId);

    // Load comments if not already loaded
    if (!comments[postId]) {
      setLoadingComments((prev) => ({ ...prev, [postId]: true }));
      try {
        const res = await getForumPostComments(postId);
        if (res.success) {
          setComments((prev) => ({ ...prev, [postId]: res.data }));
        }
      } catch (error) {
        console.error("Failed to load comments", error);
      } finally {
        setLoadingComments((prev) => ({ ...prev, [postId]: false }));
      }
    }
  };

  const handleLogout = async () => {
    await logout(); // Use logout from AuthContext
    toast({
      title: "লগআউট সফল",
      description: "আপনি সফলভাবে লগআউট করেছেন।",
    });
  };

  const handleNewPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "লগইন প্রয়োজন",
        description: "পোস্ট করতে প্রথমে লগইন করুন।",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await createForumPost({
        title: newPostForm.title,
        content: newPostForm.content,
        category: newPostForm.category,
        author: user.phone || "User", // API expects string author
      });

      if (res.success) {
        setPosts([res.data, ...posts]);
        setNewPostForm({ title: "", content: "", category: "General" });
        setShowNewPostDialog(false);
        router.refresh(); // Refresh to get updated data from server
        toast({
          title: "পোস্ট সফল",
          description: "আপনার পোস্ট সফলভাবে প্রকাশিত হয়েছে।",
        });
      }
    } catch (error) {
      toast({
        title: "ত্রুটি",
        description: "পোস্ট তৈরি করতে সমস্যা হয়েছে।",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddComment = async (postId: string) => {
    if (!user) {
      toast({
        title: "লগইন প্রয়োজন",
        description: "মন্তব্য করতে প্রথমে লগইন করুন।",
        variant: "destructive",
      });
      return;
    }

    if (!newComment[postId]?.trim()) return;

    try {
      const res = await addForumPostComment(
        postId,
        newComment[postId],
        user.phone || "User",
      );

      if (res.success) {
        // Update comments list
        setComments((prev) => ({
          ...prev,
          [postId]: [...(prev[postId] || []), res.data],
        }));

        // Update post comment count locally
        setPosts(
          posts.map((p) =>
            p._id === postId ? { ...p, commentsCount: p.commentsCount + 1 } : p,
          ),
        );

        setNewComment({ ...newComment, [postId]: "" });
        toast({
          title: "মন্তব্য যোগ হয়েছে",
          description: "আপনার মন্তব্য সফলভাবে পোস্ট হয়েছে।",
        });
      }
    } catch (error) {
      toast({
        title: "ত্রুটি",
        description: "মন্তব্য করতে সমস্যা হয়েছে।",
        variant: "destructive",
      });
    }
  };

  const handleReaction = async (
    postId: string,
    reactionType: "like" | "dislike",
  ) => {
    if (!user) {
      toast({
        title: "লগইন প্রয়োজন",
        description: "প্রতিক্রিয়া জানাতে প্রথমে লগইন করুন।",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await addForumPostReaction(
        postId,
        reactionType,
        user.phone || "User",
      );

      if (res.success) {
        toast({
          title: "সফল",
          description: "আপনার প্রতিক্রিয়া গ্রহণ করা হয়েছে।",
        });
        router.refresh();
      }
    } catch (error) {
      toast({
        title: "ত্রুটি",
        description: "প্রতিক্রিয়া জানাতে সমস্যা হয়েছে।",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/10 to-background islamic-pattern">
        <div className="container mx-auto px-4 text-center">
          <span className="font-arabic text-2xl text-secondary mb-4 block">
            منتدى
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Forum / আলোচনা মঞ্চ
          </h1>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            হযরত মুজাদ্দিদ আলফে সানী (রহঃ) এর শিক্ষা ও জীবনী নিয়ে আলোচনা করুন,
            প্রশ্ন করুন এবং জ্ঞান শেয়ার করুন।
          </p>

          {/* Auth & New Post Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {loading ? (
              <Button variant="outline" disabled>
                লোড হচ্ছে...
              </Button>
            ) : user ? (
              <>
                <Dialog
                  open={showNewPostDialog}
                  onOpenChange={setShowNewPostDialog}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="elegant"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      নতুন পোস্ট করুন
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="font-display text-xl">
                        নতুন পোস্ট তৈরি করুন
                      </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleNewPost} className="space-y-4 mt-4">
                      <div>
                        <label className="font-body text-sm font-medium text-foreground mb-2 block">
                          শিরোনাম *
                        </label>
                        <Input
                          required
                          placeholder="আপনার পোস্টের শিরোনাম লিখুন"
                          value={newPostForm.title}
                          onChange={(e) =>
                            setNewPostForm({
                              ...newPostForm,
                              title: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="font-body text-sm font-medium text-foreground mb-2 block">
                          বিভাগ
                        </label>
                        <select
                          className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                          value={newPostForm.category}
                          onChange={(e) =>
                            setNewPostForm({
                              ...newPostForm,
                              category: e.target.value,
                            })
                          }
                        >
                          {categories
                            .filter((c) => c !== "All")
                            .map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div>
                        <label className="font-body text-sm font-medium text-foreground mb-2 block">
                          বিষয়বস্তু *
                        </label>
                        <Textarea
                          required
                          rows={5}
                          placeholder="আপনার পোস্টের বিষয়বস্তু লিখুন..."
                          value={newPostForm.content}
                          onChange={(e) =>
                            setNewPostForm({
                              ...newPostForm,
                              content: e.target.value,
                            })
                          }
                        />
                      </div>
                      <Button
                        type="submit"
                        variant="elegant"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4 mr-2" />
                        )}
                        {isSubmitting ? "পোস্ট হচ্ছে..." : "পোস্ট করুন"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full sm:w-auto"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  লগআউট ({user.phone || user.email?.split("@")[0] || "User"})
                </Button>
              </>
            ) : (
              <Button
                variant="elegant"
                size="lg"
                asChild
                className="w-full sm:w-auto"
              >
                <Link href="/login">
                  <User className="w-4 h-4 mr-2" />
                  লগইন করুন
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "elegant" : "outline"}
                size="sm"
                className="rounded-full"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {filteredPosts.length === 0 ? (
              <Card className="p-8 text-center">
                <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  এই বিভাগে কোনো পোস্ট নেই।
                </p>
              </Card>
            ) : (
              filteredPosts.map((post) => (
                <Card
                  key={post._id}
                  className="border-border/50 hover:shadow-elegant transition-all duration-300"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-display font-semibold text-foreground">
                            {post.author}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              বাংলাদেশ
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(post.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary">{post.category}</Badge>
                    </div>
                    <CardTitle className="font-display text-xl text-foreground mt-3 hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-body text-muted-foreground leading-relaxed mb-4">
                      {post.content}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-4 pt-4 border-t border-border/50">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`text-muted-foreground hover:text-primary px-2 sm:px-3 hover:bg-transparent cursor-pointer ${
                          post.userReaction === "like"
                            ? "text-primary font-semibold"
                            : ""
                        }`}
                        onClick={() => handleReaction(post._id, "like")}
                      >
                        <ThumbsUp
                          className={`w-4 h-4 mr-1 ${post.userReaction === "like" ? "fill-current" : ""}`}
                        />
                        লাইক ({post.likeCount || 0})
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`text-muted-foreground hover:text-primary px-2 sm:px-3 hover:bg-transparent cursor-pointer ${
                          post.userReaction === "unlike"
                            ? "text-primary font-semibold"
                            : ""
                        }`}
                        onClick={() => handleReaction(post._id, "dislike")}
                      >
                        <ThumbsDown
                          className={`w-4 h-4 mr-1 ${post.userReaction === "unlike" ? "fill-current" : ""}`}
                        />
                        ডিসলাইক ({post.unlikeCount || 0})
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-primary px-2 sm:px-3 hover:bg-transparent cursor-pointer"
                        onClick={() => handleExpandPost(post._id)}
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {post.commentsCount} মন্তব্য
                        {expandedPost === post._id ? (
                          <ChevronUp className="w-4 h-4 ml-1" />
                        ) : (
                          <ChevronDown className="w-4 h-4 ml-1" />
                        )}
                      </Button>
                    </div>

                    {/* Comments Section */}
                    {expandedPost === post._id && (
                      <div className="mt-6 pt-4 border-t border-border/50">
                        {/* Existing Comments */}
                        {loadingComments[post._id] ? (
                          <div className="flex justify-center py-4">
                            <Loader2 className="w-6 h-6 animate-spin text-primary" />
                          </div>
                        ) : comments[post._id]?.length > 0 ? (
                          <div className="space-y-4 mb-6">
                            {comments[post._id].map((comment) => (
                              <div
                                key={comment._id}
                                className="flex gap-3 p-3 bg-muted/30 rounded-lg"
                              >
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                  <User className="w-4 h-4 text-primary" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-display font-medium text-sm text-foreground">
                                      {comment.author}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
                                      {formatDate(comment.createdAt)}
                                    </span>
                                  </div>
                                  <p className="font-body text-sm text-muted-foreground">
                                    {comment.content}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-center text-sm text-muted-foreground py-4">
                            কোনো মন্তব্য নেই। প্রথম মন্তব্যটি করুন!
                          </p>
                        )}

                        {/* Add Comment */}
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1 flex gap-2">
                            <Input
                              placeholder={
                                user
                                  ? "আপনার মন্তব্য লিখুন..."
                                  : "মন্তব্য করতে লগইন করুন"
                              }
                              value={newComment[post._id] || ""}
                              onChange={(e) =>
                                setNewComment({
                                  ...newComment,
                                  [post._id]: e.target.value,
                                })
                              }
                              disabled={!user}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                  e.preventDefault();
                                  handleAddComment(post._id);
                                }
                              }}
                            />
                            <Button
                              variant="elegant"
                              size="icon"
                              onClick={() => handleAddComment(post._id)}
                              disabled={!user || !newComment[post._id]?.trim()}
                            >
                              <Send className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
