'use client';

import { useState, useEffect } from 'react';
import { Zap, TrendingUp, Radio, AlertCircle, ExternalLink, Calendar as CalendarIcon } from 'lucide-react';
import Link from 'next/link';

interface LiveUpdate {
    id: string;
    title: string;
    description: string;
    updateType: 'breaking' | 'trending' | 'rumour' | 'confirmed';
    relatedHero?: string;
    relatedMovie?: string;
    sourceUrl?: string;
    imageUrl?: string;
    trendingScore: number;
    createdAt: string;
}



const trendingHashtags = [
    { tag: '#OGOnSep27', count: '45K tweets' },
    { tag: '#Salaar2', count: '32K tweets' },
    { tag: '#MaheshBabuBday', count: '28K tweets' },
    { tag: '#Pushpa2Teaser', count: '89K tweets' },
    { tag: '#TFIUpdates', count: '15K tweets' },
];

export default function TFILivePage() {
    const [updates, setUpdates] = useState<LiveUpdate[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>('all');

    useEffect(() => {
        const fetchUpdates = async () => {
            try {
                const res = await fetch(`/api/live?type=${filter}`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    setUpdates(data);
                }
            } catch (error) {
                console.error('Error fetching live updates:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUpdates();
    }, [filter]);

    const getUpdateColor = (type: string) => {
        switch (type) {
            case 'breaking':
                return 'from-red-500 to-orange-500';
            case 'confirmed':
                return 'from-green-500 to-emerald-500';
            case 'trending':
                return 'from-blue-500 to-cyan-500';
            case 'rumour':
                return 'from-yellow-500 to-amber-500';
            default:
                return 'from-gray-500 to-gray-600';
        }
    };

    const getUpdateIcon = (type: string) => {
        switch (type) {
            case 'breaking':
                return Zap;
            case 'confirmed':
                return CalendarIcon;
            case 'trending':
                return TrendingUp;
            case 'rumour':
                return AlertCircle;
            default:
                return Radio;
        }
    };

    const filteredUpdates = updates;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
            {/* Header */}
            <header className="bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Radio className="w-8 h-8 text-red-500 animate-pulse" />
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
                                    TFI Live
                                </h1>
                                <p className="text-xs text-gray-400">Breaking news & trending updates</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Feed */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Filters */}
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {['all', 'breaking', 'confirmed', 'trending', 'rumour'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setFilter(type)}
                                    className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${filter === type
                                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black'
                                        : 'bg-white/10 text-white hover:bg-white/20'
                                        }`}
                                >
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </button>
                            ))}
                        </div>

                        {/* Live Updates */}
                        <div className="space-y-4">
                            {filteredUpdates.map((update) => {
                                const Icon = getUpdateIcon(update.updateType);
                                return (
                                    <div
                                        key={update.id}
                                        className="bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-white/30 transition-all"
                                    >
                                        {/* Update Header */}
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className={`p-3 rounded-xl bg-gradient-to-r ${getUpdateColor(update.updateType)}`}>
                                                <Icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getUpdateColor(update.updateType)} text-white`}>
                                                        {update.updateType.toUpperCase()}
                                                    </span>
                                                    <span className="text-gray-400 text-sm">{update.createdAt}</span>
                                                </div>
                                                <h3 className="text-xl font-bold text-white mb-2">{update.title}</h3>
                                                <p className="text-gray-300">{update.description}</p>
                                            </div>
                                        </div>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {update.relatedHero && (
                                                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">
                                                    {update.relatedHero}
                                                </span>
                                            )}
                                            {update.relatedMovie && (
                                                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                                                    {update.relatedMovie}
                                                </span>
                                            )}
                                            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm flex items-center gap-1">
                                                <TrendingUp className="w-3 h-3" />
                                                {update.trendingScore.toLocaleString()} engagements
                                            </span>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-3">
                                            {update.sourceUrl && (
                                                <a
                                                    href={update.sourceUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center gap-2 text-sm"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                    View Source
                                                </a>
                                            )}
                                            <button className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-lg font-semibold hover:scale-105 transition-transform text-sm">
                                                Add to Calendar
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Trending Hashtags */}
                        <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-yellow-400" />
                                Trending Now
                            </h3>
                            <div className="space-y-3">
                                {trendingHashtags.map((item, index) => (
                                    <div
                                        key={index}
                                        className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                                    >
                                        <p className="text-blue-400 font-semibold">{item.tag}</p>
                                        <p className="text-gray-400 text-sm">{item.count}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Live Stats */}
                        <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-2xl p-6">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Radio className="w-5 h-5 text-red-400 animate-pulse" />
                                Live Stats
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-gray-300 text-sm">Active Updates</p>
                                    <p className="text-3xl font-bold text-white">{updates.length}</p>
                                </div>
                                <div>
                                    <p className="text-gray-300 text-sm">Total Engagement</p>
                                    <p className="text-3xl font-bold text-white">
                                        {updates.reduce((sum, u) => sum + u.trendingScore, 0).toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-300 text-sm">Last Updated</p>
                                    <p className="text-lg font-semibold text-white">Just now</p>
                                </div>
                            </div>
                        </div>

                        {/* AI Assistant Tip */}
                        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-6">
                            <h3 className="text-white font-bold mb-2">💡 Pro Tip</h3>
                            <p className="text-gray-300 text-sm">
                                Ask the TFI AI chatbot about any update for more details and context!
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div >
    );
}
