import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Library from './pages/Library';
import ContentDetails from './pages/ContentDetails';
import CollectionView from './pages/CollectionView';
import { ContentItem } from './types';
import { Toaster } from 'react-hot-toast';

function App() {
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'library'>('dashboard');
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);

  const handleContentSelect = (content: ContentItem) => {
    setSelectedContent(content);
  };

  const handleBackToPage = () => {
    setSelectedContent(null);
    setSelectedCollection(null);
  };

  const handleCollectionSelect = (collectionId: string) => {
    setSelectedCollection(collectionId);
  };

  const renderPage = () => {
    if (selectedContent) {
      return (
        <ContentDetails
          contentId={selectedContent.id}
          onBack={handleBackToPage}
        />
      );
    }

    if (selectedCollection) {
      return (
        <CollectionView
          collectionId={selectedCollection}
          onBack={handleBackToPage}
          onContentSelect={handleContentSelect}
        />
      );
    }

    switch (currentPage) {
      case 'library':
        return (
          <Library
            onContentSelect={handleContentSelect}
            onCollectionSelect={handleCollectionSelect}
          />
        );
      default:
        return <Dashboard onContentSelect={handleContentSelect} />;
    }
  };

  return (
    <Layout onNavigate={setCurrentPage} currentPage={currentPage}>
      <Toaster position="top-right" />
      {renderPage()}
    </Layout>
  );
}