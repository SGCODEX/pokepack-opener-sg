import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/navbar';
import { Toaster } from "@/components/ui/toaster";
import { Container } from '@/components/layout/container';

export const metadata: Metadata = {
  title: 'PokePack Opener',
  description: 'Open virtual Pokemon card packs and discover amazing cards!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Container className="py-8">
            {children}
          </Container>
        </main>
        <Toaster />
        <footer className="bg-primary/10 text-center py-4">
          <Container>
            <p className="text-sm text-foreground/80">&copy; {new Date().getFullYear()} PokePack Opener. Gotta open 'em all!</p>
          </Container>
        </footer>
      </body>
    </html>
  );
}
