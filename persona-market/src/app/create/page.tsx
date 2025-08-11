"use client"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const schema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
  tagline: z.string().min(2),
  description: z.string().min(4),
  tags: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

export default function CreatePersonaPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) })

  async function onSubmit(values: FormValues) {
    setLoading(true)
    const res = await fetch('/api/personas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...values,
        tags: values.tags?.split(',').map((t) => t.trim()).filter(Boolean) ?? [],
        isPublic: true,
      }),
    })
    if (res.ok) {
      const persona = await res.json()
      router.push(`/p/${persona.slug}`)
    }
    setLoading(false)
  }

  return (
    <div className="container pt-28 pb-16">
      <h1 className="text-2xl font-semibold mb-4">Create persona</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-6">
        <div className="rounded-[var(--radius-lg)] glass-surface p-6 space-y-4">
          <div>
            <label className="text-sm">Name</label>
            <input className="mt-1 w-full px-3 py-2 rounded-[var(--radius-sm)] glass-surface" {...register('name')} />
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="text-sm">Slug</label>
            <input className="mt-1 w-full px-3 py-2 rounded-[var(--radius-sm)] glass-surface" {...register('slug')} />
            {errors.slug && <p className="text-xs text-destructive mt-1">{errors.slug.message}</p>}
          </div>
          <div>
            <label className="text-sm">Tagline</label>
            <input className="mt-1 w-full px-3 py-2 rounded-[var(--radius-sm)] glass-surface" {...register('tagline')} />
            {errors.tagline && <p className="text-xs text-destructive mt-1">{errors.tagline.message}</p>}
          </div>
          <div>
            <label className="text-sm">Tags (comma separated)</label>
            <input className="mt-1 w-full px-3 py-2 rounded-[var(--radius-sm)] glass-surface" {...register('tags')} />
          </div>
          <div>
            <label className="text-sm">Description</label>
            <textarea rows={6} className="mt-1 w-full px-3 py-2 rounded-[var(--radius-sm)] glass-surface" {...register('description')} />
            {errors.description && <p className="text-xs text-destructive mt-1">{errors.description.message}</p>}
          </div>
          <button disabled={loading} className="px-4 py-2 rounded-[var(--radius-sm)] bg-primary text-primary-foreground">{loading ? 'Publishing…' : 'Publish'}</button>
        </div>
        <div className="rounded-[var(--radius-lg)] glass-surface p-6">
          <h2 className="font-medium mb-3">Preview</h2>
          <p className="text-sm text-muted-foreground">A quick look at how your persona card will appear.</p>
        </div>
      </form>
    </div>
  )
}