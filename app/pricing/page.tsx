import { Check, Star, Zap } from 'lucide-react';

export default function PricingPage() {
    return (
        <div className="max-w-6xl mx-auto p-6 pb-24">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-white mb-4">Upgrade to <span className="text-yellow-500">Pro</span></h1>
                <p className="text-xl text-white/60">Unlock exclusive features and support the community.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Free Plan */}
                <div className="bg-slate-900 border border-white/10 rounded-2xl p-8">
                    <h3 className="text-xl font-bold text-white mb-2">Fan</h3>
                    <p className="text-3xl font-bold text-white mb-6">$0<span className="text-sm text-white/40 font-normal">/mo</span></p>
                    <ul className="space-y-4 mb-8">
                        {['Access to Timeline', 'Basic Notifications', 'Follow 5 Channels', 'Participate in Polls'].map((feature, i) => (
                            <li key={i} className="flex items-center gap-3 text-white/60">
                                <Check className="w-5 h-5 text-white/40" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                    <button className="w-full py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors">
                        Current Plan
                    </button>
                </div>

                {/* Pro Plan */}
                <div className="bg-slate-900 border-2 border-yellow-500 rounded-2xl p-8 relative transform scale-105 shadow-[0_0_40px_rgba(234,179,8,0.2)]">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                        Most Popular
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                        Super Fan <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    </h3>
                    <p className="text-3xl font-bold text-white mb-6">$4.99<span className="text-sm text-white/40 font-normal">/mo</span></p>
                    <ul className="space-y-4 mb-8">
                        {[
                            'Ad-free Experience',
                            'Unlimited Channels',
                            'Exclusive "Pro" Badge',
                            'Early Access to Features',
                            'Custom App Icons',
                            'Priority Support'
                        ].map((feature, i) => (
                            <li key={i} className="flex items-center gap-3 text-white">
                                <Check className="w-5 h-5 text-yellow-500" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                    <button className="w-full py-3 bg-yellow-500 text-black font-bold rounded-xl hover:bg-yellow-400 transition-colors">
                        Upgrade Now
                    </button>
                </div>

                {/* Lifetime Plan */}
                <div className="bg-slate-900 border border-purple-500/50 rounded-2xl p-8">
                    <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                        Legend <Zap className="w-5 h-5 text-purple-500 fill-purple-500" />
                    </h3>
                    <p className="text-3xl font-bold text-white mb-6">$99<span className="text-sm text-white/40 font-normal">/lifetime</span></p>
                    <ul className="space-y-4 mb-8">
                        {[
                            'All Super Fan Features',
                            'Exclusive "Legend" Badge',
                            'Private Discord Channel',
                            'Direct Dev Access',
                            'Name in Credits'
                        ].map((feature, i) => (
                            <li key={i} className="flex items-center gap-3 text-white/80">
                                <Check className="w-5 h-5 text-purple-500" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                    <button className="w-full py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-500 transition-colors">
                        Get Lifetime Access
                    </button>
                </div>
            </div>
        </div>
    );
}
