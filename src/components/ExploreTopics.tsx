// components/ExploreTopics.tsx
import { Grid2X2, Percent, Sparkles, MoreHorizontal } from "lucide-react";

export default function ExploreTopics() {
  const topics = [
    { icon: <Grid2X2 className="w-6 h-6" />, label: "Tất cả" },
    { icon: <Percent className="w-6 h-6" />, label: "Sale" },
    { icon: <Sparkles className="w-6 h-6" />, label: "Mới" },
    { icon: <MoreHorizontal className="w-6 h-6" />, label: "Khác" },
  ];

  return (
    <section className="bg-black text-white px-6 py-10">
      <h2 className="text-yellow-400 text-xl font-bold mb-6">KHÁM PHÁ THEO CHỦ ĐỀ</h2>
      <div className="flex flex-col gap-6">
        {topics.map((item, idx) => (
          <div key={idx} className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform">
            {item.icon}
          </div>
        ))}
      </div>
    </section>
  );
}
