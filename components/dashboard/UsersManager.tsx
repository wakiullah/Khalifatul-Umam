"use client";

console.log(
  "Dashboard component loaded:",
  "components/dashboard/UsersManager.tsx",
);

import { useState } from "react";
import {
  Search,
  Shield,
  Users,
  Trash2,
  MoreVertical,
  Loader2,
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
import { Badge } from "@/components/ui/badge";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { UserData, UsersResponse } from "@/type/user";
import { deleteUser, updateUserRole } from "@/services/users.api";

interface UsersManagerProps {
  initialData: UsersResponse;
}

const UsersManager = ({ initialData }: UsersManagerProps) => {
  const [userRoles, setUserRoles] = useState<UserData[]>(
    initialData.data || [],
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpdateRole = async () => {
    if (!editingUser) return;
    setLoading(true);
    try {
      const res = await updateUserRole(editingUser._id, editingUser.role);
      if (res.success) {
        setUserRoles(
          userRoles.map((u) =>
            u._id === editingUser._id ? { ...u, role: editingUser.role } : u,
          ),
        );
        toast.success("রোল আপডেট হয়েছে");
        setEditingUser(null);
      } else {
        toast.error("রোল আপডেট করতে ব্যর্থ হয়েছে");
      }
    } catch (error) {
      toast.error("রোল আপডেট করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRole = async (id: string) => {
    if (!confirm("আপনি কি নিশ্চিত যে আপনি এই ব্যবহারকারীকে মুছে ফেলতে চান?"))
      return;
    const res = await deleteUser(id);
    if (res.success) {
      setUserRoles(userRoles.filter((u) => u._id !== id));
      toast.success("ইউজার রোল মুছে ফেলা হয়েছে");
    } else {
      toast.error("মুছতে ব্যর্থ হয়েছে");
    }
  };

  const getRoleBadge = (role: string) => {
    const roleStyles: Record<string, string> = {
      admin: "bg-purple-500/10 text-purple-500",
      moderator: "bg-blue-500/10 text-blue-500",
      user: "bg-gray-500/10 text-gray-500",
    };
    const roleLabels: Record<string, string> = {
      admin: "অ্যাডমিন",
      moderator: "মডারেটর",
      user: "সদস্য",
    };
    return (
      <Badge className={roleStyles[role] || ""}>
        {roleLabels[role] || role}
      </Badge>
    );
  };

  const filteredUsers = userRoles.filter((user) => {
    const matchesSearch = user.phone
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">ইউজার ম্যানেজমেন্ট</h1>
        <p className="text-muted-foreground mt-1">
          সমস্ত সদস্যদের রোল পরিচালনা করুন
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">মোট ইউজার</p>
            <h3 className="text-2xl font-bold">{userRoles.length}</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">অ্যাডমিন</p>
            <h3 className="text-2xl font-bold">
              {userRoles.filter((u) => u.role === "admin").length}
            </h3>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>সমস্ত ইউজার</CardTitle>
          <CardDescription>{filteredUsers.length}জন ইউজার</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ফোন নম্বর</TableHead>
                <TableHead>রোল</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {user.role.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-mono text-sm">{user.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditingUser(user)}>
                          <Shield className="h-4 w-4 ml-2" />
                          রোল পরিবর্তন
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDeleteRole(user._id)}
                        >
                          <Trash2 className="h-4 w-4 ml-2" />
                          ডিলিট
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

      <Dialog
        open={!!editingUser}
        onOpenChange={(open) => !open && setEditingUser(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>রোল পরিবর্তন করুন</DialogTitle>
          </DialogHeader>
          {editingUser && (
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>রোল</Label>
                <Select
                  value={editingUser.role}
                  onValueChange={(value) =>
                    setEditingUser({ ...editingUser, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">সদস্য</SelectItem>
                    <SelectItem value="moderator">মডারেটর</SelectItem>
                    <SelectItem value="admin">অ্যাডমিন</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditingUser(null)}>
                  বাতিল
                </Button>
                <Button onClick={handleUpdateRole} disabled={loading}>
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "আপডেট করুন"
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersManager;
