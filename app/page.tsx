import type { Metadata } from 'next';
import DocsShell from '@/components/layout/DocsShell';
import DocsContent from '@/components/sections/DocsContent';

export const metadata: Metadata = {
  title: 'Fobign API Documentation : Unified AI Gateway',
  description: 'Official developer documentation for Fobign Technologies Unified AI Gateway. Fast, resilient OpenAI & Anthropic compatible API proxy with multi-model routing.',
  alternates: {
    canonical: 'https://docs.fobign.com',
  },
  openGraph: {
    title: 'Fobign API Documentation : Unified AI Gateway',
    description: 'Official developer documentation for Fobign Technologies Unified AI Gateway.',
    url: 'https://docs.fobign.com',
    siteName: 'Fobign Technologies',
    type: 'website',
  },
};

export default function DocsHomePage() {
  return (
    <DocsShell
      currentSlug="overview"
      categoryName="Getting Started"
      title="Platform Overview"
    >
      <DocsContent sectionId="overview" />
    </DocsShell>
  );
}
