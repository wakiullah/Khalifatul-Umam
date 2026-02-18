"use client";

console.log("Dashboard component loaded:", "components/dashboard/SettingsManager.tsx");

import { useState } from "react";
import { 
  Save, 
  Globe, 
  Bell, 
  Shield, 
  Palette, 
  Database,
  Mail,
  Key,
  User,
  Moon,
  Sun,
  Monitor
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const SettingsManager = () => {
  const [theme, setTheme] = useState("system");
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">সেটিংস</h1>
          <p className="text-muted-foreground mt-1">ওয়েবসাইট কনফিগারেশন এবং সেটিংস পরিচালনা করুন</p>
        </div>
        <Button className="gap-2">
          <Save className="h-4 w-4" />
          সংরক্ষণ করুন
        </Button>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto gap-2">
          <TabsTrigger value="general" className="gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">সাধারণ</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">অ্যাপিয়ারেন্স</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">নোটিফিকেশন</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">সিকিউরিটি</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="gap-2">
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">অ্যাডভান্সড</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                সাইট তথ্য
              </CardTitle>
              <CardDescription>আপনার ওয়েবসাইটের মৌলিক তথ্য সম্পাদনা করুন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>সাইটের নাম</Label>
                  <Input defaultValue="ইমাম রব্বানী রহ." />
                </div>
                <div className="space-y-2">
                  <Label>ট্যাগলাইন</Label>
                  <Input defaultValue="মুজাদ্দিদ আলফে সানী" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>সাইটের বিবরণ</Label>
                <Textarea 
                  defaultValue="হযরত মুজাদ্দিদ আলফে সানী শায়খ আহমাদ সিরহিন্দী (রহ.) এর জীবন, শিক্ষা ও অবদান সম্পর্কে জানার প্ল্যাটফর্ম।"
                  className="min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>যোগাযোগ ইমেইল</Label>
                  <Input type="email" defaultValue="info@imamrabbani.com" />
                </div>
                <div className="space-y-2">
                  <Label>ভাষা</Label>
                  <Select defaultValue="bn">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bn">বাংলা</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ar">العربية</SelectItem>
                      <SelectItem value="ur">اردو</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                সামাজিক মিডিয়া লিংক
              </CardTitle>
              <CardDescription>আপনার সোশ্যাল মিডিয়া প্রোফাইল লিংক যোগ করুন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>ফেসবুক</Label>
                  <Input placeholder="https://facebook.com/..." />
                </div>
                <div className="space-y-2">
                  <Label>টুইটার/এক্স</Label>
                  <Input placeholder="https://twitter.com/..." />
                </div>
                <div className="space-y-2">
                  <Label>ইউটিউব</Label>
                  <Input placeholder="https://youtube.com/..." />
                </div>
                <div className="space-y-2">
                  <Label>ইনস্টাগ্রাম</Label>
                  <Input placeholder="https://instagram.com/..." />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                থিম সেটিংস
              </CardTitle>
              <CardDescription>ওয়েবসাইটের রং এবং থিম কাস্টমাইজ করুন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>থিম মোড</Label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: "light", label: "লাইট", icon: Sun },
                    { value: "dark", label: "ডার্ক", icon: Moon },
                    { value: "system", label: "সিস্টেম", icon: Monitor },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setTheme(option.value)}
                      className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                        theme === option.value 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <option.icon className="h-6 w-6" />
                      <span className="text-sm font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>প্রাইমারি কালার</Label>
                <div className="flex gap-3">
                  {["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444", "#ec4899"].map((color) => (
                    <button
                      key={color}
                      className="h-10 w-10 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>RTL লেআউট</Label>
                    <p className="text-sm text-muted-foreground">ডান থেকে বাম লেআউট সক্রিয় করুন</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>অ্যানিমেশন</Label>
                    <p className="text-sm text-muted-foreground">পেইজ অ্যানিমেশন সক্রিয় রাখুন</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                নোটিফিকেশন সেটিংস
              </CardTitle>
              <CardDescription>কোন ধরনের নোটিফিকেশন পেতে চান তা নির্বাচন করুন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <Label>নতুন মন্তব্য</Label>
                    <p className="text-sm text-muted-foreground">পোস্টে নতুন মন্তব্য হলে নোটিফিকেশন পান</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <Label>নতুন সদস্য</Label>
                    <p className="text-sm text-muted-foreground">নতুন সদস্য যোগদান করলে জানান</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <Label>ফোরাম কার্যক্রম</Label>
                    <p className="text-sm text-muted-foreground">ফোরামে নতুন পোস্ট বা উত্তর হলে জানান</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <div>
                    <Label>সিস্টেম আপডেট</Label>
                    <p className="text-sm text-muted-foreground">গুরুত্বপূর্ণ সিস্টেম আপডেট সম্পর্কে জানান</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                ইমেইল নোটিফিকেশন
              </CardTitle>
              <CardDescription>ইমেইলে কোন আপডেট পেতে চান</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>দৈনিক সারসংক্ষেপ</Label>
                  <p className="text-sm text-muted-foreground">প্রতিদিন সাইটের কার্যক্রমের সারসংক্ষেপ</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>সাপ্তাহিক রিপোর্ট</Label>
                  <p className="text-sm text-muted-foreground">প্রতি সপ্তাহে বিস্তারিত রিপোর্ট</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                পাসওয়ার্ড পরিবর্তন
              </CardTitle>
              <CardDescription>আপনার অ্যাকাউন্টের পাসওয়ার্ড পরিবর্তন করুন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>বর্তমান পাসওয়ার্ড</Label>
                <Input type="password" placeholder="বর্তমান পাসওয়ার্ড লিখুন" />
              </div>
              <div className="space-y-2">
                <Label>নতুন পাসওয়ার্ড</Label>
                <Input type="password" placeholder="নতুন পাসওয়ার্ড লিখুন" />
              </div>
              <div className="space-y-2">
                <Label>নতুন পাসওয়ার্ড নিশ্চিত করুন</Label>
                <Input type="password" placeholder="আবার নতুন পাসওয়ার্ড লিখুন" />
              </div>
              <Button>পাসওয়ার্ড পরিবর্তন করুন</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                সিকিউরিটি অপশন
              </CardTitle>
              <CardDescription>অ্যাকাউন্ট সুরক্ষা বাড়ান</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div>
                  <Label>টু-ফ্যাক্টর অথেনটিকেশন</Label>
                  <p className="text-sm text-muted-foreground">অতিরিক্ত সুরক্ষা স্তর যোগ করুন</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div>
                  <Label>লগইন অ্যালার্ট</Label>
                  <p className="text-sm text-muted-foreground">নতুন ডিভাইস থেকে লগইনে অ্যালার্ট</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div>
                  <Label>সেশন টাইমআউট</Label>
                  <p className="text-sm text-muted-foreground">নিষ্ক্রিয় থাকলে স্বয়ংক্রিয় লগআউট</p>
                </div>
                <Select defaultValue="60">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">৩০ মিনিট</SelectItem>
                    <SelectItem value="60">১ ঘন্টা</SelectItem>
                    <SelectItem value="120">২ ঘন্টা</SelectItem>
                    <SelectItem value="never">কখনো না</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                ডাটা ম্যানেজমেন্ট
              </CardTitle>
              <CardDescription>ওয়েবসাইটের ডাটা এবং ক্যাশ পরিচালনা</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div>
                  <Label>ক্যাশ ক্লিয়ার</Label>
                  <p className="text-sm text-muted-foreground">সাইটের সমস্ত ক্যাশ মুছে ফেলুন</p>
                </div>
                <Button variant="outline">ক্লিয়ার করুন</Button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div>
                  <Label>ডাটা এক্সপোর্ট</Label>
                  <p className="text-sm text-muted-foreground">সমস্ত ডাটা ডাউনলোড করুন</p>
                </div>
                <Button variant="outline">এক্সপোর্ট</Button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg border border-destructive/50 bg-destructive/5">
                <div>
                  <Label className="text-destructive">সমস্ত ডাটা মুছুন</Label>
                  <p className="text-sm text-muted-foreground">এই অ্যাকশন আনডু করা যাবে না</p>
                </div>
                <Button variant="destructive">রিসেট</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API সেটিংস</CardTitle>
              <CardDescription>এক্সটার্নাল API ইন্টিগ্রেশন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>API কী</Label>
                <div className="flex gap-2">
                  <Input defaultValue="sk_live_xxxxxxxxxxxxxxxxxxxxx" type="password" readOnly />
                  <Button variant="outline">কপি</Button>
                  <Button variant="outline">রিজেনারেট</Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>API অ্যাক্সেস</Label>
                  <p className="text-sm text-muted-foreground">এক্সটার্নাল API রিকোয়েস্ট অনুমোদন</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsManager;
