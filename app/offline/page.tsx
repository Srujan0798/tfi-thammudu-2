'use client';

import { WifiOff } from 'lucide-react';

export default function OfflinePage() {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 text-center">
            <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-6">
                <WifiOff className="w-10 h-10 text-white/50" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">You&apos;re Offline</h1>
            <p className="text-gray-400 mb-8">It looks like you&apos;re offline. Check your internet connection.</p>
            <button
                onClick={() => window.location.reload()}
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-3 px-8 rounded-xl transition-colors"
            >
                Try Again
            </button>
        </div>
    );
}
