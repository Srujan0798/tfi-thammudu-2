import { ScrapedNewsItem } from './service';
import { generateIdFromUrl } from './normalizer';

// In-memory cache for demo (in prod, query DB)
const SEEN_URLS = new Set<string>();

export function isDuplicate(item: ScrapedNewsItem): boolean {
    const id = generateIdFromUrl(item.url);

    if (SEEN_URLS.has(id)) {
        return true;
    }

    SEEN_URLS.add(id);
    return false;
}

// Fuzzy matching (Simplified)
export function isSimilarTitle(title1: string, title2: string): boolean {
    const t1 = title1.toLowerCase().split(' ').sort().join(' ');
    const t2 = title2.toLowerCase().split(' ').sort().join(' ');

    // Very basic check: if one contains the other or they are equal
    return t1.includes(t2) || t2.includes(t1);
}
