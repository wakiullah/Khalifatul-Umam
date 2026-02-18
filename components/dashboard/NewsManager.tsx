"use client";

console.log("Dashboard component loaded:", "components/dashboard/NewsManager.tsx");

import { useState, useEffect } from "react";
import { Edit, Plus, Trash2, MoreVertical, Newspaper, Eye, EyeOff, Star, Image, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

const newsCategories = ["Articles", "Events", "Announcements", "Research", "Lectures"];

interface Article {
  id: string;
  title: string;
  excerpt: string;
  image_url: string | null;
  author: string;
  category: string;
  read_time: string | null;
  is_featured: boolean;
  is_published: boolean;
  published_at: string;
}

const NewsManager = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [newArticle, setNewArticle] = useState({
    title: "",
    excerpt: "",
    image_url: "",
    author: "",
    category: "Articles",
    read_time: "5 min read",
    is_featured: false,
    is_published: true,
  });

  const handleViewArticle = (article: Article) => {
    setSelectedArticle(article);
    setIsViewDialogOpen(true);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    console.log('Fetching articles...');
    try {
      // Simulate fetching articles
      const mockArticles: Article[] = [
        {
          id: '1',
          title: 'হযরত মুজাদ্দিদে আলফে সানীর জীবনী',
          excerpt: 'একটি সংক্ষিপ্ত জীবনী...',
          image_url: null,
          author: 'Admin',
          category: 'Articles',
          read_time: '5 min read',
          is_featured: true,
          is_published: true,
          published_at: new Date().toISOString()
        }
      ];
      console.log('Articles loaded:', mockArticles);
      setArticles(mockArticles);
    } catch (error: any) {
      console.error('Failed to fetch articles:', error);
      toast.error("সংবাদ লোড করতে ব্যর্থ: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddArticle = async () => {
    if (!newArticle.title || !newArticle.excerpt) {
      console.log('Add article failed: Missing required fields');
      toast.error("শিরোনাম এবং সংক্ষিপ্ত বিবরণ আবশ্যক");
      return;
    }

    setSaving(true);
    try {
      const newArticleData = {
        id: String(Date.now()),
        title: newArticle.title,
        excerpt: newArticle.excerpt,
        image_url: newArticle.image_url || null,
        author: newArticle.author || "Admin",
        category: newArticle.category,
        read_time: newArticle.read_time,
        is_featured: newArticle.is_featured,
        is_published: newArticle.is_published,
        published_at: new Date().toISOString()
      };

      console.log('Adding new article:', newArticleData);
      setArticles([newArticleData, ...articles]);

      toast.success("নতুন সংবাদ যোগ করা হয়েছে");
      setNewArticle({
        title: "",
        excerpt: "",
        image_url: "",
        author: "",
        category: "Articles",
        read_time: "5 min read",
        is_featured: false,
        is_published: true,
      });
      setIsAddingNew(false);
    } catch (error: any) {
      console.error('Failed to add article:', error);
      toast.error("সংবাদ যোগ করতে ব্যর্থ: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteArticle = async (id: string) => {
    try {
      console.log('Deleting article:', id);
      setArticles(articles.filter((a) => a.id !== id));
      toast.success("সংবাদ মুছে ফেলা হয়েছে");
    } catch (error: any) {
      console.error('Failed to delete article:', error);
      toast.error("মুছতে ব্যর্থ: " + error.message);
    }
  };

  const handleToggleFeatured = async (id: string) => {
    try {
      console.log('Toggling featured status for article:', id);
      const updatedArticles = articles.map(article => ({
        ...article,
        is_featured: article.id === id ? !article.is_featured : false
      }));
      setArticles(updatedArticles);
      toast.success("আপডেট হয়েছে");
    } catch (error: any) {
      console.error('Failed to toggle featured:', error);
      toast.error("আপডেট ব্যর্থ: " + error.message);
    }
  };

  const handleTogglePublished = async (id: string) => {
    try {
      console.log('Toggling published status for article:', id);
      const updatedArticles = articles.map(article => 
        article.id === id ? { ...article, is_published: !article.is_published } : article
      );
      setArticles(updatedArticles);
      toast.success("আপডেট হয়েছে");
    } catch (error: any) {
      console.error('Failed to toggle published:', error);
      toast.error("আপডেট ব্যর্থ: " + error.message);
    }
  };

  const filteredArticles = selectedCategory === "All"
    ? articles
    : articles.filter((a) => a.category === selectedCategory);

  const publishedCount = articles.filter((a) => a.is_published).length;
  const draftCount = articles.length - publishedCount;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-arabic">সংবাদ ম্যানেজমেন্ট</h2>
          <p className="text-muted-foreground">সংবাদ ও আর্টিকেল পরিচালনা করুন</p>
        </div>
        <Dialog open={isAddingNew} onOpenChange={setIsAddingNew}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              নতুন সংবাদ
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>নতুন সংবাদ/আর্টিকেল যোগ করুন</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>শিরোনাম</Label>
                <Input
                  value={newArticle.title}
                  onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                  placeholder="সংবাদের শিরোনাম লিখুন"
                />
              </div>
              <div className="space-y-2">
                <Label>সংক্ষিপ্ত বিবরণ</Label>
                <RichTextEditor
                  content={newArticle.excerpt}
                  onChange={(excerpt) => setNewArticle({ ...newArticle, excerpt })}
                  placeholder="সংবাদের সংক্ষিপ্ত বিবরণ..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>ছবির URL</Label>
                  <Input
                    value={newArticle.image_url}
                    onChange={(e) => setNewArticle({ ...newArticle, image_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>লেখক</Label>
                  <Input
                    value={newArticle.author}
                    onChange={(e) => setNewArticle({ ...newArticle, author: e.target.value })}
                    placeholder="লেখকের নাম"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>ক্যাটাগরি</Label>
                  <Select
                    value={newArticle.category}
                    onValueChange={(value) => setNewArticle({ ...newArticle, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {newsCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>পড়ার সময়</Label>
                  <Input
                    value={newArticle.read_time}
                    onChange={(e) => setNewArticle({ ...newArticle, read_time: e.target.value })}
                    placeholder="5 min read"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={newArticle.is_featured}
                    onCheckedChange={(checked) => setNewArticle({ ...newArticle, is_featured: checked })}
                  />
                  <Label>ফিচার্ড আর্টিকেল</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={newArticle.is_published}
                    onCheckedChange={(checked) => setNewArticle({ ...newArticle, is_published: checked })}
                  />
                  <Label>এখনই প্রকাশ করুন</Label>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsAddingNew(false)} className="flex-1">
                  বাতিল
                </Button>
                <Button onClick={handleAddArticle} className="flex-1" disabled={saving}>
                  {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  প্রকাশ করুন
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Newspaper className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold">{articles.length}</div>
              <p className="text-sm text-muted-foreground">মোট সংবাদ</p>
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
            <div className="h-10 w-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <Star className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <div className="text-2xl font-bold">{articles.filter(a => a.is_featured).length}</div>
              <p className="text-sm text-muted-foreground">ফিচার্ড</p>
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

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={selectedCategory === "All" ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory("All")}
        >
          All
        </Button>
        {newsCategories.map((cat) => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Articles Table */}
      <Card>
        <CardHeader>
          <CardTitle>সকল সংবাদ</CardTitle>
          <CardDescription>
            {selectedCategory === "All" ? "সকল সংবাদ দেখুন" : `${selectedCategory} ক্যাটাগরির সংবাদ`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredArticles.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              কোনো সংবাদ নেই। উপরে "নতুন সংবাদ" বাটনে ক্লিক করে যোগ করুন।
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">ছবি</TableHead>
                  <TableHead>শিরোনাম</TableHead>
                  <TableHead>লেখক</TableHead>
                  <TableHead>ক্যাটাগরি</TableHead>
                  <TableHead>তারিখ</TableHead>
                  <TableHead>স্ট্যাটাস</TableHead>
                  <TableHead className="w-24">অ্যাকশন</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArticles.map((article) => (
                  <TableRow key={article.id} className={!article.is_published ? "opacity-60" : ""}>
                    <TableCell>
                      <div className="h-10 w-14 rounded overflow-hidden bg-muted">
                        {article.image_url ? (
                          <img
                            src={article.image_url}
                            alt={article.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center">
                            <Image className="h-4 w-4 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[250px]">
                      <div className="flex items-center gap-2">
                        {article.is_featured && (
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                        )}
                        <span className="truncate font-medium">{article.title}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{article.author}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{article.category}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(article.published_at).toLocaleDateString('bn-BD')}
                    </TableCell>
                    <TableCell>
                      {article.is_published ? (
                        <Badge variant="default">প্রকাশিত</Badge>
                      ) : (
                        <Badge variant="secondary">ড্রাফট</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewArticle(article)}>
                            <Eye className="h-4 w-4 mr-2" />
                            দেখুন
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleFeatured(article.id)}>
                            <Star className="h-4 w-4 mr-2" />
                            {article.is_featured ? "ফিচার্ড বাতিল" : "ফিচার্ড করুন"}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleTogglePublished(article.id)}>
                            {article.is_published ? (
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
                            onClick={() => handleDeleteArticle(article.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            মুছে ফেলুন
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

      {/* View Article Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>সংবাদ বিস্তারিত</DialogTitle>
          </DialogHeader>
          {selectedArticle && (
            <div className="space-y-4 mt-4">
              {selectedArticle.image_url && (
                <div className="h-48 rounded-lg overflow-hidden">
                  <img 
                    src={selectedArticle.image_url} 
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {selectedArticle.is_featured && (
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  )}
                  <h3 className="text-xl font-bold">{selectedArticle.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{selectedArticle.category}</Badge>
                  {selectedArticle.is_published ? (
                    <Badge variant="default">প্রকাশিত</Badge>
                  ) : (
                    <Badge variant="secondary">ড্রাফট</Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>লেখক: {selectedArticle.author}</span>
                <span>তারিখ: {new Date(selectedArticle.published_at).toLocaleDateString('bn-BD')}</span>
                {selectedArticle.read_time && <span>{selectedArticle.read_time}</span>}
              </div>
              <div className="p-4 border rounded-lg">
                <Label className="text-sm text-muted-foreground">সংক্ষিপ্ত বিবরণ</Label>
                <div 
                  className="mt-2 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedArticle.excerpt }}
                />
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
    </div>
  );
};

export default NewsManager;
