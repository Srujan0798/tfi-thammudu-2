import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="bg-slate-900 border border-green-500/50 rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-green-500/5 animate-pulse" />

                <div className="relative z-10">
                    <div className="w-20 h-20 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>

                    <h1 className="text-3xl font-bold text-white mb-2">Payment Successful!</h1>
                    <p className="text-white/60 mb-8">
                        Thank you for upgrading to Pro. Your account has been updated with all the exclusive features.
                    </p>

                    <Link
                        href="/timeline"
                        className="inline-flex items-center gap-2 bg-green-500 text-black font-bold px-6 py-3 rounded-xl hover:bg-green-400 transition-colors"
                    >
                        Go to Timeline
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
