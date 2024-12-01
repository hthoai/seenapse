import React, { useState } from 'react';
import { X } from 'lucide-react';
import FileUploadZone from './FileUploadZone';
import URLInput from './URLInput';
import { useStore } from '../../store/useStore';
import { nanoid } from 'nanoid';
import { ContentItem } from '../../types';

interface AddContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContentAdded: (content: ContentItem) => void;
}

export default function AddContentModal({ isOpen, onClose, onContentAdded }: AddContentModalProps) {
  const [activeTab, setActiveTab] = useState<'file' | 'url'>('file');
  const addContent = useStore((state) => state.addContent);

  if (!isOpen) return null;

  const handleContentAdd = (content: ContentItem) => {
    addContent(content);
    onContentAdded(content);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-25 transition-opacity" onClick={onClose} />
        
        <div className="relative w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Add Content</h2>
            <button
              onClick={onClose}
              className="rounded-full p-1 hover:bg-gray-100"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          <div className="mb-6">
            <div className="flex space-x-4 border-b border-gray-200">
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === 'file'
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('file')}
              >
                Upload File
              </button>
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === 'url'
                    ? 'border-b-2 border-indigo-500 text-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('url')}
              >
                Add URL
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {activeTab === 'file' ? (
              <FileUploadZone
                onFileAccepted={(file) => {
                  const content: ContentItem = {
                    id: nanoid(),
                    title: file.name,
                    type: file.type.includes('pdf') ? 'pdf' : 
                          file.type.includes('audio') ? 'audio' : 'text',
                    sourceUrl: URL.createObjectURL(file),
                    dateAdded: new Date(),
                    fileSize: file.size,
                    mimeType: file.type
                  };
                  handleContentAdd(content);
                }}
              />
            ) : (
              <URLInput
                onURLSubmit={(url, metadata) => {
                  const content: ContentItem = {
                    id: nanoid(),
                    title: metadata.title || url,
                    type: metadata.type || 'text',
                    sourceUrl: url,
                    dateAdded: new Date(),
                    thumbnail: metadata.thumbnail,
                    summary: metadata.description
                  };
                  handleContentAdd(content);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}