
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { Chrome } from "lucide-react"; // Using Chrome icon as a stand-in for Google G
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { user, signInWithGoogle, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/'); // Redirect to home if already logged in
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(217,91%,60%)]"></div>
      </div>
    );
  }
  
  if (user) return null; // Or a loading spinner until redirect completes

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-sm shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Welcome Back!</CardTitle>
          <CardDescription>Sign in to access your Pokedex and open packs.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={signInWithGoogle} 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6"
          >
            <Chrome className="mr-2 h-5 w-5" /> {/* Placeholder for Google Icon */}
            Sign in with Google
          </Button>
          {/* You can add more sign-in options here later, e.g., email/password */}
        </CardContent>
      </Card>
    </div>
  );
}
