'use client';

import { useState, useEffect } from 'react';
import { Film, MapPin, Ticket, Calendar, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface ReRelease {
    id: string;
    movieName: string;
    originalReleaseDate: string;
    reReleaseDate: string;
    theaterName: string;
    city: string;
    state: string;
    ticketUrl?: string;
    posterUrl?: string;
    celebrationType: 'anniversary' | 'birthday' | 'special';
    isActive: boolean;
}



export default function ReReleasePage() {
    const [releases, setReleases] = useState<ReRelease[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCity, setSelectedCity] = useState<string>('all');

    useEffect(() => {
        const fetchReleases = async () => {
            try {
                const res = await fetch(`/api/rereleases?city=${selectedCity}`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    setReleases(data);
                }
            } catch (error) {
                console.error('Error fetching re-releases:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReleases();
    }, [selectedCity]);

    const cities = ['all', ...Array.from(new Set(releases.map(r => r.city)))];

    const filteredReleases = releases;

    const getCelebrationBadge = (type: string) => {
        switch (type) {
            case 'birthday':
                return { text: 'Birthday Special', color: 'from-pink-500 to-red-500' };
            case 'anniversary':
                return { text: 'Anniversary', color: 'from-purple-500 to-blue-500' };
            case 'special':
                return { text: 'Special Show', color: 'from-yellow-500 to-orange-500' };
            default:
                return { text: 'Re-release', color: 'from-gray-500 to-gray-600' };
        }
    };

    const addToCalendar = async (release: ReRelease) => {
        const userId = '00000000-0000-0000-0000-000000000000'; // Placeholder

        try {
            const res = await fetch('/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    title: `${release.movieName} Re-release`,
                    description: `Re-release of ${release.movieName} at ${release.theaterName}, ${release.city}`,
                    eventDate: release.reReleaseDate,
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
                            <Film className="w-8 h-8 text-purple-400" />
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                                    Re-Release Tracker
                                </h1>
                                <p className="text-xs text-gray-400">Catch your favorites on big screen again!</p>
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
                {/* City Filter */}
                <div className="mb-8">
                    <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-blue-400" />
                        Filter by City
                    </h2>
                    <div className="flex gap-3 overflow-x-auto pb-2">
                        {cities.map((city) => (
                            <button
                                key={city}
                                onClick={() => setSelectedCity(city)}
                                className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${selectedCity === city
                                    ? 'bg-gradient-to-r from-purple-400 to-pink-500 text-white scale-105'
                                    : 'bg-white/10 text-white hover:bg-white/20'
                                    }`}
                            >
                                {city === 'all' ? 'All Cities' : city}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Re-releases Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredReleases.map((release) => {
                        const badge = getCelebrationBadge(release.celebrationType);
                        return (
                            <div
                                key={release.id}
                                className="bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-white/30 transition-all hover:scale-105"
                            >
                                {/* Movie Poster Placeholder */}
                                <div className="aspect-[2/3] bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                                    <Film className="w-20 h-20 text-white/30" />
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    {/* Badge */}
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${badge.color} text-white mb-3`}>
                                        {badge.text}
                                    </span>

                                    {/* Title */}
                                    <h3 className="text-2xl font-bold text-white mb-2">{release.movieName}</h3>

                                    {/* Dates */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-gray-300 text-sm">
                                            <Calendar className="w-4 h-4 text-blue-400" />
                                            <span>Original: {new Date(release.originalReleaseDate).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-yellow-400 text-sm font-semibold">
                                            <Calendar className="w-4 h-4" />
                                            <span>Re-release: {new Date(release.reReleaseDate).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div className="bg-white/5 rounded-lg p-3 mb-4">
                                        <div className="flex items-start gap-2">
                                            <MapPin className="w-4 h-4 text-green-400 mt-0.5" />
                                            <div>
                                                <p className="text-white font-semibold">{release.theaterName}</p>
                                                <p className="text-gray-400 text-sm">{release.city}, {release.state}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        {release.ticketUrl && (
                                            <a
                                                href={release.ticketUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-lg font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2 text-sm"
                                            >
                                                <Ticket className="w-4 h-4" />
                                                Book Now
                                            </a>
                                        )}
                                        <button
                                            onClick={() => addToCalendar(release)}
                                            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                                            title="Add to Calendar"
                                        >
                                            <Calendar className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {filteredReleases.length === 0 && (
                    <div className="text-center py-12">
                        <Film className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg">No re-releases found in {selectedCity}</p>
                    </div>
                )}

                {/* Info Box */}
                <div className="mt-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl p-6">
                    <h3 className="text-white font-bold text-lg mb-2">💡 About Re-releases</h3>
                    <p className="text-gray-300">
                        Re-releases happen for special occasions like hero birthdays, movie anniversaries, or fan celebrations.
                        Book your tickets early as these shows often sell out fast! Follow your favorite heroes to get notified
                        about upcoming re-release shows.
                    </p>
                </div>
            </main>
        </div>
    );
}
