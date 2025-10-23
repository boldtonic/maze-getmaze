// Application constants

export const ROUTES = {
  HOME: '/',
  USER: '/user',
  MEDIA: '/media',
  AUTH: '/auth',
  PREVIEW: '/preview',
} as const;

export const DEMO_PROFILE_ID = 'demo-profile-id';

export const DEFAULT_STYLE: {
  backgroundColor: string;
  accentColor: string;
  fontFamily: string;
  borderRadius: number;
  theme: string;
  orientation: 'horizontal' | 'vertical';
} = {
  backgroundColor: '#1a1f2e',
  accentColor: '#004aad',
  fontFamily: 'Inter',
  borderRadius: 12,
  theme: 'dark',
  orientation: 'vertical',
};

export const DEFAULT_PROFILE = {
  displayName: 'Your Name',
  bio: 'Your bio here',
  title: 'Your Title',
};

export const FONT_FAMILIES = [
  'Inter',
  'Poppins',
  'Roboto',
  'Open Sans',
  'Montserrat',
] as const;

export const THEME_OPTIONS = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
] as const;

export const TOAST_MESSAGES = {
  SAVE_SUCCESS: 'Changes saved successfully!',
  SAVE_ERROR: 'Failed to save changes',
  DELETE_SUCCESS: 'Deleted successfully',
  DELETE_ERROR: 'Failed to delete',
  LOAD_ERROR: 'Failed to load data',
  AUTH_ERROR: 'Authentication failed',
  NETWORK_ERROR: 'Network error. Please try again.',
} as const;
