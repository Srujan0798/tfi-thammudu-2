import { createClient } from '@/lib/supabase/client';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');

    const supabase = createClient();

    let query = supabase
        .from('re_releases')
        .select('*')
        .eq('is_active', true)
        .order('re_release_date', { ascending: true });

    if (city && city !== 'all') {
        query = query.eq('city', city);
    }

    const { data, error } = await query;

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Transform data to match frontend interface
    const releases = data.map(release => ({
        id: release.id,
        movieName: release.movie_name,
        originalReleaseDate: release.original_release_date,
        reReleaseDate: release.re_release_date,
        theaterName: release.theater_name,
        city: release.city,
        ticketUrl: release.ticket_url,
        posterUrl: release.poster_url,
        celebrationType: release.celebration_type,
    }));

    return NextResponse.json(releases);
}
