'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowRight } from 'lucide-react';
import { DOCS_SECTIONS } from '@/components/layout/DocsSidebar';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[var(--surface-card)] border border-[var(--hairline)] rounded-2xl w-full max-w-lg p-4 space-y-3 shadow-2xl animate-in fade-in zoom-in-95 duration-150 text-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-[var(--muted)] absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search API documentation..."
            className="w-full bg-[var(--canvas-soft)] border border-[var(--hairline)] rounded-xl pl-9 pr-9 py-2.5 text-[var(--ink)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--hairline-strong)]"
          />
          <button
            onClick={onClose}
            className="absolute right-2.5 top-2.5 text-[var(--muted)] hover:text-[var(--ink)] p-0.5 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-72 overflow-y-auto space-y-1 divide-y divide-[var(--hairline)]">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-[var(--muted)]">
              No documentation pages found for &ldquo;{query}&rdquo;.
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    router.push(item.href);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-[var(--surface-strong)] text-left transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--primary)] shrink-0" />
                    <div>
                      <div className="text-[var(--ink)] font-medium">{item.title}</div>
                      <div className="text-[10px] text-[var(--muted)]">{item.category}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--muted)] group-hover:text-[var(--ink)] shrink-0" />
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
