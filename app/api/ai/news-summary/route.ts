import { NextResponse } from 'next/server';
import { analyzeTFINews } from '@/lib/ai/gemini-client';

export async function POST(request: Request) {
    try {
        const { newsText } = await request.json();

        if (!newsText) {
            return NextResponse.json(
                { success: false, error: 'News text is required' },
                { status: 400 }
            );
        }

        const result = await analyzeTFINews(newsText);

        if (result.success) {
            return NextResponse.json({ success: true, events: result.events });
        } else {
            return NextResponse.json(
                { success: false, error: result.error },
                { status: 500 }
            );
        }
    } catch (error: any) {
        console.error('Error in news summary API:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
