'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { DOCS_SECTIONS } from '@/components/layout/DocsSidebar';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (id: string) => void;
}

export default function SearchModal({ isOpen, onClose, onSelect }: SearchModalProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // open handled by parent
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const allItems = DOCS_SECTIONS.flatMap((sec) =>
    sec.items.map((item) => ({ ...item, category: sec.category }))
  );

  const filtered = allItems.filter(
    (i) =>
      i.title.toLowerCase().includes(query.toLowerCase()) ||
      i.category.toLowerCase().includes(query.toLowerCase()) ||
      i.id.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-xs">
      <div className="bg-[#141416] border border-[#27272a] rounded-2xl w-full max-w-lg p-4 space-y-3 shadow-2xl animate-in fade-in zoom-in-95 duration-150 text-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-[#71717a] absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search API documentation..."
            className="w-full bg-[#101012] border border-[#232326] rounded-xl pl-9 pr-9 py-2.5 text-white placeholder-[#71717a] focus:outline-none focus:border-white/40"
          />
          <button
            onClick={onClose}
            className="absolute right-2.5 top-2.5 text-[#71717a] hover:text-white p-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-72 overflow-y-auto space-y-1 divide-y divide-[#1e1e22]">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-[#71717a]">
              No documentation pages found for &ldquo;{query}&rdquo;.
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelect(item.id);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-[#1e1e22] text-left transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className="w-4 h-4 text-[#71717a] group-hover:text-[#f54e00] shrink-0" />
                    <div>
                      <div className="text-white font-medium">{item.title}</div>
                      <div className="text-[10px] text-[#71717a]">{item.category}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#71717a] group-hover:text-white shrink-0" />
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

