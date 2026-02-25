import { Mail, MapPin, Heart } from "lucide-react";
import Image from "next/image";
import Logo from "@/public/logo.png";

const footerLinks = {
  explore: [
    { name: "পরিচিতি", href: "#biography" },
    { name: "ইসলামী শিক্ষা", href: "#contributions" },
    { name: "বাণীসমূহ", href: "#sayings" },
    { name: "ইসলামী বই", href: "#books" },
    { name: "বক্তৃতা", href: "#lectures" },
  ],
  resources: [
    { name: "ইসলামী সাহিত্য", href: "#downloads" },
    { name: "সংবাদ ও প্রবন্ধ", href: "/news" },
    { name: "ফটো গ্যালারি", href: "#gallery" },
    { name: "ফোরাম", href: "/forum" },
    { name: "সদস্য ফরম", href: "/member" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <span className="text-secondary-foreground font-arabic text-2xl">
                  <Image src={Logo} width={48} height={48} alt="Logo" />
                </span>
              </div>
              <div>
                <h3 className="font-display text-xl">
                  সাইয়্যিদুনা খলীফাতুল উমাম আলাইহিস সালাম
                </h3>
                <p className="text-primary-foreground/60 text-sm font-arabic">
                  مولانا سیدنا خلیفۃالامم علیہ السلام
                </p>
              </div>
            </div>
            <p className="font-body text-primary-foreground/70 leading-relaxed max-w-md mb-6">
              খলীফাতুল্লাহ, খলীফাতু রসূলিল্লাহ, সাইয়্যিদুনা হযরত খলীফাতুল উমাম
              আল মানছুর আলাইহিস সালাম তিনি সেই স্তরের মহাসম্মানিত ওলীআল্লাহ,
              যিনি মানুষের চরিত্রের এ সকল জটিল বিষয় অনুধাবনে এবং তার সুচিকিৎসা
              প্রদানে পরিপূর্ণভাবে সক্ষম। সুবহানাল্লাহ।
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="mailto:info@example.com"
                className="flex items-center gap-3 text-primary-foreground/70 hover:text-secondary transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span className="font-body text-sm">info@example.com</span>
              </a>
              <div className="flex items-center gap-3 text-primary-foreground/70">
                <MapPin className="w-4 h-4" />
                <span className="font-body text-sm">
                  রাজারবাগ দরবার শরীফ, ঢাকা, বাংলাদেশ
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg mb-6">এক্সপ্লোর</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display text-lg mb-6">সম্পদ</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-sm text-primary-foreground/60 text-center md:text-left">
              © {new Date().getFullYear()} মুজাদ্দিদে আলফে সানী ট্রিবিউট।
              সর্বস্বত্ব সংরক্ষিত।
            </p>
            <p className="font-body text-sm text-primary-foreground/60 flex items-center gap-2">
              উম্মাহর জন্য{" "}
              <Heart className="w-4 h-4 text-secondary fill-secondary" /> দিয়ে
              তৈরি
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Arabic text */}
      <div className="bg-emerald-light/20 py-4">
        <p className="font-arabic text-center text-primary-foreground/40 text-lg">
          رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً
          وَقِنَا عَذَابَ النَّارِ
        </p>
      </div>
    </footer>
  );
}
