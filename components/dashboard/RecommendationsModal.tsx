'use client';

import { useState, useEffect } from 'react';
import { X, Sparkles, Calendar, Loader2, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Recommendation {
    title: string;
    date: string;
    type: string;
    description: string;
    reason: string;
}

interface RecommendationsModalProps {
    isOpen: boolean;
    onClose: () => void;
    userPreferences: {
        favoriteHeroes?: string[];
        favoriteDirectors?: string[];
    };
}

export default function RecommendationsModal({ isOpen, onClose, userPreferences }: RecommendationsModalProps) {
    const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen && recommendations.length === 0) {
            fetchRecommendations();
        }
    }, [isOpen]); // Only fetch when opened

    const fetchRecommendations = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('/api/ai/recommendations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userPreferences }),
            });
            const data = await response.json();
            if (data.success) {
                setRecommendations(data.suggestions);
            } else {
                setError('Failed to fetch recommendations. Please try again.');
            }
        } catch (err) {
            setError('An error occurred while fetching recommendations.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-purple-900/50 to-slate-900">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-yellow-400/10 rounded-lg">
                                <Sparkles className="w-6 h-6 text-yellow-400" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white">AI Recommendations</h2>
                                <p className="text-sm text-gray-400">Curated events just for you</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center h-64 gap-4">
                                <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
                                <p className="text-gray-400 animate-pulse">Analyzing your taste...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-12">
                                <p className="text-red-400 mb-4">{error}</p>
                                <button
                                    onClick={fetchRecommendations}
                                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
                                >
                                    Try Again
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {recommendations.map((rec, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors group"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider
                                                        ${rec.type.includes('release') ? 'bg-green-500/20 text-green-400' :
                                                            rec.type.includes('birthday') ? 'bg-yellow-500/20 text-yellow-400' :
                                                                'bg-purple-500/20 text-purple-400'
                                                        }`}>
                                                        {rec.type}
                                                    </span>
                                                    <span className="text-xs text-gray-500 flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" />
                                                        {rec.date}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-bold text-white mb-1">{rec.title}</h3>
                                                <p className="text-sm text-gray-300 mb-2">{rec.description}</p>
                                                <p className="text-xs text-purple-300 italic flex items-center gap-1">
                                                    <Sparkles className="w-3 h-3" />
                                                    {rec.reason}
                                                </p>
                                            </div>
                                            <button className="p-2 bg-white/10 hover:bg-purple-500 hover:text-white rounded-lg text-gray-400 transition-colors opacity-0 group-hover:opacity-100">
                                                <Plus className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
