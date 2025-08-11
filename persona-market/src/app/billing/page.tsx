export default function BillingPage() {
  return (
    <div className="container pt-28 pb-16">
      <h1 className="text-2xl font-semibold">Billing</h1>
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="rounded-[var(--radius-lg)] glass-surface p-6">
          <h2 className="font-medium">Starter</h2>
          <p className="text-sm text-muted-foreground">Free to explore</p>
        </div>
        <div className="rounded-[var(--radius-lg)] glass-surface p-6">
          <h2 className="font-medium">Pro</h2>
          <p className="text-sm text-muted-foreground">Unlock premium personas</p>
        </div>
      </div>
    </div>
  )
}