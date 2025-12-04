import { NextResponse } from 'next/server';
import { analyzeSentiment } from '@/lib/ai/gemini-client';

export async function POST(request: Request) {
    try {
        const { comments } = await request.json();

        if (!comments || !Array.isArray(comments)) {
            return NextResponse.json(
                { success: false, error: 'Comments array is required' },
                { status: 400 }
            );
        }

        const result = await analyzeSentiment(comments);

        if (result.success) {
            return NextResponse.json({ success: true, analysis: result.analysis });
        } else {
            return NextResponse.json(
                { success: false, error: result.error },
                { status: 500 }
            );
        }
    } catch (error: any) {
        console.error('Error in sentiment API:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
