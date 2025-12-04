'use client';

import { useState } from 'react';
import { Users, Star, Calendar, ExternalLink } from 'lucide-react';

// Mock creator data
const creators = [
    {
        id: 1,
        name: 'TFI Updates Official',
        username: '@tfiupdates',
        bio: 'Official TFI news and updates. Never miss a release date!',
        followers: 125000,
        isVerified: true,
        tags: ['TFI', 'News', 'Updates'],
        avatar: '🎬',
    },
    {
        id: 2,
        name: 'Pawan Kalyan Fans',
        username: '@pkfansofficial',
        bio: 'Everything about Power Star Pawan Kalyan. Jai Janasena!',
        followers: 89000,
        isVerified: true,
        tags: ['Pawan Kalyan', 'Power Star'],
        avatar: '⭐',
    },
    {
        id: 3,
        name: 'Prabhas Army',
        username: '@prabhasarmy',
        bio: 'Darling Prabhas fan page. From Baahubali to Salaar!',
        followers: 156000,
        isVerified: true,
        tags: ['Prabhas', 'Rebel Star'],
        avatar: '👑',
    },
    {
        id: 4,
        name: 'Mahesh Babu Core',
        username: '@mbcore',
        bio: 'Superstar Mahesh Babu updates and celebrations',
        followers: 98000,
        isVerified: true,
        tags: ['Mahesh Babu', 'Superstar'],
        avatar: '💫',
    },
    {
        id: 5,
        name: 'TFI Memes',
        username: '@tfimemes',
        bio: 'Best TFI memes and entertainment. Daily updates!',
        followers: 234000,
        isVerified: false,
        tags: ['Memes', 'Entertainment', 'TFI'],
        avatar: '😂',
    },
    {
        id: 6,
        name: 'Rajamouli Updates',
        username: '@rajamouliupdates',
        bio: 'SS Rajamouli projects and updates. RRR to next!',
        followers: 67000,
        isVerified: true,
        tags: ['Rajamouli', 'Director', 'RRR'],
        avatar: '🎥',
    },
];

export default function ExplorePage() {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const filteredCreators = selectedTags.length === 0
        ? creators
        : creators.filter((creator) =>
            creator.tags.some((tag) => selectedTags.includes(tag))
        );

    const allTags = Array.from(new Set(creators.flatMap((c) => c.tags)));

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
            {/* Header */}
            <header className="bg-black/30 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                        Explore TFI Creators
                    </h1>
                    <p className="text-gray-400 mt-2">
                        Discover and sync calendars from your favorite TFI pages and creators
                    </p>
                </div>
            </header>

            {/* Tag Filters */}
            <section className="bg-black/20 backdrop-blur-sm border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <h2 className="text-white font-semibold mb-3">Filter by Tags:</h2>
                    <div className="flex flex-wrap gap-2">
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${selectedTags.includes(tag)
                                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black'
                                        : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                        {selectedTags.length > 0 && (
                            <button
                                onClick={() => setSelectedTags([])}
                                className="px-4 py-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 font-medium"
                            >
                                Clear All
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Creators Grid */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCreators.map((creator) => (
                        <div
                            key={creator.id}
                            className="group bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-yellow-400/50 transition-all duration-300 p-6 hover:scale-105"
                        >
                            {/* Avatar & Name */}
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-3xl">
                                    {creator.avatar}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-white font-bold text-lg">{creator.name}</h3>
                                        {creator.isVerified && (
                                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                        )}
                                    </div>
                                    <p className="text-gray-400 text-sm">{creator.username}</p>
                                </div>
                            </div>

                            {/* Bio */}
                            <p className="text-gray-300 text-sm mb-4">{creator.bio}</p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {creator.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Stats */}
                            <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                                <div className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    <span>{(creator.followers / 1000).toFixed(0)}K followers</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg hover:scale-105 transition-transform">
                                    <Calendar className="w-4 h-4" />
                                    Sync Calendar
                                </button>
                                <button className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors">
                                    <ExternalLink className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredCreators.length === 0 && (
                    <div className="text-center py-20">
                        <Users className="w-20 h-20 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg">No creators found with selected tags</p>
                        <button
                            onClick={() => setSelectedTags([])}
                            className="mt-4 px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg hover:scale-105 transition-transform"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}
