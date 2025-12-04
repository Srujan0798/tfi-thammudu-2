'use client';

import { useState, useEffect } from 'react';
import { Heart, Camera, MapPin, Star, Calendar, Film, Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface DiaryEntry {
    id: string;
    date: string;
    title: string;
    description: string;
    rating?: number;
    movieName?: string;
    theaterName?: string;
    location?: string;
    watchedWith?: string;
    showType?: string;
    photos?: string[];
}



export default function FanDiaryPage() {
    const [entries, setEntries] = useState<DiaryEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddingEntry, setIsAddingEntry] = useState(false);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const res = await fetch('/api/diary');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setEntries(data);
                }
            } catch (error) {
                console.error('Error fetching diary entries:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEntries();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
            {/* Header */}
            <header className="bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Heart className="w-8 h-8 text-red-400" />
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent">
                                    My TFI Diary
                                </h1>
                                <p className="text-xs text-gray-400">Your personal cinema memories</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setIsAddingEntry(true)}
                                className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg hover:scale-105 transition-transform flex items-center gap-2"
                            >
                                <Plus className="w-5 h-5" />
                                Add Memory
                            </button>
                            <Link
                                href="/calendar"
                                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                            >
                                Back to Calendar
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-xl p-6">
                        <Heart className="w-8 h-8 text-red-400 mb-2" />
                        <p className="text-gray-300 text-sm">Total Memories</p>
                        <p className="text-3xl font-bold text-white">{entries.length}</p>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-6">
                        <Film className="w-8 h-8 text-yellow-400 mb-2" />
                        <p className="text-gray-300 text-sm">Movies Watched</p>
                        <p className="text-3xl font-bold text-white">{entries.length}</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-6">
                        <Star className="w-8 h-8 text-blue-400 mb-2" />
                        <p className="text-gray-300 text-sm">Avg Rating</p>
                        <p className="text-3xl font-bold text-white">
                            {(entries.reduce((sum, e) => sum + (e.rating || 0), 0) / entries.length).toFixed(1)}
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6">
                        <Camera className="w-8 h-8 text-purple-400 mb-2" />
                        <p className="text-gray-300 text-sm">FDFS Shows</p>
                        <p className="text-3xl font-bold text-white">
                            {entries.filter(e => e.showType === 'FDFS').length}
                        </p>
                    </div>
                </div>

                {/* Timeline */}
                <div className="space-y-6">
                    {entries.map((entry) => (
                        <div
                            key={entry.id}
                            className="bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-white/30 transition-all"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Calendar className="w-5 h-5 text-blue-400" />
                                        <span className="text-gray-400 text-sm">
                                            {new Date(entry.date).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{entry.title}</h3>
                                    {entry.movieName && (
                                        <p className="text-yellow-400 font-semibold text-lg mb-2">
                                            🎬 {entry.movieName}
                                        </p>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400">
                                        <Edit className="w-5 h-5" />
                                    </button>
                                    <button className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400">
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            {/* Rating */}
                            {entry.rating && (
                                <div className="flex items-center gap-1 mb-4">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < entry.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                                                }`}
                                        />
                                    ))}
                                    <span className="ml-2 text-white font-semibold">{entry.rating}/5</span>
                                </div>
                            )}

                            {/* Description */}
                            <p className="text-gray-300 mb-4">{entry.description}</p>

                            {/* Details */}
                            <div className="grid md:grid-cols-2 gap-3 mb-4">
                                {entry.theaterName && (
                                    <div className="bg-white/5 rounded-lg p-3 flex items-center gap-2">
                                        <Film className="w-4 h-4 text-purple-400" />
                                        <div>
                                            <p className="text-xs text-gray-400">Theater</p>
                                            <p className="text-white font-semibold">{entry.theaterName}</p>
                                        </div>
                                    </div>
                                )}
                                {entry.location && (
                                    <div className="bg-white/5 rounded-lg p-3 flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-green-400" />
                                        <div>
                                            <p className="text-xs text-gray-400">Location</p>
                                            <p className="text-white font-semibold">{entry.location}</p>
                                        </div>
                                    </div>
                                )}
                                {entry.watchedWith && (
                                    <div className="bg-white/5 rounded-lg p-3 flex items-center gap-2">
                                        <Heart className="w-4 h-4 text-red-400" />
                                        <div>
                                            <p className="text-xs text-gray-400">Watched With</p>
                                            <p className="text-white font-semibold">{entry.watchedWith}</p>
                                        </div>
                                    </div>
                                )}
                                {entry.showType && (
                                    <div className="bg-white/5 rounded-lg p-3 flex items-center gap-2">
                                        <Star className="w-4 h-4 text-yellow-400" />
                                        <div>
                                            <p className="text-xs text-gray-400">Show Type</p>
                                            <p className="text-white font-semibold">{entry.showType}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Photos Placeholder */}
                            {entry.photos && entry.photos.length > 0 && (
                                <div className="flex gap-2">
                                    {entry.photos.map((photo, index) => (
                                        <div
                                            key={index}
                                            className="w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center"
                                        >
                                            <Camera className="w-8 h-8 text-white/30" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {entries.length === 0 && (
                    <div className="text-center py-12">
                        <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg mb-4">No memories yet!</p>
                        <button
                            onClick={() => setIsAddingEntry(true)}
                            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg hover:scale-105 transition-transform"
                        >
                            Add Your First Memory
                        </button>
                    </div>
                )}

                {/* Info Box */}
                <div className="mt-12 bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/30 rounded-2xl p-6">
                    <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                        <Heart className="w-5 h-5 text-red-400" />
                        Your TFI Journey
                    </h3>
                    <p className="text-gray-300">
                        Preserve your cinema memories forever! Add photos, ratings, and notes about every movie you watch.
                        Track your FDFS shows, special celebrations, and favorite moments. Your personal TFI timeline!
                    </p>
                </div>
            </main>
        </div>
    );
}
