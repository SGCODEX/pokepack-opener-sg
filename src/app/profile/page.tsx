
"use client";

import { useAuth } from "@/contexts/auth-context";
import { useMyTeam } from "@/hooks/use-my-team";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardComponent } from "@/components/card-component";
import type { PokemonCard } from "@/lib/types";
import { UserCircle, Shield, Mail, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const { 
    getActiveTeamCards, 
    getActiveTeam, 
    isLoaded: teamHookLoaded,
    teamSize 
  } = useMyTeam();
  const router = useRouter();

  const activeTeamDetails = getActiveTeam();
  const activeTeamCards = getActiveTeamCards();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  if (authLoading || !teamHookLoaded) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(217,91%,60%)]"></div>
        <p className="ml-4 text-lg text-primary-foreground dark:text-foreground">Loading Profile...</p>
      </div>
    );
  }

  if (!user) {
    // This case should ideally be handled by the useEffect redirect,
    // but as a fallback:
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <p className="text-xl text-muted-foreground">Please log in to view your profile.</p>
        <Button onClick={() => router.push('/login')}>Go to Login</Button>
      </div>
    );
  }
  
  const emptySlots = Array(teamSize).fill(null);


  return (
    <div className="space-y-10">
      <header className="text-center mt-4">
        <h1 className="text-4xl sm:text-5xl font-headline font-bold text-primary-foreground dark:text-foreground">Your Trainer Profile</h1>
      </header>

      <Card className="shadow-xl border-2 border-border dark:border-primary/30">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Avatar className="h-24 w-24 border-2 border-primary">
              <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
              <AvatarFallback>
                <UserCircle className="h-20 w-20 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <CardTitle className="text-3xl font-headline text-primary-foreground dark:text-foreground">{user.displayName || 'Mysterious Trainer'}</CardTitle>
              {user.email && (
                <p className="text-muted-foreground flex items-center justify-center sm:justify-start gap-2 mt-1">
                  <Mail className="h-5 w-5" /> {user.email}
                </p>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex justify-center sm:justify-end">
          <Button 
            onClick={signOut} 
            variant="outline" 
            className="w-full max-w-xs sm:w-auto border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-xl border-2 border-border dark:border-primary/30">
        <CardHeader>
          <CardTitle className="text-3xl font-headline text-center flex items-center justify-center gap-3 text-primary-foreground dark:text-foreground">
            <Shield className="h-8 w-8 text-[hsl(217,91%,60%)]" />
            Active Battle Team: {activeTeamDetails ? <span className="text-[hsl(217,91%,60%)]">{activeTeamDetails.name}</span> : <span className="text-muted-foreground">None Selected</span>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeTeamDetails && activeTeamCards.some(card => card !== null) ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
              {activeTeamCards.map((card, index) => (
                <div key={`active-team-${index}`} className="w-full max-w-xs sm:max-w-none">
                  {card ? (
                    <CardComponent card={card} className="w-full h-auto aspect-[240/336] shadow-lg hover:shadow-2xl transition-shadow duration-300" showDetails={true} />
                  ) : (
                    <div className="aspect-[240/336] border-2 border-dashed border-muted rounded-lg flex flex-col items-center justify-center bg-background/30 p-4">
                       <UserCircle className="h-16 w-16 text-muted-foreground/50 mb-2" />
                      <p className="text-muted-foreground text-center">Empty Slot</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Shield className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
              <p className="text-xl text-muted-foreground">
                Your active team is currently empty or no team is active.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Visit the "My Team" page to assemble your squad!
              </p>
              <Button onClick={() => router.push('/my-team')} className="mt-6 bg-[hsl(217,91%,60%)] hover:bg-[hsl(217,91%,50%)] text-white">
                Go to My Team
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
