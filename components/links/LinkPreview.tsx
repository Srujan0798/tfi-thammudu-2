import { ExternalLink, Youtube, Instagram, Twitter, Music, Film } from 'lucide-react';

interface LinkPreviewProps {
    platform: string;
    url: string;
    title?: string;
    thumbnailUrl?: string;
}

const platformConfig = {
    youtube: {
        icon: Youtube,
        color: 'bg-red-500',
        name: 'YouTube',
    },
    instagram: {
        icon: Instagram,
        color: 'bg-pink-500',
        name: 'Instagram',
    },
    twitter: {
        icon: Twitter,
        color: 'bg-blue-500',
        name: 'Twitter/X',
    },
    spotify: {
        icon: Music,
        color: 'bg-green-500',
        name: 'Spotify',
    },
    bookmyshow: {
        icon: Film,
        color: 'bg-orange-500',
        name: 'BookMyShow',
    },
    custom: {
        icon: ExternalLink,
        color: 'bg-gray-500',
        name: 'Link',
    },
};

export default function LinkPreview({ platform, url, title, thumbnailUrl }: LinkPreviewProps) {
    const config = platformConfig[platform as keyof typeof platformConfig] || platformConfig.custom;
    const Icon = config.icon;

    // Extract video ID for YouTube embeds
    const getYouTubeEmbedUrl = (url: string) => {
        const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
        return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : null;
    };

    const youtubeEmbedUrl = platform === 'youtube' ? getYouTubeEmbedUrl(url) : null;

    return (
        <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:border-white/30 transition-colors">
            {/* YouTube Embed */}
            {youtubeEmbedUrl && (
                <div className="aspect-video">
                    <iframe
                        src={youtubeEmbedUrl}
                        title={title || 'YouTube video'}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            )}

            {/* Thumbnail for other platforms */}
            {!youtubeEmbedUrl && thumbnailUrl && (
                <div className="aspect-video bg-black/50 flex items-center justify-center">
                    <img src={thumbnailUrl} alt={title || 'Preview'} className="w-full h-full object-cover" />
                </div>
            )}

            {/* Link Info */}
            <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                    <div className={`${config.color} p-1.5 rounded`}>
                        <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs text-gray-400">{config.name}</span>
                </div>

                {title && (
                    <h4 className="text-white font-semibold mb-2 line-clamp-2">{title}</h4>
                )}

                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 break-all"
                >
                    <span className="line-clamp-1">{url}</span>
                    <ExternalLink className="w-3 h-3 flex-shrink-0" />
                </a>
            </div>
        </div>
    );
}
