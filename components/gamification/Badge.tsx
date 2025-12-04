import { Hexagon, Star, Heart, MessageCircle, Calendar } from 'lucide-react';

interface BadgeProps {
    type: 'early_adopter' | 'top_fan' | 'social_butterfly' | 'event_master';
    size?: 'sm' | 'md' | 'lg';
    locked?: boolean;
}

const BADGE_CONFIG = {
    early_adopter: {
        label: 'Early Adopter',
        icon: Star,
        color: 'text-yellow-400',
        bg: 'bg-yellow-500/20',
        border: 'border-yellow-500/50'
    },
    top_fan: {
        label: 'Top Fan',
        icon: Heart,
        color: 'text-red-400',
        bg: 'bg-red-500/20',
        border: 'border-red-500/50'
    },
    social_butterfly: {
        label: 'Social Butterfly',
        icon: MessageCircle,
        color: 'text-blue-400',
        bg: 'bg-blue-500/20',
        border: 'border-blue-500/50'
    },
    event_master: {
        label: 'Event Master',
        icon: Calendar,
        color: 'text-purple-400',
        bg: 'bg-purple-500/20',
        border: 'border-purple-500/50'
    }
};

export default function Badge({ type, size = 'md', locked = false }: BadgeProps) {
    const config = BADGE_CONFIG[type];
    const Icon = config.icon;

    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16'
    };

    const iconSizes = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8'
    };

    if (locked) {
        return (
            <div className={`${sizeClasses[size]} rounded-full bg-slate-800 border border-white/10 flex items-center justify-center grayscale opacity-50`} title="Locked Badge">
                <Icon className={`${iconSizes[size]} text-white/20`} />
            </div>
        );
    }

    return (
        <div
            className={`${sizeClasses[size]} rounded-full ${config.bg} border ${config.border} flex items-center justify-center relative group cursor-help`}
            title={config.label}
        >
            <Icon className={`${iconSizes[size]} ${config.color}`} />

            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 text-white text-[10px] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                {config.label}
            </div>
        </div>
    );
}
