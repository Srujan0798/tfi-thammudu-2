import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Error: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
    console.log('Current directory:', process.cwd());
    console.log('Supabase URL length:', supabaseUrl?.length);
    console.log('Service Key length:', supabaseServiceKey?.length);
    process.exit(1);
}

console.log('Supabase URL:', supabaseUrl); // Safe to print URL
console.log('Service Key length:', supabaseServiceKey.length); // Print length only

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seed() {
    console.log('🌱 Starting database seed...');

    // 1. Seed Official Channels
    console.log('Seeding Official Channels...');
    const channels = [
        {
            name: 'Hombale Films',
            channel_type: 'production_house',
            slug: 'hombale-films',
            description: 'Makers of KGF, Salaar, and Kantara.',
            is_verified: true,
        },
        {
            name: 'Vyjayanthi Movies',
            channel_type: 'production_house',
            slug: 'vyjayanthi-movies',
            description: 'Legacy production house. Makers of Kalki 2898 AD.',
            is_verified: true,
        },
        {
            name: 'Haarika & Hassine Creations',
            channel_type: 'production_house',
            slug: 'haarika-hassine',
            description: 'Home banner of Trivikram Srinivas.',
            is_verified: true,
        },
        {
            name: 'T-Series Telugu',
            channel_type: 'music_label',
            slug: 't-series-telugu',
            description: 'Official T-Series Telugu channel.',
            is_verified: true,
        },
    ];

    const { error: channelsError } = await supabase
        .from('official_channels')
        .upsert(channels, { onConflict: 'slug' });

    if (channelsError) console.error('Error seeding channels:', channelsError);
    else console.log('✅ Official Channels seeded.');

    // 2. Seed Events (Upcoming Movies, Birthdays)
    console.log('Seeding Events...');

    // We need a user ID to associate events with. Ideally, we'd use a system user or admin.
    // For now, we'll try to fetch the first user, or create a dummy one if possible (but we can't create auth users easily here).
    // If no user exists, we might fail foreign key constraints if we enforce user_id.
    // However, the `events` table has `user_id` as a foreign key.
    // Let's check if we can find *any* user.
    const { data: users } = await supabase.from('users').select('id').limit(1);
    let userId = users?.[0]?.id;

    if (!userId) {
        console.warn('⚠️ No users found. Skipping event creation that requires user_id.');
        // In a real scenario, we might want to create a seed user via auth admin API if we had access.
    } else {
        const events = [
            {
                user_id: userId,
                title: 'OG Release',
                description: 'Pawan Kalyan\'s massive gangster drama directed by Sujeeth.',
                event_date: '2025-03-27', // Speculative date
                event_type: 'release',
                is_public: true,
                metadata: { hero: 'Pawan Kalyan', director: 'Sujeeth' }
            },
            {
                user_id: userId,
                title: 'Game Changer Release',
                description: 'Ram Charan & Shankar\'s political thriller.',
                event_date: '2025-01-10',
                event_type: 'release',
                is_public: true,
                metadata: { hero: 'Ram Charan', director: 'Shankar' }
            },
            {
                user_id: userId,
                title: 'Prabhas Birthday',
                description: 'Rebel Star Prabhas Birthday Celebrations.',
                event_date: '2024-10-23',
                event_type: 'birthday',
                is_public: true,
                metadata: { hero: 'Prabhas' }
            },
            {
                user_id: userId,
                title: 'Pushpa 2: The Rule',
                description: 'Allu Arjun & Sukumar\'s highly anticipated sequel.',
                event_date: '2024-12-06',
                event_type: 'release',
                is_public: true,
                metadata: { hero: 'Allu Arjun', director: 'Sukumar' }
            },
            {
                user_id: userId,
                title: 'SSMB29 Announcement',
                description: 'Mahesh Babu & Rajamouli\'s globetrotting adventure update.',
                event_date: '2025-08-09', // Mahesh Babu Birthday
                event_type: 'announcement',
                is_public: true,
                metadata: { hero: 'Mahesh Babu', director: 'Rajamouli' }
            }
        ];

        // We can't easily upsert events without a unique constraint on something other than ID.
        // So we'll just insert them. To avoid duplicates on re-runs, we could check existence, but for now we'll just insert.
        // Or better, we can assume this is a fresh seed or we don't care about duplicates for this demo.
        // Actually, let's try to be smarter. We can select existing events by title and date.

        for (const event of events) {
            const { data: existing } = await supabase
                .from('events')
                .select('id')
                .eq('title', event.title)
                .eq('event_date', event.event_date)
                .single();

            if (!existing) {
                const { error } = await supabase.from('events').insert(event);
                if (error) console.error(`Error inserting event ${event.title}:`, error);
            }
        }
        console.log('✅ Events seeded.');
    }

    // 3. Seed Cinema Journey (Milestones)
    console.log('Seeding Cinema Journey...');
    const milestones = [
        {
            hero_name: 'Allu Arjun',
            milestone_type: 'debut',
            title: 'Gangotri Release',
            description: 'The debut of the Stylish Star.',
            milestone_date: '2003-03-28',
            movie_name: 'Gangotri',
        },
        {
            hero_name: 'Allu Arjun',
            milestone_type: 'blockbuster',
            title: 'Arya Sensation',
            description: 'The movie that defined his style and Sukumar\'s genius.',
            milestone_date: '2004-05-07',
            movie_name: 'Arya',
        },
        {
            hero_name: 'Ram Charan',
            milestone_type: 'debut',
            title: 'Chirutha Release',
            description: 'Mega Power Star arrives.',
            milestone_date: '2007-09-28',
            movie_name: 'Chirutha',
        },
        {
            hero_name: 'Ram Charan',
            milestone_type: 'blockbuster',
            title: 'Magadheera Records',
            description: 'An industry hit that stood for years.',
            milestone_date: '2009-07-31',
            movie_name: 'Magadheera',
        },
        {
            hero_name: 'NTR',
            milestone_type: 'debut',
            title: 'Ninnu Choodalani',
            description: 'Young Tiger\'s first roar.',
            milestone_date: '2001-05-25',
            movie_name: 'Ninnu Choodalani',
        },
        {
            hero_name: 'NTR',
            milestone_type: 'blockbuster',
            title: 'Simhadri Mania',
            description: 'Mass hysteria created by Rajamouli & NTR.',
            milestone_date: '2003-07-09',
            movie_name: 'Simhadri',
        }
    ];

    // Using upsert on specific columns might require a unique constraint.
    // The schema has `UNIQUE(hero_name, milestone_date)` index but maybe not constraint.
    // Let's try upsert, if it fails we'll catch it.
    // Actually, `cinema_journey` doesn't have a unique constraint defined in the schema file I saw earlier, 
    // but it has an index `idx_cinema_journey_hero`.
    // I'll just insert if not exists logic again to be safe.

    for (const item of milestones) {
        const { data: existing } = await supabase
            .from('cinema_journey')
            .select('id')
            .eq('hero_name', item.hero_name)
            .eq('movie_name', item.movie_name)
            .single();

        if (!existing) {
            const { error } = await supabase.from('cinema_journey').insert(item);
            if (error) console.error(`Error inserting milestone ${item.title}:`, error);
        }
    }
    console.log('✅ Cinema Journey seeded.');

    console.log('🌱 Database seed completed!');
}

seed().catch((err) => {
    console.error('Unexpected error:', err);
    process.exit(1);
});
