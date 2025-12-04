'use server';

import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';
import { EventSchema, type EventInput } from '@/lib/validations/schemas';

export async function createEvent(data: EventInput) {
    try {
        // Validate input
        const validatedData = EventSchema.parse(data);

        // Create event
        const event = await prisma.event.create({
            data: {
                title: validatedData.title,
                description: validatedData.description,
                eventDate: new Date(validatedData.eventDate),
                eventType: validatedData.eventType,
                isPublic: validatedData.isPublic,
                createdBy: 'user-id', // TODO: Get from auth
            },
        });

        revalidatePath('/calendar');
        return { success: true, event };
    } catch (error) {
        console.error('Error creating event:', error);
        return { success: false, error: 'Failed to create event' };
    }
}

export async function updateEvent(id: string, data: Partial<EventInput>) {
    try {
        const event = await prisma.event.update({
            where: { id },
            data: {
                ...data,
                eventDate: data.eventDate ? new Date(data.eventDate) : undefined,
            },
        });

        revalidatePath('/calendar');
        return { success: true, event };
    } catch (error) {
        console.error('Error updating event:', error);
        return { success: false, error: 'Failed to update event' };
    }
}

export async function deleteEvent(id: string) {
    try {
        await prisma.event.delete({
            where: { id },
        });

        revalidatePath('/calendar');
        return { success: true };
    } catch (error) {
        console.error('Error deleting event:', error);
        return { success: false, error: 'Failed to delete event' };
    }
}

export async function getEvents(filters?: {
    eventType?: string[];
    startDate?: string;
    endDate?: string;
}) {
    try {
        const events = await prisma.event.findMany({
            where: {
                eventType: filters?.eventType ? { in: filters.eventType } : undefined,
                eventDate: {
                    gte: filters?.startDate ? new Date(filters.startDate) : undefined,
                    lte: filters?.endDate ? new Date(filters.endDate) : undefined,
                },
            },
            include: {
                creator: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        avatarUrl: true,
                    },
                },
                tags: true,
                links: true,
            },
            orderBy: {
                eventDate: 'asc',
            },
        });

        return { success: true, events };
    } catch (error) {
        console.error('Error fetching events:', error);
        return { success: false, error: 'Failed to fetch events', events: [] };
    }
}
