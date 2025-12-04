'use client';

import { useState, useEffect } from 'react';
import { Search, X, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface UserResult {
    id: string;
    name: string;
    username: string;
    avatarUrl?: string;
    isFollowing?: boolean;
}

// Mock Data
const MOCK_USERS: UserResult[] = [
    { id: 'u1', name: 'Ravi Teja Fan', username: 'mass_raja', avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80', isFollowing: false },
    { id: 'u2', name: 'Cinema Lover', username: 'movie_buff', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80', isFollowing: true },
    { id: 'u3', name: 'Mega Fan', username: 'boss_is_back', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80', isFollowing: false },
    { id: 'u4', name: 'TFI Tracker', username: 'tfi_updates', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80', isFollowing: true },
];

export default function UserSearch() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<UserResult[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (query.trim().length > 0) {
            // Simulate search
            const filtered = MOCK_USERS.filter(u =>
                u.name.toLowerCase().includes(query.toLowerCase()) ||
                u.username.toLowerCase().includes(query.toLowerCase())
            );
            const timer = setTimeout(() => {
                setResults(filtered);
                setIsOpen(true);
            }, 300);
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => {
                setResults([]);
                setIsOpen(false);
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [query]);

    return (
        <div className="relative w-full max-w-md">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                    type="text"
                    placeholder="Search fans, friends..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-full py-2 pl-10 pr-10 text-white placeholder:text-white/30 focus:outline-none focus:border-yellow-500/50 transition-colors"
                />
                {query && (
                    <button
                        onClick={() => setQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Dropdown Results */}
            {isOpen && results.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                    {results.map((user) => (
                        <Link
                            key={user.id}
                            href={`/profile/${user.id}`}
                            className="flex items-center gap-3 p-3 hover:bg-white/5 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="w-10 h-10 rounded-full bg-slate-800 overflow-hidden relative flex-shrink-0">
                                {user.avatarUrl ? (
                                    <Image src={user.avatarUrl} alt={user.name} fill className="object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-white/50">
                                        <User className="w-5 h-5" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-white truncate">{user.name}</h4>
                                <p className="text-xs text-white/50 truncate">@{user.username}</p>
                            </div>
                            {user.isFollowing && (
                                <span className="text-[10px] font-bold bg-white/10 text-white/70 px-2 py-1 rounded-full">
                                    Following
                                </span>
                            )}
                        </Link>
                    ))}
                    <Link
                        href={`/search/users?q=${query}`}
                        className="block p-3 text-center text-sm text-yellow-500 hover:bg-white/5 font-medium border-t border-white/5"
                    >
                        See all results
                    </Link>
                </div>
            )}
        </div>
    );
}
