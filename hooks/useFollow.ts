import { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';

// Mock storage for follows since we don't have a real DB connection yet
// In a real app, this would be a Supabase table
const MOCK_FOLLOWS: Record<string, string[]> = {
    'user-1': ['user-2', 'user-3'], // user-1 follows user-2 and user-3
};

export function useFollow(targetUserId: string) {
    const { user } = useAuth();
    const [isFollowing, setIsFollowing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [followerCount, setFollowerCount] = useState(0);

    useEffect(() => {
        if (user) {
            checkFollowStatus();
        }
        fetchFollowerCount();
    }, [targetUserId]); // checkFollowStatus is stable

    const checkFollowStatus = async () => {
        // Simulate API call
        // const { data } = await supabase.from('follows').select('*').match({ follower_id: user.id, following_id: targetUserId });
        if (user && MOCK_FOLLOWS[user.id]?.includes(targetUserId)) {
            setIsFollowing(true);
        } else {
            setIsFollowing(false);
        }
    };

    const fetchFollowerCount = async () => {
        // Simulate API call
        // const { count } = await supabase.from('follows').select('*', { count: 'exact' }).eq('following_id', targetUserId);
        // Mock count
        setFollowerCount(Math.floor(Math.random() * 1000));
    };

    const toggleFollow = async () => {
        if (!user) return;
        setIsLoading(true);

        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));

            if (isFollowing) {
                // Unfollow logic
                // await supabase.from('follows').delete().match({ follower_id: user.id, following_id: targetUserId });
                setIsFollowing(false);
                setFollowerCount(prev => prev - 1);
                // Update mock
                if (MOCK_FOLLOWS[user.id]) {
                    MOCK_FOLLOWS[user.id] = MOCK_FOLLOWS[user.id].filter(id => id !== targetUserId);
                }
            } else {
                // Follow logic
                // await supabase.from('follows').insert({ follower_id: user.id, following_id: targetUserId });
                setIsFollowing(true);
                setFollowerCount(prev => prev + 1);
                // Update mock
                if (!MOCK_FOLLOWS[user.id]) MOCK_FOLLOWS[user.id] = [];
                MOCK_FOLLOWS[user.id].push(targetUserId);
            }
        } catch (error) {
            console.error('Error toggling follow:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return { isFollowing, isLoading, followerCount, toggleFollow };
}
