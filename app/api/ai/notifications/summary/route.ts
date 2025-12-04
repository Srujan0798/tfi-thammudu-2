import { NextResponse } from 'next/server';
import { summarizeNotifications } from '@/lib/ai/gemini-client';

export async function POST(request: Request) {
    try {
        const { notifications } = await request.json();
        const result = await summarizeNotifications(notifications);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Failed to summarize' }, { status: 500 });
    }
}
