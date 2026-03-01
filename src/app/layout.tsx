import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SmoothScroller from '@/components/SmoothScroller';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AntarMantra | Heal Through Bhagavad Gita',
  description: 'An AI-powered emotional healing web experience taking you deep into the wisdom of Bhagavad Gita.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.className} bg-black text-white antialiased selection:bg-[#d4af37] selection:text-black`}>
        <SmoothScroller />
        <div className="fixed inset-0 z-[-2] pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.05)_0%,rgba(5,5,5,1)_100%)] ambient-pulse" />
        {children}
      </body>
    </html>
  );
}
