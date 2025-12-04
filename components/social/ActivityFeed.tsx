import { Heart, MessageCircle, UserPlus, Star } from 'lucide-react';

export default function ActivityFeed() {
    return (
        <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Activity Feed</h3>
            <div className="space-y-6">
                {[
                    { type: 'like', user: 'User123', target: 'Devara Release', time: '2m ago', icon: Heart, color: 'text-red-400' },
                    { type: 'comment', user: 'MegaFan', target: 'Game Changer', time: '15m ago', icon: MessageCircle, color: 'text-blue-400' },
                    { type: 'follow', user: 'CinemaLover', target: 'You', time: '1h ago', icon: UserPlus, color: 'text-green-400' },
                    { type: 'level', user: 'TFI_King', target: 'Level 5', time: '2h ago', icon: Star, color: 'text-yellow-400' },
                ].map((activity, i) => (
                    <div key={i} className="flex gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-slate-800" />
                            <div className="absolute -bottom-1 -right-1 bg-slate-900 rounded-full p-0.5">
                                <activity.icon className={`w-3 h-3 ${activity.color}`} />
                            </div>
                        </div>
                        <div>
                            <p className="text-sm text-white">
                                <span className="font-bold">{activity.user}</span>
                                <span className="text-white/60"> {activity.type === 'like' ? 'liked' : activity.type === 'comment' ? 'commented on' : activity.type === 'follow' ? 'started following' : 'reached'} </span>
                                <span className="font-medium text-white">{activity.target}</span>
                            </p>
                            <p className="text-xs text-white/40">{activity.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
