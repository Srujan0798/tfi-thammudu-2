import { ShoppingBag, Zap, Lock } from 'lucide-react';

export default function StorePage() {
    return (
        <div className="max-w-4xl mx-auto p-6 pb-24">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Rewards Store</h1>
                    <p className="text-white/60">Redeem your hard-earned XP for exclusive items.</p>
                </div>
                <div className="flex items-center gap-2 bg-yellow-500/10 px-4 py-2 rounded-xl border border-yellow-500/20">
                    <Zap className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="text-lg font-bold text-yellow-500">1,250 XP</span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { name: 'Gold Profile Frame', cost: 500, type: 'Frame', color: 'border-yellow-500' },
                    { name: 'Neon Theme', cost: 1000, type: 'Theme', color: 'border-purple-500' },
                    { name: 'Streak Freeze', cost: 200, type: 'Utility', color: 'border-blue-500' },
                    { name: 'Custom Title', cost: 2500, type: 'Title', color: 'border-green-500' },
                    { name: 'Animated Avatar', cost: 5000, type: 'Avatar', color: 'border-red-500' },
                    { name: 'Early Access', cost: 10000, type: 'Feature', color: 'border-white' },
                ].map((item, i) => (
                    <div key={i} className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden group hover:border-white/30 transition-colors">
                        <div className="h-32 bg-slate-800 flex items-center justify-center relative">
                            <div className={`w-16 h-16 rounded-full border-4 ${item.color} bg-slate-900`}></div>
                            <div className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded text-[10px] uppercase font-bold text-white/60">
                                {item.type}
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-white mb-1">{item.name}</h3>
                            <div className="flex justify-between items-center mt-4">
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <Zap className="w-3 h-3 fill-yellow-500" />
                                    <span className="font-bold text-sm">{item.cost}</span>
                                </div>
                                <button className="px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium text-white transition-colors">
                                    Redeem
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
