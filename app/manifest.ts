import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'TFI Timeline',
        short_name: 'TFI Timeline',
        description: 'The Ultimate Timeline of Telugu Cinema Events',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#eab308',
        icons: [
            {
                src: '/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
        orientation: 'portrait',
        categories: ['entertainment', 'movies', 'social'],
    };
}
