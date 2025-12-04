import { ScrapedNewsItem } from './service';

export interface ScraperAdapter {
    name: string;
    baseUrl: string;
    scrape(): Promise<ScrapedNewsItem[]>;
}
