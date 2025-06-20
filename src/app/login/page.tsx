
"use client";

import { useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import Image from 'next/image';
import { PageLoader } from '@/components/layout/page-loader';

export default function LoginPage() {
  const { user, signInWithGoogle, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && user) {
      router.push('/'); 
    }
  }, [user, authLoading, router]);

  if (authLoading || (!authLoading && user)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-15rem)] text-center p-4 sm:p-6">
      <Card className="w-full max-w-md p-6 sm:p-8 shadow-xl border-2 border-border dark:border-[hsl(217,91%,60%)]/30">
        <Image 
          src="https://placehold.co/120x120.png" 
          alt="PokePack Opener SG Logo" 
          width={100} 
          height={100} 
          className="mb-6 rounded-full shadow-lg mx-auto"
          data-ai-hint="pokemon app logo"
        />
        <h1 className="text-3xl sm:text-4xl font-headline font-bold text-primary-foreground dark:text-foreground mb-3">
          Welcome Trainer!
        </h1>
        <p className="text-md sm:text-lg text-muted-foreground dark:text-foreground/80 mb-8">
          Sign in with Google to open packs, build your Pokédex, and create your ultimate team.
        </p>
        <Button 
          onClick={signInWithGoogle} 
          size="lg"
          className="bg-[hsl(217,91%,60%)] hover:bg-[hsl(217,91%,50%)] text-white w-full text-base py-3"
        >
          <LogIn className="mr-2 h-5 w-5" /> Sign in with Google
        </Button>
        <p className="text-xs text-muted-foreground mt-10">
          Your Pokémon adventure awaits!
        </p>
      </Card>
    </div>
  );
}
