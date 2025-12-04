import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // No caching

export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get('authorization');

        // Basic security check (in production, use a strong secret)
        if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        console.log('[Scraper] Starting scheduled scrape job...');

        // In a real implementation, we would call the scraper logic here
        // await runScraper();

        return NextResponse.json({
            success: true,
            message: 'Scrape job started',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('[Scraper] Error:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
