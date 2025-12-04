'use client';

import { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, Film, Calendar } from 'lucide-react';
import Link from 'next/link';

interface FestivalRelease {
    id: string;
    festivalName: string;
    year: number;
    festivalDate: string;
    movieName: string;
    heroName: string;
    directorName: string;
    productionHouse: string;
    posterUrl?: string;
    trailerUrl?: string;
    predictionScore: number;
    boxOfficeResult?: 'hit' | 'superhit' | 'blockbuster' | 'flop';
}

const festivals = ['Sankranti', 'Dasara', 'Ugadi', 'Summer', 'Christmas'];



export default function FestivalReleasesPage() {
    const [releases, setReleases] = useState<FestivalRelease[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedFestival, setSelectedFestival] = useState<string>('all');
    const [selectedYear, setSelectedYear] = useState<number>(2025);

    useEffect(() => {
        const fetchReleases = async () => {
            try {
                const res = await fetch(`/api/festivals?festival=${selectedFestival}`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    setReleases(data);
                }
            } catch (error) {
                console.error('Error fetching festival releases:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReleases();
    }, [selectedFestival]);

    const years = Array.from(new Set(releases.map(r => r.year))).sort((a, b) => b - a);

    const filteredReleases = releases.filter(r => {
        const yearMatch = r.year === selectedYear;
        return yearMatch;
    });

    const getPredictionColor = (score: number) => {
        if (score >= 90) return 'from-green-500 to-emerald-500';
        if (score >= 75) return 'from-yellow-500 to-orange-500';
        return 'from-red-500 to-pink-500';
    };

    const getResultBadge = (result?: string) => {
        switch (result) {
            case 'blockbuster':
                return { text: 'BLOCKBUSTER', color: 'from-green-500 to-emerald-500' };
            case 'superhit':
                return { text: 'SUPER HIT', color: 'from-blue-500 to-cyan-500' };
            case 'hit':
                return { text: 'HIT', color: 'from-yellow-500 to-orange-500' };
            case 'flop':
                return { text: 'FLOP', color: 'from-red-500 to-pink-500' };
            default:
                return null;
        }
    };

    const addToCalendar = async (release: FestivalRelease) => {
        // In a real app, get the current user ID from auth context
        // const { data: { user } } = await supabase.auth.getUser();
        // const userId = user?.id;

        // For demo/integration phase, we'll alert the user if they are not logged in
        // or try to use a placeholder if we want to test the API structure
        const userId = '00000000-0000-0000-0000-000000000000'; // Placeholder

        try {
            const res = await fetch('/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    title: `${release.movieName} Release`,
                    description: `Release of ${release.movieName} starring ${release.heroName} (${release.festivalName})`,
                    eventDate: release.festivalDate,
                    eventType: 'release',
                    isPublic: false
                })
            });

            if (res.ok) {
                alert('Event added to your calendar!');
            } else {
                const data = await res.json();
                console.error('Failed to add event:', data);
                alert('Please login to add events to your calendar.');
            }
        } catch (error) {
            console.error('Error adding event:', error);
            alert('An error occurred while adding the event.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
            {/* Header */}
            <header className="bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Sparkles className="w-8 h-8 text-yellow-400" />
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                                    Festival Releases
                                </h1>
                                <p className="text-xs text-gray-400">Sankranti, Dasara, Summer & more!</p>
                            </div>
                        </div>
                        <Link
                            href="/calendar"
                            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                        >
                            Back to Calendar
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filters */}
                <div className="mb-8 space-y-6">
                    {/* Year Filter */}
                    <div>
                        <h2 className="text-white font-bold text-lg mb-4">Select Year</h2>
                        <div className="flex gap-3">
                            {years.map((year) => (
                                <button
                                    key={year}
                                    onClick={() => setSelectedYear(year)}
                                    className={`px-6 py-3 rounded-xl font-semibold transition-all ${selectedYear === year
                                        ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black scale-105'
                                        : 'bg-white/10 text-white hover:bg-white/20'
                                        }`}
                                >
                                    {year}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Festival Filter */}
                    <div>
                        <h2 className="text-white font-bold text-lg mb-4">Select Festival</h2>
                        <div className="flex gap-3 overflow-x-auto pb-2">
                            <button
                                onClick={() => setSelectedFestival('all')}
                                className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${selectedFestival === 'all'
                                    ? 'bg-gradient-to-r from-purple-400 to-pink-500 text-white scale-105'
                                    : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                            >
                                All Festivals
                            </button>
                            {festivals.map((festival) => (
                                <button
                                    key={festival}
                                    onClick={() => setSelectedFestival(festival)}
                                    className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${selectedFestival === festival
                                        ? 'bg-gradient-to-r from-purple-400 to-pink-500 text-white scale-105'
                                        : 'bg-white/10 text-white hover:bg-white/20'
                                        }`}
                                >
                                    {festival}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Releases Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {filteredReleases.map((release) => {
                        const resultBadge = getResultBadge(release.boxOfficeResult);
                        return (
                            <div
                                key={release.id}
                                className="bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10 p-6 hover:border-white/30 transition-all"
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-white">
                                            {release.festivalName} {release.year}
                                        </span>
                                        {resultBadge && (
                                            <span className={`ml-2 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${resultBadge.color} text-white`}>
                                                {resultBadge.text}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Movie Info */}
                                <h3 className="text-3xl font-bold text-white mb-2">{release.movieName}</h3>
                                <div className="space-y-1 mb-4">
                                    <p className="text-yellow-400 font-semibold">⭐ {release.heroName}</p>
                                    <p className="text-gray-300 text-sm">🎬 Dir: {release.directorName}</p>
                                    <p className="text-gray-400 text-sm">🏢 {release.productionHouse}</p>
                                </div>

                                {/* Release Date */}
                                <div className="bg-white/5 rounded-lg p-3 mb-4">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-blue-400" />
                                        <span className="text-white font-semibold">
                                            {new Date(release.festivalDate).toLocaleDateString('en-US', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                </div>

                                {/* AI Prediction */}
                                {!release.boxOfficeResult && (
                                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-4 mb-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-white font-semibold flex items-center gap-2">
                                                <TrendingUp className="w-4 h-4" />
                                                AI Prediction
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r ${getPredictionColor(release.predictionScore)} text-white`}>
                                                {release.predictionScore}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-white/10 rounded-full h-2">
                                            <div
                                                className={`h-2 rounded-full bg-gradient-to-r ${getPredictionColor(release.predictionScore)}`}
                                                style={{ width: `${release.predictionScore}%` }}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <button className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm">
                                        View Details
                                    </button>
                                    <button
                                        onClick={() => addToCalendar(release)}
                                        className="flex-1 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-lg font-semibold hover:scale-105 transition-transform text-sm"
                                    >
                                        Add to Calendar
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {filteredReleases.length === 0 && (
                    <div className="text-center py-12">
                        <Film className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg">
                            No releases found for {selectedFestival === 'all' ? 'any festival' : selectedFestival} {selectedYear}
                        </p>
                    </div>
                )}

                {/* Festival Battle Info */}
                <div className="mt-12 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-2xl p-6">
                    <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-yellow-400" />
                        Festival Clash
                    </h3>
                    <p className="text-gray-300">
                        Festival releases are the biggest events in TFI! Multiple big movies compete for box office supremacy.
                        Sankranti and Summer are traditionally the hottest seasons with 3-4 major releases clashing.
                        Use AI predictions to track which movies are likely to dominate!
                    </p>
                </div>
            </main>
        </div>
    );
}
