import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

// POST /api/sync - Sync calendar from creator
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userId, creatorId, syncTags } = body;

        if (!userId || !creatorId) {
            return NextResponse.json(
                { error: 'Missing user ID or creator ID' },
                { status: 400 }
            );
        }

        // Create sync relationship
        const { data, error } = await supabase
            .from('shared_calendars')
            .insert({
                follower_id: userId,
                creator_id: creatorId,
                sync_tags: syncTags || [],
                is_active: true,
            })
            .select()
            .single();

        if (error) {
            // Check if already synced
            if (error.code === '23505') {
                return NextResponse.json(
                    { error: 'Already synced with this creator' },
                    { status: 400 }
                );
            }
            throw error;
        }

        return NextResponse.json({ success: true, sync: data }, { status: 201 });
    } catch (error: any) {
        console.error('Error syncing calendar:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to sync calendar' },
            { status: 500 }
        );
    }
}

// GET /api/sync - Get synced calendars
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json(
                { error: 'Missing user ID' },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from('shared_calendars')
            .select(`
        *,
        creator:users!creator_id (
          id,
          username,
          full_name,
          avatar_url,
          is_verified
        )
      `)
            .eq('follower_id', userId)
            .eq('is_active', true);

        if (error) throw error;

        return NextResponse.json({ syncs: data || [] });
    } catch (error: any) {
        console.error('Error fetching synced calendars:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch synced calendars' },
            { status: 500 }
        );
    }
}

// DELETE /api/sync - Unsync calendar
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        const creatorId = searchParams.get('creatorId');

        if (!userId || !creatorId) {
            return NextResponse.json(
                { error: 'Missing user ID or creator ID' },
                { status: 400 }
            );
        }

        const { error } = await supabase
            .from('shared_calendars')
            .delete()
            .eq('follower_id', userId)
            .eq('creator_id', creatorId);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Error unsyncing calendar:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to unsync calendar' },
            { status: 500 }
        );
    }
}
