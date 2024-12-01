import React, { useState } from 'react';
import { Send, Sparkles, Brain, Book, HelpCircle } from 'lucide-react';
import { ContentItem } from '../../types';

interface AIChatPanelProps {
  content: ContentItem;
}

export default function AIChatPanel({ content }: AIChatPanelProps) {
  const [messages, setMessages] = useState<Array<{
    id: string;
    role: 'user' | 'assistant';
    content: string;
  }>>([]);
  const [input, setInput] = useState('');

  const suggestions = [
    { icon: <Brain className="h-4 w-4" />, text: 'Explain this in simple terms' },
    { icon: <Book className="h-4 w-4" />, text: 'Generate study notes' },
    { icon: <HelpCircle className="h-4 w-4" />, text: 'Quiz me on this content' },
  ];

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages([
      ...messages,
      { id: Date.now().toString(), role: 'user', content: input },
    ]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'This is a simulated AI response. In a real implementation, this would be connected to an AI service.',
        },
      ]);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <Sparkles className="h-5 w-5 text-indigo-500 mr-2" />
          AI Learning Assistant
        </h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      {/* Suggestions */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setInput(suggestion.text)}
              className="flex items-center space-x-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700"
            >
              {suggestion.icon}
              <span>{suggestion.text}</span>
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex space-x-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about this content..."
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}