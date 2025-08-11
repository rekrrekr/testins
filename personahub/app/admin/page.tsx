export default async function AdminPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-white/90">Admin (stub)</h1>
      <p className="mt-2 text-white/60 text-sm">Read-only moderation queue: flagged personas</p>
      <div className="mt-6 space-y-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-[var(--radius-md)] border border-red-500/20 bg-red-500/10 p-4 text-sm">
            <div className="text-white/90">Flagged Persona {i + 1}</div>
            <p className="text-white/60">Reason: auto-flagged during creation (stub)</p>
          </div>
        ))}
      </div>
    </div>
  );
}