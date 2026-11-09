import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fobign Developer Documentation — Unified AI API Gateway',
  description: 'Official API reference, client SDK guides, and integration tutorials for Fobign Technologies (docs.fobign.com).',
  metadataBase: new URL('https://docs.fobign.com'),
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#0e0f11] text-[#f4f4f5] antialiased">
        {children}
      </body>
    </html>
  );
}

