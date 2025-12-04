import Parser from 'rss-parser';

const parser = new Parser();

export interface RSSItem {
    title: string;
    link: string;
    pubDate: string;
    content?: string;
    contentSnippet?: string;
    guid?: string;
}

export async function parseRSS(url: string): Promise<RSSItem[]> {
    try {
        const feed = await parser.parseURL(url);
        return feed.items.map(item => ({
            title: item.title || '',
            link: item.link || '',
            pubDate: item.pubDate || '',
            content: item.content,
            contentSnippet: item.contentSnippet,
            guid: item.guid
        }));
    } catch (error) {
        console.error(`RSS Parse Error (${url}):`, error);
        return [];
    }
}
