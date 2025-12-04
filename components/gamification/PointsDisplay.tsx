'use client';

import { Zap, Trophy } from 'lucide-react';
import { calculateLevel, getProgressToNextLevel } from '@/lib/gamification/points';

interface PointsDisplayProps {
    points: number;
    compact?: boolean;
}

export default function PointsDisplay({ points, compact = false }: PointsDisplayProps) {
    const level = calculateLevel(points);
    const progress = getProgressToNextLevel(points);

    if (compact) {
        return (
            <div className="flex items-center gap-2 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
                <Zap className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                <span className="text-xs font-bold text-yellow-500">{points} XP</span>
            </div>
        );
    }

    return (
        <div className="bg-slate-900 border border-white/10 rounded-xl p-4 w-full">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center border border-yellow-500/50">
                        <Trophy className="w-4 h-4 text-yellow-500" />
                    </div>
                    <div>
                        <p className="text-xs text-white/60 font-medium">Level {level}</p>
                        <p className="text-sm font-bold text-white">Fan Rank</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-lg font-bold text-yellow-500">{points}</p>
                    <p className="text-[10px] text-white/40 uppercase tracking-wider">Total XP</p>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-600 to-yellow-400 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <p className="text-[10px] text-white/40 mt-1 text-right">{Math.round(progress)}% to Level {level + 1}</p>
        </div>
    );
}
