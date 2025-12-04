import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileStats from '@/components/profile/ProfileStats';
import ProfileTabs from '@/components/profile/ProfileTabs';
import SharedCalendarView from '@/components/calendar/SharedCalendarView';
import { Calendar, Star, Clock } from 'lucide-react';

interface PageProps {
    params: Promise<{ id: string }>;
}

// Mock data fetcher
async function getUserProfile(userId: string) {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
        id: userId,
        name: 'Ravi Teja Fan',
        username: 'mass_raja_fan',
        avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80',
        bio: 'Die hard fan of Mass Maharaja! Cinema is life. 🎬✨',
        location: 'Hyderabad, India',
        joinDate: 'January 2024',
        stats: {
            followers: 1240,
            following: 85,
            events: 42
        },
        recentEvents: [
            { id: '1', title: 'Eagle Release', date: '2024-02-09', type: 'Release' },
            { id: '2', title: 'Mr. Bachchan Audio Launch', date: '2024-07-15', type: 'Audio Launch' },
            { id: '3', title: 'RT75 Announcement', date: '2024-08-20', type: 'Announcement' },
        ]
    };
}

export default async function PublicProfilePage({ params }: PageProps) {
    const { id } = await params;
    const user = await getUserProfile(id);

    return (
        <div className="min-h-screen bg-black pb-20">
            <ProfileHeader user={user} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: About / Favorites */}
                    <div className="space-y-6">
                        <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Star className="w-5 h-5 text-yellow-500" />
                                Favorites
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <span className="text-xs text-white/50 uppercase tracking-wider block mb-1">Heroes</span>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-white/5 rounded-full text-sm text-white">Ravi Teja</span>
                                        <span className="px-3 py-1 bg-white/5 rounded-full text-sm text-white">Chiranjeevi</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-xs text-white/50 uppercase tracking-wider block mb-1">Directors</span>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-white/5 rounded-full text-sm text-white">Puri Jagannadh</span>
                                        <span className="px-3 py-1 bg-white/5 rounded-full text-sm text-white">Harish Shankar</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Activity / Events */}
                    <div className="lg:col-span-2 space-y-6">
                        <SharedCalendarView events={user.recentEvents} userName={user.name} />

                        <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-blue-400" />
                                Recent Activity
                            </h3>

                            <div className="space-y-4">
                                {user.recentEvents.map((event) => (
                                    <div key={event.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                                            <Calendar className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-white">{event.title}</h4>
                                            <p className="text-sm text-white/60">Added to calendar • {event.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
