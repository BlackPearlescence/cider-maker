import { prisma } from "@/prisma/prisma";
import { AppleCard } from "./components/AppleCard";
import { FilterBar } from "./components/FilterBar";
import { AppleCategory } from "@prisma/client";
import { BottomDrawer } from "./components/BottomDrawer";

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<
    | {
        query?: string;
        category?: string;
        flavor?: string;
        brixMin?: string;
        brixMax?: string;
        tanninMin?: string;
        tanninMax?: string;
        phMin?: string;
        phMax?: string;
      }
    | undefined
  >;
}) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams?.query ?? "";
  const category = resolvedSearchParams?.category ?? "";
  const flavor = resolvedSearchParams?.flavor ?? "";

  const rawBrixMin = resolvedSearchParams?.brixMin;
  const brixMin = rawBrixMin ? parseFloat(rawBrixMin) : undefined;
  const validBrixMin = Number.isNaN(brixMin) ? undefined : brixMin;

  const rawBrixMax = resolvedSearchParams?.brixMax;
  const brixMax = rawBrixMax ? parseFloat(rawBrixMax) : undefined;
  const validBrixMax = Number.isNaN(brixMax) ? undefined : brixMax;

  const rawTanninMin = resolvedSearchParams?.tanninMin;
  const tanninMin = rawTanninMin ? parseFloat(rawTanninMin) : undefined;
  const validTanninMin = Number.isNaN(tanninMin) ? undefined : tanninMin;

  const rawTanninMax = resolvedSearchParams?.tanninMax;
  const tanninMax = rawTanninMax ? parseFloat(rawTanninMax) : undefined;
  const validTanninMax = Number.isNaN(tanninMax) ? undefined : tanninMax;

  const rawPhMin = resolvedSearchParams?.phMin;
  const phMin = rawPhMin ? parseFloat(rawPhMin) : undefined;
  const validPhMin = Number.isNaN(phMin) ? undefined : phMin;

  const rawPhMax = resolvedSearchParams?.phMax;
  const phMax = rawPhMax ? parseFloat(rawPhMax) : undefined;
  const validPhMax = Number.isNaN(phMax) ? undefined : phMax;

  const brixFilter: { gte?: number; lte?: number } = {};
  if (validBrixMin !== undefined) brixFilter.gte = validBrixMin;
  if (validBrixMax !== undefined) brixFilter.lte = validBrixMax;

  const tanninFilter: { gte?: number; lte?: number } = {};
  if (validTanninMin !== undefined) tanninFilter.gte = validTanninMin;
  if (validTanninMax !== undefined) tanninFilter.lte = validTanninMax;

  const phFilter: { gte?: number; lte?: number } = {};
  if (validPhMin !== undefined) phFilter.gte = validPhMin;
  if (validPhMax !== undefined) phFilter.lte = validPhMax;

  const apples = await prisma.cultivar.findMany({
    where: {
      AND: [
        {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { origin: { contains: query, mode: "insensitive" } },
          ],
        },
        category ? { category: category as AppleCategory } : {},
        flavor ? { flavor: { name: flavor } } : {},
        Object.keys(brixFilter).length > 0 ? { brix: brixFilter } : {},
        Object.keys(tanninFilter).length > 0 ? { tannin: tanninFilter } : {},
        Object.keys(phFilter).length > 0 ? { ph: phFilter } : {},
      ],
    },
    include: { flavor: true },
    orderBy: { name: "asc" },
  });

  // const normalizeImageUrl = (url: string | null | undefined) => {
  //   if (!url) return '/images/placeholder.jpg';
  //   return url.startsWith('/') || url.startsWith('http') ? url : `/${url}`;
  // };

  return (
    <main className="min-h-screen-bg-[#fdfaf5] p-8 text-[#2d5a27]">
      <header className="mb-12 border-b border-[#2d5a27]/20 pb-8">
        <h1 className="text-4xl font-serif font-bold">Ciderina</h1>
        <p className="text-sm uppercase tracking-widest opacity-70">
          Pomological Database & Blender
        </p>
      </header>

      <FilterBar />

      <div className="pb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {apples.map((apple) => (
          <AppleCard
            key={apple.id}
            appleId={apple.id}
            appleName={apple.name}
            appleSpecies={apple.species}
            appleOrigin={apple.origin}
            appleCategory={apple.category}
            appleImage={apple.imageUrl || "https://placehold.co/600x400"}
            appleFlavor={apple.flavor.name}
            appleBrix={apple.brix}
            appleTannin={apple.tannin}
            applepH={apple.ph}
          />
        ))}
      </div>
      <BottomDrawer />
    </main>
  );
}
