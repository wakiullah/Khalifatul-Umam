"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MemberData, PaginationMeta } from "@/type/member";
import {
  approveMember,
  rejectMember,
  deleteMember,
} from "@/services/members.api";
import {
  Loader2,
  Calendar,
  CheckCircle,
  Trash2,
  MapPin,
  Star,
  User,
  Eye,
  Users,
  Clock,
  MoreVertical,
  XCircle,
  UserCheck,
  UserX,
  Phone,
  Mail,
  Briefcase,
  GraduationCap,
  Droplet,
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

export default function MemberApplicationsManager({
  initialData,
  meta,
}: {
  initialData: MemberData[];
  meta: PaginationMeta;
}) {
  const router = useRouter();
  const [members, setMembers] = useState<MemberData[]>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [viewingMember, setViewingMember] = useState<MemberData | null>(null);

  const handleApprove = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await approveMember(id);
      if (res.success) {
        setMembers(members.map((m) => (m._id === id ? res.data : m)));
        toast.success("আবেদন অনুমোদন করা হয়েছে");
        router.refresh();
      } else {
        toast.error("অনুমোদন ব্যর্থ হয়েছে");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = async (id: string) => {
    setIsLoading(true);
    try {
      const res = await rejectMember(id);
      if (res.success) {
        setMembers(members.map((m) => (m._id === id ? res.data : m)));
        toast.success("আবেদন বাতিল করা হয়েছে");
        router.refresh();
      } else {
        toast.error("বাতিল করা ব্যর্থ হয়েছে");
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
      const res = await deleteMember(deletingId);
      if (res.success) {
        setMembers(members.filter((m) => m._id !== deletingId));
        setDeletingId(null);
        toast.success("আবেদন মুছে ফেলা হয়েছে");
        router.refresh();
      } else {
        toast.error("মুছে ফেলা ব্যর্থ হয়েছে");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const pendingMembers = members.filter((m) => m.status === "Pending");
  const approvedMembers = members.filter((m) => m.status === "Approved");
  const rejectedMembers = members.filter((m) => m.status === "Rejected");

  const getStatusBadge = (status: string) => {
    const config = {
      Pending: { variant: "secondary" as const, label: "অপেক্ষমাণ" },
      Approved: { variant: "default" as const, label: "অনুমোদিত" },
      Rejected: { variant: "destructive" as const, label: "বাতিল" },
    };
    const { variant, label } =
      config[status as keyof typeof config] || config.Pending;
    return <Badge variant={variant}>{label}</Badge>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">সদস্যপদ আবেদন ম্যানেজমেন্ট</h2>
          <p className="text-muted-foreground">
            সকল সদস্যপদ আবেদন পর্যালোচনা এবং পরিচালনা করুন
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{meta.total}</div>
                <p className="text-sm text-muted-foreground">মোট আবেদন</p>
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
                  {pendingMembers.length}
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
                <UserCheck className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {approvedMembers.length}
                </div>
                <p className="text-sm text-muted-foreground">অনুমোদিত</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <UserX className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {rejectedMembers.length}
                </div>
                <p className="text-sm text-muted-foreground">বাতিল</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Applications Section */}
      {pendingMembers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              অপেক্ষমাণ আবেদন ({pendingMembers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>নাম</TableHead>
                  <TableHead>যোগাযোগ</TableHead>
                  <TableHead>ঠিকানা</TableHead>
                  <TableHead>আবেদনের তারিখ</TableHead>
                  <TableHead className="text-center">অ্যাকশন</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingMembers.map((member) => (
                  <TableRow key={member._id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                          <User className="w-4 h-4 text-yellow-600" />
                        </div>
                        <div>
                          <p className="font-medium">{member.full_name}</p>
                          <p className="text-xs text-muted-foreground">
                            {member.gender}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {member.phone}
                        </div>
                        {member.email && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Mail className="w-3 h-3" />
                            {member.email}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="text-sm line-clamp-1">
                        {member.present_address}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {formatDate(member.createdAt)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setViewingMember(member)}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleApprove(member._id)}
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
                              onClick={() => handleReject(member._id)}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              বাতিল করুন
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(member._id)}
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

      {/* Approved Applications Section */}
      {approvedMembers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-green-600" />
              অনুমোদিত আবেদন ({approvedMembers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>নাম</TableHead>
                  <TableHead>যোগাযোগ</TableHead>
                  <TableHead>ঠিকানা</TableHead>
                  <TableHead>অনুমোদনের তারিখ</TableHead>
                  <TableHead className="text-center">অ্যাকশন</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {approvedMembers.map((member) => (
                  <TableRow key={member._id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                          <User className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">{member.full_name}</p>
                          <p className="text-xs text-muted-foreground">
                            {member.gender}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {member.phone}
                        </div>
                        {member.email && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Mail className="w-3 h-3" />
                            {member.email}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="text-sm line-clamp-1">
                        {member.present_address}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {formatDate(member.updatedAt)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setViewingMember(member)}
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
                              onClick={() => handleReject(member._id)}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              বাতিল করুন
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(member._id)}
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

      {/* Rejected Applications Section */}
      {rejectedMembers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserX className="h-5 w-5 text-red-600" />
              বাতিল আবেদন ({rejectedMembers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>নাম</TableHead>
                  <TableHead>যোগাযোগ</TableHead>
                  <TableHead>ঠিকানা</TableHead>
                  <TableHead>বাতিলের তারিখ</TableHead>
                  <TableHead className="text-center">অ্যাকশন</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rejectedMembers.map((member) => (
                  <TableRow key={member._id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                          <User className="w-4 h-4 text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium">{member.full_name}</p>
                          <p className="text-xs text-muted-foreground">
                            {member.gender}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {member.phone}
                        </div>
                        {member.email && (
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Mail className="w-3 h-3" />
                            {member.email}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="text-sm line-clamp-1">
                        {member.present_address}
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {formatDate(member.updatedAt)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setViewingMember(member)}
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
                              onClick={() => handleApprove(member._id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              অনুমোদন করুন
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(member._id)}
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
      {members.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                কোনো আবেদন পাওয়া যায়নি
              </h3>
              <p className="text-sm text-muted-foreground">
                এখনও কোনো সদস্যপদ আবেদন জমা দেওয়া হয়নি।
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* View Details Modal */}
      <Dialog
        open={!!viewingMember}
        onOpenChange={(open) => !open && setViewingMember(null)}
      >
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>আবেদনের বিস্তারিত তথ্য</span>
              {viewingMember && getStatusBadge(viewingMember.status)}
            </DialogTitle>
          </DialogHeader>
          {viewingMember && (
            <div className="space-y-6">
              {/* Personal Info */}
              <div>
                <h3 className="font-semibold text-lg mb-3 pb-2 border-b">
                  ব্যক্তিগত তথ্য
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <label className="text-xs font-medium text-gray-600 mb-1 block">
                      সম্পূর্ণ নাম
                    </label>
                    <p className="text-sm font-medium">
                      {viewingMember.full_name}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <label className="text-xs font-medium text-gray-600 mb-1 block">
                      লিঙ্গ
                    </label>
                    <p className="text-sm font-medium">
                      {viewingMember.gender}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <label className="text-xs font-medium text-gray-600 mb-1 block">
                      পিতার নাম
                    </label>
                    <p className="text-sm font-medium">
                      {viewingMember.father_name}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <label className="text-xs font-medium text-gray-600 mb-1 block">
                      মাতার নাম
                    </label>
                    <p className="text-sm font-medium">
                      {viewingMember.mother_name}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <label className="text-xs font-medium text-gray-600 mb-1 block">
                      জন্ম তারিখ
                    </label>
                    <p className="text-sm font-medium">
                      {formatDate(viewingMember.date_of_birth)}
                    </p>
                  </div>
                  {viewingMember.blood_group && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <label className="text-xs font-medium text-gray-600 flex items-center gap-1 mb-1">
                        <Droplet className="w-3 h-3" />
                        রক্তের গ্রুপ
                      </label>
                      <p className="text-sm font-medium">
                        {viewingMember.blood_group}
                      </p>
                    </div>
                  )}
                  {viewingMember.religion && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <label className="text-xs font-medium text-gray-600 mb-1 block">
                        ধর্ম
                      </label>
                      <p className="text-sm font-medium">
                        {viewingMember.religion}
                      </p>
                    </div>
                  )}
                  {viewingMember.nationality && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <label className="text-xs font-medium text-gray-600 mb-1 block">
                        জাতীয়তা
                      </label>
                      <p className="text-sm font-medium">
                        {viewingMember.nationality}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="font-semibold text-lg mb-3 pb-2 border-b">
                  যোগাযোগের তথ্য
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <label className="text-xs font-medium text-gray-600 flex items-center gap-1 mb-1">
                      <Phone className="w-3 h-3" />
                      ফোন
                    </label>
                    <p className="text-sm font-medium">{viewingMember.phone}</p>
                  </div>
                  {viewingMember.email && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <label className="text-xs font-medium text-gray-600 flex items-center gap-1 mb-1">
                        <Mail className="w-3 h-3" />
                        ইমেইল
                      </label>
                      <p className="text-sm font-medium">
                        {viewingMember.email}
                      </p>
                    </div>
                  )}
                  {viewingMember.nid_number && (
                    <div className="p-3 bg-gray-50 rounded-lg col-span-2">
                      <label className="text-xs font-medium text-gray-600 mb-1 block">
                        জাতীয় পরিচয়পত্র নম্বর
                      </label>
                      <p className="text-sm font-medium">
                        {viewingMember.nid_number}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Address Info */}
              <div>
                <h3 className="font-semibold text-lg mb-3 pb-2 border-b">
                  ঠিকানা
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <label className="text-xs font-medium text-gray-600 flex items-center gap-1 mb-1">
                      <MapPin className="w-3 h-3" />
                      বর্তমান ঠিকানা
                    </label>
                    <p className="text-sm">{viewingMember.present_address}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <label className="text-xs font-medium text-gray-600 flex items-center gap-1 mb-1">
                      <MapPin className="w-3 h-3" />
                      স্থায়ী ঠিকানা
                    </label>
                    <p className="text-sm">{viewingMember.permanent_address}</p>
                  </div>
                </div>
              </div>

              {/* Professional Info */}
              {(viewingMember.occupation || viewingMember.education) && (
                <div>
                  <h3 className="font-semibold text-lg mb-3 pb-2 border-b">
                    পেশাগত তথ্য
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {viewingMember.occupation && (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <label className="text-xs font-medium text-gray-600 flex items-center gap-1 mb-1">
                          <Briefcase className="w-3 h-3" />
                          পেশা
                        </label>
                        <p className="text-sm font-medium">
                          {viewingMember.occupation}
                        </p>
                      </div>
                    )}
                    {viewingMember.education && (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <label className="text-xs font-medium text-gray-600 flex items-center gap-1 mb-1">
                          <GraduationCap className="w-3 h-3" />
                          শিক্ষাগত যোগ্যতা
                        </label>
                        <p className="text-sm font-medium">
                          {viewingMember.education}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Additional Info */}
              {(viewingMember.reason_to_join ||
                viewingMember.reference_name) && (
                <div>
                  <h3 className="font-semibold text-lg mb-3 pb-2 border-b">
                    অতিরিক্ত তথ্য
                  </h3>
                  <div className="space-y-4">
                    {viewingMember.reason_to_join && (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <label className="text-xs font-medium text-gray-600 mb-2 block">
                          যোগদানের কারণ
                        </label>
                        <p className="text-sm leading-relaxed">
                          {viewingMember.reason_to_join}
                        </p>
                      </div>
                    )}
                    {viewingMember.reference_name && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <label className="text-xs font-medium text-gray-600 mb-1 block">
                            রেফারেন্সের নাম
                          </label>
                          <p className="text-sm font-medium">
                            {viewingMember.reference_name}
                          </p>
                        </div>
                        {viewingMember.reference_phone && (
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <label className="text-xs font-medium text-gray-600 mb-1 block">
                              রেফারেন্সের ফোন
                            </label>
                            <p className="text-sm font-medium">
                              {viewingMember.reference_phone}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-4 border-t">
                {viewingMember.status === "Pending" && (
                  <>
                    <Button
                      onClick={() => {
                        handleApprove(viewingMember._id);
                        setViewingMember(null);
                      }}
                      disabled={isLoading}
                    >
                      {isLoading && (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      )}
                      <CheckCircle className="h-4 w-4 mr-2" />
                      অনুমোদন করুন
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleReject(viewingMember._id);
                        setViewingMember(null);
                      }}
                      disabled={isLoading}
                    >
                      {isLoading && (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      )}
                      <XCircle className="h-4 w-4 mr-2" />
                      বাতিল করুন
                    </Button>
                  </>
                )}
                {viewingMember.status === "Approved" && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleReject(viewingMember._id);
                      setViewingMember(null);
                    }}
                    disabled={isLoading}
                  >
                    {isLoading && (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    )}
                    <XCircle className="h-4 w-4 mr-2" />
                    বাতিল করুন
                  </Button>
                )}
                {viewingMember.status === "Rejected" && (
                  <Button
                    onClick={() => {
                      handleApprove(viewingMember._id);
                      setViewingMember(null);
                    }}
                    disabled={isLoading}
                  >
                    {isLoading && (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    )}
                    <CheckCircle className="h-4 w-4 mr-2" />
                    অনুমোদন করুন
                  </Button>
                )}
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleDelete(viewingMember._id);
                    setViewingMember(null);
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
              আপনি কি নিশ্চিত যে আপনি এই আবেদনটি মুছে ফেলতে চান? এই ক্রিয়াটি
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
