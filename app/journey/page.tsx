'use client';

import { useState, useEffect } from 'react';
import { Star, Award, Film, TrendingUp, Calendar } from 'lucide-react';
import Link from 'next/link';

interface Milestone {
    id: string;
    type: 'debut' | 'blockbuster' | 'award' | 'anniversary' | 'achievement';
    title: string;
    description: string;
    date: string;
    movieName?: string;
    imageUrl?: string;
    year: number;
}

const heroes = [
    'Prabhas',
    'Pawan Kalyan',
    'Mahesh Babu',
    'Jr NTR',
    'Allu Arjun',
    'Ram Charan',
    'Chiranjeevi',
    'NTR Sr',
    'ANR',
];



export default function CinemaJourneyPage() {
    const [selectedHero, setSelectedHero] = useState('Prabhas');
    const [milestones, setMilestones] = useState<Milestone[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMilestones = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/journey?hero=${selectedHero}`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    setMilestones(data);
                }
            } catch (error) {
                console.error('Error fetching milestones:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMilestones();
    }, [selectedHero]);

    const getMilestoneIcon = (type: string) => {
        switch (type) {
            case 'debut':
                return Film;
            case 'blockbuster':
                return TrendingUp;
            case 'award':
                return Award;
            case 'anniversary':
                return Calendar;
            case 'achievement':
                return Star;
            default:
                return Film;
        }
    };

    const getMilestoneColor = (type: string) => {
        switch (type) {
            case 'debut':
                return 'from-blue-500 to-cyan-500';
            case 'blockbuster':
                return 'from-yellow-500 to-orange-500';
            case 'award':
                return 'from-purple-500 to-pink-500';
            case 'anniversary':
                return 'from-green-500 to-emerald-500';
            case 'achievement':
                return 'from-red-500 to-orange-500';
            default:
                return 'from-gray-500 to-gray-600';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
            {/* Header */}
            <header className="bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Star className="w-8 h-8 text-yellow-400" />
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                                    Cinema Journey
                                </h1>
                                <p className="text-xs text-gray-400">Celebrating TFI legends</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Hero Selection */}
                <div className="mb-8">
                    <h2 className="text-white font-bold text-lg mb-4">Select Hero</h2>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                        {heroes.map((hero) => (
                            <button
                                key={hero}
                                onClick={() => setSelectedHero(hero)}
                                className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${selectedHero === hero
                                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black scale-105'
                                    : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                            >
                                {hero}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 via-orange-500 to-purple-500" />

                    {/* Milestones */}
                    <div className="space-y-8">
                        {milestones.map((milestone, index) => {
                            const Icon = getMilestoneIcon(milestone.type);
                            return (
                                <div key={milestone.id} className="relative pl-20">
                                    {/* Timeline Dot */}
                                    <div className={`absolute left-4 w-9 h-9 rounded-full bg-gradient-to-r ${getMilestoneColor(milestone.type)} flex items-center justify-center border-4 border-slate-950`}>
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>

                                    {/* Content Card */}
                                    <div className="bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-white/30 transition-all">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getMilestoneColor(milestone.type)} text-white`}>
                                                        {milestone.type.toUpperCase()}
                                                    </span>
                                                    <span className="text-gray-400 text-sm">{milestone.year}</span>
                                                </div>
                                                <h3 className="text-2xl font-bold text-white mb-2">{milestone.title}</h3>
                                                <p className="text-gray-300">{milestone.description}</p>
                                                {milestone.movieName && (
                                                    <p className="text-yellow-400 font-semibold mt-2">
                                                        🎬 {milestone.movieName}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm">
                                                View Details
                                            </button>
                                            <button className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-lg font-semibold hover:scale-105 transition-transform text-sm">
                                                Add to Calendar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="mt-12 grid md:grid-cols-4 gap-6">
                    <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl p-6">
                        <Film className="w-8 h-8 text-blue-400 mb-2" />
                        <p className="text-gray-300 text-sm">Total Films</p>
                        <p className="text-3xl font-bold text-white">25+</p>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-6">
                        <TrendingUp className="w-8 h-8 text-yellow-400 mb-2" />
                        <p className="text-gray-300 text-sm">Blockbusters</p>
                        <p className="text-3xl font-bold text-white">12</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6">
                        <Award className="w-8 h-8 text-purple-400 mb-2" />
                        <p className="text-gray-300 text-sm">Awards</p>
                        <p className="text-3xl font-bold text-white">8</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6">
                        <Star className="w-8 h-8 text-green-400 mb-2" />
                        <p className="text-gray-300 text-sm">Years Active</p>
                        <p className="text-3xl font-bold text-white">22</p>
                    </div>
                </div>
            </main>
        </div >
    );
}
