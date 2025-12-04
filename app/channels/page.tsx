'use client';

import { useState, useEffect } from 'react';
import { Building2, Tv, Music, Film, Check, ExternalLink, Calendar } from 'lucide-react';
import Link from 'next/link';
import TimelineSyncModal from '@/components/sync/TimelineSyncModal';

interface OfficialChannel {
    id: string;
    name: string;
    channelType: 'production_house' | 'ott_platform' | 'tv_channel' | 'music_label';
    slug: string;
    logoUrl?: string;
    description: string;
    websiteUrl?: string;
    socialLinks?: {
        twitter?: string;
        instagram?: string;
        youtube?: string;
    };
    isVerified: boolean;
    upcomingEvents: number;
    totalEvents: number;
}



export default function OfficialChannelsPage() {
    const [channels, setChannels] = useState<OfficialChannel[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>('all');
    const [syncModalOpen, setSyncModalOpen] = useState(false);
    const [selectedChannel, setSelectedChannel] = useState<OfficialChannel | null>(null);

    useEffect(() => {
        const fetchChannels = async () => {
            try {
                const res = await fetch(`/api/channels?type=${filter}`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    setChannels(data);
                }
            } catch (error) {
                console.error('Error fetching channels:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchChannels();
    }, [filter]);

    const channelTypes = [
        { value: 'all', label: 'All Channels', icon: Building2 },
        { value: 'production_house', label: 'Production Houses', icon: Film },
        { value: 'ott_platform', label: 'OTT Platforms', icon: Tv },
        { value: 'tv_channel', label: 'TV Channels', icon: Tv },
        { value: 'music_label', label: 'Music Labels', icon: Music },
    ];

    const filteredChannels = channels;

    const getChannelIcon = (type: string) => {
        switch (type) {
            case 'production_house':
                return Film;
            case 'ott_platform':
            case 'tv_channel':
                return Tv;
            case 'music_label':
                return Music;
            default:
                return Building2;
        }
    };

    const getChannelColor = (type: string) => {
        switch (type) {
            case 'production_house':
                return 'from-yellow-500 to-orange-500';
            case 'ott_platform':
                return 'from-purple-500 to-pink-500';
            case 'tv_channel':
                return 'from-blue-500 to-cyan-500';
            case 'music_label':
                return 'from-green-500 to-emerald-500';
            default:
                return 'from-gray-500 to-gray-600';
        }
    };

    const handleSync = (channel: OfficialChannel) => {
        setSelectedChannel({
            ...channel,
            username: channel.slug,
            fullName: channel.name,
            bio: channel.description,
            followerCount: channel.totalEvents * 100, // Mock follower count
            availableTags: ['TFI', 'Official', channel.channelType.replace('_', ' ')],
        } as any);
        setSyncModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
            {/* Header */}
            <header className="bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Building2 className="w-8 h-8 text-blue-400" />
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                                    Official Channels
                                </h1>
                                <p className="text-xs text-gray-400">Production houses, OTT, TV & Music</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filters */}
                <div className="mb-8">
                    <h2 className="text-white font-bold text-lg mb-4">Filter by Type</h2>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                        {channelTypes.map((type) => {
                            const Icon = type.icon;
                            return (
                                <button
                                    key={type.value}
                                    onClick={() => setFilter(type.value)}
                                    className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${filter === type.value
                                        ? 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white scale-105'
                                        : 'bg-white/10 text-white hover:bg-white/20'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    {type.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Channels Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredChannels.map((channel) => {
                        const Icon = getChannelIcon(channel.channelType);
                        return (
                            <div
                                key={channel.id}
                                className="bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-white/30 transition-all"
                            >
                                {/* Channel Header */}
                                <div className="flex items-start gap-4 mb-4">
                                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${getChannelColor(channel.channelType)} flex items-center justify-center`}>
                                        <Icon className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-xl font-bold text-white">{channel.name}</h3>
                                            {channel.isVerified && (
                                                <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full flex items-center gap-1">
                                                    <Check className="w-3 h-3" />
                                                    Official
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-400 capitalize">
                                            {channel.channelType.replace('_', ' ')}
                                        </p>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-gray-300 text-sm mb-4">{channel.description}</p>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div className="bg-white/5 rounded-lg p-3">
                                        <p className="text-gray-400 text-xs">Upcoming</p>
                                        <p className="text-white font-bold text-lg">{channel.upcomingEvents}</p>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-3">
                                        <p className="text-gray-400 text-xs">Total Events</p>
                                        <p className="text-white font-bold text-lg">{channel.totalEvents}</p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    {channel.websiteUrl && (
                                        <a
                                            href={channel.websiteUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center gap-2 text-sm"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            Visit
                                        </a>
                                    )}
                                    <button
                                        onClick={() => handleSync(channel)}
                                        className="flex-1 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-lg font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2 text-sm"
                                    >
                                        <Calendar className="w-4 h-4" />
                                        Sync Calendar
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Info Box */}
                <div className="mt-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-2xl p-6">
                    <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-blue-400" />
                        About Official Channels
                    </h3>
                    <p className="text-gray-300">
                        Sync with official production houses, OTT platforms, TV channels, and music labels to get authentic updates.
                        All channels are verified and provide real-time information about releases, premieres, audio launches, and special events.
                        Your calendar will automatically update when they announce new dates!
                    </p>
                </div>
            </main>

            {/* Sync Modal */}
            {
                selectedChannel && (
                    <TimelineSyncModal
                        isOpen={syncModalOpen}
                        onClose={() => {
                            setSyncModalOpen(false);
                            setSelectedChannel(null);
                        }}
                        creator={selectedChannel as any}
                    />
                )
            }
        </div >
    );
}
