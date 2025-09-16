// Application Configuration
export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'Marmagya 10.0',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  description: import.meta.env.VITE_APP_DESCRIPTION || 'Marmagya X Conclave Hub - Conference Website',
} as const;

// Supabase Configuration
export const SUPABASE_CONFIG = {
  url: import.meta.env.VITE_SUPABASE_URL,
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
} as const;

// Storage Buckets
export const STORAGE_BUCKETS = {
  speakerImages: import.meta.env.VITE_SPEAKER_IMAGES_BUCKET || 'speaker-images',
  galleryImages: import.meta.env.VITE_GALLERY_IMAGES_BUCKET || 'gallery-images',
  sponsorLogos: import.meta.env.VITE_SPONSOR_LOGOS_BUCKET || 'sponsor-logos',
} as const;

// Default Images
export const DEFAULT_IMAGES = {
  speaker: import.meta.env.VITE_DEFAULT_SPEAKER_IMAGE || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
  panelSpeaker: import.meta.env.VITE_DEFAULT_PANEL_SPEAKER_IMAGE || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
} as const;

// API Configuration
export const API_CONFIG = {
  timeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '10000'),
  maxFileSize: parseInt(import.meta.env.VITE_MAX_FILE_SIZE || '5242880'), // 5MB
} as const;

// Development Configuration
export const DEV_CONFIG = {
  isDev: import.meta.env.VITE_DEV_MODE === 'true',
} as const;

// Validation
if (!SUPABASE_CONFIG.url || !SUPABASE_CONFIG.anonKey) {
  throw new Error('Missing required Supabase environment variables');
}
