import { NextRequest, NextResponse } from 'next/server';
import { ReactionSchema } from '@/lib/validations/schemas';
import prisma from '@/lib/prisma';
import { createClient } from '@/lib/supabase/client';

// POST /api/reactions - Add/remove reaction
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
        const validatedData = ReactionSchema.parse(body);

        // Check if reaction already exists
        const existingReaction = await prisma.reaction.findUnique({
            where: {
                eventId_userId_type: {
                    eventId: validatedData.eventId,
                    userId: user.id,
                    type: validatedData.type,
                },
            },
        });

        if (existingReaction) {
            // Remove reaction
            await prisma.reaction.delete({
                where: { id: existingReaction.id },
            });
            return NextResponse.json({ action: 'removed' });
        } else {
            // Add reaction
            const reaction = await prisma.reaction.create({
                data: {
                    eventId: validatedData.eventId,
                    userId: user.id,
                    type: validatedData.type,
                },
            });
            return NextResponse.json({ action: 'added', reaction }, { status: 201 });
        }
    } catch (error: any) {
        if (error.name === 'ZodError') {
            return NextResponse.json(
                { error: 'Validation failed', details: error.errors },
                { status: 400 }
            );
        }
        console.error('Error handling reaction:', error);
        return NextResponse.json(
            { error: 'Failed to handle reaction' },
            { status: 500 }
        );
    }
}

// GET /api/reactions - Get reactions for event
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const eventId = searchParams.get('eventId');

        if (!eventId) {
            return NextResponse.json(
                { error: 'Event ID is required' },
                { status: 400 }
            );
        }

        const reactions = await prisma.reaction.groupBy({
            by: ['type'],
            where: { eventId },
            _count: {
                id: true,
            },
        });

        return NextResponse.json({ reactions });
    } catch (error) {
        console.error('Error fetching reactions:', error);
        return NextResponse.json(
            { error: 'Failed to fetch reactions' },
            { status: 500 }
        );
    }
}
