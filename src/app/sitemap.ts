import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://anbu-aiportfolio.vercel.app'; // Change to actual production URL if different

  // Define all static routes
  const routes = [
    '',
    '/projects',
    '/me',
    '/skills',
    '/contact',
    '/fun'
  ];

  const sitemapEntries = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  return sitemapEntries;
}
