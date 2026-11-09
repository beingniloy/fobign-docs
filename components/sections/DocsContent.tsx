'use client';

import React from 'react';
import CodeBlock from '@/components/ui/CodeBlock';
import {
  ExternalLink,
  ShieldCheck,
  Zap,
  Layers,
  Cpu,
  Key,
  Terminal,
  Clock,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface DocsContentProps {
  sectionId: string;
}

export default function DocsContent({ sectionId }: DocsContentProps) {
  switch (sectionId) {
    case 'overview':
      return (
        <article className="space-y-8 max-w-4xl">
          <div className="space-y-3 border-b border-[#232326] pb-6">
            <span className="text-[11px] font-mono uppercase text-[#f54e00] font-bold tracking-wider">
              Architecture &amp; Design
            </span>
            <h1 className="text-3xl sm:text-4xl font-normal text-white tracking-tight">
              Platform Overview
            </h1>
            <p className="text-sm text-[#a1a1aa] leading-relaxed">
              Fobign Technologies provides enterprise-grade, low-latency AI proxy gateway infrastructure. A single API key and OpenAI/Anthropic compatible endpoint unifies access to leading intelligence models worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-[#141416] border border-[#27272a] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-[#f54e00] flex items-center justify-center font-bold">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">Ultra-Low Latency</h3>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Global edge nodes with connection pooling stream tokens directly from upstream inference clusters in under 15ms TTFT.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#141416] border border-[#27272a] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">Automatic KV Caching</h3>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Repeated system prompts, system instructions, and multi-turn message history are cached automatically, saving up to 80% on token billing.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#141416] border border-[#27272a] space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">Zero Data Retention</h3>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Prompts and completions stream in memory using TLS 1.3 without persistent disk logging. We never train models on customer data.
              </p>
            </div>
          </div>
        </article>
      );

    case 'quickstart':
      return (
        <article className="space-y-8 max-w-4xl">
          <div className="space-y-3 border-b border-[#232326] pb-6">
            <span className="text-[11px] font-mono uppercase text-[#f54e00] font-bold tracking-wider">
              2-Minute Setup
            </span>
            <h1 className="text-3xl sm:text-4xl font-normal text-white tracking-tight">
              Quickstart Guide
            </h1>
            <p className="text-sm text-[#a1a1aa] leading-relaxed">
              Fobign API is 100% wire-compatible with standard OpenAI and Anthropic SDKs. You only need to switch your <code className="text-white bg-[#1f1f23] px-1.5 py-0.5 rounded font-mono">base_url</code> to point to Fobign.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-medium text-white">1. Obtain Your API Key</h2>
            <p className="text-xs text-[#a1a1aa]">
              Log in to the <a href="https://platform.fobign.com/keys" target="_blank" rel="noopener noreferrer" className="text-[#f54e00] hover:underline">Developer Console</a> to generate a new Bearer API Key (<code className="text-white">fob_live_...</code>).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-medium text-white">2. Run Your First Inference Request</h2>
            <CodeBlock
              snippets={[
                {
                  label: 'Python',
                  language: 'python',
                  code: `from openai import OpenAI

# Initialize client pointing to Fobign API Gateway
client = OpenAI(
    api_key="fob_live_your_api_key_here",
    base_url="https://api.fobign.com/v1"
)

response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[
        {"role": "system", "content": "You are a concise engineering assistant."},
        {"role": "user", "content": "What is Fobign?"}
    ],
    temperature=0.7,
    stream=True
)

for chunk in response:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)`,
                },
                {
                  label: 'TypeScript',
                  language: 'typescript',
                  code: `import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.FOBIGN_API_KEY,
  baseURL: 'https://api.fobign.com/v1',
});

async function main() {
  const completion = await openai.chat.completions.create({
    model: 'deepseek-chat',
    messages: [{ role: 'user', content: 'Say hello in 3 languages' }],
    stream: true,
  });

  for await (const chunk of completion) {
    process.stdout.write(chunk.choices[0]?.delta?.content || '');
  }
}

main();`,
                },
                {
                  label: 'cURL',
                  language: 'bash',
                  code: `curl -X POST https://api.fobign.com/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer fob_live_your_api_key_here" \\
  -d '{
    "model": "deepseek-chat",
    "messages": [
      {"role": "user", "content": "Write a hello world program in Go"}
    ],
    "stream": false
  }'`,
                },
              ]}
            />
          </section>
        </article>
      );

    case 'authentication':
      return (
        <article className="space-y-8 max-w-4xl">
          <div className="space-y-3 border-b border-[#232326] pb-6">
            <span className="text-[11px] font-mono uppercase text-[#f54e00] font-bold tracking-wider">
              Security &amp; Headers
            </span>
            <h1 className="text-3xl sm:text-4xl font-normal text-white tracking-tight">
              Authentication &amp; Bearer Keys
            </h1>
            <p className="text-sm text-[#a1a1aa] leading-relaxed">
              Every request sent to <code className="text-white font-mono">api.fobign.com</code> must include your secret API key in the standard HTTP <code className="text-white font-mono">Authorization</code> header.
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-lg font-medium text-white">Authorization Header Format</h2>
            <div className="p-4 rounded-xl bg-[#141416] border border-[#27272a] font-mono text-xs text-white">
              Authorization: Bearer fob_live_7f5d79b417339b5ab6cbd6fa1fae2a
            </div>
            <p className="text-xs text-[#a1a1aa]">
              Anthropic endpoints also accept the native <code className="text-white font-mono">x-api-key: fob_live_...</code> header for seamless drop-in proxying.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-medium text-white">API Key Security Best Practices</h2>
            <ul className="list-disc pl-5 space-y-2 text-xs text-[#a1a1aa] leading-relaxed">
              <li>Store your API keys in environment variables (<code className="text-white">FOBIGN_API_KEY</code>).</li>
              <li>Never commit secret keys into client-side web bundles or public GitHub repositories.</li>
              <li>If a key is accidentally exposed, revoke it immediately from the <a href="https://platform.fobign.com/keys" className="text-[#f54e00] hover:underline">API Keys</a> panel.</li>
            </ul>
          </section>
        </article>
      );

    case 'errors':
      return (
        <article className="space-y-8 max-w-4xl">
          <div className="space-y-3 border-b border-[#232326] pb-6">
            <span className="text-[11px] font-mono uppercase text-[#f54e00] font-bold tracking-wider">
              HTTP Status &amp; Responses
            </span>
            <h1 className="text-3xl sm:text-4xl font-normal text-white tracking-tight">
              Errors &amp; Status Codes
            </h1>
            <p className="text-sm text-[#a1a1aa] leading-relaxed">
              Fobign uses conventional HTTP response codes to indicate request success or failure.
            </p>
          </div>

          <div className="rounded-xl border border-[#27272a] bg-[#141416] overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-[#101012] text-[#71717a] border-b border-[#27272a] font-mono uppercase text-[10px]">
                <tr>
                  <th className="px-4 py-3">Code</th>
                  <th className="px-4 py-3">Meaning</th>
                  <th className="px-4 py-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#232326] text-white">
                <tr>
                  <td className="px-4 py-3 font-mono font-bold text-emerald-400">200 OK</td>
                  <td className="px-4 py-3 font-medium">Success</td>
                  <td className="px-4 py-3 text-[#a1a1aa]">Inference executed successfully.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono font-bold text-amber-400">400 Bad Request</td>
                  <td className="px-4 py-3 font-medium">Malformed Payload</td>
                  <td className="px-4 py-3 text-[#a1a1aa]">Invalid JSON schema or unsupported parameter.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono font-bold text-amber-400">401 Unauthorized</td>
                  <td className="px-4 py-3 font-medium">Missing / Invalid Key</td>
                  <td className="px-4 py-3 text-[#a1a1aa]">Missing or revoked Bearer token.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono font-bold text-rose-400">402 Payment Required</td>
                  <td className="px-4 py-3 font-medium">Insufficient Balance</td>
                  <td className="px-4 py-3 text-[#a1a1aa]">Wallet balance depleted. Top up funds on platform.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono font-bold text-amber-400">429 Too Many Requests</td>
                  <td className="px-4 py-3 font-medium">Rate Limit Exceeded</td>
                  <td className="px-4 py-3 text-[#a1a1aa]">Requests exceeded configured RPM or TPM threshold.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono font-bold text-rose-400">502 Bad Gateway</td>
                  <td className="px-4 py-3 font-medium">Upstream Failure</td>
                  <td className="px-4 py-3 text-[#a1a1aa]">Primary and fallback upstream providers failed.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-medium text-white">Standard Error JSON Schema</h2>
            <CodeBlock
              snippets={[
                {
                  label: 'Error JSON',
                  language: 'json',
                  code: `{
  "error": {
    "message": "Insufficient developer wallet balance. Please top up your balance at platform.fobign.com.",
    "type": "insufficient_quota",
    "param": null,
    "code": "insufficient_balance"
  }
}`,
                },
              ]}
            />
          </section>
        </article>
      );

    case 'chat-completions':
      return (
        <article className="space-y-8 max-w-4xl">
          <div className="space-y-3 border-b border-[#232326] pb-6">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded font-bold uppercase bg-blue-500/15 text-blue-400 border border-blue-500/30">
                POST
              </span>
              <span className="text-xs font-mono text-[#a1a1aa]">/v1/chat/completions</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-normal text-white tracking-tight">
              Chat Completions
            </h1>
            <p className="text-sm text-[#a1a1aa] leading-relaxed">
              Creates a model response for the given chat conversation. Supports real-time token streaming and reasoning trace outputs.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-medium text-white">Request Parameters</h2>
            <div className="rounded-xl border border-[#27272a] bg-[#141416] overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-[#101012] text-[#71717a] border-b border-[#27272a] font-mono text-[10px] uppercase">
                  <tr>
                    <th className="px-4 py-3">Parameter</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Required</th>
                    <th className="px-4 py-3">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#232326] text-white">
                  <tr>
                    <td className="px-4 py-3 font-mono text-[#f54e00]">model</td>
                    <td className="px-4 py-3 font-mono text-[#a1a1aa]">string</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">Yes</td>
                    <td className="px-4 py-3 text-[#a1a1aa]">ID of the model to use (e.g. <code className="text-white">deepseek-chat</code>, <code className="text-white">deepseek-reasoner</code>).</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-[#f54e00]">messages</td>
                    <td className="px-4 py-3 font-mono text-[#a1a1aa]">array</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">Yes</td>
                    <td className="px-4 py-3 text-[#a1a1aa]">Array of message objects with <code className="text-white">role</code> and <code className="text-white">content</code>.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-[#f54e00]">stream</td>
                    <td className="px-4 py-3 font-mono text-[#a1a1aa]">boolean</td>
                    <td className="px-4 py-3 text-[#71717a]">Optional</td>
                    <td className="px-4 py-3 text-[#a1a1aa]">Whether to stream partial message deltas via Server-Sent Events. Default false.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-[#f54e00]">temperature</td>
                    <td className="px-4 py-3 font-mono text-[#a1a1aa]">number</td>
                    <td className="px-4 py-3 text-[#71717a]">Optional</td>
                    <td className="px-4 py-3 text-[#a1a1aa]">Sampling temperature between 0 and 2. Default 1.0.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-medium text-white">Live Example</h2>
            <CodeBlock
              snippets={[
                {
                  label: 'cURL',
                  language: 'bash',
                  code: `curl https://api.fobign.com/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer fob_live_your_key" \\
  -d '{
    "model": "deepseek-reasoner",
    "messages": [
      {"role": "user", "content": "How many r's in strawberry?"}
    ]
  }'`,
                },
              ]}
            />
          </section>
        </article>
      );

    case 'claude-messages':
      return (
        <article className="space-y-8 max-w-4xl">
          <div className="space-y-3 border-b border-[#232326] pb-6">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded font-bold uppercase bg-blue-500/15 text-blue-400 border border-blue-500/30">
                POST
              </span>
              <span className="text-xs font-mono text-[#a1a1aa]">/v1/messages</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-normal text-white tracking-tight">
              Anthropic Messages API
            </h1>
            <p className="text-sm text-[#a1a1aa] leading-relaxed">
              Native Anthropic Claude API format for Claude 3.7 Sonnet, Claude 3.5 Haiku, and legacy Claude 3 models.
            </p>
          </div>

          <CodeBlock
            snippets={[
              {
                label: 'Python (Anthropic SDK)',
                language: 'python',
                code: `import anthropic

client = anthropic.Anthropic(
    api_key="fob_live_your_key",
    base_url="https://api.fobign.com"
)

message = client.messages.create(
    model="claude-3-7-sonnet",
    max_tokens=1024,
    messages=[
        {"role": "user", "content": "Explain quantum computing briefly."}
    ]
)

print(message.content[0].text)`,
              },
            ]}
          />
        </article>
      );

    case 'models':
    case 'models-catalog':
      return (
        <article className="space-y-8 max-w-4xl">
          <div className="space-y-3 border-b border-[#232326] pb-6">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded font-bold uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                GET
              </span>
              <span className="text-xs font-mono text-[#a1a1aa]">/v1/models</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-normal text-white tracking-tight">
              Model Discovery &amp; Catalog
            </h1>
            <p className="text-sm text-[#a1a1aa] leading-relaxed">
              Returns the list of active models, context window limits, and pricing rates provisioned in your gateway.
            </p>
          </div>

          <CodeBlock
            snippets={[
              {
                label: 'cURL',
                language: 'bash',
                code: `curl https://api.fobign.com/v1/models \\
  -H "Authorization: Bearer fob_live_your_key"`,
              },
              {
                label: 'Response (200 OK)',
                language: 'json',
                code: `{
  "object": "list",
  "data": [
    {
      "id": "deepseek-chat",
      "object": "model",
      "created": 1700000000,
      "owned_by": "deepseek",
      "context_window": 64000,
      "pricing": {
        "input_per_1k": 0.00014,
        "output_per_1k": 0.00028
      }
    },
    {
      "id": "deepseek-reasoner",
      "object": "model",
      "created": 1700000000,
      "owned_by": "deepseek",
      "context_window": 64000
    }
  ]
}`,
              },
            ]}
          />
        </article>
      );

    default:
      return (
        <article className="space-y-8 max-w-4xl">
          <div className="space-y-3 border-b border-[#232326] pb-6">
            <h1 className="text-3xl font-normal text-white tracking-tight">
              Documentation Section
            </h1>
            <p className="text-sm text-[#a1a1aa]">
              Select an item from the left navigation sidebar to view detailed schemas and interactive code samples.
            </p>
          </div>
        </article>
      );
  }
}

