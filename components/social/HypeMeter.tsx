'use client';

import { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, MessageCircle, Loader2 } from 'lucide-react';

interface HypeMeterProps {
    comments: string[];
}

export default function HypeMeter({ comments }: HypeMeterProps) {
    const [analysis, setAnalysis] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (comments.length > 0) {
            analyze();
        }
    }, [event.id]); // analyze is stable

    const analyze = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/ai/sentiment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ comments }),
            });
            const data = await response.json();
            if (data.success) {
                setAnalysis(data.analysis);
            }
        } catch (error) {
            console.error('Failed to analyze sentiment:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-white/5 rounded-xl p-4 flex items-center justify-center gap-2 text-purple-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Calculating Hype...</span>
            </div>
        );
    }

    if (!analysis) return null;

    return (
        <div className="bg-gradient-to-br from-purple-900/20 to-slate-900 border border-purple-500/20 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                    <h3 className="font-bold text-white">Hype Meter</h3>
                </div>
                <div className="flex items-center gap-1 bg-purple-500/20 px-2 py-1 rounded text-purple-300 text-xs">
                    <Sparkles className="w-3 h-3" />
                    AI Analysis
                </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                        <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="transparent"
                            className="text-white/10"
                        />
                        <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="transparent"
                            strokeDasharray={175.93}
                            strokeDashoffset={175.93 - (175.93 * analysis.score) / 100}
                            className={`${analysis.score > 80 ? 'text-green-500' :
                                analysis.score > 50 ? 'text-yellow-500' : 'text-red-500'
                                } transition-all duration-1000 ease-out`}
                        />
                    </svg>
                    <span className="absolute text-lg font-bold text-white">{analysis.score}</span>
                </div>
                <div className="flex-1">
                    <div className="text-sm font-bold text-white mb-1">{analysis.sentiment} Sentiment</div>
                    <p className="text-xs text-gray-400 leading-relaxed">{analysis.summary}</p>
                </div>
            </div>

            <div className="flex flex-wrap gap-2">
                {analysis.keywords.map((keyword: string, idx: number) => (
                    <span key={idx} className="text-[10px] px-2 py-1 bg-white/5 rounded-full text-gray-300 border border-white/10">
                        #{keyword}
                    </span>
                ))}
            </div>
        </div>
    );
}
