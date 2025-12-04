import { Trophy, Medal, Crown } from 'lucide-react';
import PointsDisplay from '@/components/gamification/PointsDisplay';

export default function LeaderboardPage() {
    return (
        <div className="max-w-4xl mx-auto p-6 pb-24">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-white mb-2">Top Fans</h1>
                <p className="text-white/60">The most active members of the TFI community.</p>
            </div>

            {/* Top 3 Podium */}
            <div className="flex justify-center items-end gap-4 mb-12">
                {/* 2nd Place */}
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full border-4 border-slate-700 bg-slate-800 mb-2 relative">
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-700 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            #2
                        </div>
                    </div>
                    <p className="text-white font-bold text-sm mb-1">MegaFan99</p>
                    <p className="text-yellow-500 text-xs font-bold">2,450 XP</p>
                    <div className="h-24 w-20 bg-slate-800 rounded-t-xl mt-2 opacity-50"></div>
                </div>

                {/* 1st Place */}
                <div className="flex flex-col items-center">
                    <Crown className="w-8 h-8 text-yellow-500 mb-2 animate-bounce" />
                    <div className="w-24 h-24 rounded-full border-4 border-yellow-500 bg-slate-800 mb-2 relative shadow-[0_0_20px_rgba(234,179,8,0.3)]">
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                            #1
                        </div>
                    </div>
                    <p className="text-white font-bold text-lg mb-1">TFI_King</p>
                    <p className="text-yellow-500 text-sm font-bold">3,100 XP</p>
                    <div className="h-32 w-24 bg-gradient-to-t from-yellow-500/20 to-yellow-500/5 rounded-t-xl mt-2 border-t border-yellow-500/20"></div>
                </div>

                {/* 3rd Place */}
                <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full border-4 border-orange-700 bg-slate-800 mb-2 relative">
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-orange-700 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            #3
                        </div>
                    </div>
                    <p className="text-white font-bold text-sm mb-1">CinemaLover</p>
                    <p className="text-yellow-500 text-xs font-bold">2,100 XP</p>
                    <div className="h-16 w-20 bg-slate-800 rounded-t-xl mt-2 opacity-50"></div>
                </div>
            </div>

            {/* List */}
            <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden">
                {[4, 5, 6, 7, 8, 9, 10].map((rank) => (
                    <div key={rank} className="flex items-center p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                        <div className="w-8 text-center font-bold text-white/40 text-lg mr-4">
                            {rank}
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-800 mr-4"></div>
                        <div className="flex-1">
                            <p className="text-white font-bold">User_{rank}</p>
                            <p className="text-white/40 text-xs">Level 5 • Expert</p>
                        </div>
                        <div className="text-right">
                            <p className="text-yellow-500 font-bold">{2000 - (rank * 50)} XP</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
