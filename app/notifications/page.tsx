import { Bell, Heart, MessageCircle, Star, Settings, Check } from 'lucide-react';

export default function NotificationsPage() {
    return (
        <div className="max-w-2xl mx-auto p-6 pb-24">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Notifications</h1>
                <div className="flex gap-2">
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Mark all as read">
                        <Check className="w-5 h-5 text-white/60" />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Settings">
                        <Settings className="w-5 h-5 text-white/60" />
                    </button>
                </div>
            </div>

            <div className="space-y-2">
                {[
                    { type: 'like', text: 'User123 liked your comment', time: '2m ago', icon: Heart, color: 'bg-red-500', read: false },
                    { type: 'reply', text: 'MegaFan replied to you', time: '15m ago', icon: MessageCircle, color: 'bg-blue-500', read: false },
                    { type: 'system', text: 'You reached Level 5!', time: '1h ago', icon: Star, color: 'bg-yellow-500', read: true },
                    { type: 'system', text: 'Welcome to TFI Timeline!', time: '1d ago', icon: Bell, color: 'bg-purple-500', read: true },
                ].map((notif, i) => (
                    <div key={i} className={`flex gap-4 p-4 rounded-xl border transition-colors ${notif.read ? 'bg-slate-900 border-transparent opacity-60' : 'bg-slate-800 border-white/10'}`}>
                        <div className={`w-10 h-10 rounded-full ${notif.color} flex items-center justify-center shrink-0`}>
                            <notif.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="text-white font-medium">{notif.text}</p>
                            <p className="text-xs text-white/40 mt-1">{notif.time}</p>
                        </div>
                        {!notif.read && (
                            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
