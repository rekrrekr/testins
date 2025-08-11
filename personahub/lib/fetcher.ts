import { z } from 'zod';

export async function getJson<T>(input: RequestInfo | URL, init?: RequestInit, schema?: z.ZodType<T>) {
  const res = await fetch(input, init);
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  return schema ? schema.parse(data) : (data as T);
}

export async function postJson<T>(
  input: RequestInfo | URL,
  body: unknown,
  schema?: z.ZodType<T>,
  init?: RequestInit,
) {
  const res = await fetch(input, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    ...init,
  });
  if (!res.ok) throw new Error(await res.text());
  const data = await res.json();
  return schema ? schema.parse(data) : (data as T);
}