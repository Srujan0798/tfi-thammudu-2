import { NextRequest, NextResponse } from 'next/server';
import { FollowSchema } from '@/lib/validations/schemas';
import prisma from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';

// POST /api/follow - Follow/unfollow user
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
        const validatedData = FollowSchema.parse(body);

        // Prevent self-follow
        if (validatedData.followingId === user.id) {
            return NextResponse.json(
                { error: 'Cannot follow yourself' },
                { status: 400 }
            );
        }

        // Check if already following
        const existingFollow = await prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: user.id,
                    followingId: validatedData.followingId,
                },
            },
        });

        if (existingFollow) {
            // Unfollow
            await prisma.follow.delete({
                where: { id: existingFollow.id },
            });
            return NextResponse.json({ action: 'unfollowed' });
        } else {
            // Follow
            const follow = await prisma.follow.create({
                data: {
                    followerId: user.id,
                    followingId: validatedData.followingId,
                },
            });
            return NextResponse.json({ action: 'followed', follow }, { status: 201 });
        }
    } catch (error: any) {
        if (error.name === 'ZodError') {
            return NextResponse.json(
                { error: 'Validation failed', details: error.errors },
                { status: 400 }
            );
        }
        console.error('Error handling follow:', error);
        return NextResponse.json(
            { error: 'Failed to handle follow' },
            { status: 500 }
        );
    }
}

// GET /api/follow - Get follow status
export async function GET(request: NextRequest) {
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
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json(
                { error: 'User ID is required' },
                { status: 400 }
            );
        }

        const isFollowing = await prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: user.id,
                    followingId: userId,
                },
            },
        });

        return NextResponse.json({ isFollowing: !!isFollowing });
    } catch (error) {
        console.error('Error checking follow status:', error);
        return NextResponse.json(
            { error: 'Failed to check follow status' },
            { status: 500 }
        );
    }
}
