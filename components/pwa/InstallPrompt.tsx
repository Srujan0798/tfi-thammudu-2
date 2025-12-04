'use client';

import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handler = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setIsVisible(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            setDeferredPrompt(null);
            setIsVisible(false);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-slate-900 border border-yellow-500/30 rounded-xl p-4 shadow-2xl z-50 flex items-center gap-4 animate-in slide-in-from-bottom-10">
            <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Download className="w-6 h-6 text-black" />
            </div>
            <div className="flex-1">
                <h4 className="font-bold text-white">Install TFI Timeline</h4>
                <p className="text-xs text-white/60">Add to home screen for better experience</p>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={handleInstall}
                    className="bg-white text-black text-xs font-bold px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                >
                    Install
                </button>
                <button
                    onClick={() => setIsVisible(false)}
                    className="p-2 hover:bg-white/10 rounded-lg text-white/50 hover:text-white"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
