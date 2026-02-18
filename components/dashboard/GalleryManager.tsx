"use client";

console.log("Dashboard component loaded:", "components/dashboard/GalleryManager.tsx");

import { useState } from "react";
import { Plus, Search, Image, Upload, Eye, Download, Trash2, MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
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
import { toast } from "sonner";
import { galleryData } from "@/data/siteData";

const categories = ["সব", "মাজার শরীফ", "অনুষ্ঠান", "পান্ডুলিপি", "বই", "ক্যালিগ্রাফি", "শহর", "অন্যান্য"];

interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string;
  views: number;
  is_published: boolean;
}

const GalleryManager = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(
    galleryData.map((g) => ({
      id: String(g.id),
      title: g.title,
      description: g.description,
      image_url: g.src,
      category: "অন্যান্য",
      views: Math.floor(Math.random() * 1000),
      is_published: true,
    }))
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [newItem, setNewItem] = useState({ title: "", description: "", image_url: "", category: "অন্যান্য" });

  const handleAddItem = () => {
    if (!newItem.title || !newItem.image_url) {
      toast.error("শিরোনাম এবং ছবির URL আবশ্যক");
      return;
    }
    const newGalleryItem: GalleryItem = {
      id: String(Date.now()),
      ...newItem,
      description: newItem.description || null,
      views: 0,
      is_published: true,
    };
    setGalleryItems([newGalleryItem, ...galleryItems]);
    setNewItem({ title: "", description: "", image_url: "", category: "অন্যান্য" });
    setIsAddDialogOpen(false);
    toast.success("নতুন ছবি যোগ করা হয়েছে");
  };

  const handleDeleteItem = (id: string) => {
    setGalleryItems(galleryItems.filter(item => item.id !== id));
    toast.success("ছবি মুছে ফেলা হয়েছে");
  };

  const filteredItems = galleryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">গ্যালারি ম্যানেজমেন্ট</h1>
          <p className="text-muted-foreground mt-1">ছবি এবং মিডিয়া পরিচালনা করুন</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Upload className="h-4 w-4" />আপলোড করুন</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>নতুন ছবি যোগ করুন</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2"><Label>ছবির URL</Label><Input placeholder="https://..." value={newItem.image_url} onChange={(e) => setNewItem({ ...newItem, image_url: e.target.value })} /></div>
              <div className="space-y-2"><Label>শিরোনাম</Label><Input placeholder="ছবির শিরোনাম" value={newItem.title} onChange={(e) => setNewItem({ ...newItem, title: e.target.value })} /></div>
              <div className="space-y-2"><Label>বিবরণ</Label><Textarea placeholder="ছবির বিবরণ..." value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} /></div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>বাতিল</Button>
                <Button onClick={handleAddItem}>যোগ করুন</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">মোট ছবি</p><h3 className="text-2xl font-bold">{galleryItems.length}</h3></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">প্রকাশিত</p><h3 className="text-2xl font-bold">{galleryItems.filter(i => i.is_published).length}</h3></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>গ্যালারি</CardTitle><CardDescription>{filteredItems.length}টি ছবি</CardDescription></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => (
              <div key={item.id} className="group relative rounded-lg overflow-hidden border">
                <img src={item.image_url} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h4 className="font-medium truncate">{item.title}</h4>
                  <p className="text-sm text-muted-foreground truncate">{item.description || "-"}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GalleryManager;
