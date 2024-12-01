import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import ContentCard from '../components/ContentCard';
import { Pin, Clock, Plus, FolderPlus } from 'lucide-react';
import { ContentItem } from '../types';
import AddCollectionModal from '../components/Library/AddCollectionModal';

interface LibraryProps {
  onContentSelect: (content: ContentItem) => void;
}

export default function Library({ onContentSelect }: LibraryProps) {
  const { contents, collections, pinnedContent } = useStore();
  const [isAddCollectionOpen, setIsAddCollectionOpen] = useState(false);

  const recentContents = [...contents].sort(
    (a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
  ).slice(0, 6);

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Library</h1>
        <button
          onClick={() => setIsAddCollectionOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <FolderPlus className="h-5 w-5 mr-2" />
          New Collection
        </button>
      </div>

      {/* Recent Content */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-gray-500" />
            Recent Content
          </h2>
          <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentContents.map((content) => (
            <ContentCard
              key={content.id}
              content={content}
              onClick={() => onContentSelect(content)}
            />
          ))}
        </div>
      </section>

      {/* Pinned Content */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Pin className="h-5 w-5 mr-2 text-gray-500" />
            Pinned Content
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pinnedContent.length > 0 ? (
            pinnedContent.map((content) => (
              <ContentCard
                key={content.id}
                content={content}
                onClick={() => onContentSelect(content)}
                isPinned
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
              <Pin className="mx-auto h-8 w-8 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No pinned content</h3>
              <p className="mt-1 text-sm text-gray-500">
                Pin important content for quick access
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Collections */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Collections</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {collection.name}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                {collection.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {collection.contents.length} items
                </span>
                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  View Collection
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={() => setIsAddCollectionOpen(true)}
            className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
          >
            <Plus className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm font-medium text-gray-900">Create Collection</span>
          </button>
        </div>
      </section>

      <AddCollectionModal
        isOpen={isAddCollectionOpen}
        onClose={() => setIsAddCollectionOpen(false)}
      />
    </div>
  );
}