// Application Configuration
export const APP_CONFIG = {
  name: 'Marmagya 10.0',
  version: '1.0.0',
  description: 'Marmagya X Conclave Hub - Conference Website',
} as const;

// Storage Buckets
export const STORAGE_BUCKETS = {
  speakerImages: 'speaker-images',
  galleryImages: 'gallery-images',
  sponsorLogos: 'sponsor-logos',
} as const;

// Default Images
export const DEFAULT_IMAGES = {
  speaker: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
  panelSpeaker: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
} as const;

// API Configuration
export const API_CONFIG = {
  timeout: 10000,
  maxFileSize: 5242880, // 5MB
} as const;
