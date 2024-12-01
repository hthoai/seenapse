import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Share2, CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { useStore } from '../store/useStore';
import ContentViewer from '../components/ContentViewer';
import AIChatPanel from '../components/AIChatPanel';
import ContentSummary from '../components/ContentSummary';
import NotesSection from '../components/NotesSection';
import ProgressTracker from '../components/ProgressTracker';
import ContentActions from '../components/ContentActions';

interface ContentDetailsProps {
  contentId: string;
  onBack: () => void;
}

export default function ContentDetails({ contentId, onBack }: ContentDetailsProps) {
  const content = useStore((state) => 
    state.contents.find((c) => c.id === contentId)
  );
  const [isCompleted, setIsCompleted] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);

  if (!content) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ArrowLeft className="h-5 w-5 text-gray-500" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 line-clamp-1">
                  {content.title}
                </h1>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <BookOpen className="h-4 w-4" />
                  <span>{content.type}</span>
                  {content.duration && (
                    <span>• {content.duration}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ContentActions content={content} />
              <button
                onClick={() => setIsCompleted(!isCompleted)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium ${
                  isCompleted
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <CheckCircle className="h-4 w-4" />
                <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
              </button>
              <button
                className="p-2 hover:bg-gray-100 rounded-full"
                onClick={() => {/* Share functionality */}}
              >
                <Share2 className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          <div className={`flex-1 space-y-6 transition-all duration-300 ${
            isChatOpen ? 'mr-[400px]' : 'mr-0'
          }`}>
            <ContentViewer content={content} />
            <ProgressTracker progress={75} />
            <ContentSummary content={content} />
            <NotesSection contentId={content.id} />
          </div>

          <div className={`fixed top-24 right-0 h-[calc(100vh-6rem)] transition-all duration-300 transform ${
            isChatOpen ? 'translate-x-0' : 'translate-x-[calc(100%-2.5rem)]'
          }`}>
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 bg-white rounded-full p-1 shadow-lg border border-gray-200 hover:bg-gray-50"
            >
              {isChatOpen ? (
                <ChevronRight className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronLeft className="h-5 w-5 text-gray-500" />
              )}
            </button>
            <div className="w-[400px] h-full">
              <AIChatPanel content={content} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}