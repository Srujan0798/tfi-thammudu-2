import UserSearch from '@/components/social/UserSearch';
import { Users } from 'lucide-react';

export default function UserSearchPage() {
    return (
        <div className="min-h-screen bg-black pb-20 pt-24">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center mb-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-orange-500/20">
                        <Users className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Find TFI Fans</h1>
                    <p className="text-white/60 max-w-md">
                        Connect with other fans, share your excitement, and build your cinema circle.
                    </p>
                </div>

                <div className="flex justify-center mb-12">
                    <UserSearch />
                </div>

                {/* Categories / Suggestions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
                        <h3 className="font-bold text-white mb-4">Popular Profiles</h3>
                        <div className="space-y-4">
                            {/* Placeholder for popular profiles */}
                            <p className="text-sm text-white/40 italic">Start searching to see results...</p>
                        </div>
                    </div>

                    <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
                        <h3 className="font-bold text-white mb-4">New Joiners</h3>
                        <div className="space-y-4">
                            {/* Placeholder for new users */}
                            <p className="text-sm text-white/40 italic">Start searching to see results...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
