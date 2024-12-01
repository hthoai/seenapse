import React from 'react';
import { Video, Headphones, FileText, Clock, User } from 'lucide-react';
import { URLMetadata } from '../../types';

interface URLPreviewProps {
  metadata: URLMetadata;
  isLoading: boolean;
}

export default function URLPreview({ metadata, isLoading }: URLPreviewProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-48 bg-gray-200 rounded-t-lg" />
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
    );
  }

  const getIcon = () => {
    switch (metadata.type) {
      case 'video':
        return <Video className="h-5 w-5 text-blue-500" />;
      case 'audio':
        return <Headphones className="h-5 w-5 text-green-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
      {metadata.thumbnail && (
        <div className="relative h-48 bg-gray-100">
          <img
            src={metadata.thumbnail}
            alt={metadata.title}
            className="w-full h-full object-cover"
          />
          {metadata.duration && (
            <div className="absolute bottom-2 right-2 px-2 py-1 bg-black bg-opacity-75 rounded text-white text-xs">
              {metadata.duration}
            </div>
          )}
        </div>
      )}
      
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            {getIcon()}
            <span className="text-sm font-medium text-gray-500">
              {metadata.domain}
            </span>
          </div>
        </div>
        
        <h3 className="font-medium text-gray-900">{metadata.title}</h3>
        
        {metadata.description && (
          <p className="text-sm text-gray-500 line-clamp-2">
            {metadata.description}
          </p>
        )}
        
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          {metadata.author && (
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{metadata.author}</span>
            </div>
          )}
          {metadata.duration && (
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{metadata.duration}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}