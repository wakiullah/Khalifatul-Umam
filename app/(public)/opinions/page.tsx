import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, User, MapPin, Calendar } from "lucide-react";
import { getOpinionsData } from "@/services/opinions.api";
import OpinionForm from "@/components/OpinionForm";

// Force dynamic rendering
export const dynamic = "force-dynamic";

export default async function Opinions() {
  // Fetch opinions data from API
  const opinionsResponse = await getOpinionsData();
  const opinions = opinionsResponse.data || [];

  // Filter approved opinions only
  const approvedOpinions = opinions.filter((op) => op.isApproved);

  return (
    <>
      <section className="pt-32  bg-gradient-to-b from-primary/10 to-background islamic-pattern">
        <div className="container mx-auto px-4 text-center">
          <span className="font-arabic text-2xl text-secondary mb-4 block">
            آراء العلماء
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            মতামত ও প্রশংসাপত্র
          </h1>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            সাইয়িদুনা হযরত খলিফাতুল উমাম আলাইহিস সালাম উনার ব্যাপারে বিভিন্ন
            আলেম ও গবেষকের মতামত ও প্রশংসাপত্রের একটি সংকলন।
          </p>
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Testimonials Grid */}
      <section className="pb-10">
        <div className="container mx-auto px-4">
          {approvedOpinions.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {approvedOpinions.map((opinion, index) => (
                <Card
                  key={opinion._id}
                  className="group hover:shadow-elegant transition-all duration-500 border-border/50 overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    {/* Quote Icon */}
                    <Quote className="w-8 h-8 text-secondary/30 mb-4" />

                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(opinion.rating || 5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-secondary text-secondary"
                        />
                      ))}
                    </div>

                    {/* Text */}
                    <p className="font-body text-foreground/80 leading-relaxed mb-6 italic">
                      {opinion.text}
                    </p>

                    {/* Author Info */}
                    <div className="border-t border-border/50 pt-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-display font-semibold text-foreground">
                            {opinion.name}
                          </h4>
                          {opinion.title && (
                            <p className="text-sm text-muted-foreground">
                              {opinion.title}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-3">
                        {opinion.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {opinion.location}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(opinion.createdAt).toLocaleDateString(
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
          ) : (
            <div className="text-center py-16">
              <Quote className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">
                এখনও কোনো মতামত নেই। প্রথম মতামত দিন!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Section Divider */}
      <div className="section-divider" />

      {/* Submit Opinion Form */}
      <OpinionForm />
    </>
  );
}
