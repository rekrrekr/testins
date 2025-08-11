export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 animate-pulse">
      <div className="h-8 w-1/2 rounded bg-white/10" />
      <div className="mt-4 space-y-2">
        <div className="h-4 w-3/4 rounded bg-white/10" />
        <div className="h-4 w-2/3 rounded bg-white/10" />
      </div>
    </div>
  );
}