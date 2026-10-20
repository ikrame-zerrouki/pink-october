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
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* العمود الأول: الشعار */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center">
                <Ribbon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-lg">أكتوبر وردي</div>
                <div className="text-xs text-pink-200">توعية • وقاية • أمل</div>
              </div>
            </div>
            <p className="text-sm text-pink-100/80 leading-relaxed mb-5">
              منصة توعوية شاملة عن سرطان الثدي — نؤمن أن المعرفة أول خطوة نحو
              الوقاية.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur border border-white/10 flex items-center justify-center transition"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* الأعمدة الثلاثة */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-bold text-lg mb-4 text-white">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-pink-100/80 hover:text-white transition"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

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
            </p>
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