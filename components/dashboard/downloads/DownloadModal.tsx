"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { CreateDownloadRequest } from "@/type/downloads";

export type DownloadFormData = CreateDownloadRequest;

interface DownloadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: DownloadFormData) => void;
  initialData?: DownloadFormData | null;
  children?: React.ReactNode;
}

function DownloadForm({
  initialData,
  onSave,
  onCancel,
}: {
  initialData?: DownloadFormData | null;
  onSave: (data: DownloadFormData) => void;
  onCancel: () => void;
}) {
  const defaultFormData: DownloadFormData = {
    title: "",
    description: "",
    file_url: "",
    file_type: "PDF",
    file_size: "",
    category: "Books",
    language: "Bengali",
    is_published: true,
  };

  const [formData, setFormData] = useState<DownloadFormData>(
    initialData || defaultFormData,
  );

  const handleSave = () => {
    if (!formData.title || !formData.file_url) {
      toast.error("শিরোনাম এবং ফাইলের URL আবশ্যক");
      return;
    }

    onSave(formData);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>ফাইলের নাম</Label>
        <Input
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          placeholder="ফাইলের নাম লিখুন"
        />
      </div>

      <div className="space-y-2">
        <Label>বিবরণ</Label>
        <Textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="ফাইলের বিবরণ..."
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>ফাইল URL</Label>
          <Input
            value={formData.file_url}
            onChange={(e) =>
              setFormData({ ...formData, file_url: e.target.value })
            }
            placeholder="https://example.com/file.pdf"
          />
        </div>
        <div className="space-y-2">
          <Label>ফাইলের সাইজ</Label>
          <Input
            value={formData.file_size}
            onChange={(e) =>
              setFormData({ ...formData, file_size: e.target.value })
            }
            placeholder="উদাঃ 5 MB"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>ফাইলের ধরন</Label>
          <Select
            value={formData.file_type}
            onValueChange={(value) =>
              setFormData({ ...formData, file_type: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="ধরন নির্বাচন করুন" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PDF">PDF</SelectItem>
              <SelectItem value="Audio">Audio</SelectItem>
              <SelectItem value="Video">Video</SelectItem>
              <SelectItem value="Image">Image</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>ভাষা</Label>
          <Input
            value={formData.language}
            onChange={(e) =>
              setFormData({ ...formData, language: e.target.value })
            }
            placeholder="উদাঃ Bengali"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>ক্যাটাগরি</Label>
        <Select
          value={formData.category}
          onValueChange={(value) =>
            setFormData({ ...formData, category: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="ক্যাটাগরি নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Books">Books</SelectItem>
            <SelectItem value="Documents">Documents</SelectItem>
            <SelectItem value="Media">Media</SelectItem>
            <SelectItem value="Others">Others</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Switch
            checked={formData.is_published}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, is_published: checked })
            }
          />
          <Label>প্রকাশিত</Label>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={onCancel} className="flex-1">
          বাতিল
        </Button>
        <Button onClick={handleSave} className="flex-1">
          {initialData ? "আপডেট করুন" : "যোগ করুন"}
        </Button>
      </div>
    </div>
  );
}

export function DownloadModal({
  open,
  onOpenChange,
  onSave,
  initialData,
  children,
}: DownloadModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "ফাইল সম্পাদনা করুন" : "নতুন ফাইল যোগ করুন"}
          </DialogTitle>
        </DialogHeader>
        <DownloadForm
          initialData={initialData}
          onSave={onSave}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
