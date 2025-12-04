import { Shield, Check } from 'lucide-react';

export default function RolesPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Roles & Permissions</h1>
                    <p className="text-white/60">Manage access levels and capabilities.</p>
                </div>
                <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors">
                    Create Role
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { name: 'Admin', users: 3, color: 'text-red-400', bg: 'bg-red-500/10' },
                    { name: 'Moderator', users: 12, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                    { name: 'User', users: 12340, color: 'text-green-400', bg: 'bg-green-500/10' },
                ].map((role, i) => (
                    <div key={i} className="bg-slate-900 border border-white/10 rounded-xl p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-lg ${role.bg}`}>
                                <Shield className={`w-6 h-6 ${role.color}`} />
                            </div>
                            <span className="text-xs font-medium text-white/40">{role.users} users</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-4">{role.name}</h3>

                        <div className="space-y-2">
                            <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Capabilities</p>
                            {['View Dashboard', 'Manage Users', 'Delete Content'].map((perm, j) => (
                                <div key={j} className="flex items-center gap-2 text-sm text-white/60">
                                    <Check className="w-3 h-3 text-green-400" />
                                    <span>{perm}</span>
                                </div>
                            ))}
                        </div>

                        <button className="w-full mt-6 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium transition-colors">
                            Edit Permissions
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
