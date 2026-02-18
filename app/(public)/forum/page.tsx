'use client'
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  LogOut
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { forumPostsData, forumCategories } from "@/data/siteData";
import Link from "next/link";

interface Comment {
  id: string;
  author: { name: string; avatar: string };
  content: string;
  createdAt: string;
  likes: number;
}

interface ForumPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    location: string;
  };
  title: string;
  content: string;
  createdAt: string;
  likes: number;
  comments: Comment[];
  category: string;
}

export default function Forum() {
  const { toast } = useToast();
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<ForumPost[]>(forumPostsData);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [newComment, setNewComment] = useState<{ [key: string]: string }>({});
  const [showNewPostDialog, setShowNewPostDialog] = useState(false);
  
  const [newPostForm, setNewPostForm] = useState({
    title: "",
    content: "",
    category: "General",
  });

  const filteredPosts = selectedCategory === "All" 
    ? posts 
    : posts.filter(p => p.category === selectedCategory);

  const handleLogout = async () => {
    console.log('User logout');
    setUser(null);
    toast({
      title: "লগআউট সফল",
      description: "আপনি সফলভাবে লগআউট করেছেন।",
    });
  };

  const handleNewPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "লগইন প্রয়োজন",
        description: "পোস্ট করতে প্রথমে লগইন করুন।",
        variant: "destructive",
      });
      return;
    }

    const newPost: ForumPost = {
      id: Date.now().toString(),
      author: {
        name: user.email?.split("@")[0] || "User",
        avatar: "",
        location: "Unknown",
      },
      title: newPostForm.title,
      content: newPostForm.content,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: [],
      category: newPostForm.category,
    };

    setPosts([newPost, ...posts]);
    setNewPostForm({ title: "", content: "", category: "General" });
    setShowNewPostDialog(false);
    toast({
      title: "পোস্ট সফল",
      description: "আপনার পোস্ট সফলভাবে প্রকাশিত হয়েছে।",
    });
  };

  const handleAddComment = (postId: string) => {
    if (!user) {
      toast({
        title: "লগইন প্রয়োজন",
        description: "মন্তব্য করতে প্রথমে লগইন করুন।",
        variant: "destructive",
      });
      return;
    }

    if (!newComment[postId]?.trim()) return;

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              id: Date.now().toString(),
              author: { name: user.email?.split("@")[0] || "User", avatar: "" },
              content: newComment[postId],
              createdAt: new Date().toISOString(),
              likes: 0,
            },
          ],
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    setNewComment({ ...newComment, [postId]: "" });
    toast({
      title: "মন্তব্য যোগ হয়েছে",
      description: "আপনার মন্তব্য সফলভাবে পোস্ট হয়েছে।",
    });
  };

  const handleLikePost = (postId: string) => {
    if (!user) {
      toast({
        title: "লগইন প্রয়োজন",
        description: "লাইক করতে প্রথমে লগইন করুন।",
        variant: "destructive",
      });
      return;
    }

    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
<>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/10 to-background islamic-pattern">
        <div className="container mx-auto px-4 text-center">
          <span className="font-arabic text-2xl text-secondary mb-4 block">منتدى</span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Forum / আলোচনা মঞ্চ
          </h1>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            হযরত মুজাদ্দিদ আলফে সানী (রহঃ) এর শিক্ষা ও জীবনী নিয়ে আলোচনা করুন, প্রশ্ন করুন এবং জ্ঞান শেয়ার করুন।
          </p>
          
          {/* Auth & New Post Buttons */}
          <div className="flex justify-center gap-4">
            {loading ? (
              <Button variant="outline" disabled>
                লোড হচ্ছে...
              </Button>
            ) : user ? (
              <>
                <Dialog open={showNewPostDialog} onOpenChange={setShowNewPostDialog}>
                  <DialogTrigger asChild>
                    <Button variant="elegant" size="lg">
                      <Plus className="w-4 h-4 mr-2" />
                      নতুন পোস্ট করুন
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle className="font-display text-xl">নতুন পোস্ট তৈরি করুন</DialogTitle>
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
                          onChange={(e) => setNewPostForm({ ...newPostForm, title: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="font-body text-sm font-medium text-foreground mb-2 block">
                          বিভাগ
                        </label>
                        <select
                          className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                          value={newPostForm.category}
                          onChange={(e) => setNewPostForm({ ...newPostForm, category: e.target.value })}
                        >
                          {forumCategories.filter(c => c !== "All").map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
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
                          onChange={(e) => setNewPostForm({ ...newPostForm, content: e.target.value })}
                        />
                      </div>
                      <Button type="submit" variant="elegant" className="w-full">
                        <Send className="w-4 h-4 mr-2" />
                        পোস্ট করুন
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  লগআউট ({user.email?.split("@")[0]})
                </Button>
              </>
            ) : (
              <Button variant="elegant" size="lg" asChild>
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
            {forumCategories.map((category) => (
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
                <p className="text-muted-foreground">এই বিভাগে কোনো পোস্ট নেই।</p>
              </Card>
            ) : (
              filteredPosts.map((post) => (
                <Card key={post.id} className="border-border/50 hover:shadow-elegant transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-display font-semibold text-foreground">{post.author.name}</p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {post.author.location}
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
                    <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-muted-foreground hover:text-primary"
                        onClick={() => handleLikePost(post.id)}
                      >
                        <Heart className={`w-4 h-4 mr-1 ${post.likes > 0 ? 'fill-primary text-primary' : ''}`} />
                        {post.likes}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-muted-foreground hover:text-primary"
                        onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {post.comments.length} মন্তব্য
                        {expandedPost === post.id ? (
                          <ChevronUp className="w-4 h-4 ml-1" />
                        ) : (
                          <ChevronDown className="w-4 h-4 ml-1" />
                        )}
                      </Button>
                    </div>

                    {/* Comments Section */}
                    {expandedPost === post.id && (
                      <div className="mt-6 pt-4 border-t border-border/50">
                        {/* Existing Comments */}
                        {post.comments.length > 0 && (
                          <div className="space-y-4 mb-6">
                            {post.comments.map((comment) => (
                              <div key={comment.id} className="flex gap-3 p-3 bg-muted/30 rounded-lg">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                  <User className="w-4 h-4 text-primary" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-display font-medium text-sm text-foreground">
                                      {comment.author.name}
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
                        )}

                        {/* Add Comment */}
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1 flex gap-2">
                            <Input
                              placeholder={user ? "আপনার মন্তব্য লিখুন..." : "মন্তব্য করতে লগইন করুন"}
                              value={newComment[post.id] || ""}
                              onChange={(e) => setNewComment({ ...newComment, [post.id]: e.target.value })}
                              disabled={!user}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                  e.preventDefault();
                                  handleAddComment(post.id);
                                }
                              }}
                            />
                            <Button 
                              variant="elegant" 
                              size="icon"
                              onClick={() => handleAddComment(post.id)}
                              disabled={!user || !newComment[post.id]?.trim()}
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
