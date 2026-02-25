"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Users,
  FileText,
  MessageSquare,
  TrendingUp,
  Eye,
  BookOpen,
  Settings,
  Home,
  Newspaper,
  Image,
  Download,
  Mail,
  LogOut,
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  MoreVertical,
  Plus,
  Edit,
  Trash2,
  Quote,
  UserCircle,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const sidebarItems = [
    { id: "overview", label: "ওভারভিউ", icon: Home, href: "/dashboard" },
    {
      id: "members",
      label: "সদস্যপদ আবেদন",
      icon: UserPlus,
      href: "/dashboard/applications",
    },
    {
      id: "biography",
      label: "জীবনী",
      icon: UserCircle,
      href: "/dashboard/biography",
    },
    {
      id: "sayings",
      label: "বাণীসমূহ",
      icon: Quote,
      href: "/dashboard/sayings",
    },
    { id: "books", label: "বইসমূহ", icon: BookOpen, href: "/dashboard/books" },
    { id: "news", label: "সংবাদ", icon: Newspaper, href: "/dashboard/news" },
    {
      id: "posts",
      label: "পোস্ট ম্যানেজমেন্ট",
      icon: FileText,
      href: "/dashboard/posts",
    },
    {
      id: "opinions",
      label: "মতামতসমূহ",
      icon: MessageSquare,
      href: "/dashboard/opinions",
    },
    {
      id: "users",
      label: "ইউজার ম্যানেজমেন্ট",
      icon: Users,
      href: "/dashboard/users",
    },
    {
      id: "forum",
      label: "ফোরাম",
      icon: MessageSquare,
      href: "/dashboard/forum",
    },
    {
      id: "gallery",
      label: "গ্যালারি",
      icon: Image,
      href: "/dashboard/gallery",
    },
    {
      id: "downloads",
      label: "ডাউনলোড",
      icon: Download,
      href: "/dashboard/downloads",
    },
    {
      id: "newsletter",
      label: "নিউজলেটার",
      icon: Mail,
      href: "/dashboard/newsletter",
    },
    {
      id: "settings",
      label: "সেটিংস",
      icon: Settings,
      href: "/dashboard/settings",
    },
  ];

  const handleLogout = async () => {
    await logout(); // Use logout from AuthContext
    toast({
      title: "লগআউট সফল",
      description: "আপনি সফলভাবে লগআউট করেছেন।",
    });
  };
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-card border-r border-border transition-all duration-300 flex flex-col fixed h-full z-50`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
          {sidebarOpen && (
            <h1 className="text-xl font-bold text-primary font-arabic">
              অ্যাডমিন প্যানেল
            </h1>
          )}
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-destructive hover:bg-destructive/10 transition-all duration-200"
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">লগআউট</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 ${sidebarOpen ? "ml-64" : "ml-20"} transition-all duration-300`}
      >
        {/* Top Header */}
        <header className="bg-card border-b border-border sticky top-0 z-40">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative max-w-md flex-1">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="সার্চ করুন..."
                  className="pr-10 bg-muted/50"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -left-1 h-4 w-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                  ৩
                </span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-bold">অ</span>
                    </div>
                    <span className="font-medium">
                      {user?.name || "অ্যাডমিন"}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>প্রোফাইল</DropdownMenuItem>
                  <DropdownMenuItem>সেটিংস</DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={handleLogout}
                  >
                    লগআউট
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 space-y-6">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
