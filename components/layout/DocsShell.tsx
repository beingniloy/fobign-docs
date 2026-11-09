'use client';

import React, { useState } from 'react';
import DocsHeader from '@/components/layout/DocsHeader';
import DocsSidebar from '@/components/layout/DocsSidebar';
import SearchModal from '@/components/ui/SearchModal';
import Link from 'next/link';
import { ArrowUpRight, ChevronRight } from 'lucide-react';

interface DocsShellProps {
  currentSlug?: string;
  categoryName?: string;
  title?: string;
  children: React.ReactNode;
}

export default function DocsShell({
  currentSlug = 'overview',
  categoryName = 'Getting Started',
  title = 'Platform Overview',
  children,
}: DocsShellProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0e0f11] text-[#f4f4f5] flex flex-col font-sans">
      <DocsHeader onSearchClick={() => setIsSearchOpen(true)} />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <div className="flex-1 max-w-[1400px] w-full mx-auto flex">
        {/* Left Sidebar */}
        <DocsSidebar activeSection={currentSlug} />

        {/* Center Main Content Area */}
        <main className="flex-1 min-w-0 p-6 sm:p-10 lg:p-12">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#71717a] mb-6 font-mono">
            <Link href="/" className="hover:text-white transition-colors">Docs</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#a1a1aa]">{categoryName}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-medium capitalize">{title}</span>
          </nav>

          {children}

          {/* Docs Footer */}
          <footer className="mt-20 pt-8 border-t border-[#232326] flex flex-col sm:flex-row items-center justify-between text-xs text-[#71717a] gap-4">
            <div>
              &copy; {new Date().getFullYear()} Fobign Technologies. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <a
                href="https://fobign.com"
                className="hover:text-white transition-colors"
              >
                Fobign Home
              </a>
              <a
                href="https://platform.fobign.com"
                className="hover:text-white transition-colors"
              >
                Developer Console
              </a>
              <a
                href="https://platform.fobign.com/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy
              </a>
              <a
                href="https://platform.fobign.com/terms"
                className="hover:text-white transition-colors"
              >
                Terms
              </a>
              <a
                href="mailto:hello@fobign.com"
                className="hover:text-white transition-colors"
              >
                Support
              </a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
