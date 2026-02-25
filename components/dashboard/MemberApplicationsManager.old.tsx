"use client";

console.log("Dashboard component loaded:", "components/dashboard/MemberApplicationsManager.tsx");

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Users, 
  Search, 
  MoreVertical, 
  Eye, 
  Check, 
  X, 
  Clock,
  UserPlus,
  UserCheck,
  UserX,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MemberApplication {
  id: string;
  full_name: string;
  father_name: string;
  mother_name: string;
  date_of_birth: string;
  gender: string;
  religion: string | null;
  nationality: string | null;
  blood_group: string | null;
  nid_number: string | null;
  phone: string;
  email: string | null;
  present_address: string;
  permanent_address: string;
  occupation: string | null;
  education: string | null;
  reason_to_join: string | null;
  reference_name: string | null;
  reference_phone: string | null;
  status: string;
  notes: string | null;
  applied_at: string;
}

const dummyApplications: MemberApplication[] = [
  {
    id: "1",
    full_name: "মোহাম্মদ আব্দুল করিম",
    father_name: "মোহাম্মদ আবুল হোসেন",
    mother_name: "আমিনা খাতুন",
    date_of_birth: "1990-05-15",
    gender: "পুরুষ",
    religion: "ইসলাম",
    nationality: "বাংলাদেশী",
    blood_group: "O+",
    nid_number: "1234567890123",
    phone: "01712345678",
    email: "karim@example.com",
    present_address: "মিরপুর-১০, ঢাকা",
    permanent_address: "সিরাজগঞ্জ সদর, সিরাজগঞ্জ",
    occupation: "শিক্ষক",
    education: "স্নাতকোত্তর",
    reason_to_join: "ইসলামী জ্ঞান অর্জন ও প্রচার করতে চাই",
    reference_name: "হাফিজ সাইফুল ইসলাম",
    reference_phone: "01812345678",
    status: "pending",
    notes: null,
    applied_at: "2024-12-20T10:30:00Z",
  },
  {
    id: "2",
    full_name: "ফাতিমা বেগম",
    father_name: "মোহাম্মদ রফিকুল ইসলাম",
    mother_name: "রোকেয়া খাতুন",
    date_of_birth: "1995-08-22",
    gender: "মহিলা",
    religion: "ইসলাম",
    nationality: "বাংলাদেশী",
    blood_group: "A+",
    nid_number: "9876543210123",
    phone: "01612345678",
    email: "fatima@example.com",
    present_address: "ধানমন্ডি, ঢাকা",
    permanent_address: "রাজশাহী সদর, রাজশাহী",
    occupation: "গৃহিণী",
    education: "স্নাতক",
    reason_to_join: "দ্বীনি ইলম শিখতে চাই",
    reference_name: null,
    reference_phone: null,
    status: "approved",
    notes: "যোগ্য প্রার্থী",
    applied_at: "2024-12-18T08:00:00Z",
  },
  {
    id: "3",
    full_name: "আহমদ হাসান",
    father_name: "মোহাম্মদ হাসান",
    mother_name: "সালমা বেগম",
    date_of_birth: "1988-03-10",
    gender: "পুরুষ",
    religion: "ইসলাম",
    nationality: "বাংলাদেশী",
    blood_group: "B+",
    nid_number: "5678901234567",
    phone: "01512345678",
    email: null,
    present_address: "উত্তরা, ঢাকা",
    permanent_address: "চট্টগ্রাম সদর, চট্টগ্রাম",
    occupation: "ব্যবসায়ী",
    education: "এইচএসসি",
    reason_to_join: "সংগঠনের সেবায় নিজেকে নিয়োজিত করতে চাই",
    reference_name: "মাওলানা আব্দুল্লাহ",
    reference_phone: "01912345678",
    status: "rejected",
    notes: "অসম্পূর্ণ তথ্য",
    applied_at: "2024-12-15T14:00:00Z",
  },
];

