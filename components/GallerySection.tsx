import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ZoomIn } from "lucide-react";
import { galleryData } from "@/data/siteData";
import Image from "next/image";
import { GalleryData } from "@/type/gallery";

interface GallerySectionProps {
  gallery: GalleryData[];
}

export function GallerySection({ gallery }: GallerySectionProps) {
  // Filter published gallery items, fallback to static data
  const publishedGallery =
    gallery.filter((g) => g.is_published).length > 0
      ? gallery.filter((g) => g.is_published)
      : (galleryData as any);

  const displayGallery = publishedGallery.slice(0, 7);
  return (
    <section id="gallery" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-arabic text-xl text-secondary mb-2 block">
            معرض الصور
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            ফটো গ্যালারি
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl mx-auto">
            বিভিন্ন ছবি
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {displayGallery.map((image: any, index: number) => (
            <Dialog key={image._id || image.id}>
              <DialogTrigger asChild>
                <Card
                  className={`group relative overflow-hidden cursor-pointer border-0 shadow-card hover:shadow-elegant transition-all duration-500 ${
                    index === 0 ? "col-span-2 row-span-2" : ""
                  }  ${index === 0 ? "h-100 md:h-125" : "h-48 md:h-64"}`}
                >
                  <Image
                    src={image.image_url || image.src}
                    alt={image.title}
                    className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ${
                      index === 0 ? "h-100 md:h-125" : "h-48 md:h-64"
                    }`}
                    fill
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                      <h3 className="font-display text-primary-foreground font-semibold text-lg mb-1">
                        {image.title}
                      </h3>
                      <p className="font-body text-primary-foreground/80 text-sm">
                        {image.description || "বিবরণ নেই"}
                      </p>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="w-10 h-10 rounded-full bg-secondary/80 flex items-center justify-center">
                        <ZoomIn className="w-5 h-5 text-secondary-foreground" />
                      </div>
                    </div>
                  </div>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto p-0">
                <div className="relative w-full">
                  <Image
                    src={image.image_url || image.src}
                    alt={image.title}
                    width={1200}
                    height={800}
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div className="p-6 bg-background">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {image.title}
                  </h3>
                  <p className="font-body text-muted-foreground">
                    {image.description || "বিবরণ নেই"}
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
