"use client";

console.log("Dashboard component loaded:", "components/dashboard/GalleryManager.tsx");

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { createGallery, deleteGallery } from "@/services/gallery.api";
import { GalleryData } from "@/type/gallery";

const categories = ["সব", "মাজার শরীফ", "অনুষ্ঠান", "পান্ডুলিপি", "বই", "ক্যালিগ্রাফি", "শহর", "অন্যান্য"];

const GalleryManager = ({ initialData }: { initialData: GalleryData[] }) => {
  const router = useRouter();
  const [galleryItems, setGalleryItems] = useState<GalleryData[]>(initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [newItem, setNewItem] = useState({ title: "", description: "", image_url: "", category: "অন্যান্য" });

  const handleAddItem = async () => {
    if (!newItem.title || !newItem.image_url) {
      toast.error("শিরোনাম এবং ছবির URL আবশ্যক");
      return;
    }

    try {
      const result = await createGallery({
        title: newItem.title,
        description: newItem.description,
        image_url: newItem.image_url,
        category: newItem.category,
        is_published: true,
        views: 0
      });

      if (result.success) {
        toast.success("নতুন ছবি যোগ করা হয়েছে");
        setNewItem({ title: "", description: "", image_url: "", category: "অন্যান্য" });
        setIsAddDialogOpen(false);
        router.refresh();
      } else {
        toast.error("ছবি যোগ করতে ব্যর্থ হয়েছে");
      }
    } catch (error) {
      toast.error("কিছু একটা ভুল হয়েছে");
    }
  };

  const handleDeleteItem = async (id: string) => {
    const originalItems = [...galleryItems];
    setGalleryItems(galleryItems.filter(item => item._id !== id));

    try {
      const result = await deleteGallery(id);
      if (result.success) {
        toast.success("ছবি মুছে ফেলা হয়েছে");
        router.refresh();
      } else {
        setGalleryItems(originalItems);
        toast.error("মুছতে ব্যর্থ হয়েছে");
      }
    } catch (error) {
      setGalleryItems(originalItems);
      toast.error("কিছু একটা ভুল হয়েছে");
    }
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
              <div className="space-y-2">
                <Label>ক্যাটাগরি</Label>
                <Select 
                  value={newItem.category} 
                  onValueChange={(value) => setNewItem({ ...newItem, category: value })}
                >
                  <SelectTrigger><SelectValue placeholder="ক্যাটাগরি নির্বাচন করুন" /></SelectTrigger>
                  <SelectContent>
                    {categories.filter(c => c !== "সব").map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
              <div key={item._id} className="group relative rounded-lg overflow-hidden border">
                <img src={item.image_url} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h4 className="font-medium truncate">{item.title}</h4>
                  <p className="text-sm text-muted-foreground truncate">{item.description || "-"}</p>
                </div>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="secondary" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteItem(item._id)}>
                        <Trash2 className="h-4 w-4 ml-2" />ডিলিট
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
