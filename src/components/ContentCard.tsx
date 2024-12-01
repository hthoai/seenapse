import React from 'react';
import { FileText, Video, Headphones, FileDigit, Pin } from 'lucide-react';
import { ContentItem } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { useStore } from '../store/useStore';

interface ContentCardProps {
  content: ContentItem;
  onClick: (content: ContentItem) => void;
  isPinned?: boolean;
}

export default function ContentCard({ content, onClick, isPinned = false }: ContentCardProps) {
  const togglePinContent = useStore((state) => state.togglePinContent);

  const getIcon = () => {
    switch (content.type) {
      case 'video':
        return <Video className="h-6 w-6 text-blue-500" />;
      case 'audio':
        return <Headphones className="h-6 w-6 text-green-500" />;
      case 'pdf':
        return <FileDigit className="h-6 w-6 text-red-500" />;
      default:
        return <FileText className="h-6 w-6 text-gray-500" />;
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer group relative"
      onClick={() => onClick(content)}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          togglePinContent(content.id);
        }}
        className={`absolute top-2 right-2 p-1 rounded-full ${
          isPinned
            ? 'text-indigo-600 hover:text-indigo-700'
            : 'text-gray-400 hover:text-gray-500 opacity-0 group-hover:opacity-100'
        } transition-opacity`}
      >
        <Pin className="h-4 w-4" />
      </button>

      <div className="flex items-start space-x-4">
        <div className="p-2 bg-gray-50 rounded-lg">
          {getIcon()}
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{content.title}</h3>
          {content.summary && (
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
              {content.summary}
            </p>
          )}
          <div className="mt-2 text-xs text-gray-400">
            Added {formatDistanceToNow(content.dateAdded)} ago
          </div>
        </div>
      </div>
    </div>
  );
}