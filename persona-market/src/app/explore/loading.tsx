export default function Loading() {
  return (
    <div className="container pt-28 pb-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-[var(--radius-lg)] glass-surface p-6 animate-pulse">
          <div className="h-5 w-1/2 bg-muted rounded mb-4" />
          <div className="h-3 w-3/4 bg-muted rounded" />
        </div>
      ))}
    </div>
  )
}