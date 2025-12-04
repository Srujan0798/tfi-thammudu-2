/**
 * Parse and extract metadata from various social media and platform URLs
 */

export interface LinkMetadata {
    platform: 'youtube' | 'instagram' | 'twitter' | 'spotify' | 'bookmyshow' | 'custom';
    url: string;
    title?: string;
    thumbnailUrl?: string;
    videoId?: string;
    postId?: string;
}

export function parseLinkUrl(url: string): LinkMetadata {
    const metadata: LinkMetadata = {
        platform: 'custom',
        url,
    };

    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname.toLowerCase();

        // YouTube
        if (hostname.includes('youtube.com') || hostname.includes('youtu.be')) {
            metadata.platform = 'youtube';

            // Extract video ID
            if (hostname.includes('youtube.com')) {
                const videoId = urlObj.searchParams.get('v');
                if (videoId) {
                    metadata.videoId = videoId;
                    metadata.thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
                }
            } else if (hostname.includes('youtu.be')) {
                const videoId = urlObj.pathname.slice(1);
                if (videoId) {
                    metadata.videoId = videoId;
                    metadata.thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
                }
            }
        }

        // Instagram
        else if (hostname.includes('instagram.com')) {
            metadata.platform = 'instagram';
            const pathParts = urlObj.pathname.split('/').filter(Boolean);
            if (pathParts[0] === 'p' || pathParts[0] === 'reel') {
                metadata.postId = pathParts[1];
            }
        }

        // Twitter/X
        else if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
            metadata.platform = 'twitter';
            const pathParts = urlObj.pathname.split('/').filter(Boolean);
            if (pathParts[1] === 'status') {
                metadata.postId = pathParts[2];
            }
        }

        // Spotify
        else if (hostname.includes('spotify.com')) {
            metadata.platform = 'spotify';
        }

        // BookMyShow
        else if (hostname.includes('bookmyshow.com')) {
            metadata.platform = 'bookmyshow';
        }

        return metadata;
    } catch (error) {
        console.error('Error parsing URL:', error);
        return metadata;
    }
}

/**
 * Fetch metadata for a URL (title, description, thumbnail)
 * In a real implementation, this would call an API or use Open Graph scraping
 */
export async function fetchLinkMetadata(url: string): Promise<Partial<LinkMetadata>> {
    try {
        const parsed = parseLinkUrl(url);

        // For YouTube, we can get basic info without API
        if (parsed.platform === 'youtube' && parsed.videoId) {
            return {
                ...parsed,
                title: 'YouTube Video',
            };
        }

        // For other platforms, you would typically:
        // 1. Use their official APIs (requires API keys)
        // 2. Use a metadata extraction service
        // 3. Scrape Open Graph tags (server-side only)

        return parsed;
    } catch (error) {
        console.error('Error fetching metadata:', error);
        return { platform: 'custom', url };
    }
}

/**
 * Validate if a URL is from a supported platform
 */
export function isSupportedPlatform(url: string): boolean {
    try {
        const urlObj = new URL(url);
        const hostname = urlObj.hostname.toLowerCase();

        return (
            hostname.includes('youtube.com') ||
            hostname.includes('youtu.be') ||
            hostname.includes('instagram.com') ||
            hostname.includes('twitter.com') ||
            hostname.includes('x.com') ||
            hostname.includes('spotify.com') ||
            hostname.includes('bookmyshow.com')
        );
    } catch {
        return false;
    }
}

/**
 * Get embed URL for supported platforms
 */
export function getEmbedUrl(metadata: LinkMetadata): string | null {
    switch (metadata.platform) {
        case 'youtube':
            return metadata.videoId
                ? `https://www.youtube.com/embed/${metadata.videoId}`
                : null;

        case 'instagram':
            return metadata.postId
                ? `https://www.instagram.com/p/${metadata.postId}/embed`
                : null;

        case 'spotify':
            // Spotify embed URLs need to be constructed from the track/album/playlist ID
            return metadata.url.replace('open.spotify.com', 'open.spotify.com/embed');

        default:
            return null;
    }
}
