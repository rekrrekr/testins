import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container pt-28 pb-16 text-center">
      <h1 className="text-3xl font-semibold">Not found</h1>
      <p className="text-muted-foreground mt-2">The page you are looking for does not exist.</p>
      <Link className="inline-block mt-6 px-4 py-2 rounded-[var(--radius-sm)] bg-primary text-primary-foreground" href="/">Go home</Link>
    </div>
  )
}