export interface ContentItem {
  id: string;
  title: string;
  type: ContentType;
  summary?: string;
  sourceUrl: string;
  dateAdded: Date;
  lastAccessed?: Date;
  tags?: string[];
  thumbnail?: string;
  fileSize?: number;
  mimeType?: string;
  author?: string;
  duration?: string;
  domain?: string;
}

export type ContentType = 'video' | 'audio' | 'text' | 'pdf';

export interface URLMetadata {
  title: string;
  type: ContentType;
  thumbnail?: string;
  description?: string;
  author?: string;
  duration?: string;
  domain?: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  contents: string[]; // Array of content IDs
  dateCreated: Date;
}

export interface Flashcard {
  id: string;
  contentId: string;
  question: string;
  answer: string;
  lastReviewed?: Date;
  nextReviewDate?: Date;
  difficulty: 1 | 2 | 3 | 4 | 5;
}

export interface Note {
  id: string;
  contentId: string;
  text: string;
  timestamp?: number;
  dateCreated: Date;
  dateModified: Date;
}

export interface UploadProgress {
  progress: number;
  status: 'idle' | 'uploading' | 'processing' | 'complete' | 'error';
  error?: string;
}