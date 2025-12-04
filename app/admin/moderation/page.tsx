import { Check, X, AlertTriangle } from 'lucide-react';

export default function ModerationPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Content Moderation</h1>
                <p className="text-gray-400 text-sm">Review and manage user-generated content to ensure community guidelines are met. You can approve, reject, or flag content for further review.</p>
            </div>

            {/* Queue */}
            <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-950/50 border-b border-white/10">
                        <tr>
                            <th className="p-4 text-sm font-medium text-white/60">Type</th>
                            <th className="p-4 text-sm font-medium text-white/60">Content</th>
                            <th className="p-4 text-sm font-medium text-white/60">Report Reason</th>
                            <th className="p-4 text-sm font-medium text-white/60">Reporter</th>
                            <th className="p-4 text-sm font-medium text-white/60 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {[1, 2, 3].map((_, i) => (
                            <tr key={i} className="hover:bg-white/5 transition-colors">
                                <td className="p-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400">
                                        Comment
                                    </span>
                                </td>
                                <td className="p-4">
                                    <p className="text-white text-sm max-w-md truncate">
                                        This movie is absolute trash! Don&apos;t watch it...
                                    </p>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2 text-red-400 text-sm">
                                        <AlertTriangle className="w-4 h-4" />
                                        <span>Hate Speech</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-slate-800" />
                                        <span className="text-white text-sm">user123</span>
                                    </div>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-2 hover:bg-green-500/20 text-green-400 rounded-lg transition-colors">
                                            <Check className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
