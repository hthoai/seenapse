import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ContentItem, Flashcard, Note, Collection } from '../types';

interface Store {
  contents: ContentItem[];
  flashcards: Flashcard[];
  notes: Note[];
  collections: Collection[];
  pinnedContent: ContentItem[];
  addContent: (content: ContentItem) => void;
  addFlashcard: (flashcard: Flashcard) => void;
  addNote: (note: Note) => void;
  addCollection: (collection: Collection) => void;
  updateFlashcardDifficulty: (id: string, difficulty: 1 | 2 | 3 | 4 | 5) => void;
  togglePinContent: (contentId: string) => void;
  addContentToCollection: (contentId: string, collectionId: string) => void;
  removeContentFromCollection: (contentId: string, collectionId: string) => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      contents: [],
      flashcards: [],
      notes: [],
      collections: [],
      pinnedContent: [],
      
      addContent: (content) =>
        set((state) => ({ contents: [...state.contents, content] })),
        
      addFlashcard: (flashcard) =>
        set((state) => ({ flashcards: [...state.flashcards, flashcard] })),
        
      addNote: (note) =>
        set((state) => ({ notes: [...state.notes, note] })),
        
      addCollection: (collection) =>
        set((state) => ({ collections: [...state.collections, collection] })),
        
      updateFlashcardDifficulty: (id, difficulty) =>
        set((state) => ({
          flashcards: state.flashcards.map((f) =>
            f.id === id ? { ...f, difficulty } : f
          ),
        })),

      togglePinContent: (contentId) =>
        set((state) => {
          const content = state.contents.find((c) => c.id === contentId);
          if (!content) return state;

          const isPinned = state.pinnedContent.some((c) => c.id === contentId);
          return {
            pinnedContent: isPinned
              ? state.pinnedContent.filter((c) => c.id !== contentId)
              : [...state.pinnedContent, content],
          };
        }),

      addContentToCollection: (contentId, collectionId) =>
        set((state) => ({
          collections: state.collections.map((c) =>
            c.id === collectionId
              ? { ...c, contents: [...c.contents, contentId] }
              : c
          ),
        })),

      removeContentFromCollection: (contentId, collectionId) =>
        set((state) => ({
          collections: state.collections.map((c) =>
            c.id === collectionId
              ? { ...c, contents: c.contents.filter((id) => id !== contentId) }
              : c
          ),
        })),
    }),
    {
      name: 'learning-companion-storage',
      version: 1,
    }
  )
);