export default function MemberApplicationsManager() {
  const { toast } = useToast();
  const [applications, setApplications] = useState<MemberApplication[]>(dummyApplications);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState<MemberApplication | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [notes, setNotes] = useState("");

  const updateApplicationStatus = (id: string, status: string) => {
    setApplications(apps => 
      apps.map(app => 
        app.id === id ? { ...app, status, notes: notes || null } : app
      )
    );

    toast({
      title: "সফল",
      description: `আবেদনের স্ট্যাটাস "${status}" এ পরিবর্তন করা হয়েছে।`,
    });
    
    setIsViewDialogOpen(false);
    setNotes("");
  };

  const deleteApplication = (id: string) => {
    if (!confirm("আপনি কি এই আবেদনটি মুছে ফেলতে চান?")) return;
    
    setApplications(apps => apps.filter(app => app.id !== id));
    toast({
      title: "সফল",
      description: "আবেদনটি মুছে ফেলা হয়েছে।",
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "secondary",
      approved: "default",
      rejected: "destructive",
    };
    const labels: Record<string, string> = {
      pending: "অপেক্ষমান",
      approved: "অনুমোদিত",
      rejected: "বাতিল",
    };
    return <Badge variant={variants[status] || "secondary"}>{labels[status] || status}</Badge>;
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.phone.includes(searchQuery) ||
                         (app.email?.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === "pending").length,
    approved: applications.filter(a => a.status === "approved").length,
    rejected: applications.filter(a => a.status === "rejected").length,
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-arabic">সদস্যপদ আবেদন</h1>
        <p className="text-muted-foreground mt-1">সকল সদস্যপদ আবেদন পরিচালনা করুন</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">মোট আবেদন</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">অপেক্ষমান</p>
              <p className="text-2xl font-bold">{stats.pending}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
              <UserCheck className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">অনুমোদিত</p>
              <p className="text-2xl font-bold">{stats.approved}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-red-500/10 flex items-center justify-center">
              <UserX className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">বাতিল</p>
              <p className="text-2xl font-bold">{stats.rejected}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="নাম, ফোন বা ইমেইল দিয়ে খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 rounded-md border border-input bg-background text-sm"
            >
              <option value="all">সকল স্ট্যাটাস</option>
              <option value="pending">অপেক্ষমান</option>
              <option value="approved">অনুমোদিত</option>
              <option value="rejected">বাতিল</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>আবেদন তালিকা</CardTitle>
          <CardDescription>মোট {filteredApplications.length}টি আবেদন পাওয়া গেছে</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredApplications.length === 0 ? (
            <div className="text-center py-12">
              <UserPlus className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">কোনো আবেদন পাওয়া যায়নি</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>নাম</TableHead>
                  <TableHead>ফোন</TableHead>
                  <TableHead>ঠিকানা</TableHead>
                  <TableHead>আবেদনের তারিখ</TableHead>
                  <TableHead>স্ট্যাটাস</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.full_name}</TableCell>
                    <TableCell>{app.phone}</TableCell>
                    <TableCell className="max-w-[200px] truncate">{app.present_address}</TableCell>
                    <TableCell>{formatDate(app.applied_at)}</TableCell>
                    <TableCell>{getStatusBadge(app.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedApplication(app);
                            setNotes(app.notes || "");
                            setIsViewDialogOpen(true);
                          }}>
                            <Eye className="h-4 w-4 ml-2" />
                            বিস্তারিত দেখুন
                          </DropdownMenuItem>
                          {app.status === "pending" && (
                            <>
                              <DropdownMenuItem onClick={() => updateApplicationStatus(app.id, "approved")}>
                                <Check className="h-4 w-4 ml-2" />
                                অনুমোদন করুন
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => updateApplicationStatus(app.id, "rejected")}>
                                <X className="h-4 w-4 ml-2" />
                                বাতিল করুন
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem 
                            onClick={() => deleteApplication(app.id)}
                            className="text-destructive"
                          >
                            <X className="h-4 w-4 ml-2" />
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

      {/* View Application Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>আবেদনের বিস্তারিত</DialogTitle>
            <DialogDescription>
              আবেদনকারীর সম্পূর্ণ তথ্য
            </DialogDescription>
          </DialogHeader>
          
          {selectedApplication && (
            <div className="space-y-6">
              {/* Personal Info */}
              <div>
                <h3 className="font-semibold text-lg mb-3 border-b pb-2">ব্যক্তিগত তথ্য</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">নাম:</span>
                    <p className="font-medium">{selectedApplication.full_name}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">জন্ম তারিখ:</span>
                    <p className="font-medium">{formatDate(selectedApplication.date_of_birth)}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">পিতার নাম:</span>
                    <p className="font-medium">{selectedApplication.father_name}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">মাতার নাম:</span>
                    <p className="font-medium">{selectedApplication.mother_name}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">লিঙ্গ:</span>
                    <p className="font-medium">{selectedApplication.gender}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">ধর্ম:</span>
                    <p className="font-medium">{selectedApplication.religion || "-"}</p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="font-semibold text-lg mb-3 border-b pb-2">যোগাযোগ</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">মোবাইল:</span>
                    <p className="font-medium">{selectedApplication.phone}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">ইমেইল:</span>
                    <p className="font-medium">{selectedApplication.email || "-"}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">বর্তমান ঠিকানা:</span>
                    <p className="font-medium">{selectedApplication.present_address}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground">স্থায়ী ঠিকানা:</span>
                    <p className="font-medium">{selectedApplication.permanent_address}</p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3 className="font-semibold text-lg mb-3 border-b pb-2">নোট</h3>
                <Textarea
                  placeholder="আবেদন সম্পর্কে নোট লিখুন..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>

              {/* Actions */}
              {selectedApplication.status === "pending" && (
                <div className="flex gap-3 pt-4 border-t">
                  <Button 
                    variant="default" 
                    className="flex-1"
                    onClick={() => updateApplicationStatus(selectedApplication.id, "approved")}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    অনুমোদন করুন
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="flex-1"
                    onClick={() => updateApplicationStatus(selectedApplication.id, "rejected")}
                  >
                    <X className="h-4 w-4 mr-2" />
                    বাতিল করুন
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
