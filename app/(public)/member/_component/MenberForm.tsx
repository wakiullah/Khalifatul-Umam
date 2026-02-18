"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UserPlus, CheckCircle } from "lucide-react";
import { z } from "zod";

import { createMemberAction } from "@/services/members.api";
import { MemberData } from "@/type/member";

// Validation schema
const memberFormSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(2, "নাম কমপক্ষে ২ অক্ষরের হতে হবে")
    .max(100, "নাম ১০০ অক্ষরের বেশি হতে পারবে না"),
  father_name: z
    .string()
    .trim()
    .min(2, "পিতার নাম কমপক্ষে ২ অক্ষরের হতে হবে")
    .max(100, "পিতার নাম ১০০ অক্ষরের বেশি হতে পারবে না"),
  mother_name: z
    .string()
    .trim()
    .min(2, "মাতার নাম কমপক্ষে ২ অক্ষরের হতে হবে")
    .max(100, "মাতার নাম ১০০ অক্ষরের বেশি হতে পারবে না"),
  date_of_birth: z.string().min(1, "জন্ম তারিখ আবশ্যক"),
  gender: z.string().min(1, "লিঙ্গ নির্বাচন করুন"),
  religion: z.string().optional(),
  nationality: z.string().optional(),
  nid_number: z.string().optional(),
  phone: z
    .string()
    .trim()
    .min(11, "সঠিক মোবাইল নম্বর দিন")
    .max(14, "সঠিক মোবাইল নম্বর দিন"),
  email: z.string().email("সঠিক ইমেইল দিন").optional().or(z.literal("")),
  present_address: z
    .string()
    .trim()
    .min(10, "বর্তমান ঠিকানা কমপক্ষে ১০ অক্ষরের হতে হবে")
    .max(500, "ঠিকানা ৫০০ অক্ষরের বেশি হতে পারবে না"),
  permanent_address: z
    .string()
    .trim()
    .min(10, "স্থায়ী ঠিকানা কমপক্ষে ১০ অক্ষরের হতে হবে")
    .max(500, "ঠিকানা ৫০০ অক্ষরের বেশি হতে পারবে না"),
  occupation: z.string().optional(),
  education: z.string().optional(),
  blood_group: z.string().optional(),
  reason_to_join: z
    .string()
    .max(1000, "১০০০ অক্ষরের বেশি হতে পারবে না")
    .optional(),
  reference_name: z
    .string()
    .max(100, "রেফারেন্সের নাম ১০০ অক্ষরের বেশি হতে পারবে না")
    .optional(),
  reference_phone: z.string().max(14, "সঠিক মোবাইল নম্বর দিন").optional(),
});

