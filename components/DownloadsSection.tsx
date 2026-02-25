import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Book, FileAudio, Languages } from "lucide-react";
import { downloadsData } from "@/data/siteData";
import { DownloadData } from "@/type/downloads";

const iconMap: Record<string, any> = {
  book: Book,
  file: FileText,
  audio: FileAudio,
  pdf: FileText,
  doc: FileText,
};

interface DownloadsSectionProps {
  downloads: DownloadData[];
}

export function DownloadsSection({ downloads }: DownloadsSectionProps) {
  // Filter published downloads, fallback to static data
  const publishedDownloads =
    downloads.filter((d) => d.is_published).length > 0
      ? downloads.filter((d) => d.is_published)
      : downloadsData;

  const displayDownloads = publishedDownloads.slice(0, 6);
  return (
    <section id="downloads" className="py-20 bg-background islamic-pattern">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-arabic text-xl text-secondary mb-2 block">
            التحميلات
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            ডাউনলোডযোগ্য
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            আপনার জ্ঞান গভীর করতে বই, প্রবন্ধ, অডিও বক্তৃতা ও গবেষণা পত্র
            ডাউনলোড করুন
          </p>
        </div>

        {/* Downloads Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayDownloads.map((item: any, index: number) => {
            // Normalize data to handle both API (snake_case) and static (camelCase) formats
            const fileType = item.file_type || item.type;
            const fileSize = item.file_size || item.size;
            const downloadCount = item.download_count || item.downloads;
            const iconType = item.iconType;

            const IconComponent =
              iconMap[fileType?.toLowerCase() || iconType] || FileText;
            return (
              <Card
                key={item._id || item.id}
                className="group hover:shadow-elegant transition-all duration-500 border-border/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="text-xs">
                      {fileType}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {fileSize}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-xs flex items-center gap-1"
                    >
                      <Languages className="w-3 h-3" />
                      {item.language}
                    </Badge>
                  </div>

                  {/* Download Stats & Button */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <span className="text-xs text-muted-foreground">
                      {downloadCount} ডাউনলোড
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      ডাউনলোড
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button variant="elegant" size="lg">
            সব সম্পদ দেখুন
          </Button>
        </div>
      </div>
    </section>
  );
}
