import React, { useState } from 'react';
import ContentCard from '../components/ContentCard';
import AddContentModal from '../components/AddContent/AddContentModal';
import { useStore } from '../store/useStore';
import { PlusCircle, BookOpen, Brain, Trophy } from 'lucide-react';
import { ContentItem } from '../types';

interface DashboardProps {
  onContentSelect: (content: ContentItem) => void;
}

export default function Dashboard({ onContentSelect }: DashboardProps) {
  const { contents } = useStore();
  const [isAddContentOpen, setIsAddContentOpen] = useState(false);

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <button
          onClick={() => setIsAddContentOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add Content
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <BookOpen className="h-8 w-8 text-blue-600 mb-2" />
          <h3 className="text-lg font-semibold text-gray-900">Content Library</h3>
          <p className="text-3xl font-bold text-blue-600">{contents.length}</p>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg">
          <Brain className="h-8 w-8 text-green-600 mb-2" />
          <h3 className="text-lg font-semibold text-gray-900">Study Sessions</h3>
          <p className="text-3xl font-bold text-green-600">0</p>
        </div>
        
        <div className="bg-purple-50 p-6 rounded-lg">
          <Trophy className="h-8 w-8 text-purple-600 mb-2" />
          <h3 className="text-lg font-semibold text-gray-900">Mastered Items</h3>
          <p className="text-3xl font-bold text-purple-600">0</p>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900">Recent Content</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {contents.map((content) => (
            <ContentCard
              key={content.id}
              content={content}
              onClick={() => onContentSelect(content)}
            />
          ))}
          {contents.length === 0 && (
            <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No content yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by adding your first learning material
              </p>
            </div>
          )}
        </div>
      </div>

      <AddContentModal
        isOpen={isAddContentOpen}
        onClose={() => setIsAddContentOpen(false)}
        onContentAdded={onContentSelect}
      />
    </div>
  );
}