-- TFI Calendar Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  is_creator BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT FALSE,
  is_onboarded BOOLEAN DEFAULT FALSE,
  favorite_heroes TEXT[], -- Array of favorite hero names
  favorite_directors TEXT[], -- Array of favorite director names
  preferences JSONB DEFAULT '{}', -- User preferences for AI personalization
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tags table
CREATE TABLE IF NOT EXISTS public.tags (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  category TEXT, -- 'hero', 'director', 'music', 'genre', etc.
  color TEXT, -- Hex color for UI
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  event_time TIME,
  event_type TEXT NOT NULL, -- 'release', 'birthday', 'anniversary', 'audio_launch', 'premiere', 'jayanti', 'custom'
  is_public BOOLEAN DEFAULT FALSE,
  metadata JSONB DEFAULT '{}', -- Additional event data
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Event tags (many-to-many relationship)
CREATE TABLE IF NOT EXISTS public.event_tags (
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (event_id, tag_id)
);

-- Event links table
CREATE TABLE IF NOT EXISTS public.event_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
  platform TEXT NOT NULL, -- 'youtube', 'instagram', 'twitter', 'spotify', 'bookmyshow', 'custom'
  url TEXT NOT NULL,
  title TEXT,
  thumbnail_url TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Shared calendars (for syncing/following)
CREATE TABLE IF NOT EXISTS public.shared_calendars (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  follower_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  sync_tags TEXT[], -- Only sync events with these tags
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(creator_id, follower_id)
);

-- AI suggestions table
CREATE TABLE IF NOT EXISTS public.ai_suggestions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  suggested_event JSONB NOT NULL, -- Event data suggested by AI
  source TEXT, -- 'news', 'social_media', 'pattern_recognition'
  status TEXT DEFAULT 'pending', -- 'pending', 'accepted', 'rejected'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_events_user_id ON public.events(user_id);
CREATE INDEX IF NOT EXISTS idx_events_date ON public.events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_type ON public.events(event_type);
CREATE INDEX IF NOT EXISTS idx_event_links_event_id ON public.event_links(event_id);
CREATE INDEX IF NOT EXISTS idx_shared_calendars_follower ON public.shared_calendars(follower_id);
CREATE INDEX IF NOT EXISTS idx_ai_suggestions_user ON public.ai_suggestions(user_id);

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shared_calendars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_suggestions ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Anyone can view public creator profiles" ON public.users
  FOR SELECT USING (is_creator = TRUE);

-- Events policies
CREATE POLICY "Users can view their own events" ON public.events
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view public events" ON public.events
  FOR SELECT USING (is_public = TRUE);

CREATE POLICY "Users can create their own events" ON public.events
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own events" ON public.events
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own events" ON public.events
  FOR DELETE USING (auth.uid() = user_id);

-- Event links policies
CREATE POLICY "Users can view links for accessible events" ON public.event_links
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.events
      WHERE events.id = event_links.event_id
      AND (events.user_id = auth.uid() OR events.is_public = TRUE)
    )
  );

CREATE POLICY "Users can manage links for their events" ON public.event_links
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.events
      WHERE events.id = event_links.event_id
      AND events.user_id = auth.uid()
    )
  );

-- Shared calendars policies
CREATE POLICY "Users can view their calendar subscriptions" ON public.shared_calendars
  FOR SELECT USING (auth.uid() = follower_id OR auth.uid() = creator_id);

CREATE POLICY "Users can create calendar subscriptions" ON public.shared_calendars
  FOR INSERT WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can manage their subscriptions" ON public.shared_calendars
  FOR UPDATE USING (auth.uid() = follower_id);

CREATE POLICY "Users can delete their subscriptions" ON public.shared_calendars
  FOR DELETE USING (auth.uid() = follower_id);

-- AI suggestions policies
CREATE POLICY "Users can view their AI suggestions" ON public.ai_suggestions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their AI suggestions" ON public.ai_suggestions
  FOR UPDATE USING (auth.uid() = user_id);

-- Functions

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default tags
INSERT INTO public.tags (name, category, color) VALUES
  ('Pawan Kalyan', 'hero', '#FF6B6B'),
  ('Prabhas', 'hero', '#4ECDC4'),
  ('Mahesh Babu', 'hero', '#45B7D1'),
  ('Allu Arjun', 'hero', '#FFA07A'),
  ('Jr NTR', 'hero', '#98D8C8'),
  ('Ram Charan', 'hero', '#F7DC6F'),
  ('Chiranjeevi', 'hero', '#BB8FCE'),
  ('Rajamouli', 'director', '#85C1E2'),
  ('Trivikram', 'director', '#F8B739'),
  ('Sukumar', 'director', '#52B788'),
  ('Devi Sri Prasad', 'music', '#E63946'),
  ('Thaman', 'music', '#F77F00'),
  ('Movie Release', 'event', '#06FFA5'),
  ('Birthday', 'event', '#FFD60A'),
  ('Jayanti', 'event', '#9D4EDD'),
  ('Audio Launch', 'event', '#00BBF9')
ON CONFLICT (name) DO NOTHING;
