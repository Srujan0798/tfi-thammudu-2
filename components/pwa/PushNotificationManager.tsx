'use client';

import { useState, useEffect } from 'react';
import { Bell, BellOff } from 'lucide-react';
import { subscribeUserToPush } from '@/lib/pwa/push';

export default function PushNotificationManager() {
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [permission, setPermission] = useState<NotificationPermission>('default');

    useEffect(() => {
        if ('Notification' in window) {
            if (Notification.permission !== 'default') {
                setTimeout(() => setPermission(Notification.permission), 0);
            }
        }
    }, []);

    const handleSubscribe = async () => {
        const subscription = await subscribeUserToPush();
        if (subscription) {
            setIsSubscribed(true);
            setPermission('granted');
        }
    };

    if (permission === 'denied') {
        return (
            <div className="text-xs text-red-400 flex items-center gap-1">
                <BellOff className="w-3 h-3" />
                Notifications blocked
            </div>
        );
    }

    if (isSubscribed || permission === 'granted') {
        return (
            <div className="text-xs text-green-400 flex items-center gap-1">
                <Bell className="w-3 h-3" />
                Notifications enabled
            </div>
        );
    }

    return (
        <button
            onClick={handleSubscribe}
            className="flex items-center gap-2 text-xs bg-yellow-500/10 text-yellow-500 px-3 py-1.5 rounded-full hover:bg-yellow-500/20 transition-colors"
        >
            <Bell className="w-3 h-3" />
            Enable Notifications
        </button>
    );
}
