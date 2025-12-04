'use client';

import { format } from 'date-fns';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface EventPreviewCardProps {
    event: any; // TODO: Replace with proper Event type
    position: { x: number; y: number };
    onClose: () => void;
    onOpenDetails?: () => void;
}

export default function EventPreviewCard({ event, position, onOpenDetails }: EventPreviewCardProps) {
    if (!event) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
                position: 'fixed',
                left: position.x,
                top: position.y,
                zIndex: 100,
            }}
            className="w-80 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4 transform -translate-x-1/2 -translate-y-full mt-[-10px]"
        >
            <div className="flex items-start justify-between mb-3">
                <span className={`px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${event.event_type === 'release' ? 'bg-green-500/20 text-green-400' :
                    event.event_type === 'audio' ? 'bg-blue-500/20 text-blue-400' :
                        event.event_type === 'birthday' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-purple-500/20 text-purple-400'
                    }`}>
                    {event.event_type}
                </span>
                <span className="text-xs text-gray-400">
                    {format(new Date(event.event_date), 'MMM d')}
                </span>
            </div>

            <h3 className="text-lg font-bold text-white mb-2">{event.title}</h3>

            {event.description && (
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {event.description}
                </p>
            )}

            <div className="space-y-2 mb-4">
                {event.event_time && (
                    <div className="flex items-center gap-2 text-xs text-gray-300">
                        <Clock className="w-3 h-3" />
                        {event.event_time}
                    </div>
                )}
                {event.location && (
                    <div className="flex items-center gap-2 text-xs text-gray-300">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                    </div>
                )}
            </div>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onOpenDetails?.();
                }}
                className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-white font-medium transition-colors flex items-center justify-center gap-2"
            >
                View Details
                <ArrowRight className="w-3 h-3" />
            </button>
        </motion.div>
    );
}
