'use client';

import { useState } from 'react';
import { Flame, Heart, PartyPopper } from 'lucide-react';

interface ReactionBarProps {
    eventId: string;
    initialCounts?: {
        fire: number;
        heart: number;
        whistle: number;
    };
}

export default function ReactionBar({ eventId, initialCounts = { fire: 120, heart: 85, whistle: 45 } }: ReactionBarProps) {
    const [counts, setCounts] = useState(initialCounts);
    const [userReaction, setUserReaction] = useState<string | null>(null);

    const handleReact = (type: 'fire' | 'heart' | 'whistle') => {
        if (userReaction === type) {
            // Remove reaction
            setCounts(prev => ({ ...prev, [type]: prev[type] - 1 }));
            setUserReaction(null);
        } else {
            // Add reaction (and remove old one if exists)
            setCounts(prev => ({
                ...prev,
                [type]: prev[type] + 1,
                ...(userReaction ? { [userReaction]: prev[userReaction as keyof typeof prev] - 1 } : {})
            }));
            setUserReaction(type);

            // Trigger haptic if available
            if (navigator.vibrate) navigator.vibrate(50);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={() => handleReact('fire')}
                className={`
                    flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all
                    ${userReaction === 'fire'
                        ? 'bg-orange-500/20 text-orange-500 border border-orange-500/50'
                        : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-orange-400'
                    }
                `}
            >
                <Flame className={`w-4 h-4 ${userReaction === 'fire' ? 'fill-current' : ''}`} />
                <span>{counts.fire}</span>
            </button>

            <button
                onClick={() => handleReact('heart')}
                className={`
                    flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all
                    ${userReaction === 'heart'
                        ? 'bg-red-500/20 text-red-500 border border-red-500/50'
                        : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-red-400'
                    }
                `}
            >
                <Heart className={`w-4 h-4 ${userReaction === 'heart' ? 'fill-current' : ''}`} />
                <span>{counts.heart}</span>
            </button>

            <button
                onClick={() => handleReact('whistle')}
                className={`
                    flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all
                    ${userReaction === 'whistle'
                        ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50'
                        : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-yellow-400'
                    }
                `}
            >
                <PartyPopper className={`w-4 h-4 ${userReaction === 'whistle' ? 'fill-current' : ''}`} />
                <span>{counts.whistle}</span>
            </button>
        </div>
    );
}
