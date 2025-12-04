import { PrismaClient } from '@prisma/client';
import { createClient } from '@/lib/supabase/client';

const prisma = new PrismaClient();
const supabase = createClient();

/**
 * Example: Migrating from Supabase to Prisma
 * 
 * This file shows how to migrate existing Supabase queries to Prisma
 */

// ============================================
// EXAMPLE 1: Fetching Events
// ============================================

// OLD WAY (Supabase)
export async function getEventsOld() {
    const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('event_date', { ascending: true });

    if (error) throw error;
    return data;
}

// NEW WAY (Prisma)
export async function getEventsNew() {
    const events = await prisma.event.findMany({
        orderBy: {
            eventDate: 'asc',
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
    });

    return events;
}

// ============================================
// EXAMPLE 2: Creating an Event
// ============================================

// OLD WAY (Supabase)
export async function createEventOld(eventData: any) {
    const { data, error } = await supabase
        .from('events')
        .insert({
            title: eventData.title,
            description: eventData.description,
            event_date: eventData.eventDate,
            event_type: eventData.eventType,
            created_by: eventData.userId,
        })
        .select()
        .single();

    if (error) throw error;
    return data;
}

// NEW WAY (Prisma)
export async function createEventNew(eventData: {
    title: string;
    description?: string;
    eventDate: Date;
    eventType: string;
    userId: string;
}) {
    const event = await prisma.event.create({
        data: {
            title: eventData.title,
            description: eventData.description,
            eventDate: eventData.eventDate,
            eventType: eventData.eventType,
            createdBy: eventData.userId,
        },
        include: {
            creator: true,
            tags: true,
        },
    });

    return event;
}

// ============================================
// EXAMPLE 3: Filtering Events
// ============================================

// OLD WAY (Supabase)
export async function filterEventsOld(filters: {
    eventType?: string[];
    startDate?: string;
    endDate?: string;
}) {
    let query = supabase.from('events').select('*');

    if (filters.eventType && filters.eventType.length > 0) {
        query = query.in('event_type', filters.eventType);
    }

    if (filters.startDate) {
        query = query.gte('event_date', filters.startDate);
    }

    if (filters.endDate) {
        query = query.lte('event_date', filters.endDate);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
}

// NEW WAY (Prisma)
export async function filterEventsNew(filters: {
    eventType?: string[];
    startDate?: Date;
    endDate?: Date;
}) {
    const events = await prisma.event.findMany({
        where: {
            eventType: filters.eventType ? { in: filters.eventType } : undefined,
            eventDate: {
                gte: filters.startDate,
                lte: filters.endDate,
            },
        },
        include: {
            creator: true,
            tags: true,
        },
        orderBy: {
            eventDate: 'asc',
        },
    });

    return events;
}

// ============================================
// EXAMPLE 4: User with Relations
// ============================================

// OLD WAY (Supabase)
export async function getUserWithEventsOld(userId: string) {
    const { data: user, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

    if (userError) throw userError;

    const { data: events, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .eq('created_by', userId);

    if (eventsError) throw eventsError;

    return { ...user, events };
}

// NEW WAY (Prisma)
export async function getUserWithEventsNew(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            events: {
                orderBy: {
                    eventDate: 'desc',
                },
            },
            followers: {
                include: {
                    follower: {
                        select: {
                            id: true,
                            name: true,
                            username: true,
                            avatarUrl: true,
                        },
                    },
                },
            },
            follows: {
                include: {
                    following: {
                        select: {
                            id: true,
                            name: true,
                            username: true,
                            avatarUrl: true,
                        },
                    },
                },
            },
        },
    });

    return user;
}

// ============================================
// EXAMPLE 5: Complex Query with Aggregations
// ============================================

// NEW WAY (Prisma) - This is much easier with Prisma!
export async function getEventStats() {
    const stats = await prisma.event.groupBy({
        by: ['eventType'],
        _count: {
            id: true,
        },
        orderBy: {
            _count: {
                id: 'desc',
            },
        },
    });

    return stats;
}

// ============================================
// EXAMPLE 6: Transactions
// ============================================

// NEW WAY (Prisma) - Atomic operations
export async function createEventWithTags(eventData: {
    title: string;
    description?: string;
    eventDate: Date;
    eventType: string;
    userId: string;
    tags: string[];
}) {
    const result = await prisma.$transaction(async (tx) => {
        // Create event
        const event = await tx.event.create({
            data: {
                title: eventData.title,
                description: eventData.description,
                eventDate: eventData.eventDate,
                eventType: eventData.eventType,
                createdBy: eventData.userId,
            },
        });

        // Create or connect tags
        for (const tagName of eventData.tags) {
            await tx.tag.upsert({
                where: { name: tagName },
                create: { name: tagName },
                update: {},
            });
        }

        return event;
    });

    return result;
}

// ============================================
// BENEFITS OF PRISMA
// ============================================

/*
1. TYPE SAFETY
   - Prisma generates TypeScript types from your schema
   - No more 'any' types or manual type definitions
   - Autocomplete for all fields and relations

2. RELATIONS
   - Easy to include related data
   - No need for manual joins or multiple queries
   - Nested includes for deep relations

3. MIGRATIONS
   - Schema changes are tracked
   - Easy to roll back
   - Version control for database

4. QUERY BUILDER
   - Intuitive API
   - Less boilerplate
   - Better error messages

5. PERFORMANCE
   - Optimized queries
   - Connection pooling
   - Query batching

6. DEVELOPER EXPERIENCE
   - Prisma Studio for database GUI
   - Better debugging
   - Clear error messages
*/
