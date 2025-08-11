export default async function AccountPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <h1 className="text-2xl font-semibold text-white/90">Account</h1>

      <section className="rounded-[var(--radius-md)] border border-white/10 bg-gunmetal/50 p-5">
        <h2 className="text-white/80">Profile</h2>
        <p className="mt-2 text-sm text-white/60">Signed in as demo@personahub.local</p>
      </section>

      <section className="rounded-[var(--radius-md)] border border-white/10 bg-gunmetal/50 p-5">
        <h2 className="text-white/80">Wallet</h2>
        <p className="mt-2 text-sm text-white/60">Balance: 1500 credits</p>
        <div className="mt-3 flex gap-2">
          <button className="rounded-[var(--radius-md)] bg-white/10 px-4 py-2 text-sm">Buy 1k</button>
          <button className="rounded-[var(--radius-md)] bg-white/10 px-4 py-2 text-sm">Buy 5k</button>
        </div>
      </section>

      <section className="rounded-[var(--radius-md)] border border-white/10 bg-gunmetal/50 p-5">
        <h2 className="text-white/80">Billing</h2>
        <p className="mt-2 text-sm text-white/60">Manage your billing in Stripe (stub)</p>
        <button className="mt-3 rounded-[var(--radius-md)] bg-white/10 px-4 py-2 text-sm">
          Open customer portal
        </button>
      </section>
    </div>
  );
}