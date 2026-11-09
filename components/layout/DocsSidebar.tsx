'use client';

import React from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Terminal,
  Key,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  Activity,
  AlertTriangle,
  Code2,
  FileCode,
  Globe,
} from 'lucide-react';

interface DocsSidebarProps {
  activeSection: string;
  onSelectSection: (id: string) => void;
}

export const DOCS_SECTIONS = [
  {
    category: 'Getting Started',
    items: [
      { id: 'overview', title: 'Platform Overview', icon: Globe },
      { id: 'quickstart', title: 'Quickstart Guide', icon: Zap },
      { id: 'authentication', title: 'Authentication & Bearer Keys', icon: Key },
      { id: 'errors', title: 'Errors & HTTP Statuses', icon: AlertTriangle },
    ],
  },
  {
    category: 'API Endpoints',
    items: [
      { id: 'chat-completions', title: 'Chat Completions (/v1/chat/completions)', icon: Terminal, badge: 'POST' },
      { id: 'claude-messages', title: 'Anthropic Messages (/v1/messages)', icon: Sparkles, badge: 'POST' },
      { id: 'models-catalog', title: 'Model Discovery (/v1/models)', icon: Cpu, badge: 'GET' },
      { id: 'embeddings', title: 'Embeddings (/v1/embeddings)', icon: Layers, badge: 'POST' },
    ],
  },
  {
    category: 'Architecture & Guides',
    items: [
      { id: 'streaming-sse', title: 'Realtime Streaming (SSE)', icon: Activity },
      { id: 'prompt-caching', title: 'Prompt Caching & KV Storage', icon: Layers },
      { id: 'failover', title: 'Zero-Downtime Failover Pools', icon: Zap },
      { id: 'billing-telemetry', title: 'Token Billing & Quotas', icon: FileCode },
    ],
  },
  {
    category: 'SDKs & Libraries',
    items: [
      { id: 'sdk-python', title: 'Python SDK (OpenAI & Anthropic)', icon: Code2 },
      { id: 'sdk-node', title: 'TypeScript / Node.js SDK', icon: Code2 },
      { id: 'sdk-curl', title: 'cURL & Raw HTTP', icon: Terminal },
    ],
  },
];

export default function DocsSidebar({ activeSection, onSelectSection }: DocsSidebarProps) {
  return (
    <aside className="w-64 shrink-0 border-r border-[#232326] bg-[#0e0f11] min-h-[calc(100vh-4rem)] p-4 space-y-6 text-xs">
      {DOCS_SECTIONS.map((sec) => (
        <div key={sec.category} className="space-y-1.5">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#71717a] px-3 mb-1">
            {sec.category}
          </div>
          <ul className="space-y-0.5">
            {sec.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => onSelectSection(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#1e1e22] text-white font-medium shadow-xs'
                        : 'text-[#a1a1aa] hover:text-white hover:bg-[#151518]'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#f54e00]' : 'text-[#71717a]'}`} />
                      <span className="truncate">{item.title}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold uppercase ${
                          item.badge === 'POST'
                            ? 'bg-blue-500/15 text-blue-400'
                            : 'bg-emerald-500/15 text-emerald-400'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </aside>
  );
}

