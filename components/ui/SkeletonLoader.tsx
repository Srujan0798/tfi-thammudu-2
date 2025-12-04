export default function SkeletonLoader() {
    return (
        <div className="animate-pulse space-y-4">
            <div className="h-48 bg-slate-800 rounded-xl w-full"></div>
            <div className="space-y-2">
                <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                <div className="h-4 bg-slate-800 rounded w-1/2"></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div className="h-32 bg-slate-800 rounded-xl"></div>
                <div className="h-32 bg-slate-800 rounded-xl"></div>
                <div className="h-32 bg-slate-800 rounded-xl"></div>
            </div>
        </div>
    );
}
