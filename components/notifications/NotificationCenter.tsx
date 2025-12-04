import { Bell, X, Check, Trash2, Loader2, Sparkles, Star, Clock, Info } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    read: boolean;
    type: 'event' | 'reminder' | 'system';
    priority?: 'Urgent' | 'Important' | 'Normal';
}

const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: '1',
        title: 'Kalki 2898 AD Tickets',
        message: 'Bookings open in 1 hour! Get ready!',
        time: '10 min ago',
        read: false,
        type: 'event',
        priority: 'Urgent' // Pre-calculated for mock
    },
    {
        id: '2',
        title: 'Devara Glimpse',
        message: 'New glimpse released. Watch now!',
        time: '2 hours ago',
        read: false,
        type: 'event',
        priority: 'Important'
    },
    {
        id: '3',
        title: 'System Update',
        message: 'We have improved the calendar performance.',
        time: '1 day ago',
        read: true,
        type: 'system',
        priority: 'Normal'
    }
];

interface NotificationCenterProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
    const [activeTab, setActiveTab] = useState<'all' | 'mentions' | 'system'>('all');
    const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
    const [summary, setSummary] = useState<string | null>(null);
    const [isSummarizing, setIsSummarizing] = useState(false);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const deleteNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const handleSummarize = async () => {
        setIsSummarizing(true);
        try {
            const response = await fetch('/api/ai/notifications/summary', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ notifications: notifications.filter(n => !n.read) }),
            });
            const data = await response.json();
            if (data.success) {
                setSummary(data.summary);
            }
        } catch (error) {
            console.error('Failed to summarize', error);
        } finally {
            setIsSummarizing(false);
        }
    };

    return (
        <div className="relative">
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop for mobile */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="fixed inset-0 bg-black/50 z-40 md:hidden"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
                        >
                            <div className="flex items-center justify-between p-4 border-b border-white/10">
                                <h3 className="font-bold text-white">Notifications</h3>
                                <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/20">
                                <div className="flex gap-2">
                                    {unreadCount > 0 && (
                                        <button
                                            onClick={markAllAsRead}
                                            className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                                        >
                                            Mark all read
                                        </button>
                                    )}
                                </div>
                            </div>

                            {unreadCount > 1 && !summary && (
                                <div className="p-2 bg-purple-500/10 border-b border-purple-500/20">
                                    <button
                                        onClick={handleSummarize}
                                        disabled={isSummarizing}
                                        className="w-full py-2 flex items-center justify-center gap-2 text-xs font-medium text-purple-300 hover:bg-purple-500/20 rounded-lg transition-colors"
                                    >
                                        {isSummarizing ? (
                                            <Loader2 className="w-3 h-3 animate-spin" />
                                        ) : (
                                            <Sparkles className="w-3 h-3" />
                                        )}
                                        Summarize Missed Updates
                                    </button>
                                </div>
                            )}

                            {summary && (
                                <div className="p-4 bg-gradient-to-r from-purple-900/50 to-slate-900 border-b border-white/10">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center gap-2 text-purple-300">
                                            <Sparkles className="w-3 h-3" />
                                            <span className="text-xs font-bold uppercase">AI Summary</span>
                                        </div>
                                        <button onClick={() => setSummary(null)}>
                                            <X className="w-3 h-3 text-gray-500 hover:text-white" />
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-300 leading-relaxed">
                                        {summary}
                                    </p>
                                </div>
                            )}

                            <div className="max-h-[400px] overflow-y-auto">
                                {notifications.length === 0 ? (
                                    <div className="p-8 text-center text-gray-500 text-sm">
                                        No notifications yet
                                    </div>
                                ) : (
                                    <div className="divide-y divide-white/5">
                                        {notifications.map((notification) => (
                                            <div
                                                key={notification.id}
                                                className={`p-4 hover:bg-white/5 transition-colors relative group ${!notification.read ? 'bg-white/[0.02]' : ''}`}
                                            >
                                                <div className="flex gap-3">
                                                    <div className="mt-1">
                                                        {notification.type === 'event' && <Star className="w-4 h-4 text-yellow-500" />}
                                                        {notification.type === 'reminder' && <Clock className="w-4 h-4 text-blue-500" />}
                                                        {notification.type === 'system' && <Info className="w-4 h-4 text-gray-500" />}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex justify-between items-start mb-1">
                                                            <h4 className={`text-sm font-medium ${!notification.read ? 'text-white' : 'text-gray-400'}`}>
                                                                {notification.title}
                                                            </h4>
                                                            <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                                                                {notification.time}
                                                            </span>
                                                        </div>
                                                        <p className="text-xs text-gray-400 mb-2">
                                                            {notification.message}
                                                        </p>
                                                        {notification.priority === 'Urgent' && (
                                                            <span className="inline-block px-1.5 py-0.5 bg-red-500/20 text-red-400 text-[10px] font-bold rounded uppercase tracking-wider">
                                                                Urgent
                                                            </span>
                                                        )}
                                                    </div>
                                                    <button
                                                        onClick={() => deleteNotification(notification.id)}
                                                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded transition-all absolute top-2 right-2"
                                                    >
                                                        <X className="w-3 h-3 text-gray-500" />
                                                    </button>
                                                </div>
                                                {!notification.read && (
                                                    <button
                                                        onClick={() => markAsRead(notification.id)}
                                                        className="absolute bottom-2 right-2 p-1 hover:bg-blue-500/20 rounded-full transition-colors"
                                                        title="Mark as read"
                                                    >
                                                        <Check className="w-3 h-3 text-blue-400" />
                                                    </button>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
