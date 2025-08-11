import { z } from 'zod';

export const personaCreateSchema = z.object({
  name: z.string().min(2).max(60),
  bio: z.string().min(10).max(300),
  tags: z.array(z.string().min(1)).max(8).default([]),
  visibility: z.enum(['PUBLIC', 'PRIVATE']).default('PUBLIC'),
  flagged: z.boolean().default(false),
});
export type PersonaCreateInput = z.infer<typeof personaCreateSchema>;

export const personasQuerySchema = z.object({
  q: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(50).default(12),
  sort: z.enum(['new', 'popular']).default('popular'),
  flagged: z.coerce.boolean().optional(),
});
export type PersonasQuery = z.infer<typeof personasQuerySchema>;

export const chatMessageSchema = z.object({
  chatId: z.string().optional(),
  personaId: z.string(),
  content: z.string().min(1).max(2000),
});
export type ChatMessageInput = z.infer<typeof chatMessageSchema>;