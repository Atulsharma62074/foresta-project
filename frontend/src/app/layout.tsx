import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Foresta Paper Industries – Premium Quality Paper',
  description: 'Leading manufacturer of premium quality paper products. ISO 9001:2018 Certified. GeM registered supplier.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
