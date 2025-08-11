"use client";
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { personaCreateSchema } from '@/lib/validators';
import { z } from 'zod';

type FormValues = z.input<typeof personaCreateSchema>;

export default function CreatePersonaPage() {
  const [step, setStep] = useState(1);
  const form = useForm<FormValues>({
    resolver: zodResolver(personaCreateSchema),
    defaultValues: { name: '', bio: '', tags: [], visibility: 'PUBLIC', flagged: false },
    mode: 'onChange',
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
    // TODO: POST to /api/personas then redirect
  };

  const tags = form.watch('tags');

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 grid md:grid-cols-2 gap-6">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-[var(--radius-md)] border border-white/10 bg-gunmetal/50 p-5"
      >
        <h1 className="text-xl font-semibold text-white/90">Create persona</h1>

        {step === 1 && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="text-sm text-white/70">Name</label>
              <input
                {...form.register('name')}
                className="mt-1 w-full rounded-[var(--radius-md)] bg-white/5 px-3 py-2 text-sm outline-none border border-white/10 focus:border-electric-teal/40"
              />
            </div>
            <div>
              <label className="text-sm text-white/70">Short bio</label>
              <textarea
                {...form.register('bio')}
                rows={4}
                className="mt-1 w-full rounded-[var(--radius-md)] bg-white/5 px-3 py-2 text-sm outline-none border border-white/10 focus:border-electric-teal/40"
              />
            </div>
            <div>
              <label className="text-sm text-white/70">Tags (comma separated)</label>
              <input
                onChange={(e) =>
                  form.setValue(
                    'tags',
                    e.target.value
                      .split(',')
                      .map((t) => t.trim())
                      .filter(Boolean),
                  )
                }
                className="mt-1 w-full rounded-[var(--radius-md)] bg-white/5 px-3 py-2 text-sm outline-none border border-white/10 focus:border-electric-teal/40"
              />
              <div className="mt-2 flex flex-wrap gap-2">
                {tags?.map((t) => (
                  <span key={t} className="rounded-full bg-white/5 px-2 py-1 text-xs text-white/60">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="mt-4 space-y-4">
            <div>
              <label className="text-sm text-white/70">Visibility</label>
              <select
                {...form.register('visibility')}
                className="mt-1 w-full rounded-[var(--radius-md)] bg-white/5 px-3 py-2 text-sm outline-none border border-white/10 focus:border-electric-teal/40"
              >
                <option value="PUBLIC">Public</option>
                <option value="PRIVATE">Private</option>
              </select>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-between">
          <button
            type="button"
            disabled={step === 1}
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            className="rounded-[var(--radius-md)] bg-white/10 px-4 py-2 text-sm disabled:opacity-50"
          >
            Back
          </button>
          {step < 2 ? (
            <button
              type="button"
              onClick={() => setStep(2)}
              className="rounded-[var(--radius-md)] bg-white/10 px-4 py-2 text-sm"
            >
              Next
            </button>
          ) : (
            <button type="submit" className="rounded-[var(--radius-lg)] bg-electric-teal/20 px-4 py-2 text-electric-teal">
              Create
            </button>
          )}
        </div>
      </form>

      <div className="rounded-[var(--radius-md)] border border-white/10 bg-gunmetal/50 p-5">
        <h2 className="text-sm text-white/70">Preview</h2>
        <div className="mt-3">
          <div className="rounded-[var(--radius-md)] border border-white/10 bg-gunmetal/60 p-4">
            <h3 className="text-white/90 font-medium">{form.watch('name') || 'Persona name'}</h3>
            <p className="mt-1 text-white/60 text-sm">
              {form.watch('bio') || 'Short bio preview goes here.'}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {tags?.length ? (
                tags.map((t) => (
                  <span key={t} className="rounded-full bg-white/5 px-2 py-1 text-xs text-white/60">
                    {t}
                  </span>
                ))
              ) : (
                <span className="text-xs text-white/50">No tags yet</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}