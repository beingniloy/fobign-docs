'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ArrowUpRight, Sun, Moon } from 'lucide-react';
import FobignLogo from '@/components/ui/FobignLogo';

interface DocsHeaderProps {
  onSearchClick?: () => void;
}

export default function DocsHeader({ onSearchClick }: DocsHeaderProps) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    try {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    } catch (e) {}
  }, []);

  const toggleTheme = () => {
    try {
      const nextDark = !isDark;
      setIsDark(nextDark);
      if (nextDark) {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
        localStorage.setItem('fobign_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        localStorage.setItem('fobign_theme', 'light');
      }
    } catch (e) {}
  };

  return (
    <header className="sticky top-0 z-50 bg-[var(--canvas)]/90 backdrop-blur-md border-b border-[var(--hairline)] h-16 transition-colors">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">
        {/* Left: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <FobignLogo size="md" showBadge={true} badgeText="Docs" textColor="text-[var(--ink)]" />
          </Link>
          <span className="hidden sm:inline-flex items-center text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-[var(--surface-strong)] text-[var(--muted)] border border-[var(--hairline-strong)]">
            v1.0 API
          </span>
        </div>

        {/* Center: Search Trigger */}
        <div className="flex-1 max-w-md mx-2 hidden md:block">
          <button
            type="button"
            onClick={onSearchClick}
            className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-lg bg-[var(--surface-card)] border border-[var(--hairline)] text-[var(--muted)] hover:text-[var(--ink)] hover:border-[var(--hairline-strong)] text-xs transition-colors cursor-pointer shadow-2xs"
          >
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5" />
              <span>Search endpoints, models, parameters...</span>
            </div>
            <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[var(--surface-strong)] text-[var(--muted)] border border-[var(--hairline)]">
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Right: Quick Links & Theme Toggle */}
        <div className="flex items-center gap-3 text-xs font-medium text-[var(--muted)]">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="p-2 rounded-lg border border-[var(--hairline)] bg-[var(--surface-card)] hover:text-[var(--ink)] hover:border-[var(--hairline-strong)] transition-colors cursor-pointer"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-[#26251e]" />
            )}
          </button>

          <a
            href="https://platform.fobign.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--ink)] transition-colors hidden sm:flex items-center gap-1"
          >
            <span>Console</span>
            <ArrowUpRight className="w-3 h-3 text-[var(--muted)]" />
          </a>

          <a
            href="https://platform.fobign.com/api-keys"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-lg bg-[var(--ink)] text-[var(--canvas)] hover:opacity-90 font-semibold text-xs transition-opacity cursor-pointer shadow-xs"
          >
            Get API Key
          </a>
        </div>
      </div>
    </header>
  );
}
