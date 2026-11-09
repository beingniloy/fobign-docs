'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Globe,
  Zap,
  Key,
  AlertTriangle,
  Terminal,
  Sparkles,
  Cpu,
} from 'lucide-react';

export interface DocsItem {
  id: string;
  href: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export interface DocsCategory {
  category: string;
  items: DocsItem[];
}

export const DOCS_SECTIONS: DocsCategory[] = [
  {
    category: 'Getting Started',
    items: [
      { id: 'overview', href: '/', title: 'Platform Overview', icon: Globe },
      { id: 'quickstart', href: '/quickstart', title: 'Quickstart Guide', icon: Zap },
      { id: 'authentication', href: '/authentication', title: 'Authentication & Keys', icon: Key },
      { id: 'errors', href: '/errors', title: 'Errors & HTTP Statuses', icon: AlertTriangle },
    ],
  },
  {
    category: 'API Endpoints',
    items: [
      { id: 'chat-completions', href: '/chat-completions', title: 'Chat Completions', icon: Terminal, badge: 'POST' },
      { id: 'claude-messages', href: '/claude-messages', title: 'Anthropic Messages', icon: Sparkles, badge: 'POST' },
      { id: 'models', href: '/models', title: 'Model Discovery', icon: Cpu, badge: 'GET' },
    ],
  },
];

interface DocsSidebarProps {
  activeSection?: string;
}

export default function DocsSidebar({ activeSection }: DocsSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r border-[var(--hairline)] bg-[var(--canvas)] min-h-[calc(100vh-4rem)] p-4 space-y-6 text-xs transition-colors">
      {DOCS_SECTIONS.map((sec) => (
        <div key={sec.category} className="space-y-1.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] px-3 mb-1">
            {sec.category}
          </div>
          <ul className="space-y-0.5">
            {sec.items.map((item) => {
              const Icon = item.icon;
              const isActive =
                activeSection === item.id ||
                pathname === item.href ||
                (item.href !== '/' && pathname.startsWith(item.href));

              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                      isActive
                        ? 'bg-[var(--surface-card)] text-[var(--ink)] font-semibold border border-[var(--hairline)] shadow-2xs'
                        : 'text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-card)]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[var(--primary)]' : 'text-[var(--muted)]'}`} />
                      <span className="truncate">{item.title}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase bg-[var(--surface-strong)] text-[var(--ink)] border border-[var(--hairline)]">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </aside>
  );
}
