import { Clock, Search, Filter } from 'lucide-react';

export default function AuditLogsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Audit Logs</h1>
                    <p className="text-white/60">Track all administrative actions.</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                        <input
                            type="text"
                            placeholder="Search logs..."
                            className="bg-slate-900 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white text-sm focus:outline-none focus:border-yellow-500"
                        />
                    </div>
                    <button className="p-2 bg-slate-900 border border-white/10 rounded-lg text-white/60 hover:text-white">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Logs Table */}
            <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-950/50 border-b border-white/10">
                        <tr>
                            <th className="p-4 text-sm font-medium text-white/60">Action</th>
                            <th className="p-4 text-sm font-medium text-white/60">Admin</th>
                            <th className="p-4 text-sm font-medium text-white/60">Target</th>
                            <th className="p-4 text-sm font-medium text-white/60">Details</th>
                            <th className="p-4 text-sm font-medium text-white/60 text-right">Time</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
                            <tr key={i} className="hover:bg-white/5 transition-colors">
                                <td className="p-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400">
                                        UPDATE_USER
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-slate-800" />
                                        <span className="text-white text-sm">admin_user</span>
                                    </div>
                                </td>
                                <td className="p-4 text-sm text-white/80">
                                    user_12345
                                </td>
                                <td className="p-4 text-sm text-white/60 max-w-xs truncate">
                                    Changed role from USER to MODERATOR
                                </td>
                                <td className="p-4 text-right text-sm text-white/40 font-mono">
                                    2024-10-24 14:32:01
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
