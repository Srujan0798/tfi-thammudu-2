import { NextRequest, NextResponse } from 'next/server';
import { EventSchema, UpdateEventSchema } from '@/lib/validations/schemas';
import prisma from '@/lib/prisma';
import { createClient } from '@/lib/supabase/client';

// GET /api/events - Fetch events with filters
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const eventType = searchParams.get('eventType')?.split(',');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');
        const limit = parseInt(searchParams.get('limit') || '100');

        const events = await prisma.event.findMany({
            where: {
                eventType: eventType ? { in: eventType } : undefined,
                eventDate: {
                    gte: startDate ? new Date(startDate) : undefined,
                    lte: endDate ? new Date(endDate) : undefined,
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
                _count: {
                    select: {
                        comments: true,
                        reactions: true,
                    },
                },
            },
            orderBy: {
                eventDate: 'asc',
            },
            take: limit,
        });

        return NextResponse.json({ events });
    } catch (error) {
        console.error('Error fetching events:', error);
        return NextResponse.json(
            { error: 'Failed to fetch events' },
            { status: 500 }
        );
    }
}

// POST /api/events - Create new event
export async function POST(request: NextRequest) {
    try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();

        // Validate with Zod
        const validatedData = EventSchema.parse(body);

        const event = await prisma.event.create({
            data: {
                title: validatedData.title,
                description: validatedData.description,
                eventDate: new Date(validatedData.eventDate),
                eventType: validatedData.eventType,
                isPublic: validatedData.isPublic,
                createdBy: user.id,
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
            },
        });

        return NextResponse.json({ event }, { status: 201 });
    } catch (error: any) {
        if (error.name === 'ZodError') {
            return NextResponse.json(
                { error: 'Validation failed', details: error.errors },
                { status: 400 }
            );
        }
        console.error('Error creating event:', error);
        return NextResponse.json(
            { error: 'Failed to create event' },
            { status: 500 }
        );
    }
}

// PUT /api/events/[id] - Update event
export async function PUT(request: NextRequest) {
    try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { id, ...updateData } = body;

        if (!id) {
            return NextResponse.json(
                { error: 'Event ID is required' },
                { status: 400 }
            );
        }

        // Validate with Zod
        const validatedData = UpdateEventSchema.parse(updateData);

        // Check ownership
        const existingEvent = await prisma.event.findUnique({
            where: { id },
            export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
            try {
                const supabase = createClient();
                const { data: { user } } = await supabase.auth.getUser();

                if(!user) {
                    return NextResponse.json(
                        { error: 'Unauthorized' },
                        { status: 401 }
                    );
                }

        const id = params.id; // Get ID from URL parameters

                if(!id) {
                    return NextResponse.json(
                        { error: 'Event ID is required' },
                        { status: 400 }
                    );
                }

        const body = await request.json();

                // Validate input
                const validatedData = UpdateEventSchema.parse(body);

                // Check ownership
                const existingEvent = await prisma.event.findUnique({
                    where: { id },
                    select: { createdBy: true },
                });

                if(!existingEvent || existingEvent.createdBy !== user.id) {
                    return NextResponse.json(
                        { error: 'Forbidden' },
                        { status: 403 }
                    );
    }

        // Exclude tags and links which need special Prisma relation handling
        const { tags, links, ...updateData } = validatedData;

    const event = await prisma.event.update({
        where: { id },
        data: {
            ...updateData,
            eventDate: validatedData.eventDate ? new Date(validatedData.eventDate) : undefined,
        },
    });

    return NextResponse.json({ event });
} catch (error: any) {
    if (error.name === 'ZodError') {
        return NextResponse.json(
            { error: 'Validation failed', details: error.errors },
            { status: 400 }
        );
    }
    console.error('Error updating event:', error);
    return NextResponse.json(
        { error: 'Failed to update event' },
        { status: 500 }
    );
}
}

// DELETE /api/events/[id] - Delete event
export async function DELETE(request: NextRequest) {
    try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Event ID is required' },
                { status: 400 }
            );
        }

        // Check ownership
        const existingEvent = await prisma.event.findUnique({
            where: { id },
            select: { createdBy: true },
        });

        if (!existingEvent || existingEvent.createdBy !== user.id) {
            return NextResponse.json(
                { error: 'Forbidden' },
                { status: 403 }
            );
        }

        await prisma.event.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting event:', error);
        return NextResponse.json(
            { error: 'Failed to delete event' },
            { status: 500 }
        );
    }
}
