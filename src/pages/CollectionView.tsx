import React from 'react';
import { useStore } from '../store/useStore';
import ContentCard from '../components/ContentCard';
import { ArrowLeft, Pencil } from 'lucide-react';
import { ContentItem } from '../types';

interface CollectionViewProps {
  collectionId: string;
  onBack: () => void;
  onContentSelect: (content: ContentItem) => void;
}

export default function CollectionView({
  collectionId,
  onBack,
  onContentSelect,
}: CollectionViewProps) {
  const { collections, contents } = useStore();
  const collection = collections.find((c) => c.id === collectionId);

  if (!collection) return null;

  const collectionContents = contents.filter((content) =>
    collection.contents.includes(content.id)
  );

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ArrowLeft className="h-5 w-5 text-gray-500" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{collection.name}</h1>
            <p className="text-gray-500 mt-1">{collection.description}</p>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Pencil className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {collectionContents.map((content) => (
          <ContentCard
            key={content.id}
            content={content}
            onClick={() => onContentSelect(content)}
          />
        ))}
        {collectionContents.length === 0 && (
          <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-medium text-gray-900">No content yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Add content to this collection to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}