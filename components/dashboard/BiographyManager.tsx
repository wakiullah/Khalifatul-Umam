"use client";

console.log(
  "Dashboard component loaded:",
  "components/dashboard/BiographyManager.tsx",
);

import { useState } from "react";
import {
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  Calendar,
  Book,
  Award,
  MapPin,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { BiographyData } from "@/type/biography";
import { updateBiographyData } from "@/services/biography.api";

const iconOptions = [
  { value: "calendar", label: "ক্যালেন্ডার", icon: Calendar },
  { value: "book", label: "বই", icon: Book },
  { value: "award", label: "পুরস্কার", icon: Award },
  { value: "mappin", label: "লোকেশন", icon: MapPin },
];

interface TimelineItem {
  id: string;
  year: string;
  title: string;
  description: string | null;
  icon_type: string;
}

interface BiographyManagerProps {
  initialData: BiographyData;
}

const BiographyManager = ({ initialData }: BiographyManagerProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: initialData.full_name,
    title: initialData.title,
    arabic_name: initialData.arabic_name,
    english_name: initialData.english_name,
    description: initialData.description,
  });

  const [timeline, setTimeline] = useState<TimelineItem[]>(
    initialData.timeline.map((item) => ({
      id: item._id,
      year: item.year,
      title: item.title,
      description: item.description,
      icon_type: item.icon_type,
    })),
  );

  const [newTimelineItem, setNewTimelineItem] = useState({
    year: "",
    title: "",
    description: "",
    icon_type: "calendar",
  });
  const [isAddingTimeline, setIsAddingTimeline] = useState(false);

  const handleSave = async () => {
    try {
      const data = await updateBiographyData(formData);
      if (data.success) {
        toast.success("জীবনী সংরক্ষণ করা হয়েছে");
        setIsEditing(false);
      }
    } catch (error) {
      toast.error("সংরক্ষণ ব্যর্থ হয়েছে");
    }
  };

  const handleAddTimeline = async () => {
    if (!newTimelineItem.year || !newTimelineItem.title) {
      toast.error("সাল এবং শিরোনাম আবশ্যক");
      return;
    }

    try {
      const data = await updateBiographyData({
        add_timeline_item: {
          year: newTimelineItem.year,
          title: newTimelineItem.title,
          description: newTimelineItem.description,
          icon_type: newTimelineItem.icon_type,
        },
      });
      if (data.success) {
        setTimeline(
          data.data.timeline.map((item: any) => ({
            id: item._id,
            year: item.year,
            title: item.title,
            description: item.description,
            icon_type: item.icon_type,
          })),
        );
        setNewTimelineItem({
          year: "",
          title: "",
          description: "",
          icon_type: "calendar",
        });
        setIsAddingTimeline(false);
        toast.success("টাইমলাইন আইটেম যোগ করা হয়েছে");
      }
    } catch (error) {
      toast.error("টাইমলাইন যোগ করতে ব্যর্থ");
    }
  };

  const handleDeleteTimeline = async (id: string) => {
    const updatedTimeline = timeline.filter((t) => t.id !== id);
    try {
      const data = await updateBiographyData({ timeline: updatedTimeline });
      if (data.success) {
        setTimeline(updatedTimeline);
        toast.success("টাইমলাইন আইটেম মুছে ফেলা হয়েছে");
      }
    } catch (error) {
      toast.error("মুছতে ব্যর্থ");
    }
  };

  const getIconComponent = (iconType: string) => {
    const option = iconOptions.find((o) => o.value === iconType);
    return option ? option.icon : Calendar;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold font-arabic">জীবনী ম্যানেজমেন্ট</h2>
          <p className="text-muted-foreground">
            হযরত মুজাদ্দিদ আলফে সানীর জীবনী সম্পাদনা করুন
          </p>
        </div>
        {isEditing ? (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              <X className="h-4 w-4 mr-2" />
              বাতিল
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              সংরক্ষণ
            </Button>
          </div>
        ) : (
          <Button onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4 mr-2" />
            সম্পাদনা
          </Button>
        )}
      </div>

      {/* Basic Info Card */}
      <Card>
        <CardHeader>
          <CardTitle>মৌলিক তথ্য</CardTitle>
          <CardDescription>নাম ও পরিচয় সম্পাদনা</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>পূর্ণ নাম</Label>
              <Input
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
                disabled={!isEditing}
                placeholder="পূর্ণ নাম লিখুন"
              />
            </div>
            <div className="space-y-2">
              <Label>উপাধি</Label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                disabled={!isEditing}
                placeholder="উপাধি লিখুন"
              />
            </div>
            <div className="space-y-2">
              <Label>আরবি নাম</Label>
              <Input
                value={formData.arabic_name}
                onChange={(e) =>
                  setFormData({ ...formData, arabic_name: e.target.value })
                }
                disabled={!isEditing}
                dir="rtl"
                placeholder="আরবি নাম"
              />
            </div>
            <div className="space-y-2">
              <Label>ইংরেজি নাম</Label>
              <Input
                value={formData.english_name}
                onChange={(e) =>
                  setFormData({ ...formData, english_name: e.target.value })
                }
                disabled={!isEditing}
                placeholder="English name"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Description Card */}
      <Card>
        <CardHeader>
          <CardTitle>বিবরণ</CardTitle>
          <CardDescription>জীবনীর বিস্তারিত বিবরণ</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.description.map((para, index) => (
            <div key={index} className="space-y-2">
              <Label>অনুচ্ছেদ {index + 1}</Label>
              <Textarea
                value={para}
                onChange={(e) => {
                  const newDesc = [...formData.description];
                  newDesc[index] = e.target.value;
                  setFormData({ ...formData, description: newDesc });
                }}
                disabled={!isEditing}
                rows={3}
                placeholder="অনুচ্ছেদ লিখুন..."
              />
            </div>
          ))}
          {isEditing && (
            <Button
              variant="outline"
              onClick={() =>
                setFormData({
                  ...formData,
                  description: [...formData.description, ""],
                })
              }
            >
              <Plus className="h-4 w-4 mr-2" />
              নতুন অনুচ্ছেদ যোগ করুন
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Timeline Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>টাইমলাইন</CardTitle>
            <CardDescription>জীবনের গুরুত্বপূর্ণ ঘটনাবলী</CardDescription>
          </div>
          <Dialog open={isAddingTimeline} onOpenChange={setIsAddingTimeline}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                নতুন ইভেন্ট
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>নতুন টাইমলাইন ইভেন্ট</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>সাল</Label>
                  <Input
                    value={newTimelineItem.year}
                    onChange={(e) =>
                      setNewTimelineItem({
                        ...newTimelineItem,
                        year: e.target.value,
                      })
                    }
                    placeholder="উদাঃ 1564 CE"
                  />
                </div>
                <div className="space-y-2">
                  <Label>শিরোনাম</Label>
                  <Input
                    value={newTimelineItem.title}
                    onChange={(e) =>
                      setNewTimelineItem({
                        ...newTimelineItem,
                        title: e.target.value,
                      })
                    }
                    placeholder="ইভেন্টের শিরোনাম"
                  />
                </div>
                <div className="space-y-2">
                  <Label>বিবরণ</Label>
                  <Textarea
                    value={newTimelineItem.description}
                    onChange={(e) =>
                      setNewTimelineItem({
                        ...newTimelineItem,
                        description: e.target.value,
                      })
                    }
                    placeholder="বিস্তারিত বিবরণ"
                  />
                </div>
                <div className="space-y-2">
                  <Label>আইকন</Label>
                  <Select
                    value={newTimelineItem.icon_type}
                    onValueChange={(value) =>
                      setNewTimelineItem({
                        ...newTimelineItem,
                        icon_type: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {iconOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <option.icon className="h-4 w-4" />
                            {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleAddTimeline} className="w-full">
                  যোগ করুন
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {timeline.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              কোনো টাইমলাইন ইভেন্ট নেই। উপরে "নতুন ইভেন্ট" বাটনে ক্লিক করে যোগ
              করুন।
            </div>
          ) : (
            <div className="space-y-4">
              {timeline.map((item) => {
                const IconComponent = getIconComponent(item.icon_type);
                return (
                  <div
                    key={item.id}
                    className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-primary">
                          {item.year}
                        </span>
                        <span className="font-semibold">{item.title}</span>
                      </div>
                      {item.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => handleDeleteTimeline(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BiographyManager;
