'use client';

import React, { useState } from 'react';
import DocsHeader from '@/components/layout/DocsHeader';
import DocsSidebar from '@/components/layout/DocsSidebar';
import DocsContent from '@/components/sections/DocsContent';
import SearchModal from '@/components/ui/SearchModal';
import Link from 'next/link';
import { ArrowUpRight, ChevronRight } from 'lucide-react';

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('overview');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0e0f11] text-[#f4f4f5] flex flex-col font-sans">
      <DocsHeader onSearchClick={() => setIsSearchOpen(true)} />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelect={(id) => setActiveSection(id)}
      />

      <div className="flex-1 max-w-[1400px] w-full mx-auto flex">
        {/* Left Sticky Sidebar */}
        <DocsSidebar
          activeSection={activeSection}
          onSelectSection={(id) => {
            setActiveSection(id);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Center Main Content Area */}
        <main className="flex-1 min-w-0 p-6 sm:p-10 lg:p-12">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-xs text-[#71717a] mb-6 font-mono">
            <span>Docs</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#a1a1aa] capitalize">{activeSection.replace('-', ' ')}</span>
          </div>

          <DocsContent sectionId={activeSection} />

          {/* Docs Footer */}
          <footer className="mt-20 pt-8 border-t border-[#232326] flex flex-col sm:flex-row items-center justify-between text-xs text-[#71717a] gap-4">
            <div>
              &copy; {new Date().getFullYear()} Fobign Technologies. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <a href="https://fobign.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Homepage
              </a>
              <a href="https://platform.fobign.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Platform
              </a>
              <a href="mailto:hello@fobign.com" className="hover:text-white transition-colors">
                Support
              </a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

