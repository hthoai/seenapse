import React, { useState } from 'react';
import { X, Plus, Check } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface AddToCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentId: string;
}

export default function AddToCollectionModal({
  isOpen,
  onClose,
  contentId,
}: AddToCollectionModalProps) {
  const { collections, addContentToCollection } = useStore();
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    selectedCollections.forEach((collectionId) => {
      addContentToCollection(contentId, collectionId);
    });
    onClose();
    setSelectedCollections([]);
  };

  const toggleCollection = (collectionId: string) => {
    setSelectedCollections((prev) =>
      prev.includes(collectionId)
        ? prev.filter((id) => id !== collectionId)
        : [...prev, collectionId]
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
        
        <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Add to Collection</h2>
            <button
              onClick={onClose}
              className="rounded-full p-1 hover:bg-gray-100"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              {collections.map((collection) => (
                <button
                  key={collection.id}
                  type="button"
                  onClick={() => toggleCollection(collection.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border ${
                    selectedCollections.includes(collection.id)
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex flex-col items-start">
                    <span className="font-medium text-gray-900">{collection.name}</span>
                    <span className="text-sm text-gray-500">
                      {collection.contents.length} items
                    </span>
                  </div>
                  {selectedCollections.includes(collection.id) ? (
                    <Check className="h-5 w-5 text-indigo-600" />
                  ) : (
                    <Plus className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              ))}

              {collections.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No collections yet</p>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={selectedCollections.length === 0}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md disabled:opacity-50"
              >
                Add to Collections
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}