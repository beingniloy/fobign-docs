import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DocsShell from '@/components/layout/DocsShell';
import DocsContent from '@/components/sections/DocsContent';

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface DocMeta {
  title: string;
  description: string;
  category: string;
  sectionId: string;
}

const DOC_PAGES: Record<string, DocMeta> = {
  quickstart: {
    title: 'Quickstart Guide — 2-Minute Integration',
    description: 'Get started with the Fobign API in 2 minutes. Drop-in OpenAI and Anthropic client configurations for Python, Node.js, and cURL.',
    category: 'Getting Started',
    sectionId: 'quickstart',
  },
  authentication: {
    title: 'Authentication & API Keys',
    description: 'Learn how to generate, authenticate, and manage Bearer API keys for the Fobign AI Gateway.',
    category: 'Getting Started',
    sectionId: 'authentication',
  },
  errors: {
    title: 'Error Handling & Status Codes',
    description: 'Reference guide for HTTP error codes (400, 401, 403, 429, 500), upstream timeout handling, and automatic failover behavior.',
    category: 'Getting Started',
    sectionId: 'errors',
  },
  'chat-completions': {
    title: 'Chat Completions API (/v1/chat/completions)',
    description: 'OpenAI-compatible Chat Completions endpoint reference. Supports Server-Sent Events (SSE) streaming, function calling, and temperature parameters.',
    category: 'API Endpoints',
    sectionId: 'chat-completions',
  },
  'claude-messages': {
    title: 'Anthropic Messages API (/v1/messages)',
    description: 'Anthropic-compatible Messages endpoint documentation. Native Claude 3.5 Sonnet, Claude 3 Haiku, and Claude Opus payload specs.',
    category: 'API Endpoints',
    sectionId: 'claude-messages',
  },
  models: {
    title: 'Model Discovery & Catalog (/v1/models)',
    description: 'Discover all supported foundation models, context windows, combo endpoints, and token pricing rates across providers.',
    category: 'API Endpoints',
    sectionId: 'models',
  },
};

export async function generateStaticParams() {
  return Object.keys(DOC_PAGES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = DOC_PAGES[slug];
  if (!doc) return {};

  return {
    title: `${doc.title} | Fobign Docs`,
    description: doc.description,
    alternates: {
      canonical: `https://docs.fobign.com/${slug}`,
    },
    openGraph: {
      title: `${doc.title} | Fobign Docs`,
      description: doc.description,
      url: `https://docs.fobign.com/${slug}`,
      siteName: 'Fobign Technologies',
      type: 'article',
    },
  };
}

export default async function DocSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = DOC_PAGES[slug];

  if (!doc) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: doc.title,
    description: doc.description,
    url: `https://docs.fobign.com/${slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'Fobign Technologies',
      url: 'https://fobign.com',
      logo: 'https://fobign.com/fobign-logo.png',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DocsShell
        currentSlug={slug}
        categoryName={doc.category}
        title={doc.title}
      >
        <DocsContent sectionId={doc.sectionId} />
      </DocsShell>
    </>
  );
}

