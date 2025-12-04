import { NextResponse } from 'next/server';
import { prioritizeNotification } from '@/lib/ai/gemini-client';

export async function POST(request: Request) {
    try {
        const { notification } = await request.json();
        const result = await prioritizeNotification(notification);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ success: false, priority: 'Normal' }, { status: 500 });
    }
}
