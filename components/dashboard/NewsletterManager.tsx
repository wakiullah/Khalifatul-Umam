"use client";

console.log("Dashboard component loaded:", "components/dashboard/NewsletterManager.tsx");

import { useState } from "react";
import { Plus, Edit, Trash2, MoreVertical, Search, Mail, Send, Users, BarChart3, Clock, CheckCircle, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const NewsletterManager = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isComposeDialogOpen, setIsComposeDialogOpen] = useState(false);
  const [isViewCampaignOpen, setIsViewCampaignOpen] = useState(false);
  const [isEditCampaignOpen, setIsEditCampaignOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<typeof campaigns[0] | null>(null);
  const [editCampaignData, setEditCampaignData] = useState({
    subject: "",
    status: ""
  });

  // Sample subscribers data
  const subscribers = [
    { id: 1, email: "abdullah@email.com", name: "আব্দুল্লাহ রহমান", subscribed: "২০২৪-১২-১৫", status: "সক্রিয়" },
    { id: 2, email: "fatima@email.com", name: "ফাতিমা খাতুন", subscribed: "২০২৪-১২-১৪", status: "সক্রিয়" },
    { id: 3, email: "muhammad@email.com", name: "মুহাম্মদ আলী", subscribed: "২০২৪-১২-১৩", status: "সক্রিয়" },
    { id: 4, email: "ayesha@email.com", name: "আয়েশা সিদ্দিকা", subscribed: "২০২৪-১২-১২", status: "আনসাবস্ক্রাইব" },
    { id: 5, email: "umar@email.com", name: "উমর ফারুক", subscribed: "২০২৪-১২-১১", status: "সক্রিয়" },
  ];

  // Sample campaigns data
  const campaigns = [
    { 
      id: 1, 
      subject: "রমজান প্রস্তুতি বিশেষ সংখ্যা", 
      sent: "২০২৪-১২-১৫", 
      recipients: 1234,
      opened: 856,
      clicked: 234,
      status: "প্রেরিত"
    },
    { 
      id: 2, 
      subject: "নতুন বই প্রকাশের ঘোষণা", 
      sent: "২০২৪-১২-১০", 
      recipients: 1189,
      opened: 745,
      clicked: 189,
      status: "প্রেরিত"
    },
    { 
      id: 3, 
      subject: "সাপ্তাহিক আপডেট - ডিসেম্বর ২০২৪", 
      sent: "-", 
      recipients: 0,
      opened: 0,
      clicked: 0,
      status: "ড্রাফট"
    },
    { 
      id: 4, 
      subject: "ঈদ মোবারক শুভেচ্ছা", 
      sent: "-", 
      recipients: 0,
      opened: 0,
      clicked: 0,
      status: "নির্ধারিত"
    },
  ];

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      "সক্রিয়": "bg-green-500/10 text-green-500",
      "আনসাবস্ক্রাইব": "bg-red-500/10 text-red-500",
      "প্রেরিত": "bg-blue-500/10 text-blue-500",
      "ড্রাফট": "bg-yellow-500/10 text-yellow-500",
      "নির্ধারিত": "bg-purple-500/10 text-purple-500",
    };
    return <Badge className={styles[status] || ""}>{status}</Badge>;
  };

  const filteredSubscribers = subscribers.filter(sub => 
    sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewCampaign = (campaign: typeof campaigns[0]) => {
    setSelectedCampaign(campaign);
    setIsViewCampaignOpen(true);
  };

  const handleEditCampaign = (campaign: typeof campaigns[0]) => {
    setSelectedCampaign(campaign);
    setEditCampaignData({
      subject: campaign.subject,
      status: campaign.status
    });
    setIsEditCampaignOpen(true);
  };

  const handleSaveCampaign = () => {
    // UI only - would save to database in real implementation
    setIsEditCampaignOpen(false);
    setSelectedCampaign(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">নিউজলেটার ম্যানেজমেন্ট</h1>
          <p className="text-muted-foreground mt-1">ইমেইল ক্যাম্পেইন এবং সাবস্ক্রাইবার পরিচালনা করুন</p>
        </div>
        <Dialog open={isComposeDialogOpen} onOpenChange={setIsComposeDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              নতুন ক্যাম্পেইন
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>নতুন ইমেইল ক্যাম্পেইন</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>বিষয়</Label>
                <Input placeholder="ইমেইলের বিষয় লিখুন" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>প্রাপক তালিকা</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="তালিকা নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সকল সাবস্ক্রাইবার</SelectItem>
                      <SelectItem value="active">সক্রিয় সাবস্ক্রাইবার</SelectItem>
                      <SelectItem value="new">নতুন সাবস্ক্রাইবার</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>সময়সূচী</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="সময় নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="now">এখনই পাঠান</SelectItem>
                      <SelectItem value="schedule">সময় নির্ধারণ করুন</SelectItem>
                      <SelectItem value="draft">ড্রাফট হিসেবে সংরক্ষণ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>ইমেইল বডি</Label>
                <Textarea 
                  placeholder="ইমেইলের বিষয়বস্তু লিখুন..." 
                  className="min-h-[200px]"
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setIsComposeDialogOpen(false)}>
                  বাতিল
                </Button>
                <Button variant="outline">
                  ড্রাফট সংরক্ষণ
                </Button>
                <Button className="gap-2" onClick={() => setIsComposeDialogOpen(false)}>
                  <Send className="h-4 w-4" />
                  পাঠান
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">মোট সাবস্ক্রাইবার</p>
                <h3 className="text-2xl font-bold">{subscribers.length}</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">সক্রিয় সাবস্ক্রাইবার</p>
                <h3 className="text-2xl font-bold">{subscribers.filter(s => s.status === "সক্রিয়").length}</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500">
                <CheckCircle className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">মোট ক্যাম্পেইন</p>
                <h3 className="text-2xl font-bold">{campaigns.length}</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Mail className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">গড় ওপেন রেট</p>
                <h3 className="text-2xl font-bold">৬৮%</h3>
              </div>
              <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                <BarChart3 className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Campaigns and Subscribers */}
      <Tabs defaultValue="campaigns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns">ক্যাম্পেইনসমূহ</TabsTrigger>
          <TabsTrigger value="subscribers">সাবস্ক্রাইবারসমূহ</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          {/* Campaigns Table */}
          <Card>
            <CardHeader>
              <CardTitle>ইমেইল ক্যাম্পেইন</CardTitle>
              <CardDescription>সমস্ত ইমেইল ক্যাম্পেইনের তালিকা</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>বিষয়</TableHead>
                    <TableHead>তারিখ</TableHead>
                    <TableHead>প্রাপক</TableHead>
                    <TableHead>ওপেন</TableHead>
                    <TableHead>ক্লিক</TableHead>
                    <TableHead>স্ট্যাটাস</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium max-w-[250px]">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="truncate">{campaign.subject}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {campaign.sent}
                        </div>
                      </TableCell>
                      <TableCell>{campaign.recipients > 0 ? campaign.recipients.toLocaleString() : "-"}</TableCell>
                      <TableCell>
                        {campaign.opened > 0 ? (
                          <span className="text-green-500">{((campaign.opened / campaign.recipients) * 100).toFixed(0)}%</span>
                        ) : "-"}
                      </TableCell>
                      <TableCell>
                        {campaign.clicked > 0 ? (
                          <span className="text-blue-500">{((campaign.clicked / campaign.recipients) * 100).toFixed(0)}%</span>
                        ) : "-"}
                      </TableCell>
                      <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewCampaign(campaign)}>
                              <Eye className="h-4 w-4 ml-2" />
                              দেখুন
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditCampaign(campaign)}>
                              <Edit className="h-4 w-4 ml-2" />
                              এডিট
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Send className="h-4 w-4 ml-2" />
                              পুনরায় পাঠান
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
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
        </TabsContent>

        <TabsContent value="subscribers" className="space-y-4">
          {/* Search */}
          <Card>
            <CardContent className="p-4">
              <div className="relative max-w-md">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="সাবস্ক্রাইবার সার্চ করুন..." 
                  className="pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Subscribers Table */}
          <Card>
            <CardHeader>
              <CardTitle>সাবস্ক্রাইবার তালিকা</CardTitle>
              <CardDescription>{filteredSubscribers.length}জন সাবস্ক্রাইবার পাওয়া গেছে</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>নাম</TableHead>
                    <TableHead>ইমেইল</TableHead>
                    <TableHead>সাবস্ক্রাইব তারিখ</TableHead>
                    <TableHead>স্ট্যাটাস</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscribers.map((subscriber) => (
                    <TableRow key={subscriber.id}>
                      <TableCell className="font-medium">{subscriber.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          {subscriber.email}
                        </div>
                      </TableCell>
                      <TableCell>{subscriber.subscribed}</TableCell>
                      <TableCell>{getStatusBadge(subscriber.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Send className="h-4 w-4 ml-2" />
                              ইমেইল পাঠান
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 ml-2" />
                              রিমুভ করুন
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
        </TabsContent>
      </Tabs>

      {/* View Campaign Dialog */}
      <Dialog open={isViewCampaignOpen} onOpenChange={setIsViewCampaignOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>ক্যাম্পেইন বিস্তারিত</DialogTitle>
          </DialogHeader>
          {selectedCampaign && (
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">{selectedCampaign.subject}</h3>
                <div className="flex items-center gap-2">
                  {getStatusBadge(selectedCampaign.status)}
                  <span className="text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 inline mr-1" />
                    {selectedCampaign.sent}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-lg font-bold">
                    <Users className="h-4 w-4" />
                    {selectedCampaign.recipients > 0 ? selectedCampaign.recipients.toLocaleString() : "-"}
                  </div>
                  <p className="text-sm text-muted-foreground">প্রাপক</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-lg font-bold text-green-500">
                    <Eye className="h-4 w-4" />
                    {selectedCampaign.opened > 0 ? `${((selectedCampaign.opened / selectedCampaign.recipients) * 100).toFixed(0)}%` : "-"}
                  </div>
                  <p className="text-sm text-muted-foreground">ওপেন রেট</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-lg font-bold text-blue-500">
                    <BarChart3 className="h-4 w-4" />
                    {selectedCampaign.clicked > 0 ? `${((selectedCampaign.clicked / selectedCampaign.recipients) * 100).toFixed(0)}%` : "-"}
                  </div>
                  <p className="text-sm text-muted-foreground">ক্লিক রেট</p>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <Label className="text-sm text-muted-foreground">ইমেইল বডি (প্রিভিউ)</Label>
                <p className="mt-2">এই ক্যাম্পেইনের ইমেইল বিষয়বস্তু এখানে দেখানো হবে। বর্তমানে এটি শুধুমাত্র UI ডেমো।</p>
              </div>
              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setIsViewCampaignOpen(false)}>
                  বন্ধ করুন
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Campaign Dialog */}
      <Dialog open={isEditCampaignOpen} onOpenChange={setIsEditCampaignOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>ক্যাম্পেইন সম্পাদনা</DialogTitle>
          </DialogHeader>
          {selectedCampaign && (
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>বিষয়</Label>
                <Input 
                  value={editCampaignData.subject}
                  onChange={(e) => setEditCampaignData({...editCampaignData, subject: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label>স্ট্যাটাস</Label>
                <Select value={editCampaignData.status} onValueChange={(val) => setEditCampaignData({...editCampaignData, status: val})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ড্রাফট">ড্রাফট</SelectItem>
                    <SelectItem value="নির্ধারিত">নির্ধারিত</SelectItem>
                    <SelectItem value="প্রেরিত">প্রেরিত</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>ইমেইল বডি</Label>
                <Textarea 
                  placeholder="ইমেইলের বিষয়বস্তু লিখুন..." 
                  className="min-h-[150px]"
                />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setIsEditCampaignOpen(false)}>
                  বাতিল
                </Button>
                <Button onClick={handleSaveCampaign}>
                  সংরক্ষণ করুন
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewsletterManager;
