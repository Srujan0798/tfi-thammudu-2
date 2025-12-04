'use client';

import { useState } from 'react';
import { User, Heart, Calendar, Settings, LogOut, Edit } from 'lucide-react';
import Link from 'next/link';

// Mock user data
const mockUser = {
    id: '1',
    username: 'tfi_fan_2024',
    fullName: 'Ravi Kumar',
    avatarUrl: null,
    bio: 'Hardcore TFI fan! Power Star Pawan Kalyan forever! 🔥',
    isCreator: false,
    isVerified: false,
    favoriteHeroes: ['Pawan Kalyan', 'Prabhas', 'Mahesh Babu'],
    favoriteDirectors: ['Rajamouli', 'Trivikram'],
    totalEvents: 47,
    publicEvents: 12,
    syncedCalendars: 5,
};

export default function ProfilePage() {
    const [user] = useState(mockUser);
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
            {/* Header */}
            <header className="bg-black/30 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <Link href="/calendar" className="text-gray-400 hover:text-white transition-colors">
                        ← Back to Calendar
                    </Link>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Profile Header */}
                <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10 p-8 mb-8">
                    <div className="flex items-start gap-6">
                        {/* Avatar */}
                        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-4xl font-bold text-black">
                            {user.fullName.charAt(0)}
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl font-bold text-white">{user.fullName}</h1>
                                {user.isVerified && (
                                    <span className="px-3 py-1 bg-blue-500 text-white text-xs rounded-full">
                                        Verified
                                    </span>
                                )}
                                {user.isCreator && (
                                    <span className="px-3 py-1 bg-purple-500 text-white text-xs rounded-full">
                                        Creator
                                    </span>
                                )}
                            </div>
                            <p className="text-gray-400 mb-4">@{user.username}</p>
                            <p className="text-white mb-6">{user.bio}</p>

                            {/* Stats */}
                            <div className="flex gap-6 mb-6">
                                <div>
                                    <p className="text-2xl font-bold text-white">{user.totalEvents}</p>
                                    <p className="text-sm text-gray-400">Total Events</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-white">{user.publicEvents}</p>
                                    <p className="text-sm text-gray-400">Public Events</p>
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-white">{user.syncedCalendars}</p>
                                    <p className="text-sm text-gray-400">Synced Calendars</p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg hover:scale-105 transition-transform flex items-center gap-2"
                                >
                                    <Edit className="w-4 h-4" />
                                    Edit Profile
                                </button>
                                <button className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center gap-2">
                                    <Settings className="w-4 h-4" />
                                    Settings
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Favorite Heroes */}
                <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-8">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Heart className="w-5 h-5 text-red-500" />
                        Favorite Heroes
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {user.favoriteHeroes.map((hero) => (
                            <span
                                key={hero}
                                className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-full"
                            >
                                {hero}
                            </span>
                        ))}
                        <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors">
                            + Add Hero
                        </button>
                    </div>
                </div>

                {/* Favorite Directors */}
                <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10 p-6 mb-8">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-blue-500" />
                        Favorite Directors
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {user.favoriteDirectors.map((director) => (
                            <span
                                key={director}
                                className="px-4 py-2 bg-gradient-to-r from-blue-400 to-cyan-500 text-white font-semibold rounded-full"
                            >
                                {director}
                            </span>
                        ))}
                        <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors">
                            + Add Director
                        </button>
                    </div>
                </div>

                {/* Synced Calendars */}
                <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-green-500" />
                        Synced Calendars
                    </h2>
                    <div className="space-y-3">
                        {[
                            { name: 'TFI Updates Official', tags: ['TFI', 'News'] },
                            { name: 'Pawan Kalyan Fans', tags: ['Pawan Kalyan'] },
                            { name: 'Prabhas Army', tags: ['Prabhas'] },
                            { name: 'TFI Memes', tags: ['Entertainment'] },
                            { name: 'Rajamouli Updates', tags: ['Rajamouli'] },
                        ].map((calendar, index) => (
                            <div
                                key={index}
                                className="p-4 bg-white/5 border border-white/10 rounded-lg flex items-center justify-between"
                            >
                                <div>
                                    <p className="text-white font-semibold">{calendar.name}</p>
                                    <div className="flex gap-2 mt-1">
                                        {calendar.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors">
                                    Unsync
                                </button>
                            </div>
                        ))}
                    </div>
                    <Link
                        href="/explore"
                        className="mt-4 block text-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                    >
                        Discover More Creators
                    </Link>
                </div>

                {/* Danger Zone */}
                <div className="mt-8 bg-red-500/10 backdrop-blur-sm rounded-2xl border border-red-500/30 p-6">
                    <h2 className="text-xl font-bold text-red-400 mb-4">Danger Zone</h2>
                    <button className="px-6 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors flex items-center gap-2">
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>
            </main>
        </div>
    );
}
