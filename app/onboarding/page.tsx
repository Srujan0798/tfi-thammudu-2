'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';
import { Check, ChevronRight, Star, Clapperboard, Bell, Sparkles } from 'lucide-react';

const HEROES = [
    { id: 'prabhas', name: 'Prabhas', image: '/heroes/prabhas.jpg' },
    { id: 'pk', name: 'Pawan Kalyan', image: '/heroes/pk.jpg' },
    { id: 'mb', name: 'Mahesh Babu', image: '/heroes/mb.jpg' },
    { id: 'aa', name: 'Allu Arjun', image: '/heroes/aa.jpg' },
    { id: 'ntr', name: 'Jr NTR', image: '/heroes/ntr.jpg' },
    { id: 'rc', name: 'Ram Charan', image: '/heroes/rc.jpg' },
];

const DIRECTORS = [
    { id: 'ssr', name: 'Rajamouli' },
    { id: 'trivikram', name: 'Trivikram' },
    { id: 'sukumar', name: 'Sukumar' },
    { id: 'neel', name: 'Prashanth Neel' },
    { id: 'sandeep', name: 'Sandeep Vanga' },
    { id: 'nag', name: 'Nag Ashwin' },
];

export default function OnboardingPage() {
    const { user } = useAuth();
    const router = useRouter();
    const supabase = createClient();

    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selections, setSelections] = useState({
        heroes: [] as string[],
        directors: [] as string[],
        notifications: {
            releases: true,
            updates: true,
            rumors: false
        }
    });

    const toggleHero = (name: string) => {
        setSelections(prev => ({
            ...prev,
            heroes: prev.heroes.includes(name)
                ? prev.heroes.filter(h => h !== name)
                : [...prev.heroes, name]
        }));
    };

    const toggleDirector = (name: string) => {
        setSelections(prev => ({
            ...prev,
            directors: prev.directors.includes(name)
                ? prev.directors.filter(d => d !== name)
                : [...prev.directors, name]
        }));
    };

    const handleComplete = async () => {
        if (!user) return;
        setLoading(true);

        try {
            const { error } = await supabase
                .from('users')
                .update({
                    favorite_heroes: selections.heroes,
                    favorite_directors: selections.directors,
                    preferences: { notifications: selections.notifications },
                    is_onboarded: true,
                    updated_at: new Date().toISOString()
                })
                .eq('id', user.id);

            if (error) throw error;

            router.push('/calendar');
        } catch (error) {
            console.error('Onboarding failed:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                {/* Progress Bar */}
                <div className="flex gap-2 mb-8">
                    {[1, 2, 3, 4].map(i => (
                        <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-white/10'}`}
                        />
                    ))}
                </div>

                <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 min-h-[500px] flex flex-col">

                    {/* Step 1: Welcome */}
                    {step === 1 && (
                        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center animate-pulse">
                                <Sparkles className="w-10 h-10 text-black" />
                            </div>
                            <h1 className="text-4xl font-bold text-white">Welcome to TFI Timeline</h1>
                            <p className="text-xl text-gray-400 max-w-md">
                                Your personal gateway to the Telugu Film Industry. Let&apos;s personalize your experience.
                            </p>
                        </div>
                    )}

                    {/* Step 2: Heroes */}
                    {step === 2 && (
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-white mb-2">Who are your favorite stars?</h2>
                            <p className="text-gray-400 mb-6">We&apos;ll highlight their movies and updates for you.</p>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {HEROES.map(hero => (
                                    <button
                                        key={hero.id}
                                        onClick={() => toggleHero(hero.name)}
                                        className={`p-4 rounded-xl border transition-all text-left group ${selections.heroes.includes(hero.name)
                                            ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <Star className={`w-5 h-5 ${selections.heroes.includes(hero.name) ? 'fill-yellow-400' : ''}`} />
                                            {selections.heroes.includes(hero.name) && <Check className="w-4 h-4" />}
                                        </div>
                                        <span className="font-semibold">{hero.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Directors */}
                    {step === 3 && (
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-white mb-2">Favorite Directors?</h2>
                            <p className="text-gray-400 mb-6">Follow the visionaries behind the magic.</p>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {DIRECTORS.map(director => (
                                    <button
                                        key={director.id}
                                        onClick={() => toggleDirector(director.name)}
                                        className={`p-4 rounded-xl border transition-all text-left ${selections.directors.includes(director.name)
                                            ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                                            : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <Clapperboard className="w-5 h-5" />
                                            {selections.directors.includes(director.name) && <Check className="w-4 h-4" />}
                                        </div>
                                        <span className="font-semibold">{director.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 4: Notifications */}
                    {step === 4 && (
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-white mb-2">Stay Updated</h2>
                            <p className="text-gray-400 mb-6">Choose what you want to be notified about.</p>

                            <div className="space-y-4">
                                {[
                                    { id: 'releases', label: 'Movie Releases', desc: 'Get notified on release days' },
                                    { id: 'updates', label: 'Major Updates', desc: 'Teasers, trailers, and announcements' },
                                    { id: 'rumors', label: 'TFI Rumors', desc: 'Unconfirmed buzz and gossip' }
                                ].map(opt => (
                                    <div key={opt.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                                        <div>
                                            <h3 className="font-semibold text-white">{opt.label}</h3>
                                            <p className="text-sm text-gray-400">{opt.desc}</p>
                                        </div>
                                        <button
                                            onClick={() => setSelections(prev => ({
                                                ...prev,
                                                notifications: { ...prev.notifications, [opt.id]: !prev.notifications[opt.id as keyof typeof prev.notifications] }
                                            }))}
                                            className={`w-12 h-6 rounded-full transition-colors relative ${selections.notifications[opt.id as keyof typeof selections.notifications]
                                                ? 'bg-green-500'
                                                : 'bg-gray-600'
                                                }`}
                                        >
                                            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${selections.notifications[opt.id as keyof typeof selections.notifications]
                                                ? 'left-7'
                                                : 'left-1'
                                                }`} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="mt-8 flex justify-between pt-6 border-t border-white/10">
                        <button
                            onClick={() => step > 1 && setStep(s => s - 1)}
                            className={`px-6 py-3 text-gray-400 hover:text-white transition-colors ${step === 1 ? 'invisible' : ''}`}
                        >
                            Back
                        </button>

                        <button
                            onClick={() => step < 4 ? setStep(s => s + 1) : handleComplete()}
                            disabled={loading}
                            className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-xl hover:scale-[1.02] transition-transform flex items-center gap-2 disabled:opacity-50"
                        >
                            {loading ? 'Setting up...' : step === 4 ? 'Get Started' : 'Next'}
                            {!loading && <ChevronRight className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
