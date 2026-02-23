"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Star, MoreVertical, Edit } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { SayingData } from "@/type/saying";
import {
  createSaying,
  deleteSaying,
  updateSaying,
} from "@/services/saying.api";
import { SayingModal } from "./sayings/SayingModal";
import { CreateSayingRequest } from "@/type/saying";

const SayingsManager = ({ initialData }: { initialData: SayingData[] }) => {
  const router = useRouter();
  const [sayings, setSayings] = useState<SayingData[]>(initialData);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingSaying, setEditingSaying] = useState<SayingData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) setSayings(initialData);
  }, [initialData]);

  const handleAddSaying = async (data: CreateSayingRequest) => {
    if (!data.arabic || !data.translation) {
      toast.error("আরবি এবং অনুবাদ আবশ্যক");
      return;
    }

    setLoading(true);
    try {
      const res = await createSaying({
        arabic: data.arabic,
        translation: data.translation,
        context: data.context,
        is_featured: false,
        is_published: true,
      });

      if (res.success) {
        setSayings([res.data, ...sayings]);
        setIsAddingNew(false);
        toast.success("নতুন বাণী যোগ করা হয়েছে");
        router.refresh();
      } else {
        toast.error(res.message || "বাণী যোগ করতে ব্যর্থ");
      }
    } catch (error: any) {
      toast.error("বাণী যোগ করতে ব্যর্থ: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateSaying = async (data: CreateSayingRequest) => {
    if (!editingSaying) return;
    if (!data.arabic || !data.translation) {
      toast.error("আরবি এবং অনুবাদ আবশ্যক");
      return;
    }

    setLoading(true);
    try {
      const res = await updateSaying(editingSaying._id, {
        arabic: data.arabic,
        translation: data.translation,
        context: data.context,
      });

      if (res.success) {
        setSayings(
          sayings.map((s) => (s._id === editingSaying._id ? res.data : s)),
        );
        setEditingSaying(null);
        toast.success("বাণী আপডেট হয়েছে");
        router.refresh();
      } else {
        toast.error(res.message || "আপডেট ব্যর্থ");
      }
    } catch (error: any) {
      toast.error("আপডেট ব্যর্থ: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSaying = async (id: string) => {
    try {
      const res = await deleteSaying(id);
      if (res.success) {
        setSayings(sayings.filter((s) => s._id !== id));
        toast.success("বাণী মুছে ফেলা হয়েছে");
        router.refresh();
      } else {
        toast.error(res.message || "মুছতে ব্যর্থ");
      }
    } catch (error: any) {
      toast.error("মুছতে ব্যর্থ: " + error.message);
    }
  };

  const handleSetFeatured = async (id: string, currentStatus: boolean) => {
    try {
      const res = await updateSaying(id, { is_featured: !currentStatus });
      if (res.success) {
        setSayings(sayings.map((s) => (s._id === id ? res.data : s)));
        toast.success("ফিচার্ড স্ট্যাটাস আপডেট হয়েছে");
        router.refresh();
      } else {
        toast.error(res.message || "আপডেট ব্যর্থ");
      }
    } catch (error: any) {
      toast.error("আপডেট ব্যর্থ: " + error.message);
    }
  };

  const featuredSayingItem = sayings.find((s) => s.is_featured);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-arabic">বাণী ম্যানেজমেন্ট</h2>
          <p className="text-muted-foreground">
            হযরত মুজাদ্দিদের মূল্যবান বাণীসমূহ
          </p>
        </div>
        <Button onClick={() => setIsAddingNew(true)}>
          <Plus className="h-4 w-4 mr-2" />
          নতুন বাণী
        </Button>
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
              <p className="text-lg text-center italic">
                "{featuredSayingItem.translation}"
              </p>
              {featuredSayingItem.context && (
                <p className="text-sm text-muted-foreground text-center">
                  {featuredSayingItem.context}
                </p>
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
            <div className="text-2xl font-bold">
              {sayings.filter((s) => s.is_featured).length}
            </div>
            <p className="text-sm text-muted-foreground">ফিচার্ড</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {sayings.filter((s) => s.is_published).length}
            </div>
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
                  <TableRow key={saying._id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell
                      className="font-arabic text-right max-w-[200px]"
                      dir="rtl"
                    >
                      {saying.arabic.length > 40
                        ? saying.arabic.slice(0, 40) + "..."
                        : saying.arabic}
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
                          <DropdownMenuItem
                            onClick={() => setEditingSaying(saying)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            এডিট করুন
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleSetFeatured(saying._id, saying.is_featured)
                            }
                          >
                            <Star
                              className={`h-4 w-4 mr-2 ${saying.is_featured ? "fill-yellow-500 text-yellow-500" : ""}`}
                            />
                            {saying.is_featured
                              ? "ফিচার্ড বাতিল"
                              : "ফিচার্ড করুন"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteSaying(saying._id)}
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

      {/* Add Modal */}
      <SayingModal
        open={isAddingNew}
        onOpenChange={setIsAddingNew}
        onSave={handleAddSaying}
        loading={loading}
        mode="add"
      />

      {/* Edit Modal */}
      {editingSaying && (
        <SayingModal
          open={!!editingSaying}
          onOpenChange={(open) => !open && setEditingSaying(null)}
          initialData={editingSaying}
          onSave={handleUpdateSaying}
          loading={loading}
          mode="edit"
        />
      )}
    </div>
  );
};

export default SayingsManager;
