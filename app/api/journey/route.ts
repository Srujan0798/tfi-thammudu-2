import { createClient } from '@/lib/supabase/client';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const hero = searchParams.get('hero');

    const supabase = createClient();

    let query = supabase
        .from('cinema_journey')
        .select('*')
        .order('milestone_date', { ascending: true });

    if (hero) {
        query = query.eq('hero_name', hero);
    }

    const { data, error } = await query;

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Transform data to match frontend interface
    const milestones = data.map((milestone: any) => ({
        id: milestone.id,
        type: milestone.milestone_type,
        title: milestone.title,
        description: milestone.description,
        date: milestone.milestone_date,
        movieName: milestone.movie_name,
        imageUrl: milestone.image_url,
        year: new Date(milestone.milestone_date).getFullYear(),
    }));

    return NextResponse.json(milestones);
}
