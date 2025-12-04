import { NextRequest, NextResponse } from 'next/server';
import { generateEventSuggestions } from '@/lib/ai/gemini-client';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { favoriteHeroes, favoriteDirectors, interests } = body;

        const result = await generateEventSuggestions({
            favoriteHeroes,
            favoriteDirectors,
            interests,
        });

        if (result.success) {
            return NextResponse.json({
                success: true,
                suggestions: result.suggestions,
            });
        } else {
            return NextResponse.json(
                { error: result.error },
                { status: 500 }
            );
        }
    } catch (error: any) {
        console.error('Suggestions API error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to generate suggestions' },
            { status: 500 }
        );
    }
}
