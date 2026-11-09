'use client';

import React from 'react';
import Link from 'next/link';
import { Search, ExternalLink, ArrowUpRight } from 'lucide-react';
import FobignLogo from '@/components/ui/FobignLogo';

interface DocsHeaderProps {
  onSearchClick?: () => void;
}

export default function DocsHeader({ onSearchClick }: DocsHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-[#0e0f11]/90 backdrop-blur-md border-b border-[#232326] h-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">
        {/* Left: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <FobignLogo size="md" showBadge={true} badgeText="Docs" textColor="text-white" />
          </Link>
          <span className="hidden sm:inline-flex items-center text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-[#1c1c1f] text-[#a1a1aa] border border-[#2b2b2f]">
            v1.0 API
          </span>
        </div>

        {/* Center: Search Trigger */}
        <div className="flex-1 max-w-md mx-2 hidden md:block">
          <button
            type="button"
            onClick={onSearchClick}
            className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-lg bg-[#16171a] border border-[#27272a] text-[#71717a] hover:text-white hover:border-[#3f3f46] text-xs transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5" />
              <span>Search endpoints, models, parameters...</span>
            </div>
            <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#222226] text-[#a1a1aa] border border-[#333338]">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Right: Quick Links */}
        <div className="flex items-center gap-4 text-xs font-medium text-[#a1a1aa]">
          <a
            href="https://platform.fobign.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors hidden sm:flex items-center gap-1"
          >
            <span>Console</span>
            <ArrowUpRight className="w-3 h-3 text-[#71717a]" />
          </a>

          <a
            href="https://api.fobign.com/health"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors hidden sm:flex items-center gap-1.5 font-mono text-[11px]"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Gateway 99.9%</span>
          </a>

          <a
            href="https://platform.fobign.com/keys"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-neutral-200 text-black font-semibold text-xs transition-colors cursor-pointer"
          >
            Get API Key
          </a>
        </div>
      </div>
    </header>
  );
}

