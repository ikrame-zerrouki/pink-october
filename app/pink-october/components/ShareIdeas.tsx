"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Lightbulb,
  Users,
  Heart,
  BookOpen,
  Music,
  Gift,
  Megaphone,
} from "lucide-react";
import { InstagramIcon } from "../../components/BrandIcons";

const ideas = [
  { icon: InstagramIcon, title: "انشري الشريط الوردي", desc: "غيّري صورة بروفايلك إلى شريط وردي في أكتوبر.", color: "from-pink-500 to-rose-500" },
  { icon: Users, title: "تحدثي مع عائلتك", desc: "خصصي جلسة عائلية للحديث عن التوعية والفحص.", color: "from-purple-500 to-fuchsia-500" },
  { icon: Heart, title: "ادعمي مريضة", desc: "زوري مصابة، اسألي عن حالها، وقدمي مساعدة عملية.", color: "from-rose-500 to-orange-400" },
  { icon: BookOpen, title: "شاركي مقالاً", desc: "انشري مقالاً توعوياً موثوقاً بين صديقاتك.", color: "from-teal-500 to-cyan-500" },
  { icon: Music, title: "حفلة توعية", desc: "نظمي فعالية صغيرة في العمل أو الحي للتوعية.", color: "from-amber-500 to-yellow-400" },
  { icon: Gift, title: "تبرعي", desc: "ادعمي جمعية محلية تعنى بالتوعية أو دعم المصابات.", color: "from-indigo-500 to-purple-500" },
];

export default function ShareIdeas() {
  const [done, setDone] = useState<number[]>([]);

  const toggle = (i: number) => {
    setDone((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {ideas.map((idea, i) => {
          const Icon = idea.icon;
          const isDone = done.includes(i);
          return (
            <motion.button
              key={idea.title}
              onClick={() => toggle(i)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`relative text-right bg-white rounded-2xl p-6 shadow-md hover:shadow-xl border-2 transition-all ${
                isDone ? "border-green-500 bg-green-50" : "border-gray-100 hover:border-pink-300"
              }`}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${idea.color} text-white mb-4 shadow-lg`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{idea.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{idea.desc}</p>
              {isDone && (
                <span className="absolute top-3 left-3 w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold">
                  ✓
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
      <div className="mt-6 bg-pink-50 border-r-4 border-pink-400 p-4 rounded-xl text-center">
        <p className="text-sm font-semibold text-pink-900">
          {done.length} من {ideas.length} أفكار جاهزة للمشاركة
        </p>
      </div>
    </div>
  );
}