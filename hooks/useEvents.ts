import { useQuery } from '@tanstack/react-query';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';

type ViewMode = 'year' | 'month' | 'week' | 'day' | 'list' | 'timeline';

export function useEvents(currentDate: Date, viewMode: ViewMode) {
    return useQuery({
        queryKey: ['events', { month: currentDate.getMonth(), year: currentDate.getFullYear(), view: viewMode }],
        queryFn: async () => {
            let start = startOfMonth(currentDate);
            let end = endOfMonth(currentDate);

            if (viewMode === 'week') {
                start = startOfWeek(currentDate);
                end = endOfWeek(currentDate);
            } else if (viewMode === 'day') {
                start = currentDate;
                end = currentDate;
            }

            const res = await fetch(`/api/events?startDate=${start.toISOString()}&endDate=${end.toISOString()}`);
            if (!res.ok) throw new Error('Failed to fetch events');

            const data = await res.json();
            return data.events || [];
        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        placeholderData: (previousData) => previousData, // Keep previous data while fetching new
    });
}
