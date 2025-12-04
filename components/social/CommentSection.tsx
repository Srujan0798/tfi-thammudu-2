'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Send, Trash2, Flag } from 'lucide-react';

interface Comment {
    id: string;
    user: {
        id: string;
        name: string;
        avatarUrl?: string;
    };
    text: string;
    createdAt: string;
    isOwn?: boolean;
}

// Mock Data
const MOCK_COMMENTS: Comment[] = [
    {
        id: '1',
        user: { id: 'u2', name: 'Cinema Lover', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80' },
        text: 'Can\'t wait for this! The teaser was mind blowing. 🔥',
        createdAt: '2 hours ago'
    },
    {
        id: '2',
        user: { id: 'u3', name: 'Mega Fan', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80' },
        text: 'Any update on the audio launch date?',
        createdAt: '5 hours ago'
    }
];

export default function CommentSection({ eventId }: { eventId: string }) {
    const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
    const [newComment, setNewComment] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const comment: Comment = {
            id: Date.now().toString(),
            user: {
                id: 'me',
                name: 'You',
                // avatarUrl: user.avatarUrl 
            },
            text: newComment,
            createdAt: 'Just now',
            isOwn: true
        };

        setComments([comment, ...comments]);
        setNewComment('');
    };

    const handleDelete = (id: string) => {
        setComments(comments.filter(c => c.id !== id));
    };

    return (
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Comments <span className="text-sm font-normal text-white/50">({comments.length})</span>
            </h3>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex-shrink-0" />
                <div className="flex-1 relative">
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="w-full bg-slate-900/50 border border-white/10 rounded-full py-2 pl-4 pr-10 text-white placeholder:text-white/30 focus:outline-none focus:border-yellow-500/50 transition-colors"
                    />
                    <button
                        type="submit"
                        disabled={!newComment.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-yellow-500 hover:text-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </form>

            {/* List */}
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3 group">
                        <div className="w-8 h-8 rounded-full bg-slate-800 overflow-hidden relative flex-shrink-0">
                            {comment.user.avatarUrl ? (
                                <Image src={comment.user.avatarUrl} alt={comment.user.name} fill className="object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white/50">
                                    {comment.user.name[0]}
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="bg-white/5 rounded-2xl rounded-tl-none p-3">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-bold text-sm text-white">{comment.user.name}</span>
                                    <span className="text-xs text-white/40">{comment.createdAt}</span>
                                </div>
                                <p className="text-sm text-white/80">{comment.text}</p>
                            </div>

                            <div className="flex items-center gap-4 mt-1 ml-2">
                                <button className="text-xs text-white/40 hover:text-white transition-colors">Like</button>
                                <button className="text-xs text-white/40 hover:text-white transition-colors">Reply</button>
                                {comment.isOwn ? (
                                    <button
                                        onClick={() => handleDelete(comment.id)}
                                        className="text-xs text-red-500/50 hover:text-red-500 transition-colors flex items-center gap-1"
                                    >
                                        <Trash2 className="w-3 h-3" /> Delete
                                    </button>
                                ) : (
                                    <button className="text-xs text-white/20 hover:text-white/50 transition-colors opacity-0 group-hover:opacity-100">
                                        <Flag className="w-3 h-3" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
