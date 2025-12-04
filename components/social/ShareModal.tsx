'use client';

import { Copy, Check, Twitter, Facebook, MessageCircle, Link as LinkIcon } from 'lucide-react';
import { useState } from 'react';

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    url: string;
    text?: string;
}

export default function ShareModal({ isOpen, onClose, title, url, text }: ShareModalProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const shareLinks = [
        {
            name: 'Twitter',
            icon: Twitter,
            color: 'bg-blue-400',
            href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text || title)}&url=${encodeURIComponent(url)}`
        },
        {
            name: 'WhatsApp',
            icon: MessageCircle,
            color: 'bg-green-500',
            href: `https://wa.me/?text=${encodeURIComponent(`${text || title} ${url}`)}`
        },
        {
            name: 'Facebook',
            icon: Facebook,
            color: 'bg-blue-600',
            href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        }
    ];

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-slate-900 border border-white/10 text-white rounded-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
                <div className="mb-4">
                    <h3 className="text-xl font-bold">Share this</h3>
                </div>

                <div className="space-y-6 py-4">
                    {/* Social Buttons */}
                    <div className="grid grid-cols-3 gap-4">
                        {shareLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-2 group"
                            >
                                <div className={`w-12 h-12 rounded-full ${link.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                    <link.icon className="w-6 h-6" />
                                </div>
                                <span className="text-xs text-white/60 group-hover:text-white transition-colors">{link.name}</span>
                            </a>
                        ))}
                    </div>

                    {/* Copy Link */}
                    <div className="bg-black/20 rounded-xl p-4 flex items-center gap-3 border border-white/5">
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                            <LinkIcon className="w-5 h-5 text-white/50" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-white/40 mb-1">Page Link</p>
                            <p className="text-sm text-white truncate font-mono">{url}</p>
                        </div>
                        <button
                            onClick={handleCopy}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/70 hover:text-white"
                        >
                            {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
