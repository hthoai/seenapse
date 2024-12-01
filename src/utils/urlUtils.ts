import { ContentType, URLMetadata } from '../types';

export function getContentType(url: string): ContentType {
  const urlLower = url.toLowerCase();
  
  if (isYouTubeUrl(urlLower)) return 'video';
  if (isPodcastUrl(urlLower)) return 'audio';
  return 'text';
}

export function isYouTubeUrl(url: string): boolean {
  return url.includes('youtube.com/watch') || url.includes('youtu.be/');
}

export function isPodcastUrl(url: string): boolean {
  return (
    url.includes('spotify.com/episode') ||
    url.includes('podcasts.apple.com') ||
    url.includes('anchor.fm')
  );
}

export function getYouTubeVideoId(url: string): string | null {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
}

export function getDomainName(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return domain.replace('www.', '');
  } catch {
    return '';
  }
}

export async function fetchUrlMetadata(url: string): Promise<URLMetadata> {
  // In a real app, this would make an API call to a backend service
  // that handles metadata extraction. For demo purposes, we'll simulate it.
  
  const contentType = getContentType(url);
  const domain = getDomainName(url);
  
  if (contentType === 'video' && isYouTubeUrl(url)) {
    const videoId = getYouTubeVideoId(url);
    return {
      title: 'YouTube Video Title', // Would be fetched from YouTube API
      type: 'video',
      thumbnail: videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : undefined,
      description: 'Video description would be fetched from YouTube API',
      author: 'Channel Name',
      duration: '10:30',
      domain
    };
  }
  
  if (contentType === 'audio') {
    return {
      title: 'Podcast Episode Title',
      type: 'audio',
      thumbnail: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=350&q=80',
      description: 'Podcast episode description',
      author: 'Podcast Host',
      duration: '45:00',
      domain
    };
  }
  
  return {
    title: 'Article Title',
    type: 'text',
    thumbnail: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=350&q=80',
    description: 'Article description/excerpt',
    author: 'Article Author',
    domain
  };
}