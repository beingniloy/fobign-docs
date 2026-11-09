'use client';

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeSnippet {
  language: string;
  label: string;
  code: string;
}

interface CodeBlockProps {
  snippets: CodeSnippet[];
  title?: string;
}

export default function CodeBlock({ snippets, title }: CodeBlockProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const current = snippets[activeTab] || snippets[0];

  const handleCopy = () => {
    if (!current) return;
    navigator.clipboard.writeText(current.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-[#27272a] bg-[#141416] overflow-hidden my-4 shadow-sm text-xs">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#232326] bg-[#101012]">
        <div className="flex items-center gap-2">
          {title && (
            <span className="text-[11px] font-mono font-medium text-[#71717a] mr-2">
              {title}
            </span>
          )}
          <div className="flex items-center gap-1">
            {snippets.map((s, idx) => (
              <button
                key={s.label}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium font-mono transition-colors cursor-pointer ${
                  activeTab === idx
                    ? 'bg-[#27272a] text-white shadow-xs'
                    : 'text-[#71717a] hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] text-[#a1a1aa] hover:text-white hover:bg-[#27272a] transition-colors cursor-pointer"
          title="Copy snippet"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-mono">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="font-mono">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="p-4 overflow-x-auto text-[12px] leading-relaxed font-mono text-[#d4d4d8] whitespace-pre">
        <code>{current.code}</code>
      </div>
    </div>
  );
}

