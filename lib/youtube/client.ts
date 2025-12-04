const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeVideo {
    id: string;
    title: string;
    thumbnail: string;
    publishedAt: string;
    channelTitle: string;
}

export async function getChannelVideos(channelId: string, maxResults = 5): Promise<YouTubeVideo[]> {
    if (!YOUTUBE_API_KEY) {
        console.warn('YOUTUBE_API_KEY is not set');
        return [];
    }

    try {
        const response = await fetch(
            `${BASE_URL}/search?key=${YOUTUBE_API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}&type=video`
        );
        const data = await response.json();

        if (!data.items) return [];

        return data.items.map((item: any) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high.url,
            publishedAt: item.snippet.publishedAt,
            channelTitle: item.snippet.channelTitle
        }));
    } catch (error) {
        console.error('YouTube API Error:', error);
        return [];
    }
}

export async function searchVideos(query: string, maxResults = 5): Promise<YouTubeVideo[]> {
    if (!YOUTUBE_API_KEY) return [];

    try {
        const response = await fetch(
            `${BASE_URL}/search?key=${YOUTUBE_API_KEY}&q=${encodeURIComponent(query)}&part=snippet,id&maxResults=${maxResults}&type=video`
        );
        const data = await response.json();

        if (!data.items) return [];

        return data.items.map((item: any) => ({
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high.url,
            publishedAt: item.snippet.publishedAt,
            channelTitle: item.snippet.channelTitle
        }));
    } catch (error) {
        console.error('YouTube Search Error:', error);
        return [];
    }
}