export default function MemberForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof MemberData, string>>
  >({});

  const [formData, setFormData] = useState<MemberData>({
    full_name: "",
    father_name: "",
    mother_name: "",
    date_of_birth: "",
    gender: "",
    religion: "",
    nationality: "বাংলাদেশী",
    nid_number: "",
    phone: "",
    email: "",
    present_address: "",
    permanent_address: "",
    occupation: "",
    education: "",
    blood_group: "",
    reason_to_join: "",
    reference_name: "",
    reference_phone: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof MemberData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = memberFormSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof MemberData, string>> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof MemberData] = err.message;
        }
      });
      setErrors(fieldErrors);
      toast({
        title: "ফর্ম ত্রুটি",
        description: "অনুগ্রহ করে সকল প্রয়োজনীয় তথ্য সঠিকভাবে পূরণ করুন।",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await createMemberAction(formData);
      console.log("API Response:", res);
      if (res.success) {
        setIsSubmitted(true);
        toast({
          title: "আবেদন সফল!",
          description:
            "আপনার সদস্যপদের আবেদন গৃহীত হয়েছে। শীঘ্রই আপনার সাথে যোগাযোগ করা হবে।",
        });
      } else {
        toast({
          title: "ত্রুটি",
          description: res.message || "আবেদন জমা দিতে সমস্যা হয়েছে।",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "ত্রুটি",
        description: "সার্ভারে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <section className="flex-1 pt-32 pb-16 flex items-center justify-center bg-gradient-to-b from-primary/10 to-background">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="pt-8 pb-8">
              <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                আবেদন সফল!
              </h2>
              <p className="text-muted-foreground mb-6">
                আপনার সদস্যপদের আবেদন সফলভাবে গৃহীত হয়েছে। আমাদের টিম শীঘ্রই
                আপনার সাথে যোগাযোগ করবে।
              </p>
              <Button
                variant="elegant"
                onClick={() => (window.location.href = "/")}
              >
                হোমে ফিরে যান
              </Button>
            </CardContent>
          </Card>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <>
      <section className="flex-1 pt-32 pb-16 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="font-arabic text-2xl text-secondary mb-4 block">
              عضوية
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              সদস্যপদ আবেদন ফর্ম
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              আমাদের সংগঠনের সদস্য হতে নিচের ফর্মটি পূরণ করুন। সকল * চিহ্নিত ঘর
              পূরণ করা আবশ্যক।
            </p>
          </div>

          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="font-display text-xl flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                ব্যক্তিগত তথ্য
              </CardTitle>
              <CardDescription>
                আপনার সঠিক তথ্য দিয়ে ফর্মটি পূরণ করুন
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="full_name">পূর্ণ নাম *</Label>
                    <Input
                      id="full_name"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="আপনার পূর্ণ নাম"
                      className={errors.full_name ? "border-destructive" : ""}
                    />
                    {errors.full_name && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.full_name}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="date_of_birth">জন্ম তারিখ *</Label>
                    <Input
                      id="date_of_birth"
                      name="date_of_birth"
                      type="date"
                      value={formData.date_of_birth}
                      onChange={handleChange}
                      className={
                        errors.date_of_birth ? "border-destructive" : ""
                      }
                    />
                    {errors.date_of_birth && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.date_of_birth}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="father_name">পিতার নাম *</Label>
                    <Input
                      id="father_name"
                      name="father_name"
                      value={formData.father_name}
                      onChange={handleChange}
                      placeholder="পিতার পূর্ণ নাম"
                      className={errors.father_name ? "border-destructive" : ""}
                    />
                    {errors.father_name && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.father_name}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="mother_name">মাতার নাম *</Label>
                    <Input
                      id="mother_name"
                      name="mother_name"
                      value={formData.mother_name}
                      onChange={handleChange}
                      placeholder="মাতার পূর্ণ নাম"
                      className={errors.mother_name ? "border-destructive" : ""}
                    />
                    {errors.mother_name && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.mother_name}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="gender">লিঙ্গ *</Label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 rounded-md border bg-background text-sm ${errors.gender ? "border-destructive" : "border-input"}`}
                    >
                      <option value="">নির্বাচন করুন</option>
                      <option value="পুরুষ">পুরুষ</option>
                      <option value="মহিলা">মহিলা</option>
                    </select>
                    {errors.gender && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.gender}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="religion">ধর্ম</Label>
                    <Input
                      id="religion"
                      name="religion"
                      value={formData.religion}
                      onChange={handleChange}
                      placeholder="আপনার ধর্ম"
                    />
                  </div>

                  <div>
                    <Label htmlFor="blood_group">রক্তের গ্রুপ</Label>
                    <select
                      id="blood_group"
                      name="blood_group"
                      value={formData.blood_group}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-md border border-input bg-background text-sm"
                    >
                      <option value="">নির্বাচন করুন</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nationality">জাতীয়তা</Label>
                    <Input
                      id="nationality"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                      placeholder="বাংলাদেশী"
                    />
                  </div>

                  <div>
                    <Label htmlFor="nid_number">জাতীয় পরিচয়পত্র নম্বর</Label>
                    <Input
                      id="nid_number"
                      name="nid_number"
                      value={formData.nid_number}
                      onChange={handleChange}
                      placeholder="NID নম্বর"
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="border-t pt-6">
                  <h3 className="font-display text-lg font-semibold mb-4">
                    যোগাযোগের তথ্য
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">মোবাইল নম্বর *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="01XXXXXXXXX"
                        className={errors.phone ? "border-destructive" : ""}
                      />
                      {errors.phone && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">ইমেইল</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@email.com"
                        className={errors.email ? "border-destructive" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <Label htmlFor="present_address">বর্তমান ঠিকানা *</Label>
                    <Textarea
                      id="present_address"
                      name="present_address"
                      value={formData.present_address}
                      onChange={handleChange}
                      placeholder="গ্রাম/মহল্লা, উপজেলা/থানা, জেলা"
                      rows={2}
                      className={
                        errors.present_address ? "border-destructive" : ""
                      }
                    />
                    {errors.present_address && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.present_address}
                      </p>
                    )}
                  </div>

                  <div className="mt-4">
                    <Label htmlFor="permanent_address">স্থায়ী ঠিকানা *</Label>
                    <Textarea
                      id="permanent_address"
                      name="permanent_address"
                      value={formData.permanent_address}
                      onChange={handleChange}
                      placeholder="গ্রাম/মহল্লা, উপজেলা/থানা, জেলা"
                      rows={2}
                      className={
                        errors.permanent_address ? "border-destructive" : ""
                      }
                    />
                    {errors.permanent_address && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.permanent_address}
                      </p>
                    )}
                  </div>
                </div>

                {/* Education & Occupation */}
                <div className="border-t pt-6">
                  <h3 className="font-display text-lg font-semibold mb-4">
                    শিক্ষা ও পেশা
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="education">শিক্ষাগত যোগ্যতা</Label>
                      <Input
                        id="education"
                        name="education"
                        value={formData.education}
                        onChange={handleChange}
                        placeholder="উদাঃ স্নাতক, মাদ্রাসা"
                      />
                    </div>

                    <div>
                      <Label htmlFor="occupation">পেশা</Label>
                      <Input
                        id="occupation"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                        placeholder="আপনার পেশা"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="border-t pt-6">
                  <h3 className="font-display text-lg font-semibold mb-4">
                    অতিরিক্ত তথ্য
                  </h3>

                  <div>
                    <Label htmlFor="reason_to_join">সদস্য হওয়ার কারণ</Label>
                    <Textarea
                      id="reason_to_join"
                      name="reason_to_join"
                      value={formData.reason_to_join}
                      onChange={handleChange}
                      placeholder="কেন আপনি আমাদের সংগঠনের সদস্য হতে চান?"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label htmlFor="reference_name">রেফারেন্সের নাম</Label>
                      <Input
                        id="reference_name"
                        name="reference_name"
                        value={formData.reference_name}
                        onChange={handleChange}
                        placeholder="পরিচিত কোনো সদস্যের নাম"
                      />
                    </div>

                    <div>
                      <Label htmlFor="reference_phone">রেফারেন্সের ফোন</Label>
                      <Input
                        id="reference_phone"
                        name="reference_phone"
                        value={formData.reference_phone}
                        onChange={handleChange}
                        placeholder="রেফারেন্সের মোবাইল নম্বর"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="elegant"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      জমা দেওয়া হচ্ছে...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4 mr-2" />
                      আবেদন জমা দিন
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
