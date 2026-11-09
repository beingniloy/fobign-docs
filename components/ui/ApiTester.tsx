'use client';

import React, { useState } from 'react';
import { Play, Loader2, Sparkles, Terminal, Copy, Check } from 'lucide-react';

export default function ApiTester() {
  const [model, setModel] = useState('deepseek-chat');
  const [prompt, setPrompt] = useState('Explain why developers prefer a unified AI API gateway in 3 bullet points.');
  const [apiKey, setApiKey] = useState('fob_live_demo_key');
  const [streaming, setStreaming] = useState(true);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [latency, setLatency] = useState<number | null>(null);

  const handleTest = async () => {
    setRunning(true);
    setOutput('');
    setLatency(null);
    const start = performance.now();

    try {
      const res = await fetch('https://api.fobign.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: prompt }],
          stream: streaming,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        setOutput(`HTTP ${res.status}: ${errText}`);
        setRunning(false);
        setLatency(Math.round(performance.now() - start));
        return;
      }

      if (streaming && res.body) {
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let full = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');
          for (const line of lines) {
            if (line.startsWith('data: ') && line !== 'data: [DONE]') {
              try {
                const parsed = JSON.parse(line.slice(6));
                const text = parsed.choices?.[0]?.delta?.content || '';
                full += text;
                setOutput(full);
              } catch {}
            }
          }
        }
      } else {
        const data = await res.json();
        setOutput(data.choices?.[0]?.message?.content || JSON.stringify(data, null, 2));
      }
    } catch (err: any) {
      setOutput(`Connection Error: Ensure your API key is configured or test in local environment.\nDetails: ${err.message}`);
    } finally {
      setRunning(false);
      setLatency(Math.round(performance.now() - start));
    }
  };

  return (
    <div className="rounded-xl border border-[#27272a] bg-[#141416] p-5 space-y-4 my-6 shadow-xs">
      <div className="flex items-center justify-between border-b border-[#232326] pb-3">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#f54e00]" />
          <h3 className="text-sm font-semibold text-white">Live API Request Playground</h3>
        </div>
        <span className="text-[11px] font-mono text-[#a1a1aa] bg-[#1f1f23] px-2 py-0.5 rounded border border-[#2e2e32]">
          https://api.fobign.com/v1
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div>
          <label className="block text-[#a1a1aa] font-medium mb-1">Target Model</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="w-full bg-[#101012] border border-[#27272a] rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-white/40 cursor-pointer"
          >
            <option value="deepseek-chat">deepseek-chat (DeepSeek-V3)</option>
            <option value="deepseek-reasoner">deepseek-reasoner (DeepSeek-R1)</option>
            <option value="claude-3-7-sonnet">claude-3-7-sonnet (Anthropic)</option>
            <option value="gpt-4o">gpt-4o (OpenAI)</option>
            <option value="merin-v1.0">merin-v1.0 (Custom Engine)</option>
          </select>
        </div>

        <div>
          <label className="block text-[#a1a1aa] font-medium mb-1">API Bearer Key</label>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="fob_live_..."
            className="w-full bg-[#101012] border border-[#27272a] rounded-lg px-3 py-2 text-white font-mono focus:outline-none focus:border-white/40"
          />
        </div>

        <div>
          <label className="block text-[#a1a1aa] font-medium mb-1">Stream Mode</label>
          <div className="flex items-center gap-2 h-9">
            <label className="flex items-center gap-2 text-white cursor-pointer select-none">
              <input
                type="checkbox"
                checked={streaming}
                onChange={(e) => setStreaming(e.target.checked)}
                className="accent-[#f54e00] rounded"
              />
              <span>Server-Sent Events (SSE)</span>
            </label>
          </div>
        </div>
      </div>

      <div className="text-xs">
        <label className="block text-[#a1a1aa] font-medium mb-1">User Prompt</label>
        <textarea
          rows={2}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full bg-[#101012] border border-[#27272a] rounded-lg p-3 text-white focus:outline-none focus:border-white/40 resize-none font-sans"
        />
      </div>

      <div className="flex items-center justify-between pt-1">
        <div className="text-[11px] font-mono text-[#a1a1aa]">
          {latency !== null && (
            <span className="text-emerald-400">Response latency: {latency}ms</span>
          )}
        </div>

        <button
          type="button"
          onClick={handleTest}
          disabled={running}
          className="px-4 py-2 rounded-lg bg-white hover:bg-neutral-200 text-black text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer shadow-xs disabled:opacity-50"
        >
          {running ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-black" />}
          <span>{running ? 'Streaming response...' : 'Dispatch Request'}</span>
        </button>
      </div>

      {output && (
        <div className="rounded-lg bg-[#0d0e10] border border-[#222225] p-3.5 text-xs font-mono text-[#e4e4e7] whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
          {output}
        </div>
      )}
    </div>
  );
}

