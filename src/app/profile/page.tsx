
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useMyTeam } from "@/hooks/use-my-team";
import { usePokedex } from "@/hooks/use-pokedex";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardComponent } from "@/components/card-component";
import { UserCircle, Shield, Mail, LogOut, BookOpen, Pencil, Save, Eye, EyeOff, Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { updateProfile } from "firebase/auth";
import { auth, db } from "@/lib/firebase-config"; // Import db
import { doc, getDoc, setDoc } from "firebase/firestore"; // Import Firestore functions
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";

const DEFAULT_BIO = "Gotta Catch 'Em All!";

function maskEmail(email: string | null | undefined): string {
  if (!email) return "No email provided";
  const [localPart, domain] = email.split('@');
  if (!localPart || !domain) return "Invalid email format";

  if (localPart.length <= 2) {
    return `${localPart.substring(0, 1)}...@${domain}`;
  }
  return `${localPart.substring(0, 2)}${'x'.repeat(Math.max(0, localPart.length - 3))}${localPart.substring(localPart.length - 1)}@${domain}`;
}

const predefinedAvatars = [
  { id: 'avatarArven', url: 'https://scarletviolet.pokemon.com/_images/character/arven/character-arven.webp', alt: 'Arven Avatar', dataAiHint: 'pokemon arven' },
  { id: 'avatarAtticus', url: 'https://scarletviolet.pokemon.com/_images/character/atticus/character-atticus.webp', alt: 'Atticus Avatar', dataAiHint: 'pokemon atticus' },
  { id: 'avatarBrassius', url: 'https://scarletviolet.pokemon.com/_images/character/brassius/character-brassius.webp', alt: 'Brassius Avatar', dataAiHint: 'pokemon brassius' },
  { id: 'avatarEri', url: 'https://scarletviolet.pokemon.com/_images/character/eri/character-eri.webp', alt: 'Eri Avatar', dataAiHint: 'pokemon eri' },
  { id: 'avatarGeeta', url: 'https://scarletviolet.pokemon.com/_images/character/geeta/character-geeta.webp', alt: 'Geeta Avatar', dataAiHint: 'pokemon geeta' },
  { id: 'avatarIono', url: 'https://scarletviolet.pokemon.com/_images/character/iono/character-iono.webp', alt: 'Iono Avatar', dataAiHint: 'pokemon iono' },
  { id: 'avatarGiacomo', url: 'https://scarletviolet.pokemon.com/_images/character/giacomo/character-giacomo.webp', alt: 'Giacomo Avatar', dataAiHint: 'pokemon giacomo' },
  { id: 'avatarKofu', url: 'https://scarletviolet.pokemon.com/_images/character/kofu/character-kofu.webp', alt: 'Kofu Avatar', dataAiHint: 'pokemon kofu' },
];


export default function ProfilePage() {
  const { user, loading: authLoading, signOut: contextSignOut } = useAuth();
  const { 
    getActiveTeamCards, 
    getActiveTeam, 
    isLoaded: teamHookLoaded,
  } = useMyTeam();
  const { 
    totalCollectedIncludingDuplicates, 
    isLoaded: pokedexLoaded 
  } = usePokedex();
  const router = useRouter();
  const { toast } = useToast();

  const [currentBio, setCurrentBio] = useState(DEFAULT_BIO);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [editableBio, setEditableBio] = useState("");

  const [showFullEmail, setShowFullEmail] = useState(false);
  const [isAvatarSelectionDialogOpen, setIsAvatarSelectionDialogOpen] = useState(false);
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);
  const [profileDataLoading, setProfileDataLoading] = useState(true);


  useEffect(() => {
    if (user) {
      // Load bio from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      setProfileDataLoading(true);
      getDoc(userDocRef).then(docSnap => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const firestoreBio = data.profileBio;
          setCurrentBio(firestoreBio || DEFAULT_BIO);
          setEditableBio(firestoreBio || DEFAULT_BIO);
        } else {
          setCurrentBio(DEFAULT_BIO);
          setEditableBio(DEFAULT_BIO);
        }
      }).catch(error => {
        console.error("Error loading bio from Firestore:", error);
        toast({ title: "Error", description: "Could not load profile bio.", variant: "destructive" });
        setCurrentBio(DEFAULT_BIO); // Fallback
        setEditableBio(DEFAULT_BIO);
      }).finally(() => {
        setProfileDataLoading(false);
      });
    } else {
      setProfileDataLoading(false); // No user, so nothing to load
    }
  }, [user, toast]);

  const handleSaveBio = async () => {
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      try {
        await setDoc(userDocRef, { profileBio: editableBio }, { merge: true });
        setCurrentBio(editableBio);
        toast({ title: "Success", description: "Bio updated!" });
        setIsEditingBio(false);
      } catch (error) {
        console.error("Error saving bio to Firestore:", error);
        toast({ title: "Error", description: "Failed to save bio.", variant: "destructive" });
      }
    }
  };
  
  const handleSelectAvatar = async (avatarUrl: string) => {
    if (!user || !auth.currentUser) {
      toast({ title: "Error", description: "User not found.", variant: "destructive" });
      return;
    }
    setIsUpdatingAvatar(true);
    try {
      await updateProfile(auth.currentUser, { photoURL: avatarUrl });
      // The user object in useAuth context will update via onAuthStateChanged listener
      toast({ title: "Success", description: "Profile picture updated!" });
      setIsAvatarSelectionDialogOpen(false);
    } catch (error) {
      console.error("Error updating profile picture:", error);
      toast({ title: "Update Error", description: "Failed to update profile picture.", variant: "destructive" });
    } finally {
      setIsUpdatingAvatar(false);
    }
  };
  
  if (authLoading || !teamHookLoaded || !pokedexLoaded || profileDataLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(217,91%,60%)]"></div>
        <p className="ml-4 text-lg text-primary-foreground dark:text-foreground">Loading Profile...</p>
      </div>
    );
  }

  const activeTeamDetails = getActiveTeam();
  const activeTeamCards = getActiveTeamCards();

  return (
    <div className="space-y-6 flex flex-col">
      <header className="text-center">
        <h1 className="text-4xl sm:text-5xl font-headline font-bold text-primary-foreground dark:text-foreground">Your Trainer Profile</h1>
      </header>

      <Card className="shadow-xl border-2 border-border dark:border-[hsl(var(--border))]">
        {user ? (
          <CardHeader className="p-4">
            <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4">
              
              <div className="flex items-center gap-4">
                <div className="relative group flex-shrink-0">
                  <Avatar className="h-16 w-16 border-2 border-[hsl(217,91%,60%)]">
                    <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                    <AvatarFallback>
                      {user.displayName ? user.displayName.charAt(0).toUpperCase() : <UserCircle className="h-12 w-12 text-muted-foreground" />}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="absolute bottom-0 right-0 bg-background/70 hover:bg-background rounded-full h-7 w-7 group-hover:opacity-100 opacity-50 transition-opacity"
                    onClick={() => setIsAvatarSelectionDialogOpen(true)}
                    disabled={isUpdatingAvatar}
                    aria-label="Change profile picture"
                  >
                    {isUpdatingAvatar ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
                  </Button>
                </div>

                <div className="text-left space-y-1">
                  <CardTitle className="text-lg font-headline text-primary-foreground dark:text-foreground">
                    {user.displayName || 'Mysterious Trainer'}
                  </CardTitle>
                  
                  <div className="flex items-center gap-2">
                    {isEditingBio ? (
                      <div className="w-full">
                        <Textarea 
                          value={editableBio} 
                          onChange={(e) => setEditableBio(e.target.value)} 
                          placeholder="Your bio..." 
                          className="w-full text-sm"
                          rows={2}
                        />
                        <div className="flex gap-2 mt-1">
                          <Button onClick={handleSaveBio} size="sm" className="bg-green-500 hover:bg-green-600"><Save className="mr-1 h-3 w-3" />Save</Button>
                          <Button variant="ghost" size="sm" onClick={() => { setIsEditingBio(false); setEditableBio(currentBio); }}>Cancel</Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm text-accent flex-grow italic">"{currentBio}"</p>
                        <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => {
                          setEditableBio(currentBio);
                          setIsEditingBio(true);
                        }}>
                          <Pencil className="h-3 w-3" />
                        </Button>
                      </>
                    )}
                  </div>
                  
                  <div className="space-y-1 text-xs text-muted-foreground">
                    {user.email && (
                      <div className="flex items-center gap-1.5">
                        <Mail className="h-3 w-3" />
                        <span>{showFullEmail ? user.email : maskEmail(user.email)}</span>
                        <Button size="icon" variant="ghost" className="h-5 w-5" onClick={() => setShowFullEmail(!showFullEmail)}>
                          {showFullEmail ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        </Button>
                      </div>
                    )}
                    <p className="flex items-center gap-1.5">
                      <BookOpen className="h-3 w-3" /> Total Pokémon Caught: {totalCollectedIncludingDuplicates}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full sm:w-auto">
                <Button 
                  onClick={contextSignOut} 
                  variant="outline" 
                  className="w-full sm:w-auto border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </Button>
              </div>

            </div>
          </CardHeader>
        ) : (
          <CardContent className="text-center py-8 space-y-3">
            <UserCircle className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
            <p className="text-xl text-foreground">User profile information is not available.</p>
            <p className="text-sm text-muted-foreground mt-2">Sign in to see your details and manage your account.</p>
             <p className="text-md text-foreground flex items-center justify-center gap-1.5 pt-2">
              <BookOpen className="h-5 w-5 text-primary" /> Total Pokémon Caught: {totalCollectedIncludingDuplicates}
            </p>
          </CardContent>
        )}
      </Card>

      <Card className="shadow-xl border-2 border-border dark:border-[hsl(var(--border))]">
        <CardHeader>
          <CardTitle className="text-3xl font-headline text-center flex items-center justify-center gap-3 text-primary-foreground dark:text-foreground">
            <Shield className="h-8 w-8 text-[hsl(217,91%,60%)]" />
            Active Battle Team: {activeTeamDetails ? <span className="text-[hsl(217,91%,60%)]">{activeTeamDetails.name}</span> : <span className="text-muted-foreground">None Selected</span>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeTeamDetails && activeTeamCards.some(card => card !== null) ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 justify-items-center">
              {activeTeamCards.map((card, index) => (
                <div key={`active-team-${index}`} className="w-full max-w-[150px]">
                  {card ? (
                    <CardComponent card={card} className="w-full h-auto aspect-[240/336] shadow-lg hover:shadow-2xl transition-shadow duration-300" showDetails={false} />
                  ) : (
                    <div className="aspect-[240/336] border-2 border-dashed border-muted rounded-lg flex flex-col items-center justify-center bg-background/30 p-2">
                       <UserCircle className="h-12 w-12 text-muted-foreground/50 mb-2" />
                      <p className="text-muted-foreground text-center text-sm">Empty Slot</p>
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

      <Dialog open={isAvatarSelectionDialogOpen} onOpenChange={setIsAvatarSelectionDialogOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Select Your Avatar</DialogTitle>
          </DialogHeader>
          {isUpdatingAvatar ? (
            <div className="flex justify-center items-center py-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-3 text-lg">Updating avatar...</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 p-4 max-h-[60vh] overflow-y-auto">
              {predefinedAvatars.map((avatar) => (
                <button
                  key={avatar.id}
                  onClick={() => handleSelectAvatar(avatar.url)}
                  className="rounded-lg overflow-hidden border-2 border-transparent hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                  aria-label={`Select ${avatar.alt}`}
                  disabled={isUpdatingAvatar}
                >
                  <Image
                    src={avatar.url}
                    alt={avatar.alt}
                    width={100}
                    height={100}
                    className="object-cover w-full h-full aspect-square"
                    data-ai-hint={avatar.dataAiHint}
                  />
                </button>
              ))}
            </div>
          )}
          <div className="flex justify-end pt-4">
            <DialogClose asChild>
              <Button variant="outline" disabled={isUpdatingAvatar}>Cancel</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
