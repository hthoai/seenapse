import React, { useState } from 'react';
import { Link, Loader2, Video, Headphones, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import { URLMetadata } from '../../types';
import { fetchUrlMetadata } from '../../utils/urlUtils';
import URLPreview from './URLPreview';
import ContentTypeSection from './ContentTypeSection';

interface URLInputProps {
  onURLSubmit: (url: string, metadata: URLMetadata) => void;
}

export default function URLInput({ onURLSubmit }: URLInputProps) {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [metadata, setMetadata] = useState<URLMetadata | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleUrlChange = async (value: string) => {
    setUrl(value);
    setError(null);

    if (!value) {
      setMetadata(null);
      return;
    }

    if (!validateUrl(value)) {
      setError('Please enter a valid URL');
      return;
    }

    try {
      setIsLoading(true);
      const metadata = await fetchUrlMetadata(value);
      setMetadata(metadata);
    } catch (error) {
      setError('Failed to fetch content details');
      toast.error('Failed to fetch content details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast.error('Please enter a URL');
      return;
    }

    if (!validateUrl(url)) {
      toast.error('Please enter a valid URL');
      return;
    }

    if (!metadata) {
      toast.error('Failed to process URL');
      return;
    }

    try {
      onURLSubmit(url, metadata);
    } catch (error) {
      toast.error('Failed to add content');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <ContentTypeSection
          icon={Video}
          title="Videos"
          description="YouTube videos and tutorials"
          iconColor="text-blue-500"
        />
        <ContentTypeSection
          icon={Headphones}
          title="Podcasts"
          description="Spotify, Apple Podcasts"
          iconColor="text-green-500"
        />
        <ContentTypeSection
          icon={FileText}
          title="Articles"
          description="Blog posts and articles"
          iconColor="text-purple-500"
        />
      </div>

      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700">
          Content URL
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Link className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => handleUrlChange(e.target.value)}
            className={`block w-full pl-10 pr-12 py-2 border rounded-md focus:ring-2 focus:ring-offset-2 ${
              error
                ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'
            }`}
            placeholder="Paste URL from YouTube, articles, or podcasts"
          />
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>

      {(url && !error) && (
        <div className="mt-4">
          <URLPreview
            metadata={metadata || {
              title: '',
              type: 'text',
              domain: ''
            }}
            isLoading={isLoading}
          />
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading || !metadata}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isLoading ? (
          <span className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Processing...</span>
          </span>
        ) : (
          'Add Content'
        )}
      </button>
    </form>
  );
}