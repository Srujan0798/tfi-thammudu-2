'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Film, Music, Star, Calendar } from 'lucide-react';

interface TimelineEvent {
    id: string;
    title: string;
    date: Date;
    type: 'release' | 'audio' | 'birthday' | 'announcement';
    description?: string;
    image?: string;
}

interface TimelineViewProps {
    events: TimelineEvent[];
}

export default function TimelineView({ events }: TimelineViewProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Sort events by date
    const sortedEvents = [...events].sort((a, b) => a.date.getTime() - b.date.getTime());

    const getIcon = (type: string) => {
        switch (type) {
            case 'release': return <Film className="w-5 h-5" />;
            case 'audio': return <Music className="w-5 h-5" />;
            case 'birthday': return <Star className="w-5 h-5" />;
            default: return <Calendar className="w-5 h-5" />;
        }
    };

    const getColor = (type: string) => {
        switch (type) {
            case 'release': return 'bg-green-500';
            case 'audio': return 'bg-blue-500';
            case 'birthday': return 'bg-yellow-500';
            default: return 'bg-purple-500';
        }
    };

    return (
        <div className="w-full overflow-x-auto pb-8 custom-scrollbar" ref={containerRef}>
            <div className="min-w-[1000px] px-8 relative pt-12">
                {/* Central Line */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2" />

                <div className="flex justify-between items-center relative z-10 gap-12">
                    {sortedEvents.map((event, index) => {
                        const isTop = index % 2 === 0;
                        return (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: isTop ? -20 : 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative flex flex-col items-center ${isTop ? 'mb-32' : 'mt-32'}`}
                            >
                                {/* Connector Line */}
                                <div className={`absolute left-1/2 w-0.5 bg-white/20 h-16 -translate-x-1/2 ${isTop ? 'top-full' : 'bottom-full'}`} />

                                {/* Node */}
                                <div className={`w-4 h-4 rounded-full border-4 border-slate-900 ${getColor(event.type)} z-20`} />

                                {/* Card */}
                                <div className={`absolute w-64 p-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl hover:border-white/30 transition-colors cursor-pointer ${isTop ? 'bottom-full mb-4' : 'top-full mt-4'}`}>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className={`p-2 rounded-lg bg-white/5 ${getColor(event.type).replace('bg-', 'text-')}`}>
                                            {getIcon(event.type)}
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400">{format(event.date, 'MMM d, yyyy')}</p>
                                            <p className="text-xs font-medium capitalize text-white/60">{event.type}</p>
                                        </div>
                                    </div>
                                    <h3 className="text-white font-bold truncate">{event.title}</h3>
                                    {event.description && (
                                        <p className="text-sm text-gray-400 mt-1 line-clamp-2">{event.description}</p>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
