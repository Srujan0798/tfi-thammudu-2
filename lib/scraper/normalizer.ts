import { ScrapedNewsItem } from './service';

export function normalizeNewsItem(item: ScrapedNewsItem): ScrapedNewsItem {
    let { title, description } = item;

    // 1. Clean Title
    title = title.replace(/^(Review:|Live Updates:|News:)\s*/i, '').trim();
    title = title.replace(/\s+/g, ' '); // Remove extra spaces

    // 2. Generate Description if missing
    if (!description) {
        description = `Read the latest update about ${title} on ${item.source}.`;
    }

    // 3. Detect Category (Basic Keyword Matching)
    // In a real app, we might use AI here or more complex regex
    // const category = detectCategory(title);

    return {
        ...item,
        title,
        description,
        // category
    };
}

// Helper to generate a deterministic ID from URL
export function generateIdFromUrl(url: string): string {
    // Simple hash for demo purposes
    let hash = 0;
    for (let i = 0; i < url.length; i++) {
        const char = url.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16);
}
