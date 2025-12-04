'use client';

import { Twitter } from 'lucide-react';

interface TweetEmbedProps {
    tweetId: string;
}

export default function TweetEmbed({ tweetId }: TweetEmbedProps) {
    // In a real app, we would use react-twitter-embed or the official widgets.js
    // For now, we'll create a styled placeholder that links to the tweet

    return (
        <div className="bg-slate-900 border border-white/10 rounded-xl p-4 max-w-md">
            <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                    <Twitter className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h4 className="font-bold text-white">TFI Update</h4>
                    <p className="text-xs text-white/50">@TFI_Update</p>
                </div>
            </div>
            <p className="text-white/80 mb-3">
                Official update: The audio launch event is scheduled for next Friday! #TFI #AudioLaunch
            </p>
            <a
                href={`https://twitter.com/x/status/${tweetId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 text-sm hover:underline"
            >
                View on X
            </a>
        </div>
    );
}
