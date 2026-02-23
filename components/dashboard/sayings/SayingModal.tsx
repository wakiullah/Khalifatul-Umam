import { useEffect, useState, useRef } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateSayingRequest } from "@/type/saying";

interface SayingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: CreateSayingRequest;
  onSave: (data: CreateSayingRequest) => Promise<void>;
  loading?: boolean;
  mode: "add" | "edit";
}

export function SayingModal({
  open,
  onOpenChange,
  initialData,
  onSave,
  loading = false,
  mode,
}: SayingModalProps) {
  const [formData, setFormData] = useState<CreateSayingRequest>({
    arabic: initialData?.arabic || "",
    translation: initialData?.translation || "",
    context: initialData?.context || "",
  });

  const prevOpen = useRef(open);

  useEffect(() => {
    if (open && !prevOpen.current) {
      setFormData({
        arabic: initialData?.arabic || "",
        translation: initialData?.translation || "",
        context: initialData?.context || "",
      });
    }
    prevOpen.current = open;
  }, [open, initialData]);

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "নতুন বাণী যোগ করুন" : "বাণী এডিট করুন"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>আরবি টেক্সট</Label>
            <Textarea
              value={formData.arabic}
              onChange={(e) =>
                setFormData({ ...formData, arabic: e.target.value })
              }
              placeholder="আরবি বাণী লিখুন..."
              dir="rtl"
              className="font-arabic text-lg"
            />
          </div>
          <div className="space-y-2">
            <Label>অনুবাদ</Label>
            <Textarea
              value={formData.translation}
              onChange={(e) =>
                setFormData({ ...formData, translation: e.target.value })
              }
              placeholder="বাংলা/ইংরেজি অনুবাদ..."
            />
          </div>
          <div className="space-y-2">
            <Label>প্রসঙ্গ/সূত্র</Label>
            <Input
              value={formData.context || ""}
              onChange={(e) =>
                setFormData({ ...formData, context: e.target.value })
              }
              placeholder="উদাঃ মাকতুবাত থেকে"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              বাতিল
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1"
              disabled={loading}
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              {mode === "add" ? "যোগ করুন" : "আপডেট করুন"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
