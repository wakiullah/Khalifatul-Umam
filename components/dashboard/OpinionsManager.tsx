"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Opinion } from "@/type/opinions";
import {
  approveOpinion,
  unapproveOpinion,
  deleteOpinion,
} from "@/services/opinions.api";
import {
  Loader2,
  Calendar,
  CheckCircle,
  Trash2,
  MapPin,
  Star,
  User,
  Eye,
  MailCheck,
  Clock,
  MoreVertical,
  XCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function OpinionsManager({
  initialData,
}: {
  initialData: Opinion[];
}) {
  const router = useRouter();
  const [opinions, setOpinions] = useState<Opinion[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [viewingOpinion, setViewingOpinion] = useState<Opinion | null>(null);

  const handleApprove = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await approveOpinion(id);
      if (res.success) {
        setOpinions(opinions.map((op) => (op._id === id ? res.data : op)));
        toast.success("মতামত অনুমোদন করা হয়েছে");
        router.refresh();
      } else {
        toast.error("অনুমোদন ব্যর্থ হয়েছে");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnapprove = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await unapproveOpinion(id);
      if (res.success) {
        setOpinions(opinions.map((op) => (op._id === id ? res.data : op)));
        toast.success("মতামত অপেক্ষমাণ করা হয়েছে");
        router.refresh();
      } else {
        toast.error("অপেক্ষমাণ করা ব্যর্থ হয়েছে");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setDeletingId(id);
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    setIsLoading(true);
    try {
      const res = await deleteOpinion(deletingId);
      if (res.success) {
        setOpinions(opinions.filter((op) => op._id !== deletingId));
        setDeletingId(null);
        toast.success("মতামত মুছে ফেলা হয়েছে");
        router.refresh();
      } else {
        toast.error("মুছে ফেলা ব্যর্থ হয়েছে");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const pendingOpinions = opinions.filter((op) => !op.isApproved);
  const approvedOpinions = opinions.filter((op) => op.isApproved);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">মতামত ম্যানেজমেন্ট</h2>
          <p className="text-muted-foreground">
            পাবলিক মতামত পর্যালোচনা এবং অনুমোদন করুন
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <MailCheck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{opinions.length}</div>
                <p className="text-sm text-muted-foreground">মোট মতামত</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {pendingOpinions.length}
                </div>
                <p className="text-sm text-muted-foreground">অপেক্ষমাণ</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {approvedOpinions.length}
                </div>
                <p className="text-sm text-muted-foreground">অনুমোদিত</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Opinions Section */}
      {pendingOpinions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              অপেক্ষমাণ মতামত ({pendingOpinions.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>নাম</TableHead>
                  <TableHead>মতামত</TableHead>
                  <TableHead className="text-center">রেটিং</TableHead>
                  <TableHead>তারিখ</TableHead>
                  <TableHead className="text-center">অ্যাকশন</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingOpinions.map((opinion) => (
                  <TableRow key={opinion._id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                          <User className="w-4 h-4 text-yellow-600" />
                        </div>
                        <div>
                          <p className="font-medium">{opinion.name}</p>
                          {opinion.title && (
                            <p className="text-xs text-muted-foreground">
                              {opinion.title}
                            </p>
                          )}
                          {opinion.location && (
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3" />
                              {opinion.location}
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="text-sm italic line-clamp-2">
                        &ldquo;{opinion.text}&rdquo;
                      </p>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{opinion.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {new Date(opinion.createdAt).toLocaleDateString(
                          "bn-BD",
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setViewingOpinion(opinion)}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleApprove(opinion._id)}
                          disabled={isLoading}
                        >
                          <CheckCircle className="h-3 w-3" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleDelete(opinion._id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              মুছে ফেলুন
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Approved Opinions Section */}
      {approvedOpinions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              অনুমোদিত মতামত ({approvedOpinions.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>নাম</TableHead>
                  <TableHead>মতামত</TableHead>
                  <TableHead className="text-center">রেটিং</TableHead>
                  <TableHead>তারিখ</TableHead>
                  <TableHead className="text-center">অ্যাকশন</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {approvedOpinions.map((opinion) => (
                  <TableRow key={opinion._id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                          <User className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">{opinion.name}</p>
                          {opinion.title && (
                            <p className="text-xs text-muted-foreground">
                              {opinion.title}
                            </p>
                          )}
                          {opinion.location && (
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3" />
                              {opinion.location}
                            </p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="text-sm italic line-clamp-2">
                        &ldquo;{opinion.text}&rdquo;
                      </p>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 fill-green-400 text-green-400" />
                        <span className="font-medium">{opinion.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {new Date(opinion.createdAt).toLocaleDateString(
                          "bn-BD",
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setViewingOpinion(opinion)}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleUnapprove(opinion._id)}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              অপেক্ষমাণ করুন
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(opinion._id)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              মুছে ফেলুন
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {opinions.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <MailCheck className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                কোনো মতামত পাওয়া যায়নি
              </h3>
              <p className="text-sm text-muted-foreground">
                এখনও কোনো মতামত জমা দেওয়া হয়নি বা API endpoint সঠিকভাবে
                কনফিগার করা হয়নি।
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* View Details Modal */}
      <Dialog
        open={!!viewingOpinion}
        onOpenChange={(open) => !open && setViewingOpinion(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>মতামতের বিস্তারিত</span>
              {viewingOpinion && (
                <Badge
                  variant={viewingOpinion.isApproved ? "default" : "secondary"}
                >
                  {viewingOpinion.isApproved ? "অনুমোদিত" : "অপেক্ষমাণ"}
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>
          {viewingOpinion && (
            <div className="space-y-4">
              {/* User Info */}
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">
                    {viewingOpinion.name}
                  </h3>
                  {viewingOpinion.title && (
                    <p className="text-sm text-muted-foreground">
                      {viewingOpinion.title}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(viewingOpinion.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>

              {/* Opinion Text */}
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  মতামত
                </label>
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <p className="text-base italic leading-relaxed">
                    &ldquo;{viewingOpinion.text}&rdquo;
                  </p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4">
                {viewingOpinion.location && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <label className="text-xs font-medium text-gray-600 flex items-center gap-1 mb-1">
                      <MapPin className="w-3 h-3" />
                      অবস্থান
                    </label>
                    <p className="text-sm font-medium">
                      {viewingOpinion.location}
                    </p>
                  </div>
                )}
                <div className="p-3 bg-gray-50 rounded-lg">
                  <label className="text-xs font-medium text-gray-600 flex items-center gap-1 mb-1">
                    <Calendar className="w-3 h-3" />
                    তারিখ
                  </label>
                  <p className="text-sm font-medium">
                    {new Date(viewingOpinion.createdAt).toLocaleDateString(
                      "bn-BD",
                      {
                        dateStyle: "medium",
                      },
                    )}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                {!viewingOpinion.isApproved ? (
                  <Button
                    onClick={() => {
                      handleApprove(viewingOpinion._id);
                      setViewingOpinion(null);
                    }}
                    disabled={isLoading}
                  >
                    {isLoading && (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    )}
                    <CheckCircle className="h-4 w-4 mr-2" />
                    অনুমোদন করুন
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleUnapprove(viewingOpinion._id);
                      setViewingOpinion(null);
                    }}
                    disabled={isLoading}
                  >
                    {isLoading && (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    )}
                    <XCircle className="h-4 w-4 mr-2" />
                    অপেক্ষমাণ করুন
                  </Button>
                )}
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleDelete(viewingOpinion._id);
                    setViewingOpinion(null);
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  মুছে ফেলুন
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={!!deletingId}
        onOpenChange={(open) => !open && setDeletingId(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>আপনি কি নিশ্চিত?</DialogTitle>
            <DialogDescription>
              আপনি কি নিশ্চিত যে আপনি এই মতামতটি মুছে ফেলতে চান? এই ক্রিয়াটি
              ফিরিয়ে আনা যাবে না।
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setDeletingId(null)}>
              বাতিল
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              মুছে ফেলুন
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
