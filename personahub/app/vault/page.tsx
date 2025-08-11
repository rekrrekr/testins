export default async function VaultPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-6">
      <h1 className="text-2xl font-semibold text-white/90">Your Vault</h1>

      <section>
        <h2 className="text-white/80">Saved personas</h2>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="rounded-[var(--radius-md)] border border-white/10 bg-gunmetal/50 p-4">
              <div className="flex items-start justify-between">
                <div className="text-white/90">Saved Persona {i + 1}</div>
                <button className="text-xs text-white/50 hover:text-white/80">Remove</button>
              </div>
              <p className="mt-2 text-white/60 text-sm">Short description here.</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-white/80">Pinned chats</h2>
        <div className="mt-3 space-y-2">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="rounded-[var(--radius-md)] border border-white/10 bg-gunmetal/50 p-4">
              <div className="flex items-center justify-between">
                <div className="text-white/90">Chat with Persona {i + 1}</div>
                <button className="text-xs text-white/50 hover:text-white/80">Open</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}