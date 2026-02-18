"use client";

console.log("Dashboard component loaded:", "components/dashboard/UsersManager.tsx");

import { useState } from "react";
import { Search, Shield, Users, Trash2, MoreVertical } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";

const dummyUsers = [
  { id: "1", user_id: "user-001-abcd-efgh", role: "admin" as const },
  { id: "2", user_id: "user-002-ijkl-mnop", role: "moderator" as const },
  { id: "3", user_id: "user-003-qrst-uvwx", role: "user" as const },
  { id: "4", user_id: "user-004-yzab-cdef", role: "user" as const },
];

const UsersManager = () => {
  const [userRoles, setUserRoles] = useState(dummyUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [editingUser, setEditingUser] = useState<typeof dummyUsers[0] | null>(null);

  const handleUpdateRole = () => {
    if (!editingUser) return;
    setUserRoles(userRoles.map(u => u.id === editingUser.id ? editingUser : u));
    toast.success("রোল আপডেট হয়েছে");
    setEditingUser(null);
  };

  const handleDeleteRole = (id: string) => {
    setUserRoles(userRoles.filter((u) => u.id !== id));
    toast.success("ইউজার রোল মুছে ফেলা হয়েছে");
  };

  const getRoleBadge = (role: string) => {
    const roleStyles: Record<string, string> = { "admin": "bg-purple-500/10 text-purple-500", "moderator": "bg-blue-500/10 text-blue-500", "user": "bg-gray-500/10 text-gray-500" };
    const roleLabels: Record<string, string> = { "admin": "অ্যাডমিন", "moderator": "মডারেটর", "user": "সদস্য" };
    return <Badge className={roleStyles[role] || ""}>{roleLabels[role] || role}</Badge>;
  };

  const filteredUsers = userRoles.filter(user => {
    const matchesSearch = user.user_id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold">ইউজার ম্যানেজমেন্ট</h1><p className="text-muted-foreground mt-1">সমস্ত সদস্যদের রোল পরিচালনা করুন</p></div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">মোট ইউজার</p><h3 className="text-2xl font-bold">{userRoles.length}</h3></CardContent></Card>
        <Card><CardContent className="p-4"><p className="text-sm text-muted-foreground">অ্যাডমিন</p><h3 className="text-2xl font-bold">{userRoles.filter(u => u.role === "admin").length}</h3></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>সমস্ত ইউজার</CardTitle><CardDescription>{filteredUsers.length}জন ইউজার</CardDescription></CardHeader>
        <CardContent>
          <Table>
            <TableHeader><TableRow><TableHead>ইউজার ID</TableHead><TableHead>রোল</TableHead><TableHead></TableHead></TableRow></TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell><div className="flex items-center gap-3"><Avatar className="h-8 w-8"><AvatarFallback className="bg-primary/10 text-primary">{user.role.charAt(0).toUpperCase()}</AvatarFallback></Avatar><span className="font-mono text-sm">{user.user_id.slice(0, 8)}...</span></div></TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditingUser(user)}><Shield className="h-4 w-4 ml-2" />রোল পরিবর্তন</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteRole(user.id)}><Trash2 className="h-4 w-4 ml-2" />ডিলিট</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!editingUser} onOpenChange={(open) => !open && setEditingUser(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>রোল পরিবর্তন করুন</DialogTitle></DialogHeader>
          {editingUser && (
            <div className="space-y-4 mt-4">
              <div className="space-y-2"><Label>রোল</Label>
                <Select value={editingUser.role} onValueChange={(value: "admin" | "moderator" | "user") => setEditingUser({ ...editingUser, role: value })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="user">সদস্য</SelectItem><SelectItem value="moderator">মডারেটর</SelectItem><SelectItem value="admin">অ্যাডমিন</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2"><Button variant="outline" onClick={() => setEditingUser(null)}>বাতিল</Button><Button onClick={handleUpdateRole}>আপডেট করুন</Button></div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UsersManager;
