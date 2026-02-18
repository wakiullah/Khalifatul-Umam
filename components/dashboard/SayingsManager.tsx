"use client";

console.log("Dashboard component loaded:", "components/dashboard/SayingsManager.tsx");

import { useState } from "react";
import { Plus, Trash2, Star, MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { sayingsData, featuredSaying } from "@/data/siteData";

interface Saying {
  id: string;
  arabic: string;
  translation: string;
  context: string | null;
  is_featured: boolean;
  is_published: boolean;
}

const SayingsManager = () => {
  const [sayings, setSayings] = useState<Saying[]>(
    sayingsData.map((s, i) => ({
      id: String(i + 1),
      arabic: s.arabic,
      translation: s.translation,
      context: s.context,
      is_featured: i === 0,
      is_published: true,
    }))
  );
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newSaying, setNewSaying] = useState({
    arabic: "",
    translation: "",
    context: "",
  });

  const handleAddSaying = () => {
    if (!newSaying.arabic || !newSaying.translation) {
      toast.error("আরবি এবং অনুবাদ আবশ্যক");
      return;
    }

    const newItem: Saying = {
      id: String(Date.now()),
      arabic: newSaying.arabic,
      translation: newSaying.translation,
      context: newSaying.context || null,
      is_featured: false,
      is_published: true,
    };

    setSayings([newItem, ...sayings]);
    setNewSaying({ arabic: "", translation: "", context: "" });
    setIsAddingNew(false);
    toast.success("নতুন বাণী যোগ করা হয়েছে");
  };

  const handleDeleteSaying = (id: string) => {
    setSayings(sayings.filter((s) => s.id !== id));
    toast.success("বাণী মুছে ফেলা হয়েছে");
  };

  const handleSetFeatured = (id: string) => {
    setSayings(sayings.map(s => ({
      ...s,
      is_featured: s.id === id,
    })));
    toast.success("ফিচার্ড বাণী আপডেট হয়েছে");
  };

  const featuredSayingItem = sayings.find((s) => s.is_featured);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-arabic">বাণী ম্যানেজমেন্ট</h2>
          <p className="text-muted-foreground">হযরত মুজাদ্দিদের মূল্যবান বাণীসমূহ</p>
        </div>
        <Dialog open={isAddingNew} onOpenChange={setIsAddingNew}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              নতুন বাণী
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>নতুন বাণী যোগ করুন</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>আরবি টেক্সট</Label>
                <Textarea
                  value={newSaying.arabic}
                  onChange={(e) => setNewSaying({ ...newSaying, arabic: e.target.value })}
                  placeholder="আরবি বাণী লিখুন..."
                  dir="rtl"
                  className="font-arabic text-lg"
                />
              </div>
              <div className="space-y-2">
                <Label>অনুবাদ</Label>
                <Textarea
                  value={newSaying.translation}
                  onChange={(e) => setNewSaying({ ...newSaying, translation: e.target.value })}
                  placeholder="বাংলা/ইংরেজি অনুবাদ..."
                />
              </div>
              <div className="space-y-2">
                <Label>প্রসঙ্গ/সূত্র</Label>
                <Input
                  value={newSaying.context}
                  onChange={(e) => setNewSaying({ ...newSaying, context: e.target.value })}
                  placeholder="উদাঃ মাকতুবাত থেকে"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsAddingNew(false)} className="flex-1">
                  বাতিল
                </Button>
                <Button onClick={handleAddSaying} className="flex-1">
                  যোগ করুন
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Featured Saying Card */}
      {featuredSayingItem && (
        <Card className="border-primary/50 bg-primary/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary fill-primary" />
                <CardTitle>ফিচার্ড বাণী</CardTitle>
              </div>
              <Badge variant="secondary">হোমপেজে প্রদর্শিত</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-2xl font-arabic text-center" dir="rtl">
                {featuredSayingItem.arabic}
              </p>
              <p className="text-lg text-center italic">"{featuredSayingItem.translation}"</p>
              {featuredSayingItem.context && (
                <p className="text-sm text-muted-foreground text-center">{featuredSayingItem.context}</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{sayings.length}</div>
            <p className="text-sm text-muted-foreground">মোট বাণী</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{sayings.filter(s => s.is_featured).length}</div>
            <p className="text-sm text-muted-foreground">ফিচার্ড</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{sayings.filter(s => s.is_published).length}</div>
            <p className="text-sm text-muted-foreground">প্রকাশিত</p>
          </CardContent>
        </Card>
      </div>

      {/* Sayings Table */}
      <Card>
        <CardHeader>
          <CardTitle>সকল বাণী</CardTitle>
          <CardDescription>বাণীসমূহ সম্পাদনা ও মুছতে পারবেন</CardDescription>
        </CardHeader>
        <CardContent>
          {sayings.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              কোনো বাণী নেই। উপরে "নতুন বাণী" বাটনে ক্লিক করে যোগ করুন।
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">#</TableHead>
                  <TableHead>আরবি</TableHead>
                  <TableHead>অনুবাদ</TableHead>
                  <TableHead>প্রসঙ্গ</TableHead>
                  <TableHead className="w-24">অ্যাকশন</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sayings.map((saying, index) => (
                  <TableRow key={saying.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-arabic text-right max-w-[200px]" dir="rtl">
                      {saying.arabic.length > 40 ? saying.arabic.slice(0, 40) + "..." : saying.arabic}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {saying.translation}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {saying.context || "-"}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleSetFeatured(saying.id)}>
                            <Star className="h-4 w-4 mr-2" />
                            ফিচার্ড করুন
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteSaying(saying.id)}
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
    </div>
  );
};

export default SayingsManager;
