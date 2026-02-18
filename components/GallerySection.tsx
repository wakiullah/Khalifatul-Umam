import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ZoomIn } from "lucide-react";
import { galleryData } from "@/data/siteData";
import Image from "next/image";

export function GallerySection() {
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
            হযরত মুজাদ্দিদে আলফে সানী رحمة الله عليه-এর সাথে সম্পর্কিত পবিত্র
            স্থান, ঐতিহাসিক নিদর্শন ও সমাবেশের একটি দৃশ্যমান যাত্রা
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryData.map((image, index) => (
            <Dialog key={image.id}>
              <DialogTrigger asChild>
                <Card
                  className={`group relative overflow-hidden cursor-pointer border-0 shadow-card hover:shadow-elegant transition-all duration-500 ${
                    index === 0 ? "col-span-2 row-span-2" : ""
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.title}
                    className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ${
                      index === 0 ? "h-[400px] md:h-[500px]" : "h-48 md:h-64"
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
                        {image.description}
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
              <DialogContent className="max-w-4xl p-0 overflow-hidden">
                <Image
                  src={image.src
                    .replace("w=600", "w=1200")
                    .replace("h=400", "h=800")}
                  alt={image.title}
                  className="w-full h-auto"
                  fill
                />
                <div className="p-6 bg-background">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {image.title}
                  </h3>
                  <p className="font-body text-muted-foreground">
                    {image.description}
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
