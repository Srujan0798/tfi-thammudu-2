import { Download, RefreshCw, Database, ShieldCheck } from 'lucide-react';

export default function BackupPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Backup & Restore</h1>
                    <p className="text-white/60">Manage database backups and disaster recovery.</p>
                </div>
                <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    Create Backup Now
                </button>
            </div>

            {/* Backup List */}
            <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-950/50 border-b border-white/10">
                        <tr>
                            <th className="p-4 text-sm font-medium text-white/60">Backup ID</th>
                            <th className="p-4 text-sm font-medium text-white/60">Date</th>
                            <th className="p-4 text-sm font-medium text-white/60">Size</th>
                            <th className="p-4 text-sm font-medium text-white/60">Type</th>
                            <th className="p-4 text-sm font-medium text-white/60">Status</th>
                            <th className="p-4 text-sm font-medium text-white/60 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {[1, 2, 3].map((_, i) => (
                            <tr key={i} className="hover:bg-white/5 transition-colors">
                                <td className="p-4 text-sm text-white font-mono">
                                    bkp_20241024_{i}
                                </td>
                                <td className="p-4 text-sm text-white/60">
                                    Oct 24, 2024 14:00
                                </td>
                                <td className="p-4 text-sm text-white/60">
                                    45.2 MB
                                </td>
                                <td className="p-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400">
                                        Automated
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2 text-green-400 text-sm">
                                        <ShieldCheck className="w-4 h-4" />
                                        <span>Verified</span>
                                    </div>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-2 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-colors" title="Download">
                                            <Download className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-red-500/10 rounded-lg text-red-400 hover:text-red-300 transition-colors" title="Restore">
                                            <RefreshCw className="w-4 h-4" />
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
