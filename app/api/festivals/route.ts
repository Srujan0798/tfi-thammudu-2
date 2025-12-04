import { createClient } from '@/lib/supabase/client';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const festival = searchParams.get('festival');

    const supabase = createClient();

    let query = supabase
        .from('festival_releases')
        .select('*')
        .order('year', { ascending: false });

    if (festival && festival !== 'all') {
        query = query.eq('festival_name', festival);
    }

    const { data, error } = await query;

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Transform data to match frontend interface
    const releases = data.map((release: any) => ({
        id: release.id,
        festivalName: release.festival_name,
        year: release.year,
        festivalDate: release.festival_date,
        movieName: release.movie_name,
        heroName: release.hero_name,
        directorName: release.director_name,
        productionHouse: release.production_house,
        posterUrl: release.poster_url,
        trailerUrl: release.trailer_url,
        predictionScore: release.prediction_score,
        boxOfficeResult: release.box_office_result,
    }));

    return NextResponse.json(releases);
}
