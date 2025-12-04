'use client';

import { Home, Calendar, Search, User, Bell } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileNav() {
    const pathname = usePathname();

    const links = [
        { href: '/feed', icon: Home, label: 'Home' },
        { href: '/calendar', icon: Calendar, label: 'Timeline' },
        { href: '/search/users', icon: Search, label: 'Search' },
        { href: '/notifications', icon: Bell, label: 'Alerts' },
        { href: '/profile/settings', icon: User, label: 'Profile' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur border-t border-white/10 pb-safe pt-2 px-4 md:hidden z-50">
            <div className="flex justify-between items-center">
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${isActive ? 'text-yellow-500' : 'text-white/50 hover:text-white'}`}
                        >
                            <link.icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} />
                            <span className="text-[10px] font-medium">{link.label}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
