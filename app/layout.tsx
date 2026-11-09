import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#f7f7f4',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Fobign API Documentation — Unified AI Gateway',
  description: 'Official API reference, client SDK guides, and integration tutorials for Fobign Technologies (docs.fobign.com).',
  metadataBase: new URL('https://docs.fobign.com'),
  alternates: {
    canonical: 'https://docs.fobign.com',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Fobign API Documentation — Unified AI Gateway',
    description: 'Official API reference, client SDK guides, and integration tutorials for Fobign Technologies.',
    url: 'https://docs.fobign.com',
    siteName: 'Fobign Technologies',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fobign API Documentation — Unified AI Gateway',
    description: 'Official API reference and developer docs for Fobign Technologies.',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Fobign Documentation',
    url: 'https://docs.fobign.com',
    publisher: {
      '@type': 'Organization',
      name: 'Fobign Technologies',
      url: 'https://fobign.com',
      logo: 'https://fobign.com/fobign-logo.png',
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'hello@fobign.com',
        contactType: 'technical support',
      },
    },
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          id="theme-initializer"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const stored = localStorage.getItem('fobign_theme');
                if (stored === 'light' || (!stored && window.matchMedia('(prefers-color-scheme: light)').matches)) {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                } else {
                  document.documentElement.classList.remove('light');
                  document.documentElement.classList.add('dark');
                }
              } catch(e) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[var(--canvas)] text-[var(--ink)] antialiased">
        {children}
      </body>
    </html>
  );
}
