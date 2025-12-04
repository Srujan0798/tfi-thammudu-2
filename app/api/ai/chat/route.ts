import { NextRequest, NextResponse } from 'next/server';
import { createTFIChatCompletion } from '@/lib/ai/gemini-client';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { messages, userContext } = body;

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { error: 'Invalid messages format' },
                { status: 400 }
            );
        }

        const result = await createTFIChatCompletion(messages, userContext);

        if (result.success) {
            return NextResponse.json({
                success: true,
                message: result.message,
            });
        } else {
            return NextResponse.json(
                { error: result.error },
                { status: 500 }
            );
        }
    } catch (error: any) {
        console.error('Chat API error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to process chat' },
            { status: 500 }
        );
    }
}
