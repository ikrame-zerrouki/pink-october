import Link from "next/link";
import { Ribbon, Heart } from "lucide-react";
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  MailIcon,
} from "./BrandIcons";
import CurrentYear from "./CurrentYear";

const columns = [
  {
    title: "التوعية",
    links: [
      { href: "/about", label: "عن سرطان الثدي" },
      { href: "/self-exam", label: "الفحص الذاتي" },
      { href: "/medical-checkups", label: "الفحوصات الطبية" },
      { href: "/prevention", label: "الوقاية" },
    ],
  },
  {
    title: "الدعم",
    links: [
      { href: "/stories", label: "قصص الناجيات" },
      { href: "/support", label: "دليل الدعم" },
      { href: "/for-family", label: "الأسرة والأصدقاء" },
      { href: "/faq", label: "الأسئلة الشائعة" },
    ],
  },
  {
    title: "تفاعلي",
    links: [
      { href: "/quiz", label: "اختبار التوعية" },
      { href: "/risk-calculator", label: "حاسبة المخاطر" },
      { href: "/contact", label: "تواصل معنا" },
      { href: "/blog", label: "المدونة" },
    ],
  },
];

const socialLinks = [
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: FacebookIcon, href: "#", label: "Facebook" },
  { icon: TwitterIcon, href: "#", label: "Twitter" },
  { icon: MailIcon, href: "#", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-rose-950 via-pink-950 to-rose-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
      
        
        <div className="border-t border-white/10 pt-8">
          <div className="bg-amber-500/10 border border-amber-400/30 rounded-xl p-4 mb-6">
            <p className="text-sm text-amber-100 text-center leading-relaxed">
              ⚕️ هذا الموقع توعوي فقط ولا يغني عن استشارة الطبيب المختص.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-pink-100/70">
            <p className="flex items-center gap-1.5">
              صُنع بـ <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />{" "}
              لأجل صحة المرأة
            </p>زروقي اكرام 
            <div className="flex gap-4">
              <Link href="/privacy" className="hover:text-white transition">
                الخصوصية
              </Link>
              <Link href="/terms" className="hover:text-white transition">
                الشروط
              </Link>
              <span>
                © <CurrentYear /> أكتوبر وردي
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}