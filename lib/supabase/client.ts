import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const createClient = () => {
  return supabase;
};

// Types for database tables
export interface User {
  id: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  is_creator: boolean;
  is_verified: boolean;
  favorite_heroes?: string[];
  favorite_directors?: string[];
  preferences?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  event_date: string;
  event_time?: string;
  event_type: 'release' | 'birthday' | 'anniversary' | 'audio_launch' | 'premiere' | 'jayanti' | 'custom';
  is_public: boolean;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Tag {
  id: string;
  name: string;
  category?: string;
  color?: string;
  created_at: string;
}

export interface EventLink {
  id: string;
  event_id: string;
  platform: 'youtube' | 'instagram' | 'twitter' | 'spotify' | 'bookmyshow' | 'custom';
  url: string;
  title?: string;
  thumbnail_url?: string;
  metadata?: Record<string, any>;
  created_at: string;
}

export interface SharedCalendar {
  id: string;
  creator_id: string;
  follower_id: string;
  sync_tags?: string[];
  is_active: boolean;
  created_at: string;
}

export interface AISuggestion {
  id: string;
  user_id: string;
  suggested_event: Record<string, any>;
  source?: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
}
