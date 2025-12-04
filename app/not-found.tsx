import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-4 text-center">
            <h1 className="text-9xl font-black text-white/5 mb-4">404</h1>
            <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
            <p className="text-gray-400 max-w-md mb-8">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <div className="flex gap-4">
                <Link
                    href="/"
                    className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-xl transition-colors flex items-center gap-2"
                >
                    <Home className="w-5 h-5" />
                    Go Home
                </Link>
                <Link
                    href="/calendar"
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-colors flex items-center gap-2"
                >
                    <Search className="w-5 h-5" />
                    Browse Events
                </Link>
            </div>
        </div>
    );
}
