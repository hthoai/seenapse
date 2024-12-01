import React from 'react';
import { ContentItem } from '../types';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ContentSummaryProps {
  content: ContentItem;
}

export default function ContentSummary({ content }: ContentSummaryProps) {
  const [isExpanded, setIsExpanded] = React.useState(true);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full"
      >
        <h2 className="text-lg font-semibold text-gray-900">Key Points</h2>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          {content.summary ? (
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-600">{content.summary}</p>
            </div>
          ) : (
            <p className="text-gray-500 italic">
              Summary will be generated once you start learning
            </p>
          )}
        </div>
      )}
    </div>
  );
}