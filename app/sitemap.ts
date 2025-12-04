import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://tfi-timeline.com';

    // Static routes
    const routes = [
        '',
        '/calendar',
        '/timeline',
        '/festivals',
        '/rereleases',
        '/live',
        '/channels',
        '/store',
        '/leaderboard',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    return routes;
}
