'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface SharedEvent {
    id: string;
    title: string;
    date: string;
    type: string;
}

interface SharedCalendarViewProps {
    events: SharedEvent[];
    userName: string;
}

export default function SharedCalendarView({ events, userName }: SharedCalendarViewProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    // Group events by date
    const eventsByDate = events.reduce((acc, event) => {
        const date = event.date;
        if (!acc[date]) acc[date] = [];
        acc[date].push(event);
        return acc;
    }, {} as Record<string, SharedEvent[]>);

    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    return (
        <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-purple-400" />
                    {userName}&apos;s Calendar
                </h3>
                <div className="flex items-center gap-4">
                    <button onClick={prevMonth} className="p-1 hover:bg-white/10 rounded-full text-white">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-white font-medium">
                        {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                    <button onClick={nextMonth} className="p-1 hover:bg-white/10 rounded-full text-white">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-xs text-white/50 uppercase font-bold">{day}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square" />
                ))}

                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    const dayEvents = eventsByDate[dateStr] || [];
                    const hasEvents = dayEvents.length > 0;

                    return (
                        <div
                            key={day}
                            className={`
                                aspect-square rounded-lg border border-white/5 flex flex-col items-center justify-center relative group cursor-pointer
                                ${hasEvents ? 'bg-white/5 hover:bg-white/10' : 'hover:bg-white/5'}
                            `}
                        >
                            <span className={`text-sm ${hasEvents ? 'text-white font-bold' : 'text-white/50'}`}>
                                {day}
                            </span>

                            {hasEvents && (
                                <div className="mt-1 flex gap-1">
                                    {dayEvents.slice(0, 3).map((e, idx) => (
                                        <div key={idx} className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                                    ))}
                                </div>
                            )}

                            {/* Tooltip */}
                            {hasEvents && (
                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-slate-800 border border-white/10 rounded-lg p-2 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                    {dayEvents.map(e => (
                                        <div key={e.id} className="text-xs text-white mb-1 last:mb-0">
                                            • {e.title}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
