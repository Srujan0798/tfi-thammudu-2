import { createClient } from '@/lib/supabase/client';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    const supabase = createClient();

    let query = supabase
        .from('live_updates')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

    if (type && type !== 'all') {
        query = query.eq('update_type', type);
    }

    const { data, error } = await query;

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Transform data to match frontend interface
    const updates = data.map(update => ({
        id: update.id,
        title: update.title,
        description: update.description,
        updateType: update.update_type,
        relatedHero: update.related_hero,
        relatedMovie: update.related_movie,
        sourceUrl: update.source_url,
        imageUrl: update.image_url,
        trendingScore: update.trending_score,
        createdAt: new Date(update.created_at).toLocaleString(), // Simple formatting for now
    }));

    return NextResponse.json(updates);
}
