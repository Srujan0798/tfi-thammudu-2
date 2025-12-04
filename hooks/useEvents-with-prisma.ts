import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import prisma from '@/lib/prisma';

// Hook to fetch events with filters
export function useEvents(filters?: {
    eventType?: string[];
    startDate?: Date;
    endDate?: Date;
}) {
    return useQuery({
        queryKey: ['events', filters],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (filters?.eventType) params.set('eventType', filters.eventType.join(','));
            if (filters?.startDate) params.set('startDate', filters.startDate.toISOString());
            if (filters?.endDate) params.set('endDate', filters.endDate.toISOString());

            const response = await fetch(`/api/events?${params}`);
            if (!response.ok) throw new Error('Failed to fetch events');
            const data = await response.json();
            return data.events;
        },
    });
}

// Hook to create event
export function useCreateEvent() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (eventData: any) => {
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(eventData),
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Failed to create event');
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'] });
        },
    });
}

// Hook to update event
export function useUpdateEvent() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, ...data }: any) => {
            const response = await fetch('/api/events', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, ...data }),
            });
            if (!response.ok) throw new Error('Failed to update event');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'] });
        },
    });
}

// Hook to delete event
export function useDeleteEvent() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const response = await fetch(`/api/events?id=${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete event');
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['events'] });
        },
    });
}
