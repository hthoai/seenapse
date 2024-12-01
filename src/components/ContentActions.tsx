import React, { useState } from 'react';
import { Pin, FolderPlus } from 'lucide-react';
import { useStore } from '../store/useStore';
import { ContentItem } from '../types';
import AddToCollectionModal from './Library/AddToCollectionModal';

interface ContentActionsProps {
  content: ContentItem;
}

export default function ContentActions({ content }: ContentActionsProps) {
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const { pinnedContent, togglePinContent } = useStore();
  
  const isPinned = pinnedContent.some((c) => c.id === content.id);

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => togglePinContent(content.id)}
        className={`p-2 rounded-full ${
          isPinned
            ? 'text-indigo-600 hover:text-indigo-700 bg-indigo-50'
            : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
        }`}
        title={isPinned ? 'Unpin content' : 'Pin content'}
      >
        <Pin className="h-5 w-5" />
      </button>
      
      <button
        onClick={() => setIsCollectionModalOpen(true)}
        className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100"
        title="Add to collection"
      >
        <FolderPlus className="h-5 w-5" />
      </button>

      <AddToCollectionModal
        isOpen={isCollectionModalOpen}
        onClose={() => setIsCollectionModalOpen(false)}
        contentId={content.id}
      />
    </div>
  );
}