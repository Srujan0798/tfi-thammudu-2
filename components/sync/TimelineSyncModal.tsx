'use client';

import { useState } from 'react';
import { Share2, Users, Calendar, Check, X, Filter } from 'lucide-react';
import Link from 'next/link';

interface TimelineSyncModalProps {
    isOpen: boolean;
    onClose: () => void;
    creator: {
        id: string;
        username: string;
        fullName: string;
        avatarUrl?: string;
        isVerified: boolean;
        followerCount: number;
        bio: string;
        availableTags: string[];
    };
}

export default function TimelineSyncModal({ isOpen, onClose, creator }: TimelineSyncModalProps) {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [syncAll, setSyncAll] = useState(true);
    const [isSyncing, setIsSyncing] = useState(false);

    if (!isOpen) return null;

    const handleSync = async () => {
        setIsSyncing(true);

        try {
            const response = await fetch('/api/sync', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: 'current-user-id', // TODO: Get from auth
                    creatorId: creator.id,
                    syncTags: syncAll ? [] : selectedTags,
                }),
            });

            const data = await response.json();

            if (data.success) {
                alert(`✅ Successfully synced with ${creator.fullName}! Their timeline will auto-update in your calendar.`);
                onClose();
            } else {
                alert(`❌ ${data.error}`);
            }
        } catch (error) {
            console.error('Sync error:', error);
            alert('❌ Failed to sync. Please try again.');
        } finally {
            setIsSyncing(false);
        }
    };

    const toggleTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-black/30 backdrop-blur-md border-b border-white/10 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                            Sync Timeline
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Creator Info */}
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-2xl font-bold text-black">
                            {creator.avatarUrl ? (
                                <img src={creator.avatarUrl} alt={creator.fullName} className="w-full h-full rounded-full object-cover" />
                            ) : (
                                creator.fullName.charAt(0)
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <h3 className="text-xl font-bold text-white">{creator.fullName}</h3>
                                {creator.isVerified && (
                                    <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">
                                        Verified
                                    </span>
                                )}
                            </div>
                            <p className="text-gray-400">@{creator.username}</p>
                            <p className="text-sm text-gray-300 mt-1">{creator.bio}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                                <span className="flex items-center gap-1">
                                    <Users className="w-4 h-4" />
                                    {creator.followerCount.toLocaleString()} followers
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sync Options */}
                <div className="p-6 space-y-6">
                    {/* Sync All Toggle */}
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                            <div>
                                <h4 className="text-white font-semibold">Sync All Events</h4>
                                <p className="text-xs text-gray-400">Get notified about {creator.fullName}&apos;s new events.</p>
                            </div>
                            <button
                                onClick={() => setSyncAll(!syncAll)}
                                className={`w-12 h-6 rounded-full transition-colors ${syncAll ? 'bg-green-500' : 'bg-gray-600'
                                    }`}
                            >
                                <div
                                    className={`w-5 h-5 bg-white rounded-full transition-transform ${syncAll ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                />
                            </button>
                        </div>
                    </div>

                    {/* Tag Filter */}
                    {!syncAll && (
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Filter className="w-5 h-5 text-yellow-400" />
                                <h4 className="text-white font-semibold">Filter by Tags</h4>
                            </div>
                            <p className="text-sm text-gray-400 mb-4">
                                Only sync events with these tags:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {creator.availableTags.map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => toggleTag(tag)}
                                        className={`px-4 py-2 rounded-full font-medium transition-all ${selectedTags.includes(tag)
                                            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black'
                                            : 'bg-white/10 text-white hover:bg-white/20'
                                            }`}
                                    >
                                        {selectedTags.includes(tag) && <Check className="w-4 h-4 inline mr-1" />}
                                        {tag}
                                    </button>
                                ))}
                            </div>
                            {selectedTags.length === 0 && (
                                <p className="text-red-400 text-sm mt-2">
                                    ⚠️ Select at least one tag or enable &quot;Sync All&quot;
                                </p>
                            )}
                        </div>
                    )}

                    {/* What Happens */}
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                        <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            What happens when you sync?
                        </h4>
                        <ul className="text-sm text-gray-300 space-y-1">
                            <li>✅ All {syncAll ? 'events' : 'matching events'} from this creator appear in your calendar</li>
                            <li>✅ Updates automatically sync when creator adds/changes events</li>
                            <li>✅ You can unsync anytime from your profile</li>
                            <li>✅ Synced events are marked with creator&apos;s badge</li>
                        </ul>
                    </div>

                    {/* Share Link */}
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                        <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                            <Share2 className="w-5 h-5 text-green-400" />
                            Share this timeline
                        </h4>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={`tfi-calendar.com/@${creator.username}`}
                                readOnly
                                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm"
                            />
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(`tfi-calendar.com/@${creator.username}`);
                                    alert('✅ Link copied!');
                                }}
                                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                            >
                                Copy
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={onClose}
                            className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-semibold"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSync}
                            disabled={isSyncing || (!syncAll && selectedTags.length === 0)}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-lg font-bold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSyncing ? 'Syncing...' : '🔄 Sync Timeline'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
