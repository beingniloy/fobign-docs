'use client';

import React from 'react';
import CodeBlock from '@/components/ui/CodeBlock';
import {
  ShieldCheck,
  Zap,
  Layers,
  Key,
  Terminal,
  Cpu,
  Clock,
  Sparkles,
} from 'lucide-react';

interface DocsContentProps {
  sectionId: string;
}

export default function DocsContent({ sectionId }: DocsContentProps) {
  switch (sectionId) {
    case 'overview':
      return (
        <article className="space-y-8 max-w-4xl">
          <div className="space-y-3 border-b border-[var(--hairline)] pb-6">
            <span className="text-[11px] font-mono uppercase text-[var(--primary)] font-bold tracking-wider">
              Architecture &amp; Gateway Infrastructure
            </span>
            <h1 className="text-3xl sm:text-4xl font-normal text-[var(--ink)] tracking-tight">
              Platform Overview
            </h1>
            <p className="text-sm text-[var(--body)] leading-relaxed">
              Fobign Technologies provides enterprise-grade, low-latency AI proxy gateway infrastructure. A single standardized API key and drop-in OpenAI / Anthropic compatible endpoint unifies access to leading intelligence models worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-[var(--surface-card)] border border-[var(--hairline)] space-y-2.5 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-[var(--surface-strong)] border border-[var(--hairline)] text-[var(--ink)] flex items-center justify-center font-bold">
                <Zap className="w-4 h-4 text-[var(--primary)]" />
              </div>
              <h3 className="text-sm font-semibold text-[var(--ink)]">Ultra-Low Latency</h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Global edge nodes with persistent connection pooling stream tokens directly from upstream inference clusters in under 15ms TTFT.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[var(--surface-card)] border border-[var(--hairline)] space-y-2.5 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-[var(--surface-strong)] border border-[var(--hairline)] text-[var(--ink)] flex items-center justify-center font-bold">
                <Layers className="w-4 h-4 text-[var(--ink)]" />
              </div>
              <h3 className="text-sm font-semibold text-[var(--ink)]">Automatic KV Caching</h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Repeated system prompts, developer instructions, and multi-turn message history are cached automatically, saving up to 80% on token billing.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[var(--surface-card)] border border-[var(--hairline)] space-y-2.5 shadow-2xs">
              <div className="w-8 h-8 rounded-lg bg-[var(--surface-strong)] border border-[var(--hairline)] text-[var(--ink)] flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4 text-[var(--ink)]" />
              </div>
              <h3 className="text-sm font-semibold text-[var(--ink)]">Zero Data Retention</h3>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Prompts and completions stream in memory using TLS 1.3 without persistent disk logging. We never train foundation models on customer payloads.
              </p>
            </div>
          </div>
        </article>
      );

    case 'quickstart':
      return (
        <article className="space-y-8 max-w-4xl">
          <div className="space-y-3 border-b border-[var(--hairline)] pb-6">
            <span className="text-[11px] font-mono uppercase text-[var(--primary)] font-bold tracking-wider">
              2-Minute Setup
            </span>
            <h1 className="text-3xl sm:text-4xl font-normal text-[var(--ink)] tracking-tight">
              Quickstart Guide
            </h1>
            <p className="text-sm text-[var(--body)] leading-relaxed">
              Fobign API is 100% wire-compatible with standard OpenAI and Anthropic SDKs. You only need to switch your <code className="text-[var(--ink)] bg-[var(--surface-strong)] px-1.5 py-0.5 rounded font-mono text-xs">base_url</code> to point to Fobign.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[var(--ink)]">1. Obtain Your Secret API Key</h2>
            <p className="text-xs text-[var(--body)] leading-relaxed">
              Sign in to the <a href="https://platform.fobign.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-[var(--primary)] font-medium hover:underline">Developer Console</a> to generate a standard Bearer API Key (<code className="text-[var(--ink)] font-mono">sk-fobign-72b8d04a6e92f15c...</code>).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[var(--ink)]">2. Run Your First Inference Request</h2>
            <CodeBlock
              snippets={[
                {
                  label: 'Python',
                  language: 'python',
                  code: `from openai import OpenAI

# Initialize client pointing to Fobign API Gateway
client = OpenAI(
    api_key="sk-fobign-72b8d04a6e92f15c3e7a1b8d2c4e9f0a5b6c7d8e9f0a1b2c",
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
  apiKey: process.env.FOBIGN_API_KEY || 'sk-fobign-72b8d04a6e92f15c3e7a1b8d2c4e9f0a5b6c7d8e9f0a1b2c',
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
  -H "Authorization: Bearer sk-fobign-72b8d04a6e92f15c3e7a1b8d2c4e9f0a5b6c7d8e9f0a1b2c" \\
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
          <div className="space-y-3 border-b border-[var(--hairline)] pb-6">
            <span className="text-[11px] font-mono uppercase text-[var(--primary)] font-bold tracking-wider">
              Security &amp; Authorization
            </span>
            <h1 className="text-3xl sm:text-4xl font-normal text-[var(--ink)] tracking-tight">
              Authentication &amp; API Keys
            </h1>
            <p className="text-sm text-[var(--body)] leading-relaxed">
              Every request sent to <code className="text-[var(--ink)] font-mono bg-[var(--surface-strong)] px-1.5 py-0.5 rounded text-xs">api.fobign.com</code> must include your secret API key in the standard HTTP <code className="text-[var(--ink)] font-mono bg-[var(--surface-strong)] px-1.5 py-0.5 rounded text-xs">Authorization</code> header.
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="text-base font-semibold text-[var(--ink)]">Standard Authorization Header</h2>
            <div className="p-4 rounded-xl bg-[var(--surface-card)] border border-[var(--hairline)] font-mono text-xs text-[var(--ink)]">
              Authorization: Bearer sk-fobign-72b8d04a6e92f15c3e7a1b8d2c4e9f0a5b6c7d8e9f0a1b2c
            </div>
            <p className="text-xs text-[var(--body)] leading-relaxed">
              Anthropic compatible routes also accept the native <code className="text-[var(--ink)] font-mono bg-[var(--surface-strong)] px-1 py-0.5 rounded">x-api-key: sk-fobign-...</code> header for seamless client SDK compatibility.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[var(--ink)]">Key Security Best Practices</h2>
            <ul className="list-disc pl-5 space-y-2 text-xs text-[var(--body)] leading-relaxed">
              <li>Store secret keys in secure environment variables (<code className="text-[var(--ink)] font-mono">FOBIGN_API_KEY</code>).</li>
              <li>Never commit secret keys to client-side bundles or public GitHub repositories.</li>
              <li>If a key is accidentally exposed, revoke it immediately from the <a href="https://platform.fobign.com/api-keys" className="text-[var(--primary)] font-medium hover:underline">API Keys</a> panel.</li>
            </ul>
          </section>
        </article>
      );

    case 'errors':
      return (
        <article className="space-y-8 max-w-4xl">
          <div className="space-y-3 border-b border-[var(--hairline)] pb-6">
            <span className="text-[11px] font-mono uppercase text-[var(--primary)] font-bold tracking-wider">
              HTTP Status &amp; Error Responses
            </span>
            <h1 className="text-3xl sm:text-4xl font-normal text-[var(--ink)] tracking-tight">
              Errors &amp; Status Codes
            </h1>
            <p className="text-sm text-[var(--body)] leading-relaxed">
              Fobign returns standard HTTP status codes along with structured JSON error bodies following the OpenAI specification.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--hairline)] bg-[var(--surface-card)] overflow-hidden text-xs shadow-2xs">
            <table className="w-full text-left">
              <thead className="bg-[var(--canvas-soft)] text-[var(--muted)] border-b border-[var(--hairline)] font-mono uppercase text-[10px]">
                <tr>
                  <th className="px-4 py-3">Code</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--hairline)] text-[var(--ink)]">
                <tr>
                  <td className="px-4 py-3 font-mono font-bold text-[var(--ink)]">200 OK</td>
                  <td className="px-4 py-3 font-medium">Success</td>
                  <td className="px-4 py-3 text-[var(--muted)]">Inference executed successfully.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono font-bold text-[var(--ink)]">400 Bad Request</td>
                  <td className="px-4 py-3 font-medium">Malformed Payload</td>
                  <td className="px-4 py-3 text-[var(--muted)]">Invalid JSON structure or unsupported model parameter.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono font-bold text-[var(--ink)]">401 Unauthorized</td>
                  <td className="px-4 py-3 font-medium">Authentication Error</td>
                  <td className="px-4 py-3 text-[var(--muted)]">Missing, malformed, or revoked secret API key.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono font-bold text-[var(--primary)]">402 Payment Required</td>
                  <td className="px-4 py-3 font-medium">Insufficient Wallet Balance</td>
                  <td className="px-4 py-3 text-[var(--muted)]">Wallet balance depleted. Please top up funds on platform.fobign.com.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono font-bold text-[var(--ink)]">429 Rate Limited</td>
                  <td className="px-4 py-3 font-medium">Rate Limit Exceeded</td>
                  <td className="px-4 py-3 text-[var(--muted)]">Requests exceeded configured RPM or TPM capacity.</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono font-bold text-[var(--ink)]">502 Bad Gateway</td>
                  <td className="px-4 py-3 font-medium">Upstream Unavailable</td>
                  <td className="px-4 py-3 text-[var(--muted)]">Primary and secondary upstream provider clusters unreachable.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[var(--ink)]">Standard Error JSON Response</h2>
            <CodeBlock
              snippets={[
                {
                  label: 'Error JSON',
                  language: 'json',
                  code: `{
  "error": {
    "message": "Insufficient developer wallet balance. Please top up your balance at platform.fobign.com.",
    "type": "insufficient_balance",
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
          <div className="space-y-3 border-b border-[var(--hairline)] pb-6">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase bg-[var(--surface-strong)] text-[var(--ink)] border border-[var(--hairline)]">
                POST
              </span>
              <span className="text-xs font-mono text-[var(--muted)]">/v1/chat/completions</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-normal text-[var(--ink)] tracking-tight">
              Chat Completions
            </h1>
            <p className="text-sm text-[var(--body)] leading-relaxed">
              Creates a model completion for the provided chat conversation. Fully compatible with OpenAI client libraries with Server-Sent Events (SSE) token streaming.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[var(--ink)]">Request Parameters</h2>
            <div className="rounded-xl border border-[var(--hairline)] bg-[var(--surface-card)] overflow-hidden text-xs shadow-2xs">
              <table className="w-full text-left">
                <thead className="bg-[var(--canvas-soft)] text-[var(--muted)] border-b border-[var(--hairline)] font-mono text-[10px] uppercase">
                  <tr>
                    <th className="px-4 py-3">Parameter</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Required</th>
                    <th className="px-4 py-3">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--hairline)] text-[var(--ink)]">
                  <tr>
                    <td className="px-4 py-3 font-mono text-[var(--primary)] font-medium">model</td>
                    <td className="px-4 py-3 font-mono text-[var(--muted)]">string</td>
                    <td className="px-4 py-3 text-[var(--ink)] font-bold">Yes</td>
                    <td className="px-4 py-3 text-[var(--muted)]">Model identifier (e.g. <code className="text-[var(--ink)]">deepseek-chat</code>, <code className="text-[var(--ink)]">deepseek-reasoner</code>).</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-[var(--primary)] font-medium">messages</td>
                    <td className="px-4 py-3 font-mono text-[var(--muted)]">array</td>
                    <td className="px-4 py-3 text-[var(--ink)] font-bold">Yes</td>
                    <td className="px-4 py-3 text-[var(--muted)]">Array of message objects with <code className="text-[var(--ink)]">role</code> and <code className="text-[var(--ink)]">content</code>.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-[var(--primary)] font-medium">stream</td>
                    <td className="px-4 py-3 font-mono text-[var(--muted)]">boolean</td>
                    <td className="px-4 py-3 text-[var(--muted)]">Optional</td>
                    <td className="px-4 py-3 text-[var(--muted)]">Whether to stream partial message deltas via Server-Sent Events. Default false.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-mono text-[var(--primary)] font-medium">temperature</td>
                    <td className="px-4 py-3 font-mono text-[var(--muted)]">number</td>
                    <td className="px-4 py-3 text-[var(--muted)]">Optional</td>
                    <td className="px-4 py-3 text-[var(--muted)]">Sampling temperature between 0 and 2. Default 1.0.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-semibold text-[var(--ink)]">cURL Example</h2>
            <CodeBlock
              snippets={[
                {
                  label: 'cURL',
                  language: 'bash',
                  code: `curl -X POST https://api.fobign.com/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer sk-fobign-72b8d04a6e92f15c3e7a1b8d2c4e9f0a5b6c7d8e9f0a1b2c" \\
  -d '{
    "model": "deepseek-reasoner",
    "messages": [
      {"role": "user", "content": "How many letters in the word strawberry?"}
    ],
    "stream": false
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
          <div className="space-y-3 border-b border-[var(--hairline)] pb-6">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase bg-[var(--surface-strong)] text-[var(--ink)] border border-[var(--hairline)]">
                POST
              </span>
              <span className="text-xs font-mono text-[var(--muted)]">/v1/messages</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-normal text-[var(--ink)] tracking-tight">
              Anthropic Messages API
            </h1>
            <p className="text-sm text-[var(--body)] leading-relaxed">
              Native Anthropic Messages format for Claude 3.7 Sonnet, Claude 3.5 Haiku, and Claude 3.5 Sonnet workloads.
            </p>
          </div>

          <CodeBlock
            snippets={[
              {
                label: 'Python (Anthropic SDK)',
                language: 'python',
                code: `import anthropic

client = anthropic.Anthropic(
    api_key="sk-fobign-72b8d04a6e92f15c3e7a1b8d2c4e9f0a5b6c7d8e9f0a1b2c",
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
          <div className="space-y-3 border-b border-[var(--hairline)] pb-6">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase bg-[var(--surface-strong)] text-[var(--ink)] border border-[var(--hairline)]">
                GET
              </span>
              <span className="text-xs font-mono text-[var(--muted)]">/v1/models</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-normal text-[var(--ink)] tracking-tight">
              Model Discovery &amp; Catalog
            </h1>
            <p className="text-sm text-[var(--body)] leading-relaxed">
              Returns the list of active foundation models, context window limits, and token pricing rates provisioned in your gateway.
            </p>
          </div>

          <CodeBlock
            snippets={[
              {
                label: 'cURL',
                language: 'bash',
                code: `curl https://api.fobign.com/v1/models \\
  -H "Authorization: Bearer sk-fobign-72b8d04a6e92f15c3e7a1b8d2c4e9f0a5b6c7d8e9f0a1b2c"`,
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
          <div className="space-y-3 border-b border-[var(--hairline)] pb-6">
            <h1 className="text-3xl font-normal text-[var(--ink)] tracking-tight">
              Documentation Section
            </h1>
            <p className="text-sm text-[var(--body)]">
              Select an item from the left navigation sidebar to view detailed parameters and code examples.
            </p>
          </div>
        </article>
      );
  }
}
