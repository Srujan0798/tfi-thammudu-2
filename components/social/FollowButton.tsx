'use client';

import { useState } from 'react';
import { useFollow } from '@/hooks/useFollow';
import { UserPlus, UserCheck, Loader2 } from 'lucide-react';

interface FollowButtonProps {
    targetUserId: string;
    initialIsFollowing?: boolean;
}

export default function FollowButton({ targetUserId, initialIsFollowing = false }: FollowButtonProps) {
    const { isFollowing, isLoading, toggleFollow } = useFollow(targetUserId);

    // Use local state for immediate feedback if needed, but hook handles it

    return (
        <button
            onClick={toggleFollow}
            disabled={isLoading}
            className={`
                flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-200
                ${isFollowing
                    ? 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                    : 'bg-yellow-500 text-black hover:bg-yellow-400 shadow-lg shadow-yellow-500/20'
                }
                ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}
            `}
        >
            {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
            ) : isFollowing ? (
                <>
                    <UserCheck className="w-4 h-4" />
                    <span>Following</span>
                </>
            ) : (
                <>
                    <UserPlus className="w-4 h-4" />
                    <span>Follow</span>
                </>
            )}
        </button>
    );
}
