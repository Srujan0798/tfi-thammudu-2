import { BarChart, Activity, Users, Globe } from 'lucide-react';

export default function AnalyticsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
                    <p className="text-white/60">System performance and user engagement metrics.</p>
                </div>
                <select className="bg-slate-900 border border-white/10 text-white rounded-lg px-4 py-2">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>Last 90 Days</option>
                    <option>Year to Date</option>
                </select>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Views', value: '1.2M', change: '+15%', icon: Activity, color: 'text-blue-400' },
                    { label: 'Unique Visitors', value: '450K', change: '+8%', icon: Users, color: 'text-green-400' },
                    { label: 'Avg. Session', value: '4m 32s', change: '+12%', icon: BarChart, color: 'text-purple-400' },
                    { label: 'Bounce Rate', value: '32%', change: '-2%', icon: Globe, color: 'text-yellow-400' },
                ].map((stat, i) => (
                    <div key={i} className="bg-slate-900 border border-white/10 rounded-xl p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 rounded-lg bg-white/5">
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded ${stat.change.startsWith('+') ? 'text-green-400 bg-green-500/10' : 'text-red-400 bg-red-500/10'}`}>
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                        <p className="text-sm text-white/50">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Charts (Mock) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6">Traffic Overview</h3>
                    <div className="h-64 flex items-end justify-between gap-2">
                        {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                            <div key={i} className="w-full bg-blue-500/20 rounded-t-lg relative group">
                                <div
                                    className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-t-lg transition-all duration-500 group-hover:bg-blue-400"
                                    style={{ height: `${h}%` }}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-white/40">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                </div>

                <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6">User Growth</h3>
                    <div className="h-64 flex items-end justify-between gap-2">
                        {[30, 45, 60, 50, 75, 85, 95].map((h, i) => (
                            <div key={i} className="w-full bg-green-500/20 rounded-t-lg relative group">
                                <div
                                    className="absolute bottom-0 left-0 right-0 bg-green-500 rounded-t-lg transition-all duration-500 group-hover:bg-green-400"
                                    style={{ height: `${h}%` }}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-white/40">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
