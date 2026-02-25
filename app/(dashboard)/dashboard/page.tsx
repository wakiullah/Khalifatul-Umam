import Link from "next/link";
import { getAllMembers } from "@/services/members.api";
import { getNewsData } from "@/services/news.api";
import { getPostsData } from "@/services/posts.api";
import { getAllOpinions } from "@/services/opinions.api";
import { getSayingsData } from "@/services/saying.api";
import { getBooksData } from "@/services/books.api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  UserPlus,
  Newspaper,
  FileText,
  MessageSquare,
  Quote,
  BookOpen,
  Clock,
  CheckCircle,
  TrendingUp,
  Users,
  Eye,
  Calendar,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function DashboardPage() {
  // Fetch all data in parallel
  const [
    membersResponse,
    newsResponse,
    postsResponse,
    opinionsResponse,
    sayingsResponse,
    booksResponse,
  ] = await Promise.all([
    getAllMembers(),
    getNewsData(1, 5),
    getPostsData(),
    getAllOpinions(),
    getSayingsData(),
    getBooksData(),
  ]);

  const members = membersResponse.data || [];
  const news = newsResponse.data || [];
  const posts = postsResponse.data || [];
  const opinions = opinionsResponse.data || [];
  const sayings = sayingsResponse.data || [];
  const books = booksResponse.data || [];

  // Calculate statistics
  const stats = {
    members: {
      total: membersResponse.meta?.total || 0,
      pending: members.filter((m) => m.status === "Pending").length,
      approved: members.filter((m) => m.status === "Approved").length,
      rejected: members.filter((m) => m.status === "Rejected").length,
    },
    opinions: {
      total: opinions.length,
      pending: opinions.filter((o) => !o.isApproved).length,
      approved: opinions.filter((o) => o.isApproved).length,
    },
    news: {
      total: newsResponse.total || 0,
      published: news.filter((n) => n.is_published).length,
      draft: news.filter((n) => !n.is_published).length,
    },
    posts: {
      total: posts.length,
      published: posts.filter((p) => p.is_published).length,
      draft: posts.filter((p) => !p.is_published).length,
    },
    sayings: {
      total: sayings.length,
      published: sayings.filter((s) => s.is_published).length,
    },
    books: {
      total: books.length,
    },
  };

  // Get recent items
  const recentMembers = members
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  const recentOpinions = opinions
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("bn-BD", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">ড্যাশবোর্ড</h1>
        <p className="text-muted-foreground">
          আপনার সিস্টেমের সামগ্রিক পরিসংখ্যান এবং কার্যক্রম
        </p>
      </div>

      {/* Main Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Members Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                সদস্যপদ আবেদন
              </CardTitle>
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <UserPlus className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.members.total}</div>
            <div className="flex items-center gap-4 mt-2 text-xs">
              <div className="flex items-center gap-1 text-yellow-600">
                <Clock className="h-3 w-3" />
                <span>{stats.members.pending} অপেক্ষমাণ</span>
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle className="h-3 w-3" />
                <span>{stats.members.approved}</span>
              </div>
            </div>
            <Link href="/dashboard/applications">
              <Button variant="link" className="p-0 h-auto mt-2" size="sm">
                বিস্তারিত দেখুন <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* News Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                সংবাদ
              </CardTitle>
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <Newspaper className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.news.total}</div>
            <div className="flex items-center gap-4 mt-2 text-xs">
              <div className="flex items-center gap-1 text-green-600">
                <Eye className="h-3 w-3" />
                <span>{stats.news.published} প্রকাশিত</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <FileText className="h-3 w-3" />
                <span>{stats.news.draft} খসড়া</span>
              </div>
            </div>
            <Link href="/dashboard/news">
              <Button variant="link" className="p-0 h-auto mt-2" size="sm">
                বিস্তারিত দেখুন <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Posts Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                পোস্ট
              </CardTitle>
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.posts.total}</div>
            <div className="flex items-center gap-4 mt-2 text-xs">
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle className="h-3 w-3" />
                <span>{stats.posts.published} প্রকাশিত</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <FileText className="h-3 w-3" />
                <span>{stats.posts.draft} খসড়া</span>
              </div>
            </div>
            <Link href="/dashboard/posts">
              <Button variant="link" className="p-0 h-auto mt-2" size="sm">
                বিস্তারিত দেখুন <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Opinions Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                মতামত
              </CardTitle>
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.opinions.total}</div>
            <div className="flex items-center gap-4 mt-2 text-xs">
              <div className="flex items-center gap-1 text-yellow-600">
                <Clock className="h-3 w-3" />
                <span>{stats.opinions.pending} অপেক্ষমাণ</span>
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <CheckCircle className="h-3 w-3" />
                <span>{stats.opinions.approved}</span>
              </div>
            </div>
            <Link href="/dashboard/opinions">
              <Button variant="link" className="p-0 h-auto mt-2" size="sm">
                বিস্তারিত দেখুন <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                বাণীসমূহ
              </CardTitle>
              <Quote className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.sayings.total}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.sayings.published} প্রকাশিত
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                বইসমূহ
              </CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.books.total}</div>
            <p className="text-xs text-muted-foreground mt-1">মোট বই</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                সর্বমোট কন্টেন্ট
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.news.total +
                stats.posts.total +
                stats.sayings.total +
                stats.books.total}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              সব ধরনের কন্টেন্ট
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts & Pending Items */}
      {(stats.members.pending > 0 || stats.opinions.pending > 0) && (
        <Card className="border-yellow-200 bg-yellow-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <AlertCircle className="h-5 w-5" />
              মনোযোগ প্রয়োজন
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stats.members.pending > 0 && (
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div>
                    <p className="font-medium">নতুন সদস্যপদ আবেদন</p>
                    <p className="text-sm text-muted-foreground">
                      {stats.members.pending}টি আবেদন পর্যালোচনার অপেক্ষায়
                    </p>
                  </div>
                  <Link href="/dashboard/applications">
                    <Button size="sm">
                      দেখুন
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              )}

              {stats.opinions.pending > 0 && (
                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                  <div>
                    <p className="font-medium">নতুন মতামত</p>
                    <p className="text-sm text-muted-foreground">
                      {stats.opinions.pending}টি মতামত পর্যালোচনার অপেক্ষায়
                    </p>
                  </div>
                  <Link href="/dashboard/opinions">
                    <Button size="sm">
                      দেখুন
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Member Applications */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>সাম্প্রতিক সদস্যপদ আবেদন</CardTitle>
              <Link href="/dashboard/applications">
                <Button variant="ghost" size="sm">
                  সব দেখুন
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentMembers.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                কোনো আবেদন নেই
              </p>
            ) : (
              <div className="space-y-3">
                {recentMembers.map((member) => (
                  <div
                    key={member._id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">
                          {member.full_name}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {formatDate(member.createdAt)}
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={
                        member.status === "Pending"
                          ? "secondary"
                          : member.status === "Approved"
                            ? "default"
                            : "destructive"
                      }
                    >
                      {member.status === "Pending"
                        ? "অপেক্ষমাণ"
                        : member.status === "Approved"
                          ? "অনুমোদিত"
                          : "বাতিল"}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Opinions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>সাম্প্রতিক মতামত</CardTitle>
              <Link href="/dashboard/opinions">
                <Button variant="ghost" size="sm">
                  সব দেখুন
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentOpinions.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                কোনো মতামত নেই
              </p>
            ) : (
              <div className="space-y-3">
                {recentOpinions.map((opinion) => (
                  <div
                    key={opinion._id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                        <MessageSquare className="h-4 w-4 text-orange-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{opinion.name}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {opinion.text}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={opinion.isApproved ? "default" : "secondary"}
                    >
                      {opinion.isApproved ? "অনুমোদিত" : "অপেক্ষমাণ"}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>দ্রুত অ্যাক্সেস</CardTitle>
          <CardDescription>প্রায়শ ব্যবহৃত কাজগুলো দ্রুত করুন</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/dashboard/news">
              <Button variant="outline" className="w-full h-auto py-4">
                <div className="flex flex-col items-center gap-2">
                  <Newspaper className="h-6 w-6" />
                  <span className="text-sm">নতুন সংবাদ</span>
                </div>
              </Button>
            </Link>
            <Link href="/dashboard/posts">
              <Button variant="outline" className="w-full h-auto py-4">
                <div className="flex flex-col items-center gap-2">
                  <FileText className="h-6 w-6" />
                  <span className="text-sm">নতুন পোস্ট</span>
                </div>
              </Button>
            </Link>
            <Link href="/dashboard/sayings">
              <Button variant="outline" className="w-full h-auto py-4">
                <div className="flex flex-col items-center gap-2">
                  <Quote className="h-6 w-6" />
                  <span className="text-sm">নতুন বাণী</span>
                </div>
              </Button>
            </Link>
            <Link href="/dashboard/applications">
              <Button variant="outline" className="w-full h-auto py-4">
                <div className="flex flex-col items-center gap-2">
                  <UserPlus className="h-6 w-6" />
                  <span className="text-sm">আবেদন দেখুন</span>
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
