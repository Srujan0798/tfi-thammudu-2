'use client';

import Image from 'next/image';
import FollowButton from '@/components/social/FollowButton';
import { MapPin, Calendar, Share2, Settings } from 'lucide-react';
import Link from 'next/link';
import VerificationBadge from '@/components/social/VerificationBadge';

interface ProfileHeaderProps {
    user: {
        id: string;
        name: string;
        username: string;
        avatarUrl?: string;
        bio?: string;
        location?: string;
        joinDate: string;
        stats: {
            followers: number;
            following: number;
            events: number;
        };
    };
    isOwnProfile?: boolean;
}

export default function ProfileHeader({ user, isOwnProfile = false }: ProfileHeaderProps) {
    return (
        <div className="relative">
            {/* Banner */}
            <div className="h-48 md:h-64 bg-gradient-to-r from-purple-900 via-blue-900 to-slate-900 w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-20">
                <div className="flex flex-col md:flex-row items-start gap-6">
                    {/* Avatar */}
                    <div className="relative">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-black bg-slate-800 overflow-hidden relative shadow-2xl">
                            {user.avatarUrl ? (
                                <Image
                                    src={user.avatarUrl}
                                    alt={user.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-white/20">
                                    {user.name.charAt(0)}
                                </div>
                            )}
                        </div>
                        {isOwnProfile && (
                            <Link
                                href="/profile/settings"
                                className="absolute bottom-2 right-2 p-2 bg-slate-800 rounded-full border border-white/10 text-white hover:bg-slate-700 transition-colors"
                            >
                                <Settings className="w-4 h-4" />
                            </Link>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 pt-2 md:pt-20">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                            {/* ... */}

                            <div>
                                <p className="text-gray-400 text-sm mt-1">{user.bio || "No bio yet. Let&apos;s change that!"}</p>
                                <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                                    {user.name}
                                    {/* Mock verification check */}
                                    {user.username === 'mass_raja_fan' && <VerificationBadge size="lg" />}
                                </h1>
                                <p className="text-white/60">@{user.username}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                {!isOwnProfile && (
                                    <FollowButton targetUserId={user.id} />
                                )}
                                <button className="p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors">
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Bio & Details */}
                        <div className="mt-4 space-y-4">
                            {user.bio && (
                                <p className="text-white/80 max-w-2xl leading-relaxed">
                                    {user.bio}
                                </p>
                            )}

                            <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
                                {user.location && (
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-4 h-4" />
                                        <span>{user.location}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>Joined {user.joinDate}</span>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="flex items-center gap-6 py-4 border-t border-white/10 mt-4">
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold text-white">{user.stats.events}</span>
                                    <span className="text-xs text-white/50 uppercase tracking-wider">Events</span>
                                </div>
                                <div className="flex flex-col cursor-pointer hover:opacity-80 transition-opacity">
                                    <span className="text-xl font-bold text-white">{user.stats.followers}</span>
                                    <span className="text-xs text-white/50 uppercase tracking-wider">Followers</span>
                                </div>
                                <div className="flex flex-col cursor-pointer hover:opacity-80 transition-opacity">
                                    <span className="text-xl font-bold text-white">{user.stats.following}</span>
                                    <span className="text-xs text-white/50 uppercase tracking-wider">Following</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
