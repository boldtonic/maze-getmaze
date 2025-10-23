// Shared types across the application

export type PlanType = 'user' | 'media';
export type PlanTier = 'free' | 'premium';

export interface Link {
  id: string;
  title: string;
  url: string;
  icon: string;
  thumbnail?: string;
  type: 'featured' | 'social';
}

export interface StyleConfig {
  backgroundColor: string;
  accentColor: string;
  fontFamily: string;
  borderRadius: number;
  theme: string;
  orientation: 'horizontal' | 'vertical';
}

export interface ProfileConfig {
  displayName: string;
  bio: string;
  title: string;
}

export interface MazeConfiguration {
  theme: string;
  idea: string;
  context: string;
  coverImage: string | null;
  style: StyleConfig;
  profile: ProfileConfig;
  links: Link[];
}

export interface MazeData {
  id?: string;
  title: string;
  description: string;
  configuration: MazeConfiguration;
  profile_id?: string;
  is_published?: boolean;
  views?: number;
  created_at?: string;
  updated_at?: string;
}

export interface DashboardProps {
  planType: PlanType;
  isPremium: boolean;
}
