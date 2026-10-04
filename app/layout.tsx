import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vanta — Real-time social video',
  description: 'A premium video call and avatar experience.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
