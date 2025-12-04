'use client';

import { BadgeCheck } from 'lucide-react';

interface VerificationBadgeProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export default function VerificationBadge({ size = 'md', className = '' }: VerificationBadgeProps) {
    const sizeClasses = {
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-6 h-6'
    };

    return (
        <span className={`inline-flex items-center justify-center text-blue-400 ${className}`} title="Verified Creator">
            <BadgeCheck className={`${sizeClasses[size]} fill-current`} />
        </span>
    );
}
