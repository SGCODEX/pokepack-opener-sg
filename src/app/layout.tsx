
// No "use client" here
import type { Metadata } from 'next';
import './globals.css'; // Keep this for global styles
import { ClientProviders } from '@/components/layout/client-providers'; // Import the new wrapper

export const metadata: Metadata = {
  title: 'PokePack Opener SG',
  description: 'Open virtual Pokemon card packs and discover amazing cards!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col bg-background text-foreground">
        {/* ClientProviders now also includes AuthProvider internally */}
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
