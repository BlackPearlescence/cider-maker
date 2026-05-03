import { prisma } from "@/prisma/prisma";
import { AppleCard } from "./components/AppleCard";
import { FilterBar } from "./components/FilterBar";
import { AppleCategory } from "@prisma/client";

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

  const brixMax = resolvedSearchParams?.brixMax ?? null;

  const tanninMin = resolvedSearchParams?.tanninMin ?? null;
  const tanninMax = resolvedSearchParams?.tanninMax ?? null;

  const phMin = resolvedSearchParams?.phMin ?? null;
  const phMax = resolvedSearchParams?.phMax ?? null;

  const tanninFilter: { min?: number; max?: number } = {};
  if (tanninMin != null) tanninFilter.min = tanninMin;
  if (tanninMax != null) tanninFilter.max = tanninMax;

  const phFilter: { min?: number; max?: number } = {};
  if (phMin != null) phFilter.min = phMin;
  if (phMax != null) phFilter.max = phMax;

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
        validBrixMin !== undefined ? { brix: { gte: validBrixMin } } : {},
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
      <header className="mb-12 border-b border-[#2d5a27]/20 pb-6">
        <h1 className="text-4xl font-serif font-bold">Ciderina</h1>
        <p className="text-sm uppercase tracking-widest opacity-70">
          Pomological Database & Blender
        </p>
      </header>

      <FilterBar />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {apples.map((apple) => (
          <AppleCard
            key={apple.id}
            appleName={apple.name}
            appleSpecies={apple.species}
            appleCategory={apple.category}
            appleImage={apple.imageUrl || "https://placehold.co/600x400"}
            appleFlavor={apple.flavor.name}
          />
        ))}
      </div>
    </main>
  );
}
