import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Humand Connect MCP Server',
  description: 'MCP Server for Humand API',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.variable} style={{ margin: 0, padding: 0, backgroundColor: '#f8f8f8' }}>{children}</body>
    </html>
  );
}
