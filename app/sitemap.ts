import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://docs.fobign.com';
  const now = new Date();

  const routes = [
    '',
    '/quickstart',
    '/authentication',
    '/chat-completions',
    '/claude-messages',
    '/models',
    '/errors',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}

