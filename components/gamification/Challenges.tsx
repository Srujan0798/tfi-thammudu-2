import { Target, CheckCircle, Clock } from 'lucide-react';

export default function Challenges() {
    return (
        <div className="bg-slate-900 border border-white/10 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-red-500" />
                    Daily Challenges
                </h2>
                <div className="flex items-center gap-1 text-xs text-white/40">
                    <Clock className="w-3 h-3" />
                    <span>Resets in 4h 12m</span>
                </div>
            </div>

            <div className="space-y-4">
                {[
                    { title: 'Like 5 Posts', progress: 3, total: 5, reward: 50, completed: false },
                    { title: 'Share an Event', progress: 1, total: 1, reward: 100, completed: true },
                    { title: 'Comment on a Release', progress: 0, total: 1, reward: 75, completed: false },
                ].map((challenge, i) => (
                    <div key={i} className="bg-slate-800/50 rounded-lg p-4 border border-white/5">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className={`font-medium ${challenge.completed ? 'text-white/40 line-through' : 'text-white'}`}>
                                    {challenge.title}
                                </h3>
                                <p className="text-xs text-yellow-500 font-bold">+{challenge.reward} XP</p>
                            </div>
                            {challenge.completed ? (
                                <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                                <span className="text-xs font-mono text-white/60">
                                    {challenge.progress}/{challenge.total}
                                </span>
                            )}
                        </div>

                        {!challenge.completed && (
                            <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-500 rounded-full"
                                    style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
