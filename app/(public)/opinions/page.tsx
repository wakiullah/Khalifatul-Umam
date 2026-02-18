'use client'
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Star, Quote, User, MapPin, Calendar, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const testimonials = [
  {
    id: 1,
    name: "Dr. Abdul Rahman Al-Azhari",
    location: "Cairo, Egypt",
    date: "2024-01-15",
    rating: 5,
    text: "Imam Ahmad Sirhindi's teachings on Tawheed and the revival of Sunnah practices have profoundly influenced Islamic scholarship across the Muslim world. His Maktubat remains an essential reading for any serious student of Islamic spirituality.",
    title: "Professor of Islamic Studies",
  },
  {
    id: 2,
    name: "Maulana Tariq Jameel",
    location: "Lahore, Pakistan",
    date: "2024-02-20",
    rating: 5,
    text: "The legacy of Mujaddid Alf-e-Sani is unparalleled. His courage in opposing innovations and his steadfastness in the face of persecution serves as a beacon for all Muslims who wish to follow the true path.",
    title: "Islamic Scholar",
  },
  {
    id: 3,
    name: "Sheikh Muhammad Al-Yaqoubi",
    location: "Damascus, Syria",
    date: "2024-03-10",
    rating: 5,
    text: "Few scholars in Islamic history have had such a transformative impact on their era. Imam Sirhindi's intellectual depth and spiritual insight continue to guide seekers of truth even after four centuries.",
    title: "Sufi Master & Scholar",
  },
  {
    id: 4,
    name: "Prof. Carl Ernst",
    location: "North Carolina, USA",
    date: "2024-04-05",
    rating: 5,
    text: "From an academic perspective, Ahmad Sirhindi's contribution to Islamic thought represents a pivotal moment in the history of Sufism. His sophisticated philosophical arguments continue to be studied in universities worldwide.",
    title: "Professor of Religious Studies",
  },
  {
    id: 5,
    name: "Hafiz Abdullah Khan",
    location: "Sirhind, India",
    date: "2024-05-12",
    rating: 5,
    text: "Growing up near the blessed shrine of Hazrat Mujaddid, I have witnessed countless pilgrims who come seeking spiritual solace. His baraka continues to benefit the ummah even today.",
    title: "Caretaker of the Shrine",
  },
  {
    id: 6,
    name: "Dr. Fatima Zahra",
    location: "Istanbul, Turkey",
    date: "2024-06-01",
    rating: 5,
    text: "Imam Sirhindi's emphasis on following the Sunnah while maintaining the essence of tasawwuf provides a balanced approach that modern Muslims desperately need.",
    title: "Islamic History Researcher",
  },
];

export default function Opinions() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    opinion: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Opinion Submitted",
      description:
        "JazakAllah Khair! Your opinion has been submitted for review.",
    });
    setFormData({ name: "", email: "", location: "", opinion: "" });
  };

  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/10 to-background islamic-pattern">
        <div className="container mx-auto px-4 text-center">
          <span className="font-arabic text-2xl text-secondary mb-4 block">
            آراء العلماء
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Scholarly Opinions & Testimonials
          </h1>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Read what Islamic scholars, academics, and spiritual seekers have to
            say about the life, teachings, and legacy of Hazrat Mujaddid
            Alf-e-Sani رحمة الله عليه
          </p>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Testimonials Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className="group hover:shadow-elegant transition-all duration-500 border-border/50 overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  {/* Quote Icon */}
                  <Quote className="w-8 h-8 text-secondary/30 mb-4" />

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-secondary text-secondary"
                      />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="font-body text-foreground/80 leading-relaxed mb-6 italic">
                    {testimonial.text}
                  </p>

                  {/* Author Info */}
                  <div className="border-t border-border/50 pt-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-display font-semibold text-foreground">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.title}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {testimonial.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(testimonial.date).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Submit Opinion Form */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <span className="font-arabic text-xl text-secondary mb-2 block">
                شاركنا رأيك
              </span>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Share Your Opinion
              </h2>
              <p className="font-body text-muted-foreground">
                We value your thoughts and insights about the teachings and
                legacy of Hazrat Mujaddid Alf-e-Sani
              </p>
            </div>

            <Card className="border-border/50 shadow-card">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="font-body text-sm font-medium text-foreground mb-2 block">
                        Your Name *
                      </label>
                      <Input
                        required
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="bg-background"
                      />
                    </div>
                    <div>
                      <label className="font-body text-sm font-medium text-foreground mb-2 block">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        required
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="bg-background"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-body text-sm font-medium text-foreground mb-2 block">
                      Location
                    </label>
                    <Input
                      placeholder="City, Country"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="bg-background"
                    />
                  </div>

                  <div>
                    <label className="font-body text-sm font-medium text-foreground mb-2 block">
                      Your Opinion *
                    </label>
                    <Textarea
                      required
                      rows={6}
                      placeholder="Share your thoughts about the teachings and legacy of Hazrat Mujaddid Alf-e-Sani..."
                      value={formData.opinion}
                      onChange={(e) =>
                        setFormData({ ...formData, opinion: e.target.value })
                      }
                      className="bg-background resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="elegant"
                    size="lg"
                    className="w-full"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Opinion
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    </>
  );
}
