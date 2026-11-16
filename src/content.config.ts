import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** YAML 会把 2026-13-45 解析成溢出日期，所以这里同时校验格式和日历真实性 */
function isRealDate(value: string): boolean {
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

const dateField = z
  .string()
  .regex(DATE_RE, 'date 必须写成带引号的 "YYYY-MM-DD"')
  .refine(isRealDate, 'date 不是一个真实存在的日期');

const posts = defineCollection({
  loader: glob({
    base: './src/content/posts',
    pattern: '**/index.md',
    generateId: ({ entry }) => entry.replace(/\/?index\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    date: dateField,
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.md' }),
  schema: z.object({ title: z.string() }),
});

export const collections = { posts, pages };
