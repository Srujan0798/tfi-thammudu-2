import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

// GET /api/events - Fetch events
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');
        const tags = searchParams.get('tags')?.split(',');

        let query = supabase
            .from('events')
            .select(`
        *,
        event_tags (
          tag_id,
          tags (*)
        ),
        event_links (*)
      `);

        // Filter by user (own events + public events)
        if (userId) {
            query = query.or(`user_id.eq.${userId},is_public.eq.true`);
        } else {
            query = query.eq('is_public', true);
        }

        // Filter by date range
        if (startDate && endDate) {
            query = query
                .gte('event_date', startDate)
                .lte('event_date', endDate);
        }

        const { data, error } = await query.order('event_date', { ascending: true });

        if (error) throw error;

        // Filter by tags if provided
        let filteredData = data;
        if (tags && tags.length > 0) {
            filteredData = data?.filter((event: any) =>
                event.event_tags?.some((et: any) =>
                    tags.includes(et.tags?.name)
                )
            );
        }

        return NextResponse.json({ events: filteredData || [] });
    } catch (error: any) {
        console.error('Error fetching events:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to fetch events' },
            { status: 500 }
        );
    }
}

// POST /api/events - Create event
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userId, title, description, eventDate, eventTime, eventType, isPublic, tags, links } = body;

        // Validate required fields
        if (!userId || !title || !eventDate || !eventType) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create event
        const { data: event, error: eventError } = await supabase
            .from('events')
            .insert({
                user_id: userId,
                title,
                description,
                event_date: eventDate,
                event_time: eventTime,
                event_type: eventType,
                is_public: isPublic || false,
            })
            .select()
            .single();

        if (eventError) throw eventError;

        // Add tags if provided
        if (tags && tags.length > 0) {
            // First, ensure all tags exist
            for (const tagName of tags) {
                const { data: existingTag } = await supabase
                    .from('tags')
                    .select('id')
                    .eq('name', tagName)
                    .single();

                if (!existingTag) {
                    // Create tag if it doesn't exist
                    await supabase
                        .from('tags')
                        .insert({ name: tagName, category: 'custom' });
                }
            }

            // Get tag IDs
            const { data: tagData } = await supabase
                .from('tags')
                .select('id, name')
                .in('name', tags);

            // Link tags to event
            if (tagData) {
                const eventTags = tagData.map((tag: any) => ({
                    event_id: event.id,
                    tag_id: tag.id,
                }));

                await supabase.from('event_tags').insert(eventTags);
            }
        }

        // Add links if provided
        if (links && links.length > 0) {
            const eventLinks = links.map((link: any) => ({
                event_id: event.id,
                platform: link.platform,
                url: link.url,
                title: link.title,
            }));

            await supabase.from('event_links').insert(eventLinks);
        }

        return NextResponse.json({ event, success: true }, { status: 201 });
    } catch (error: any) {
        console.error('Error creating event:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to create event' },
            { status: 500 }
        );
    }
}

// PUT /api/events - Update event
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { eventId, userId, title, description, eventDate, eventTime, eventType, isPublic, tags, links } = body;

        if (!eventId || !userId) {
            return NextResponse.json(
                { error: 'Missing event ID or user ID' },
                { status: 400 }
            );
        }

        // Update event
        const { data: event, error: eventError } = await supabase
            .from('events')
            .update({
                title,
                description,
                event_date: eventDate,
                event_time: eventTime,
                event_type: eventType,
                is_public: isPublic,
            })
            .eq('id', eventId)
            .eq('user_id', userId)
            .select()
            .single();

        if (eventError) throw eventError;

        // Update tags (delete old, add new)
        await supabase.from('event_tags').delete().eq('event_id', eventId);

        if (tags && tags.length > 0) {
            for (const tagName of tags) {
                const { data: existingTag } = await supabase
                    .from('tags')
                    .select('id')
                    .eq('name', tagName)
                    .single();

                if (!existingTag) {
                    await supabase.from('tags').insert({ name: tagName, category: 'custom' });
                }
            }

            const { data: tagData } = await supabase
                .from('tags')
                .select('id, name')
                .in('name', tags);

            if (tagData) {
                const eventTags = tagData.map((tag: any) => ({
                    event_id: eventId,
                    tag_id: tag.id,
                }));

                await supabase.from('event_tags').insert(eventTags);
            }
        }

        // Update links (delete old, add new)
        await supabase.from('event_links').delete().eq('event_id', eventId);

        if (links && links.length > 0) {
            const eventLinks = links.map((link: any) => ({
                event_id: eventId,
                platform: link.platform,
                url: link.url,
                title: link.title,
            }));

            await supabase.from('event_links').insert(eventLinks);
        }

        return NextResponse.json({ event, success: true });
    } catch (error: any) {
        console.error('Error updating event:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to update event' },
            { status: 500 }
        );
    }
}

// DELETE /api/events - Delete event
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const eventId = searchParams.get('eventId');
        const userId = searchParams.get('userId');

        if (!eventId || !userId) {
            return NextResponse.json(
                { error: 'Missing event ID or user ID' },
                { status: 400 }
            );
        }

        const { error } = await supabase
            .from('events')
            .delete()
            .eq('id', eventId)
            .eq('user_id', userId);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Error deleting event:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to delete event' },
            { status: 500 }
        );
    }
}
