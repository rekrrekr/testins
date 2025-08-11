import Link from 'next/link';

export default function Page() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white/95">
            Your digital friend repository
          </h1>
          <p className="mt-4 max-w-2xl text-white/70">
            Browse community personas, create your own, and chat. Fast, minimal, and beautiful.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/explore"
              className="bloom-hover rounded-lg md:rounded-[var(--radius-lg)] bg-white/10 px-5 py-2.5 text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-teal/60"
            >
              Explore
            </Link>
            <Link
              href="/create"
              className="bloom-hover rounded-lg md:rounded-[var(--radius-lg)] bg-electric-teal/20 px-5 py-2.5 text-electric-teal hover:bg-electric-teal/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-teal/60"
            >
              Create
            </Link>
            <Link
              href="/api/auth/signin"
              className="bloom-hover rounded-lg md:rounded-[var(--radius-lg)] bg-white/5 px-5 py-2.5 text-white/90 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-teal/60"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Explore personas',
              desc: 'Discover trending personas from the community with rich tags and stats.',
            },
            { title: 'Create your own', desc: 'Craft tone, bio, and tags with a live preview.' },
            { title: 'Chat instantly', desc: 'Streamed responses with a lightweight chat UI.' },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[var(--radius-md)] border border-white/10 bg-gunmetal/50 p-5 transition-colors hover:bg-gunmetal/60"
            >
              <h3 className="swoosh-underline text-white/90 font-medium">{item.title}</h3>
              <p className="mt-2 text-white/60 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}