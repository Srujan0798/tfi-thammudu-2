-- Add creator profile fields to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS is_creator BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS creator_type TEXT; -- 'fan_page', 'editor', 'official', 'production_house', 'ott_platform'
ALTER TABLE users ADD COLUMN IF NOT EXISTS follower_count INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS timeline_slug TEXT UNIQUE; -- e.g., '@PrinceArun'
ALTER TABLE users ADD COLUMN IF NOT EXISTS sync_enabled BOOLEAN DEFAULT false;
ALTER TABLE users ADD COLUMN IF NOT EXISTS official_verified BOOLEAN DEFAULT false;

-- Create timeline_syncs table for tracking who syncs with whom
CREATE TABLE IF NOT EXISTS timeline_syncs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  sync_tags TEXT[] DEFAULT '{}', -- Tags to filter sync (e.g., ['Prabhas', 'Salaar'])
  sync_types TEXT[] DEFAULT '{}', -- Event types to sync (e.g., ['release', 'birthday'])
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, creator_id)
);

-- Create creator_events table for events created by creators
CREATE TABLE IF NOT EXISTS creator_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  is_rumour BOOLEAN DEFAULT false,
  confidence_level TEXT, -- 'confirmed', 'likely', 'rumour'
  source_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(creator_id, event_id)
);

-- Create official_channels table for production houses, OTT, etc.
CREATE TABLE IF NOT EXISTS official_channels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  channel_type TEXT NOT NULL, -- 'production_house', 'ott_platform', 'tv_channel', 'music_label'
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  description TEXT,
  website_url TEXT,
  social_links JSONB, -- {twitter: '', instagram: '', youtube: ''}
  is_verified BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create channel_events table
CREATE TABLE IF NOT EXISTS channel_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  channel_id UUID NOT NULL REFERENCES official_channels(id) ON DELETE CASCADE,
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  announcement_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(channel_id, event_id)
);

-- Create live_updates table for TFI Live Mode
CREATE TABLE IF NOT EXISTS live_updates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  update_type TEXT, -- 'breaking', 'trending', 'rumour', 'confirmed'
  related_hero TEXT,
  related_movie TEXT,
  source_url TEXT,
  image_url TEXT,
  trending_score INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Create cinema_journey table for hero timelines
CREATE TABLE IF NOT EXISTS cinema_journey (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hero_name TEXT NOT NULL,
  milestone_type TEXT, -- 'debut', 'blockbuster', 'award', 'anniversary', 'achievement'
  title TEXT NOT NULL,
  description TEXT,
  milestone_date DATE NOT NULL,
  movie_name TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create re_releases table
CREATE TABLE IF NOT EXISTS re_releases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  movie_name TEXT NOT NULL,
  original_release_date DATE,
  re_release_date DATE NOT NULL,
  theater_name TEXT,
  city TEXT,
  state TEXT DEFAULT 'Telangana',
  ticket_url TEXT,
  poster_url TEXT,
  celebration_type TEXT, -- 'anniversary', 'birthday', 'special'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create festival_releases table
CREATE TABLE IF NOT EXISTS festival_releases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  festival_name TEXT NOT NULL, -- 'Sankranti', 'Dasara', 'Ugadi', 'Summer', 'Christmas'
  year INTEGER NOT NULL,
  festival_date DATE NOT NULL,
  movie_name TEXT NOT NULL,
  hero_name TEXT,
  director_name TEXT,
  production_house TEXT,
  poster_url TEXT,
  trailer_url TEXT,
  prediction_score INTEGER, -- AI prediction of success
  box_office_result TEXT, -- 'hit', 'superhit', 'blockbuster', 'flop' (after release)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(festival_name, year, movie_name)
);

-- Create fan_diary table for user memories
CREATE TABLE IF NOT EXISTS fan_diary (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  event_id UUID REFERENCES events(id) ON DELETE SET NULL,
  diary_date DATE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  photos TEXT[], -- Array of photo URLs
  location TEXT,
  watched_with TEXT, -- 'Friends', 'Family', 'Solo', etc.
  theater_name TEXT,
  show_type TEXT, -- 'FDFS', 'Regular', 'Special Show'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample official channels
INSERT INTO official_channels (name, channel_type, slug, description) VALUES
('Mythri Movie Makers', 'production_house', 'mythri-movie-makers', 'Leading Telugu production house'),
('UV Creations', 'production_house', 'uv-creations', 'Premium Telugu cinema production'),
('DVV Entertainment', 'production_house', 'dvv-entertainment', 'RRR and major productions'),
('Aha', 'ott_platform', 'aha', 'Telugu OTT platform'),
('Gemini TV', 'tv_channel', 'gemini-tv', 'Popular Telugu TV channel'),
('Aditya Music', 'music_label', 'aditya-music', 'Telugu music label'),
('Lahari Music', 'music_label', 'lahari-music', 'Telugu music production')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample cinema journey milestones
INSERT INTO cinema_journey (hero_name, milestone_type, title, milestone_date, movie_name) VALUES
('Prabhas', 'debut', 'Film Debut', '2002-09-12', 'Eeswar'),
('Prabhas', 'blockbuster', 'Pan-India Phenomenon', '2015-07-10', 'Baahubali'),
('Pawan Kalyan', 'debut', 'Film Debut', '1996-09-12', 'Akkada Ammayi Ikkada Abbayi'),
('Pawan Kalyan', 'blockbuster', 'Mass Blockbuster', '2012-05-11', 'Gabbar Singh'),
('Mahesh Babu', 'debut', 'Film Debut', '1999-04-30', 'Rajakumarudu'),
('Mahesh Babu', 'blockbuster', 'Industry Hit', '2006-01-12', 'Pokiri')
ON CONFLICT DO NOTHING;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_timeline_syncs_user ON timeline_syncs(user_id);
CREATE INDEX IF NOT EXISTS idx_timeline_syncs_creator ON timeline_syncs(creator_id);
CREATE INDEX IF NOT EXISTS idx_creator_events_creator ON creator_events(creator_id);
CREATE INDEX IF NOT EXISTS idx_live_updates_active ON live_updates(is_active, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cinema_journey_hero ON cinema_journey(hero_name, milestone_date);
CREATE INDEX IF NOT EXISTS idx_re_releases_date ON re_releases(re_release_date);
CREATE INDEX IF NOT EXISTS idx_festival_releases_year ON festival_releases(festival_name, year);
CREATE INDEX IF NOT EXISTS idx_fan_diary_user ON fan_diary(user_id, diary_date DESC);

-- Enable RLS
ALTER TABLE timeline_syncs ENABLE ROW LEVEL SECURITY;
ALTER TABLE creator_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE official_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE channel_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE live_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE cinema_journey ENABLE ROW LEVEL SECURITY;
ALTER TABLE re_releases ENABLE ROW LEVEL SECURITY;
ALTER TABLE festival_releases ENABLE ROW LEVEL SECURITY;
ALTER TABLE fan_diary ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own syncs" ON timeline_syncs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create syncs" ON timeline_syncs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their syncs" ON timeline_syncs FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view official channels" ON official_channels FOR SELECT USING (true);
CREATE POLICY "Anyone can view live updates" ON live_updates FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view cinema journey" ON cinema_journey FOR SELECT USING (true);
CREATE POLICY "Anyone can view re-releases" ON re_releases FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view festival releases" ON festival_releases FOR SELECT USING (true);

CREATE POLICY "Users can view their own diary" ON fan_diary FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create diary entries" ON fan_diary FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their diary" ON fan_diary FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their diary" ON fan_diary FOR DELETE USING (auth.uid() = user_id);
