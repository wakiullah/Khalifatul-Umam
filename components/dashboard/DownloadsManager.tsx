"use client";

console.log("Dashboard component loaded:", "components/dashboard/DownloadsManager.tsx");

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Download, FileText, Music, Book, Trash2, MoreVertical, Upload, Edit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { DownloadFormData, DownloadModal } from "./downloads/DownloadModal";
import { createDownload, updateDownload, deleteDownload } from "@/services/downloads.api";
import { DownloadData, DownloadItem } from "@/type/downloads";


const DownloadsManager = ({ initialData }: { initialData: DownloadData[] }) => {
  const router = useRouter();
  const [downloads, setDownloads] = useState<DownloadItem[]>(
    initialData.map((d) => ({
      id: d._id,
      title: d.title,
      description: d.description,
      file_url: d.file_url,
      file_type: d.file_type,
      file_size: d.file_size,
      category: d.category,
      language: d.language,
      download_count: d.download_count,
      is_published: d.is_published,
    }))
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<typeof downloads[0] | null>(null);

  const handleAddDownload = async (data: DownloadFormData) => {
    try {
      const result = await createDownload(data);
      if (result.success) {
        toast.success("নতুন ফাইল যোগ করা হয়েছে");
        router.refresh();
        setIsAddDialogOpen(false);
      } else {
        toast.error("ফাইল যোগ করতে ব্যর্থ হয়েছে");
      }
    } catch (error) {
      toast.error("ফাইল যোগ করতে ব্যর্থ হয়েছে");
    }
  };

  const handleUpdateDownload = async (data: DownloadFormData) => {
    if (!editingItem) return;
    const id = editingItem.id;

    const originalDownloads = [...downloads];
    const updatedDownloads = downloads.map((item) =>
      item.id === id ? { ...item, ...data } : item
    );
    setDownloads(updatedDownloads);
    setIsEditing(false);
    setEditingItem(null);

    try {
      const result = await updateDownload(id, data);
      if (result.success) {
        toast.success("ফাইল আপডেট করা হয়েছে");
        router.refresh();
      } else {
        setDownloads(originalDownloads);
        toast.error("আপডেট করতে ব্যর্থ হয়েছে");
      }
    } catch (error) {
      setDownloads(originalDownloads);
      toast.error("আপডেট করতে ব্যর্থ হয়েছে");
    }
  };

  const handleDeleteItem = async (id: string) => {
    const originalDownloads = [...downloads];
    setDownloads(downloads.filter(item => item.id !== id));

    try {
      const result = await deleteDownload(id);
      if (result.success) {
        toast.success("ফাইল মুছে ফেলা হয়েছে");
        router.refresh();
      } else {
        setDownloads(originalDownloads);
        toast.error("মুছতে ব্যর্থ হয়েছে");
      }
    } catch (error) {
      setDownloads(originalDownloads);
      toast.error("মুছতে ব্যর্থ হয়েছে");
    }
  };

  const openEditModal = (item: typeof downloads[0]) => {
    setEditingItem(item);
    setIsEditing(true);
  };

  const filteredItems = downloads.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalDownloads = downloads.reduce((acc, item) => acc + item.download_count, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">ডাউনলোড ম্যানেজমেন্ট</h1>
          <p className="text-muted-foreground mt-1">ডাউনলোড ফাইলসমূহ পরিচালনা করুন</p>
        </div>
        <DownloadModal
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onSave={handleAddDownload}
        >
          <Button className="gap-2"><Upload className="h-4 w-4" />নতুন ফাইল</Button>
        </DownloadModal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">মোট ফাইল</p><h3 className="text-2xl font-bold">{downloads.length}</h3></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">মোট ডাউনলোড</p><h3 className="text-2xl font-bold">{totalDownloads.toLocaleString()}</h3></CardContent></Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="ফাইল সার্চ করুন..." className="pr-10" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>সমস্ত ফাইল</CardTitle><CardDescription>{filteredItems.length}টি ফাইল</CardDescription></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ফাইল</TableHead>
                <TableHead>ক্যাটাগরি</TableHead>
                <TableHead>টাইপ</TableHead>
                <TableHead>সাইজ</TableHead>
                <TableHead>ডাউনলোড</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell><p className="font-medium truncate max-w-[200px]">{item.title}</p></TableCell>
                  <TableCell><Badge variant="outline">{item.category}</Badge></TableCell>
                  <TableCell><Badge variant="secondary">{item.file_type}</Badge></TableCell>
                  <TableCell>{item.file_size}</TableCell>
                  <TableCell>{item.download_count}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditModal(item)}>
                          <Edit className="h-4 w-4 ml-2" />এডিট
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteItem(item.id)}>
                          <Trash2 className="h-4 w-4 ml-2" />ডিলিট
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

      {editingItem && (
        <DownloadModal
          open={isEditing}
          onOpenChange={(open) => {
            setIsEditing(open);
            if (!open) setEditingItem(null);
          }}
          onSave={handleUpdateDownload}
          initialData={editingItem}
        />
      )}
    </div>
  );
};

export default DownloadsManager;
