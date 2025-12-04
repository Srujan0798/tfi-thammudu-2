import ActivityFeed from '@/components/social/ActivityFeed';
import { Sparkles, Users, TrendingUp } from 'lucide-react';

export default function FeedPage() {
    return (
        <div className="min-h-screen bg-black pb-20 pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Main Feed */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                                <Sparkles className="w-6 h-6 text-yellow-500" />
                                Community Buzz
                            </h1>
                            <div className="flex gap-2">
                                <button className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-white hover:bg-white/20 transition-colors">
                                    All
                                </button>
                                <button className="px-3 py-1 bg-transparent rounded-full text-xs font-medium text-white/50 hover:text-white transition-colors">
                                    Following
                                </button>
                            </div>
                        </div>

                        <ActivityFeed />
                    </div>

                    {/* Sidebar */}
                    <div className="w-full md:w-80 space-y-6">
                        {/* Suggested Users */}
                        <div className="bg-slate-900/50 border border-white/10 rounded-xl p-4">
                            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                                <Users className="w-4 h-4 text-blue-400" />
                                Suggested Fans
                            </h3>
                            <div className="space-y-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-slate-800" />
                                            <div>
                                                <p className="text-sm font-medium text-white">TFI Addict {i}</p>
                                                <p className="text-xs text-white/50">@tfi_addict_{i}</p>
                                            </div>
                                        </div>
                                        <button className="text-xs font-bold text-yellow-500 hover:text-yellow-400">
                                            Follow
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Trending Topics */}
                        <div className="bg-slate-900/50 border border-white/10 rounded-xl p-4">
                            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-green-400" />
                                Trending Now
                            </h3>
                            <div className="space-y-3">
                                {['#Devara', '#OG', '#SSMB29', '#GameChanger'].map((tag) => (
                                    <div key={tag} className="flex items-center justify-between group cursor-pointer">
                                        <span className="text-sm text-white/70 group-hover:text-white transition-colors">{tag}</span>
                                        <span className="text-xs text-white/40">2.5k posts</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
