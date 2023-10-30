import React from 'react';
import { Metadata } from 'next';
import { Providers } from './providers';
import '@/styles.css';
import ShowVersion from '@/components/debug/show-version';

const SERVER_URL = process.env.NEXT_PUBLIC_VERCEL_URL || process.env.PUBLIC_URL;
const BASE_URL = SERVER_URL ? new URL(`https://${SERVER_URL}`) : new URL(`http://localhost:${process.env.PORT||3000}/`)

export const metadata: Metadata = {
  metadataBase: BASE_URL,

  icons: [
    { rel: 'icon', type: 'image/png', url: 'favicon.png' },
  ],

  title: 'Next/Phaser Typescript',
  authors: {
    name: 'fubira',
    url: 'https://github.com/fubira/next-phaser-typescipt'
  },
  openGraph: {
    siteName: `Next/Phaser Typescript`,
    images: ['images/logo.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <main>
          <Providers>
            {children}
            <ShowVersion />
          </Providers>
        </main>
      </body>
    </html>
  );
}