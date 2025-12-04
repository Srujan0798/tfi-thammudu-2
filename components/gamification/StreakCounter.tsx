'use client';

import { Flame } from 'lucide-react';

interface StreakCounterProps {
    streak: number;
    isActive: boolean; // Did user check in today?
}

export default function StreakCounter({ streak, isActive }: StreakCounterProps) {
    return (
        <div className={`
            flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300
            ${isActive
                ? 'bg-orange-500/20 border-orange-500/50 text-orange-400'
                : 'bg-slate-800 border-white/10 text-white/40 grayscale'
            }
        `}>
            <div className="relative">
                <Flame className={`w-4 h-4 ${isActive ? 'animate-pulse fill-orange-500' : ''}`} />
                {isActive && (
                    <div className="absolute inset-0 blur-sm bg-orange-500/50 animate-pulse" />
                )}
            </div>
            <span className="text-sm font-bold">{streak}</span>
        </div>
    );
}
