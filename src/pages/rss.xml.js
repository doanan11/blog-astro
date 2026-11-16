import rss from '@astrojs/rss';
import { getPublishedPosts } from '../lib/posts';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
  const posts = await getPublishedPosts();
  const base = import.meta.env.BASE_URL;

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    // site 必须带 base 前缀，否则订阅里的链接会指向根路径
    site: new URL(base, context.site ?? 'https://example.com'),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description ?? '',
      pubDate: new Date(`${post.data.date}T00:00:00+08:00`),
      link: `${base}posts/${post.id}/`,
    })),
  });
}
