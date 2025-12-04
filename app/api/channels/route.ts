import { createClient } from '@/lib/supabase/client';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    const supabase = createClient();

    let query = supabase
        .from('official_channels')
        .select(`
            *,
            channel_events (
                events (
                    event_date
                )
            )
        `);

    if (type && type !== 'all') {
        query = query.eq('channel_type', type);
    }

    const { data, error } = await query;

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Transform data to match frontend interface
    const channels = data.map((channel: any) => {
        // Extract events from the nested structure
        // channel_events is an array of objects, each containing an 'events' object
        const events = channel.channel_events
            ?.map((ce: any) => ce.events)
            .filter((e: any) => e !== null) || [];

        const now = new Date();
        // Reset time part for accurate date comparison
        now.setHours(0, 0, 0, 0);

        const upcomingCount = events.filter((e: any) => {
            const eventDate = new Date(e.event_date);
            return eventDate >= now;
        }).length;

        return {
            id: channel.id,
            name: channel.name,
            channelType: channel.channel_type,
            slug: channel.slug,
            logoUrl: channel.logo_url,
            description: channel.description,
            websiteUrl: channel.website_url,
            socialLinks: channel.social_links,
            isVerified: channel.is_verified,
            upcomingEvents: upcomingCount,
            totalEvents: events.length,
        };
    });

    return NextResponse.json(channels);
}
