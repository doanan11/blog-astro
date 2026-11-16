import { mkdir, writeFile, access } from 'node:fs/promises';
import path from 'node:path';

const title = process.argv[2];
if (!title) {
  console.error('用法: npm run new -- "文章标题" [--tags 标签1,标签2] [--publish]');
  process.exit(1);
}

const tagsIndex = process.argv.indexOf('--tags');
const tags = tagsIndex > -1 ? (process.argv[tagsIndex + 1] ?? '').split(',').filter(Boolean) : [];
const draft = process.argv.includes('--publish') ? 'false' : 'true';

const today = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Shanghai' }).format(new Date());

function slugify(input) {
  const ascii = input
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return ascii || `post-${Date.now()}`;
}

const slug = slugify(title);
const dir = path.join('src', 'content', 'posts', slug);
const file = path.join(dir, 'index.md');

try {
  await access(file);
  console.error(`已存在同名文章: ${file}`);
  process.exit(1);
} catch {
  // 不存在才继续
}

const frontmatter = [
  '---',
  `title: ${title}`,
  `date: "${today}"`,
  'description: ""',
  tags.length ? `tags:\n${tags.map((tag) => `  - ${tag}`).join('\n')}` : 'tags: []',
  `draft: ${draft}`,
  '---',
  '',
  '在这里写正文。',
  '',
].join('\n');

await mkdir(dir, { recursive: true });
await writeFile(file, frontmatter, 'utf8');

console.log(`已创建: ${file}`);
console.log(draft === 'true' ? '当前是草稿（draft: true），线上不会出现。' : '已设为直接发布。');
