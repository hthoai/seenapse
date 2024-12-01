import React from 'react';
import ReactMarkdown from 'react-markdown';

interface ArticleViewerProps {
  url: string;
  content?: string;
}

export default function ArticleViewer({ url, content }: ArticleViewerProps) {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      {content ? (
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      ) : (
        <iframe
          src={url}
          className="w-full min-h-[calc(100vh-16rem)]"
          title="Article Viewer"
        />
      )}
    </div>
  );
}