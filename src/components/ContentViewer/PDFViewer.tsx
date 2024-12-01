import React from 'react';

interface PDFViewerProps {
  url: string;
}

export default function PDFViewer({ url }: PDFViewerProps) {
  return (
    <div className="w-full h-[calc(100vh-16rem)]">
      <iframe
        src={url}
        className="w-full h-full"
        title="PDF Viewer"
      />
    </div>
  );
}