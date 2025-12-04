'use client';

import { Trophy, X, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

interface LevelUpModalProps {
    level: number;
    onClose: () => void;
}

export default function LevelUpModal({ level, onClose }: LevelUpModalProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className={`
                bg-slate-900 border border-yellow-500/50 rounded-2xl p-8 max-w-sm w-full text-center relative overflow-hidden
                transform transition-all duration-500
                ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}
            `}>
                {/* Background Effects */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/20 via-transparent to-transparent animate-pulse" />

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className="relative z-10">
                    <div className="w-24 h-24 mx-auto bg-yellow-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(234,179,8,0.5)] animate-bounce">
                        <Trophy className="w-12 h-12 text-black" />
                    </div>

                    <h2 className="text-3xl font-bold text-white mb-2">Level Up!</h2>
                    <p className="text-yellow-500 font-bold text-xl mb-6">You reached Level {level}</p>

                    <div className="bg-white/5 rounded-xl p-4 mb-6">
                        <p className="text-sm text-white/60 mb-2">Rewards Unlocked:</p>
                        <div className="flex items-center justify-center gap-2 text-white font-medium">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span>500 XP Bonus</span>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-xl transition-colors"
                    >
                        Awesome!
                    </button>
                </div>
            </div>
        </div>
    );
}
