'use client';

import { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';

export default function OfflineIndicator() {
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Initial check
        if (typeof window !== 'undefined') {
            setTimeout(() => setIsOffline(!navigator.onLine), 0);
        }

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    if (!isOffline) return null;

    return (
        <div className="fixed top-0 left-0 right-0 bg-red-500 text-white text-xs font-bold py-1 text-center z-[100] flex items-center justify-center gap-2 animate-in slide-in-from-top">
            <WifiOff className="w-3 h-3" />
            You are currently offline. Some features may be unavailable.
        </div>
    );
}
