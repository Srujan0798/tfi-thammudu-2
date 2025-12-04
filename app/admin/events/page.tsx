import { Calendar, Edit, Trash2, Eye } from 'lucide-react';

export default function EventsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Events</h1>
                    <p className="text-white/60">Manage timeline events and releases.</p>
                </div>
                <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
                    Add Event
                </button>
            </div>

            {/* Event List */}
            <div className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-950/50 border-b border-white/10">
                        <tr>
                            <th className="p-4 text-sm font-medium text-white/60">Event</th>
                            <th className="p-4 text-sm font-medium text-white/60">Date</th>
                            <th className="p-4 text-sm font-medium text-white/60">Category</th>
                            <th className="p-4 text-sm font-medium text-white/60">Status</th>
                            <th className="p-4 text-sm font-medium text-white/60 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                            <tr key={i} className="hover:bg-white/5 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center">
                                            <Calendar className="w-5 h-5 text-white/50" />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium text-sm">Devara Release {i}</p>
                                            <p className="text-white/40 text-xs">Movie Release</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-sm text-white/60">
                                    Oct 10, 2024
                                </td>
                                <td className="p-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400">
                                        Release
                                    </span>
                                </td>
                                <td className="p-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400">
                                        Published
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-2 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-colors">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-colors">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-red-500/10 rounded-lg text-red-400 hover:text-red-300 transition-colors">
                                            <Trash2 className="w-4 h-4" />
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
