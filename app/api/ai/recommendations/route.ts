import { NextResponse } from 'next/server';
import { generateEventSuggestions } from '@/lib/ai/gemini-client';

export async function POST(request: Request) {
    try {
        const { userPreferences } = await request.json();

        if (!userPreferences) {
            return NextResponse.json(
                { success: false, error: 'User preferences are required' },
                { status: 400 }
            );
        }

        const result = await generateEventSuggestions(userPreferences);

        if (result.success) {
            return NextResponse.json({ success: true, suggestions: result.suggestions });
        } else {
            return NextResponse.json(
                { success: false, error: result.error },
                { status: 500 }
            );
        }
    } catch (error: any) {
        console.error('Error in recommendations API:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
