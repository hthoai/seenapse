import React from 'react';
import { ContentItem } from '../../types';
import VideoPlayer from './VideoPlayer';
import PDFViewer from './PDFViewer';
import AudioPlayer from './AudioPlayer';
import ArticleViewer from './ArticleViewer';

interface ContentViewerProps {
  content: ContentItem;
}

export default function ContentViewer({ content }: ContentViewerProps) {
  const renderContent = () => {
    switch (content.type) {
      case 'video':
        return <VideoPlayer url={content.sourceUrl} />;
      case 'pdf':
        return <PDFViewer url={content.sourceUrl} />;
      case 'audio':
        return <AudioPlayer url={content.sourceUrl} />;
      default:
        return <ArticleViewer url={content.sourceUrl} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {renderContent()}
    </div>
  );
}