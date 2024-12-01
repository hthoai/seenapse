import React from 'react';
import { BookOpen, Brain, FlaskConical, Home } from 'lucide-react';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (page: 'dashboard' | 'library') => void;
  currentPage: string;
}

export default function Layout({ children, onNavigate, currentPage }: LayoutProps) {
  const navItems = [
    { icon: <Home size={20} />, label: 'Dashboard', href: 'dashboard' },
    { icon: <BookOpen size={20} />, label: 'Library', href: 'library' },
    { icon: <Brain size={20} />, label: 'Flashcards', href: 'flashcards' },
    { icon: <FlaskConical size={20} />, label: 'Lab', href: 'lab' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        items={navItems}
        currentPage={currentPage}
        onNavigate={onNavigate}
      />
      <main className="pt-16 px-4 md:px-6 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}