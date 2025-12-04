import { format } from 'date-fns';
import { X, Calendar, MapPin, Clock, Share2, Info, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import HypeMeter from '@/components/social/HypeMeter';
import CommentSection from '@/components/social/CommentSection';
import ReactionBar from '@/components/social/ReactionBar';
import ShareModal from '@/components/social/ShareModal';
import Image from 'next/image';
import { useState } from 'react';

interface EventDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: any; // Replace with proper Event type
}

export default function EventDetailsModal({ isOpen, onClose, event }: EventDetailsModalProps) {
    const [isLiked, setIsLiked] = useState(false);
    const [isShareOpen, setIsShareOpen] = useState(false);

    if (!event) return null;
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-slate-900 border border-white/10 text-white rounded-2xl max-w-[600px] w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                {/* Hero Image */}
                <div className="relative h-48 w-full bg-slate-800">
                    {event.image_url ? (
                        <Image
                            src={event.image_url}
                            alt={event.title}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900 to-slate-900">
                            <Calendar className="w-16 h-16 text-white/20" />
                        </div>
                    )}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent h-24" />
                </div>

                <div className="p-6 space-y-6">
                    {/* Header */}
                    <div>
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider mb-2 inline-block
                                ${event.type === 'release' ? 'bg-green-500/20 text-green-400' :
                                        event.type === 'audio' ? 'bg-purple-500/20 text-purple-400' :
                                            'bg-blue-500/20 text-blue-400'
                                    }`}>
                                    {event.type}
                                </span>
                                <h2 className="text-2xl font-bold text-white mb-2">{event.title}</h2>
                                <p className="text-gray-400">{event.description}</p>
                            </div>
                            <button
                                onClick={() => setIsShareOpen(true)}
                                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors">
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-6 text-sm text-white/70">
                        <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full">
                            <Calendar className="w-4 h-4 text-yellow-500" />
                            <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        {event.location && (
                            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full">
                                <MapPin className="w-4 h-4 text-red-500" />
                                <span>{event.location}</span>
                            </div>
                        )}
                        {event.time && (
                            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full">
                                <Clock className="w-4 h-4 text-blue-500" />
                                <span>{event.time}</span>
                            </div>
                        )}
                    </div>

                    {/* Reactions */}
                    <div className="mb-6">
                        <ReactionBar eventId={event.id} />
                    </div>

                    {/* Description */}
                    {event.description && (
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                                <Info className="w-5 h-5 text-purple-400" />
                                About Event
                            </h3>
                            <p className="text-white/80 leading-relaxed">{event.description}</p>
                        </div>
                    )}

                    {/* Hype Meter (AI Sentiment) */}
                    <div className="mb-8">
                        <HypeMeter eventTitle={event.title} />
                    </div>

                    {/* Comments */}
                    <div className="mb-8">
                        <CommentSection eventId={event.id} />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 sticky bottom-0 bg-slate-900/95 backdrop-blur p-4 -mx-4 border-t border-white/10">
                        <button className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors">
                            <Calendar className="w-5 h-5" />
                            Add to Calendar
                        </button>
                        <button
                            onClick={() => setIsShareOpen(true)}
                            className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
                        >
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <ShareModal
                isOpen={isShareOpen}
                onClose={() => setIsShareOpen(false)}
                title={event.title}
                text={`Check out ${event.title} on TFI Timeline! 🎬`}
                url={typeof window !== 'undefined' ? `${window.location.origin}/calendar?event=${event.id}` : ''}
            />
        </div>
    );
}
