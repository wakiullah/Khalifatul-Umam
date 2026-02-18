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
import { toast } from "sonner";

export interface BookFormData {
  title: string;
  arabic_title?: string;
  description: string;
  volumes: string;
  language: string;
  is_featured: boolean;
  is_published: boolean;
}

interface BookModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: BookFormData) => void;
  initialData?: BookFormData | null;
  children?: React.ReactNode;
}

function BookForm({
  initialData,
  onSave,
  onCancel,
}: {
  initialData?: BookFormData | null;
  onSave: (data: BookFormData) => void;
  onCancel: () => void;
}) {
  const defaultFormData: BookFormData = {
    title: "",
    arabic_title: "",
    description: "",
    volumes: "1 Volume",
    language: "Bengali",
    is_featured: false,
    is_published: true,
  };

  const [formData, setFormData] = useState<BookFormData>(
    initialData || defaultFormData,
  );

  const handleSave = () => {
    if (!formData.title || !formData.description) {
      toast.error("নাম এবং বিবরণ আবশ্যক");
      return;
    }

    onSave(formData);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>বইয়ের নাম</Label>
          <Input
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="বইয়ের নাম লিখুন"
          />
        </div>
        <div className="space-y-2">
          <Label>আরবি নাম</Label>
          <Input
            value={formData.arabic_title}
            onChange={(e) =>
              setFormData({ ...formData, arabic_title: e.target.value })
            }
            placeholder="আরবি নাম"
            dir="rtl"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>বিবরণ</Label>
        <Textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="বইয়ের সংক্ষিপ্ত বিবরণ..."
          rows={3}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>ভলিউম সংখ্যা</Label>
          <Input
            value={formData.volumes}
            onChange={(e) =>
              setFormData({ ...formData, volumes: e.target.value })
            }
            placeholder="উদাঃ 3 Volumes"
          />
        </div>
        <div className="space-y-2">
          <Label>ভাষা</Label>
          <Input
            value={formData.language}
            onChange={(e) =>
              setFormData({ ...formData, language: e.target.value })
            }
            placeholder="উদাঃ Persian, Arabic"
          />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Switch
            checked={formData.is_featured}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, is_featured: checked })
            }
          />
          <Label>ফিচার্ড বই</Label>
        </div>
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

export function BookModal({
  open,
  onOpenChange,
  onSave,
  initialData,
  children,
}: BookModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "বই সম্পাদনা করুন" : "নতুন বই যোগ করুন"}
          </DialogTitle>
        </DialogHeader>
        <BookForm
          initialData={initialData}
          onSave={onSave}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
