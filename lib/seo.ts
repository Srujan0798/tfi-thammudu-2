import { Metadata } from 'next';

interface SEOProps {
    title: string;
    description: string;
    image?: string;
    type?: 'website' | 'article';
    path: string;
}

export function generateSEO({ title, description, image, type = 'website', path }: SEOProps): Metadata {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://tfi-timeline.com';
    const fullUrl = `${baseUrl}${path}`;
    const imageUrl = image ? `${baseUrl}${image}` : `${baseUrl}/og-image.jpg`;

    return {
        title: `${title} | TFI Timeline`,
        description,
        openGraph: {
            title,
            description,
            url: fullUrl,
            siteName: 'TFI Timeline',
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: 'en_US',
            type,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [imageUrl],
            creator: '@tfi_timeline',
        },
        alternates: {
            canonical: fullUrl,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}
