'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, ExternalLink, Loader2, Newspaper } from 'lucide-react';

// Mock Data
const MOCK_NEWS = [
    {
        id: 1,
        title: "Prabhas' 'Kalki 2898 AD' Release Date Confirmed?",
        source: "TFI Buzz",
        date: "2024-05-20",
        image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        content: "The much-awaited sci-fi epic 'Kalki 2898 AD' starring Prabhas, Deepika Padukone, and Amitabh Bachchan is rumored to be hitting screens on June 27th, 2024. Sources close to the production house Vyjayanthi Movies suggest that the post-production work is in full swing. An official announcement is expected this weekend. Fans are eagerly waiting for the trailer which is said to be a visual spectacle.",
    },
    {
        id: 2,
        title: "NTR30: Devara Part 1 Glimpse Creates Records",
        source: "Cinema Political",
        date: "2024-05-19",
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        content: "Man of Masses NTR's upcoming film 'Devara' directed by Koratala Siva has set the internet on fire with its latest glimpse. The fear song has clocked 10 million views in just 24 hours. The film is slated for a grand release on October 10th, 2024. Anirudh's BGM is being hailed as the major asset for the film.",
    },
    {
        id: 3,
        title: "Pushpa 2: The Rule - Item Song Leaked?",
        source: "Tollywood Tracker",
        date: "2024-05-18",
        image: "https://images.unsplash.com/photo-1478720568477-152d9b164e63?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
        content: "Rumors are rife that a special item song from Allu Arjun's 'Pushpa 2' has been leaked online. The makers have tightened security on the sets. Meanwhile, the film is scheduled to release on August 15th, 2024. Devi Sri Prasad is reportedly composing a chartbuster album that will surpass the first part.",
    }
];

export default function NewsPage() {
    const [summarizingId, setSummarizingId] = useState<number | null>(null);
    const [summaries, setSummaries] = useState<{ [key: number]: any[] }>({});

    const handleSummarize = async (id: number, content: string) => {
        setSummarizingId(id);
        try {
            const response = await fetch('/api/ai/news-summary', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newsText: content }),
            });
            const data = await response.json();
            if (data.success) {
                setSummaries(prev => ({ ...prev, [id]: data.events }));
            }
        } catch (error) {
            console.error('Failed to summarize:', error);
        } finally {
            setSummarizingId(null);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 pt-24 px-4 pb-12">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-yellow-400/10 rounded-xl">
                        <Newspaper className="w-8 h-8 text-yellow-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">TFI News Feed</h1>
                        <p className="text-gray-400">Latest updates from the industry</p>
                    </div>
                </div>

                <div className="space-y-8">
                    {MOCK_NEWS.map((news) => (
                        <motion.div
                            key={news.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/[0.07] transition-colors"
                        >
                            <div className="md:flex">
                                <div className="md:w-1/3 h-48 md:h-auto relative">
                                    <img
                                        src={news.image}
                                        alt={news.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs text-white font-medium">
                                        {news.source}
                                    </div>
                                </div>
                                <div className="p-6 md:w-2/3 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs text-gray-400">{news.date}</span>
                                        </div>
                                        <h2 className="text-xl font-bold text-white mb-3">{news.title}</h2>
                                        <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                            {news.content}
                                        </p>
                                    </div>

                                    {/* AI Summary Section */}
                                    <div className="mt-4 pt-4 border-t border-white/10">
                                        {!summaries[news.id] ? (
                                            <button
                                                onClick={() => handleSummarize(news.id, news.content)}
                                                disabled={summarizingId === news.id}
                                                className="flex items-center gap-2 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors disabled:opacity-50"
                                            >
                                                {summarizingId === news.id ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                        Analyzing...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Sparkles className="w-4 h-4" />
                                                        Extract Events with AI
                                                    </>
                                                )}
                                            </button>
                                        ) : (
                                            <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <Sparkles className="w-4 h-4 text-purple-400" />
                                                    <h3 className="text-sm font-bold text-purple-200">AI Extracted Events</h3>
                                                </div>
                                                {summaries[news.id].length > 0 ? (
                                                    <div className="space-y-3">
                                                        {summaries[news.id].map((event: any, idx: number) => (
                                                            <div key={idx} className="flex items-start gap-3 bg-black/20 p-2 rounded-lg">
                                                                <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                                                                <div>
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-sm font-bold text-white">{event.title}</span>
                                                                        <span className="text-[10px] px-1.5 py-0.5 bg-white/10 rounded text-gray-300 uppercase">{event.type}</span>
                                                                    </div>
                                                                    <p className="text-xs text-gray-400 mt-1">
                                                                        Date: <span className="text-yellow-400">{event.date}</span>
                                                                    </p>
                                                                    <p className="text-xs text-gray-500 mt-1">{event.description}</p>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    <p className="text-xs text-gray-400">No specific dates found in this article.</p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
