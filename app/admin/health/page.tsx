import { Activity, Database, HardDrive, Server, CheckCircle, AlertTriangle } from 'lucide-react';

export default function HealthPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">System Health</h1>
                    <p className="text-white/60">Monitor system status and performance.</p>
                </div>
                <button className="bg-slate-800 text-white px-4 py-2 rounded-lg font-bold hover:bg-slate-700 transition-colors flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Refresh Status
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { name: 'Database', status: 'Operational', latency: '24ms', icon: Database, color: 'text-green-400' },
                    { name: 'Redis Cache', status: 'Operational', latency: '5ms', icon: Server, color: 'text-green-400' },
                    { name: 'S3 Storage', status: 'Operational', latency: '120ms', icon: HardDrive, color: 'text-green-400' },
                    { name: 'TMDB API', status: 'Degraded', latency: '850ms', icon: Activity, color: 'text-yellow-400' },
                ].map((service, i) => (
                    <div key={i} className="bg-slate-900 border border-white/10 rounded-xl p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-lg bg-white/5">
                                <service.icon className={`w-6 h-6 ${service.color}`} />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">{service.name}</h3>
                                <p className="text-gray-400 text-xs mt-1">System&apos;s overall health score</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {service.status === 'Operational' ? (
                                <CheckCircle className="w-5 h-5 text-green-400" />
                            ) : (
                                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                            )}
                            <span className={`text-sm font-medium ${service.status === 'Operational' ? 'text-green-400' : 'text-yellow-400'}`}>
                                {service.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* System Logs Preview */}
            <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4">Recent System Logs</h3>
                <div className="bg-black/50 rounded-lg p-4 font-mono text-xs text-white/60 space-y-2 h-64 overflow-y-auto">
                    <p><span className="text-green-400">[INFO]</span> 2024-10-24 14:35:01 - Cron job &apos;scrape_news&apos; started.</p>
                    <p><span className="text-green-400">[INFO]</span> 2024-10-24 14:35:05 - Cron job &apos;scrape_news&apos; completed successfully. 12 items processed.</p>
                    <p><span className="text-yellow-400">[WARN]</span> 2024-10-24 14:38:12 - API rate limit approaching for TMDB.</p>
                    <p><span className="text-red-400">[ERROR]</span> 2024-10-24 14:40:00 - Failed to send email to user_992. SMTP timeout.</p>
                    <p><span className="text-green-400">[INFO]</span> 2024-10-24 14:42:15 - User backup created successfully.</p>
                </div>
            </div>
        </div>
    );
}
