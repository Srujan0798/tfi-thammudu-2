'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Plus, ZoomIn, ZoomOut, Calendar as CalendarIcon, Bell } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths, startOfWeek, endOfWeek } from 'date-fns';
import CreateEventModal from '@/components/events/CreateEventModal';
import TFIChatbot from '@/components/ai/TFIChatbot';
import EventDetailsModal from '@/components/calendar/EventDetailsModal';
import EventPreviewCard from '@/components/calendar/EventPreviewCard';
import NotificationCenter from '@/components/notifications/NotificationCenter';
import TimelineView from '@/components/calendar/TimelineView';
import { useEvents } from '@/hooks/useEvents';

import React, { memo } from 'react';



const CalendarDay = memo(({ day, currentDate, selectedDate, onSelect, events, onEventHover }: {
    day: Date;
    currentDate: Date;
    selectedDate: Date | null;
    onSelect: (date: Date) => void;
    events: any[];
    onEventHover: (event: any, e: React.MouseEvent) => void;
}) => {
    const isCurrentMonth = isSameMonth(day, currentDate);
    const isTodayDate = isToday(day);
    const isSelected = selectedDate && day.toDateString() === selectedDate.toDateString();

    // Filter events for this day
    const dayEvents = events.filter(e =>
        new Date(e.event_date).toDateString() === day.toDateString()
    );

    return (
        <button
            onClick={() => onSelect(day)}
            className={`
                aspect-square p-1 sm:p-2 rounded-lg sm:rounded-xl transition-all duration-200 relative group flex flex-col items-center justify-start
                ${isCurrentMonth ? 'text-white' : 'text-gray-600'}
                ${isTodayDate ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-black font-bold ring-2 sm:ring-4 ring-yellow-400/30' : 'hover:bg-white/10'}
                ${isSelected ? 'ring-2 ring-purple-500' : ''}
            `}
            aria-label={`Select ${format(day, 'PPPP')}`}
            aria-current={isTodayDate ? 'date' : undefined}
        >
            <span className="text-xs sm:text-lg mb-0.5 sm:mb-1">{format(day, 'd')}</span>

            {/* Event indicators */}
            <div className="flex gap-1 flex-wrap justify-center w-full px-1">
                {dayEvents.slice(0, 4).map((event, i) => {
                    let colorClass = 'bg-gray-400';
                    if (event.event_type === 'release') colorClass = 'bg-green-500';
                    else if (event.event_type === 'audio') colorClass = 'bg-blue-500';
                    else if (event.event_type === 'birthday') colorClass = 'bg-yellow-500';
                    else if (event.event_type === 'announcement') colorClass = 'bg-purple-500';

                    return (
                        <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full ${colorClass} cursor-pointer hover:scale-150 transition-transform`}
                            onMouseEnter={(e) => onEventHover(event, e)}
                            onMouseLeave={() => onEventHover(null, null as any)}
                        />
                    );
                })}
                {dayEvents.length > 4 && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white/50" title={`${dayEvents.length - 4} more`} />
                )}
            </div>
        </button>
    );
});

CalendarDay.displayName = 'CalendarDay';

type ViewMode = 'year' | 'month' | 'week' | 'day' | 'list' | 'timeline';

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [viewMode, setViewMode] = useState<ViewMode>('month');
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isRecommendationsOpen, setIsRecommendationsOpen] = useState(false);
    const [eventModalDate, setEventModalDate] = useState<Date | undefined>(undefined);
    const [hoveredEvent, setHoveredEvent] = useState<{ event: any; position: { x: number; y: number } } | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilters, setActiveFilters] = useState<string[]>([]);

    // Use React Query hook
    const { data: allEvents = [], isLoading } = useEvents(currentDate, viewMode);

    // Mock user preferences for now
    const userPreferences = {
        favoriteHeroes: ['Prabhas', 'NTR'],
        favoriteDirectors: ['Rajamouli'],
    };

    // Filter events
    const events = allEvents.filter((event: any) => {
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = activeFilters.length === 0 || activeFilters.includes(event.event_type);
        return matchesSearch && matchesFilter;
    });

    // Get calendar days for month view
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);
    const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

    const handlePrevious = () => {
        if (viewMode === 'month') {
            setCurrentDate(subMonths(currentDate, 1));
        }
    };

    const handleNext = () => {
        if (viewMode === 'month') {
            setCurrentDate(addMonths(currentDate, 1));
        }
    };

    const handleToday = () => {
        setCurrentDate(new Date());
    };

    const handleZoomIn = () => {
        if (viewMode === 'year') setViewMode('month');
        else if (viewMode === 'month') setViewMode('day');
    };

    const handleZoomOut = () => {
        if (viewMode === 'day') setViewMode('month');
        else if (viewMode === 'month') setViewMode('year');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
            {/* Header */}
            <header className="bg-black/30 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                        {/* Logo */}
                        <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-start">
                            <div className="flex items-center gap-3">
                                <CalendarIcon className="w-8 h-8 text-yellow-400" />
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                                    TFI Calendar
                                </h1>
                            </div>
                            {/* Mobile Add Event Button (Visible only on mobile) */}
                            <button
                                onClick={() => {
                                    setEventModalDate(selectedDate || new Date());
                                    setIsEventModalOpen(true);
                                }}
                                className="lg:hidden p-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-lg"
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Navigation */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
                            {/* Search Bar */}
                            <div className="relative hidden md:block">
                                <input
                                    type="text"
                                    placeholder="Search events..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-white/10 border border-white/10 rounded-lg px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 w-64"
                                />
                                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>

                            <button
                                onClick={handleToday}
                                className="hidden sm:block px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                            >
                                Today
                            </button>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handlePrevious}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
                                    aria-label="Previous Month"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>

                                <div className="flex items-center gap-2">
                                    <span className="text-white font-semibold min-w-[140px] text-center text-lg" aria-live="polite">
                                        {format(currentDate, 'MMMM')}
                                    </span>
                                    <select
                                        value={currentDate.getFullYear()}
                                        onChange={(e) => setCurrentDate(new Date(currentDate.setFullYear(parseInt(e.target.value))))}
                                        className="bg-transparent text-white font-semibold text-lg focus:outline-none cursor-pointer appearance-none hover:text-yellow-400 transition-colors"
                                        aria-label="Select Year"
                                    >
                                        {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i).map(year => (
                                            <option key={year} value={year} className="bg-slate-900">{year}</option>
                                        ))}
                                    </select>
                                </div>

                                <button
                                    onClick={handleNext}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white"
                                    aria-label="Next Month"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Zoom Controls */}
                            <div className="flex items-center gap-2 border-l border-white/20 pl-4">
                                <button
                                    disabled={viewMode === 'year'}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white disabled:opacity-30 disabled:cursor-not-allowed"
                                    title="Zoom Out"
                                >
                                    <ZoomOut className="w-5 h-5" />
                                </button>
                                <select
                                    value={viewMode}
                                    onChange={(e) => setViewMode(e.target.value as ViewMode)}
                                    className="bg-transparent text-white text-sm font-medium capitalize min-w-[80px] text-center focus:outline-none cursor-pointer"
                                >
                                    <option value="year" className="bg-slate-900">Year</option>
                                    <option value="month" className="bg-slate-900">Month</option>
                                    <option value="week" className="bg-slate-900">Week</option>
                                    <option value="day" className="bg-slate-900">Day</option>
                                    <option value="list" className="bg-slate-900">List</option>
                                    <option value="timeline" className="bg-slate-900">Timeline</option>
                                </select>
                                <button
                                    onClick={handleZoomIn}
                                    disabled={viewMode === 'day'}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white disabled:opacity-30 disabled:cursor-not-allowed"
                                    title="Zoom In"
                                >
                                    <ZoomIn className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Add Event Button */}
                            <button
                                onClick={() => {
                                    setEventModalDate(selectedDate || new Date());
                                    setIsEventModalOpen(true);
                                }}
                                className="hidden lg:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg hover:scale-105 transition-transform"
                            >
                                <Plus className="w-5 h-5" />
                                Add Event
                            </button>

                            {/* Notifications */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                                    className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white relative"
                                >
                                    <Bell className="w-6 h-6" />
                                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-slate-900" />
                                </button>
                                <NotificationCenter
                                    isOpen={isNotificationOpen}
                                    onClose={() => setIsNotificationOpen(false)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Calendar Content */}
            <main className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-8">
                {viewMode === 'month' && (
                    <div className="bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 p-2 sm:p-6">
                        {/* Weekday Headers */}
                        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 sm:mb-4">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                <div key={day} className="text-center text-gray-400 font-semibold py-1 sm:py-2 text-xs sm:text-base">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-1 sm:gap-2">
                            {isLoading ? (
                                // Skeleton Loading
                                Array.from({ length: 35 }).map((_, i) => (
                                    <div key={i} className="aspect-square bg-white/5 rounded-xl animate-pulse" />
                                ))
                            ) : (
                                calendarDays.map((day, index) => (
                                    <CalendarDay
                                        key={day.toISOString()}
                                        day={day}
                                        currentDate={currentDate}
                                        selectedDate={selectedDate}
                                        onSelect={setSelectedDate}
                                        events={events}
                                        onEventHover={(event, e) => {
                                            if (event) {
                                                setHoveredEvent({
                                                    event,
                                                    position: { x: e.clientX, y: e.clientY }
                                                });
                                            } else {
                                                setHoveredEvent(null);
                                            }
                                        }}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                )}

                {viewMode === 'week' && (
                    <div className="bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 p-6 overflow-x-auto">
                        <div className="min-w-[800px]">
                            <div className="grid grid-cols-7 gap-4 mb-4">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                    <div key={day} className="text-center text-gray-400 font-semibold">
                                        {day}
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-7 gap-4">
                                {eachDayOfInterval({
                                    start: startOfWeek(currentDate),
                                    end: endOfWeek(currentDate)
                                }).map((day) => (
                                    <div key={day.toISOString()} className="min-h-[400px] bg-white/5 rounded-xl p-3 border border-white/5">
                                        <div className={`text-center mb-2 ${isToday(day) ? 'text-yellow-400 font-bold' : 'text-gray-400'}`}>
                                            {format(day, 'd')}
                                        </div>
                                        {/* Events placeholder */}
                                        {/* Events placeholder */}
                                        <div className="space-y-2">
                                            {/* Placeholder event */}
                                            {isToday(day) && (
                                                <div className="p-2 bg-purple-500/20 rounded text-xs text-purple-300 border border-purple-500/30">
                                                    Sample Event
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {viewMode === 'list' && (
                    <div className="bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 p-6 max-w-3xl mx-auto">
                        <h2 className="text-2xl font-bold text-white mb-6">Upcoming Events</h2>
                        <div className="space-y-4">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                                    <div className="flex-shrink-0 w-16 text-center">
                                        <div className="text-sm text-gray-400">{format(addMonths(new Date(), i), 'MMM')}</div>
                                        <div className="text-2xl font-bold text-white">{10 + i}</div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-white">Sample Event {i + 1}</h3>
                                        <p className="text-gray-400 text-sm">10:00 AM • Location</p>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                                            Release
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {viewMode === 'timeline' && (
                    <div className="bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
                        <h2 className="text-2xl font-bold text-white mb-6">Cinema Journey</h2>
                        <TimelineView
                            events={events.map((e: any) => ({
                                id: e.id,
                                title: e.title,
                                date: new Date(e.event_date),
                                type: e.event_type as any,
                                description: e.description
                            }))}
                        />
                    </div>
                )}

                {viewMode === 'year' && (
                    <div className="grid grid-cols-3 gap-6">
                        {Array.from({ length: 12 }, (_, i) => {
                            const monthDate = new Date(currentDate.getFullYear(), i, 1);
                            return (
                                <div
                                    key={i}
                                    className="bg-black/20 backdrop-blur-sm rounded-xl border border-white/10 p-4 hover:border-yellow-400/50 transition-colors cursor-pointer"
                                    onClick={() => {
                                        setCurrentDate(monthDate);
                                        setViewMode('month');
                                    }}
                                >
                                    <h3 className="text-white font-semibold mb-2 text-center">
                                        {format(monthDate, 'MMMM')}
                                    </h3>
                                    <div className="grid grid-cols-7 gap-1 text-xs">
                                        {/* Mini month view */}
                                        {Array.from({ length: 31 }, (_, d) => (
                                            <div key={d} className="text-gray-500 text-center">
                                                {d + 1}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {viewMode === 'day' && selectedDate && (
                    <div className="bg-black/20 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
                        <h2 className="text-3xl font-bold text-white mb-6">
                            {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                        </h2>

                        {/* Timeline view for the day */}
                        <div className="space-y-4">
                            <div className="text-gray-400 text-center py-12">
                                <CalendarIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                <p className="text-lg">No events scheduled for this day</p>
                                <button
                                    onClick={() => {
                                        setEventModalDate(selectedDate);
                                        setIsEventModalOpen(true);
                                    }}
                                    className="mt-4 px-6 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-lg hover:scale-105 transition-transform"
                                >
                                    Add Event
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Legend & Stats Sidebar */}
            <aside className="fixed right-4 top-24 w-64 bg-black/30 backdrop-blur-md rounded-2xl border border-white/10 p-6 hidden xl:block">
                <h3 className="text-white font-bold text-lg mb-4">Filter Events</h3>
                <div className="space-y-3">
                    {[
                        { type: 'release', label: 'Movie Releases', color: 'bg-green-500' },
                        { type: 'audio', label: 'Audio Launches', color: 'bg-blue-500' },
                        { type: 'birthday', label: 'Birthdays', color: 'bg-yellow-500' },
                        { type: 'announcement', label: 'Announcements', color: 'bg-purple-500' }
                    ].map((item) => (
                        <button
                            key={item.type}
                            onClick={() => {
                                if (activeFilters.includes(item.type)) {
                                    setActiveFilters(activeFilters.filter(f => f !== item.type));
                                } else {
                                    setActiveFilters([...activeFilters, item.type]);
                                }
                            }}
                            className={`flex items-center gap-3 w-full p-2 rounded-lg transition-colors ${activeFilters.includes(item.type) ? 'bg-white/10 ring-1 ring-white/20' : 'hover:bg-white/5'}`}
                        >
                            <div className={`w-3 h-3 rounded-full ${item.color}`} />
                            <span className={`text-sm ${activeFilters.includes(item.type) ? 'text-white font-medium' : 'text-gray-400'}`}>
                                {item.label}
                            </span>
                            {activeFilters.includes(item.type) && (
                                <div className="ml-auto w-2 h-2 bg-white rounded-full" />
                            )}
                        </button>
                    ))}
                </div>

                <div className="h-px bg-white/10 my-6" />

                <h3 className="text-white font-bold text-lg mb-4">Upcoming Highlights</h3>
                <div className="space-y-3">
                    <div className="p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30">
                        <p className="text-yellow-400 font-semibold text-sm">Movie Release</p>
                        <p className="text-white text-xs mt-1">OG - March 2025</p>
                    </div>
                </div>
            </aside>

            {/* Event Preview Card */}
            {hoveredEvent && (
                <EventPreviewCard
                    event={hoveredEvent.event}
                    position={hoveredEvent.position}
                    onClose={() => setHoveredEvent(null)}
                    onOpenDetails={() => {
                        setSelectedEvent(hoveredEvent.event);
                        setHoveredEvent(null);
                    }}
                />
            )}

            {/* Event Creation Modal */}
            <CreateEventModal
                isOpen={isEventModalOpen}
                onClose={() => setIsEventModalOpen(false)}
                selectedDate={eventModalDate}
                onEventCreated={() => {
                    // TODO: Refresh events list
                    console.log('Event created, refreshing...');
                }}
            />

            {/* Event Details Modal */}
            <EventDetailsModal
                isOpen={!!selectedEvent}
                onClose={() => setSelectedEvent(null)}
                event={selectedEvent}
            />

            {/* AI Chatbot */}
            <TFIChatbot />
        </div>
    );
}
