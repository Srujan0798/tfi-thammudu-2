import { Loader2 } from 'lucide-react';

export default function Loading() {
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
            <Loader2 className="w-12 h-12 text-yellow-400 animate-spin" />
            <p className="text-gray-400 font-medium animate-pulse">Loading TFI Timeline...</p>
        </div>
    );
}
