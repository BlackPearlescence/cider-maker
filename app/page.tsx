import Image from "next/image";
import { prisma } from "@/prisma/prisma";
export default async function Home() {

  const apples = await prisma.cultivar.findMany({
    include: { class: true },
    orderBy: { name: 'asc' }
  });

  // const normalizeImageUrl = (url: string | null | undefined) => {
  //   if (!url) return '/images/placeholder.jpg';
  //   return url.startsWith('/') || url.startsWith('http') ? url : `/${url}`;
  // };

  return (
    <main className="min-h-screen-bg-[#fdfaf5] p-8 text-[#2d5a27]">
      <header className="mb-12 border-b border-[#2d5a27]/20 pb-6">
        <h1 className="text-4xl font-serif font-bold">Ciderina</h1>
        <p className="text-sm uppercase tracking-widest opacity-70">Pomological Database & Blender</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {apples.map((apple) => (
          <div key={apple.id} className="group bg-white border border-[#2d5a27]/10 p-4 hover:border-[#2d5a27]/40 transition-all shadow-sm">
            <div className="relative aspect-square mb-4 overflow-hidden bg=[#f9f9f9]">
              <Image
                src={apple.imageUrl || "https://placehold.co/600x400"}
                alt={apple.name}
                fill
                className="object-contain p-2 group-hover:scale-105 transition-transform"
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
