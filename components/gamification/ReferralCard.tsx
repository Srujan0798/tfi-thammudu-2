'use client';

import { Copy, Share2, Users } from 'lucide-react';
import { useState } from 'react';

export default function ReferralCard() {
    const [copied, setCopied] = useState(false);
    const referralCode = 'ROSHWIN123';
    const referralLink = `https://tfi.com/join?ref=${referralCode}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Users className="w-32 h-32" />
            </div>

            <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-2">Invite Friends</h2>
                <p className="text-blue-100 mb-6 max-w-sm">
                    Earn <span className="font-bold text-yellow-400">100 XP</span> for every friend who joins TFI Timeline using your link!
                </p>

                <div className="bg-black/20 rounded-lg p-1 flex items-center gap-2 mb-4">
                    <div className="flex-1 px-3 py-2 font-mono text-sm truncate opacity-80">
                        {referralLink}
                    </div>
                    <button
                        onClick={handleCopy}
                        className="bg-white text-blue-600 px-4 py-2 rounded-md font-bold text-sm hover:bg-blue-50 transition-colors"
                    >
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>

                <div className="flex gap-4 text-sm font-medium text-blue-200">
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-white">12</span>
                        <span>Referrals</span>
                    </div>
                    <div className="w-px bg-white/20"></div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-yellow-400">1,200</span>
                        <span>XP Earned</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
