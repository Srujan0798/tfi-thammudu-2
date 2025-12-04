import { Users, Calendar, Shield, Activity } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-white/60">Overview of system activity and performance.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Users', value: '12,345', icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                    { label: 'Total Events', value: '843', icon: Calendar, color: 'text-green-400', bg: 'bg-green-500/10' },
                    { label: 'Pending Reports', value: '23', icon: Shield, color: 'text-red-400', bg: 'bg-red-500/10' },
                    { label: 'Active Now', value: '142', icon: Activity, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
                ].map((stat, i) => (
                    <div key={i} className="bg-slate-900 border border-white/10 rounded-xl p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-lg ${stat.bg}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-1 rounded">+12%</span>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                        <p className="text-sm text-white/50">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
                <div className="space-y-6">
                    {[1, 2, 3, 4, 5].map((_, i) => (
                        <div key={i} className="flex items-center gap-4 pb-6 border-b border-white/5 last:border-0 last:pb-0">
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold text-white">
                                U{i}
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-400 text-sm">
                                    <span className="font-bold">User {i}</span> created a new event <span className="text-yellow-500">&quot;Devara Release&quot;</span>
                                </p>
                                <p className="text-xs text-white/40">2 minutes ago</p>
                            </div>
                            <button className="text-xs font-medium text-blue-400 hover:text-blue-300">View</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
