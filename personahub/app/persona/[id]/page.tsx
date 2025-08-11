import Link from 'next/link';

type Params = { params: { id: string } };

async function getPersona(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/personas/${id}`, {
    cache: 'no-store',
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function PersonaDetailPage({ params }: Params) {
  const persona = await getPersona(params.id);
  if (!persona) return <div className="mx-auto max-w-3xl px-4 py-10">Not found</div>;
  const tags = (persona.tagsCsv as string)?.split(',').filter(Boolean) || [];
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-white/90">{persona.name}</h1>
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((t: string) => (
              <span key={t} className="rounded-full bg-white/5 px-2 py-1 text-xs text-white/60">
                {t}
              </span>
            ))}
          </div>
          <p className="mt-3 text-white/70">Created by @user</p>
        </div>
        <Link
          href={`/chat/${persona.id}`}
          className="bloom-hover rounded-[var(--radius-lg)] bg-electric-teal/20 px-4 py-2 text-electric-teal"
        >
          Chat
        </Link>
      </div>

      <div className="mt-4 text-white/80">
        <p>{persona.bio}</p>
      </div>

      <div className="mt-8">
        <div className="flex gap-4 border-b border-white/10 text-sm">
          {['Overview', 'Stats', 'Changelog'].map((t) => (
            <button key={t} className="px-2 py-2 text-white/70 hover:text-white">
              {t}
            </button>
          ))}
        </div>
        <div className="mt-4 text-white/80">
          <p>Stats and Changelog are stubbed for MVP.</p>
        </div>
      </div>

      <div className="mt-8 flex gap-2">
        <button className="rounded-[var(--radius-md)] bg-white/10 px-3 py-2 text-sm">Save to vault</button>
      </div>
    </div>
  );
}