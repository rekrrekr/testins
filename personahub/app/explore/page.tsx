import Link from 'next/link';

async function getPersonas() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/personas`, {
    cache: 'no-store',
  });
  if (!res.ok) return { items: [] };
  return res.json();
}

export default async function ExplorePage() {
  const data = await getPersonas();
  const items: Array<{ id: string; name: string; bio: string; tagsCsv: string; heat: number }> =
    data.items || [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h1 className="text-2xl font-semibold text-white/90">Explore personas</h1>
        <div className="flex gap-2">
          <input
            placeholder="Search personas..."
            className="rounded-[var(--radius-md)] bg-white/5 px-3 py-2 text-sm outline-none border border-white/10 focus:border-electric-teal/40"
          />
          <select className="rounded-[var(--radius-md)] bg-white/5 px-3 py-2 text-sm outline-none border border-white/10 focus:border-electric-teal/40">
            <option value="popular">Popular</option>
            <option value="new">New</option>
          </select>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((p) => (
          <Link
            key={p.id}
            href={`/persona/${p.id}`}
            className="group rounded-[var(--radius-md)] border border-white/10 bg-gunmetal/50 p-5 hover:bg-gunmetal/60 transition-colors"
          >
            <div className="flex items-start justify-between">
              <h3 className="swoosh-underline text-white/90 font-medium group-hover:text-white">{p.name}</h3>
              <span className="text-xs text-white/50">🔥 {p.heat}</span>
            </div>
            <p className="mt-2 text-sm text-white/60 line-clamp-2">{p.bio}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tagsCsv
                ?.split(',')
                .filter(Boolean)
                .slice(0, 3)
                .map((t) => (
                  <span key={t} className="rounded-full bg-white/5 px-2 py-1 text-xs text-white/60">
                    {t}
                  </span>
                ))}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <button className="bloom-hover rounded-[var(--radius-md)] bg-white/10 px-4 py-2 text-sm">
          Load more
        </button>
      </div>
    </div>
  );
}