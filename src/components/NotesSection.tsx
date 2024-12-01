import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { PencilLine, Trash2 } from 'lucide-react';
import { Note } from '../types';
import { nanoid } from 'nanoid';

interface NotesSectionProps {
  contentId: string;
}

export default function NotesSection({ contentId }: NotesSectionProps) {
  const [newNote, setNewNote] = useState('');
  const { notes, addNote } = useStore();
  const contentNotes = notes.filter((note) => note.contentId === contentId);

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    addNote({
      id: nanoid(),
      contentId,
      text: newNote,
      dateCreated: new Date(),
      dateModified: new Date(),
    });
    setNewNote('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Notes</h2>

      <div className="space-y-4">
        <div className="flex space-x-2">
          <input
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a note..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            onKeyPress={(e) => e.key === 'Enter' && handleAddNote()}
          />
          <button
            onClick={handleAddNote}
            disabled={!newNote.trim()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            Add Note
          </button>
        </div>

        <div className="space-y-3">
          {contentNotes.map((note) => (
            <div
              key={note.id}
              className="p-3 bg-gray-50 rounded-lg flex items-start justify-between group"
            >
              <div className="flex-1">
                <p className="text-gray-700">{note.text}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(note.dateCreated).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1 hover:bg-gray-200 rounded">
                  <PencilLine className="h-4 w-4 text-gray-500" />
                </button>
                <button className="p-1 hover:bg-gray-200 rounded">
                  <Trash2 className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}