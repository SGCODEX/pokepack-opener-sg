
"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useMyTeam } from "@/hooks/use-my-team";
import { usePokedex } from "@/hooks/use-pokedex";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardComponent } from "@/components/card-component";
import { UserCircle, Shield, Mail, LogOut, BookOpen, Pencil, Save, X, Eye, EyeOff, Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { updateProfile } from "firebase/auth";
import { auth, storage } from "@/lib/firebase-config"; // Import storage
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

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

  const [isEditingName, setIsEditingName] = useState(false);
  const [editableDisplayName, setEditableDisplayName] = useState("");

  const [currentBio, setCurrentBio] = useState(DEFAULT_BIO);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [editableBio, setEditableBio] = useState("");

  const [showFullEmail, setShowFullEmail] = useState(false);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    if (user) {
      setEditableDisplayName(user.displayName || "");
      const storedBio = localStorage.getItem(`userBio-${user.uid}`);
      setCurrentBio(storedBio || DEFAULT_BIO);
      setEditableBio(storedBio || DEFAULT_BIO);
    }
  }, [user]);

  const handleSaveName = async () => {
    if (!auth.currentUser) {
      toast({ title: "Error", description: "You must be logged in to update your name.", variant: "destructive" });
      return;
    }
    if (!editableDisplayName.trim()) {
      toast({ title: "Error", description: "Display name cannot be empty.", variant: "destructive" });
      return;
    }
    try {
      await updateProfile(auth.currentUser, { displayName: editableDisplayName });
      toast({ title: "Success", description: "Display name updated!" });
      setIsEditingName(false);
      // The user object in useAuth should update via onAuthStateChanged from firebase
    } catch (error) {
      console.error("Error updating display name:", error);
      toast({ title: "Error", description: "Failed to update display name.", variant: "destructive" });
    }
  };

  const handleSaveBio = () => {
    if (user) {
      localStorage.setItem(`userBio-${user.uid}`, editableBio);
      setCurrentBio(editableBio);
      toast({ title: "Success", description: "Bio updated!" });
      setIsEditingBio(false);
    }
  };

  const handleImageFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // Basic validation (optional)
      if (!file.type.startsWith('image/')) {
        toast({ title: "Invalid File", description: "Please select an image file.", variant: "destructive" });
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({ title: "File Too Large", description: "Image size should be less than 5MB.", variant: "destructive" });
        return;
      }
      setImageFile(file);
      handleImageUpload(file); // Automatically start upload
    }
  };
  
  const handleImageUpload = async (fileToUpload: File) => {
    if (!fileToUpload || !user || !auth.currentUser) {
      toast({ title: "Error", description: "User not found or no file selected.", variant: "destructive" });
      return;
    }
  
    setIsUploadingPhoto(true);
    try {
      const imagePath = `profilePictures/${user.uid}/${fileToUpload.name}`;
      const imageStorageRef = storageRef(storage, imagePath);
  
      await uploadBytes(imageStorageRef, fileToUpload);
      const downloadURL = await getDownloadURL(imageStorageRef);
  
      await updateProfile(auth.currentUser, { photoURL: downloadURL });
      
      toast({ title: "Success", description: "Profile picture updated!" });
      setImageFile(null); 
    } catch (error) {
      console.error("Error uploading image or updating profile:", error);
      toast({ title: "Upload Error", description: "Failed to update profile picture.", variant: "destructive" });
    } finally {
      setIsUploadingPhoto(false);
    }
  };
  
  if (authLoading || !teamHookLoaded || !pokedexLoaded) {
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
    <div className="space-y-10">
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImageFileChange} 
        style={{ display: 'none' }} 
        accept="image/*" 
      />
      <header className="text-center mt-4">
        <h1 className="text-4xl sm:text-5xl font-headline font-bold text-primary-foreground dark:text-foreground">Your Trainer Profile</h1>
      </header>

      <Card className="shadow-xl border-2 border-border dark:border-[hsl(var(--border))]">
        {user ? (
          <>
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="relative group">
                  <Avatar className="h-24 w-24 border-2 border-[hsl(217,91%,60%)]">
                    <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                    <AvatarFallback>
                      {user.displayName ? user.displayName.charAt(0).toUpperCase() : <UserCircle className="h-20 w-20 text-muted-foreground" />}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    className="absolute bottom-0 right-0 bg-background/70 hover:bg-background rounded-full h-8 w-8 group-hover:opacity-100 opacity-50 transition-opacity"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingPhoto}
                    aria-label="Change profile picture"
                  >
                    {isUploadingPhoto ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
                  </Button>
                </div>

                <div className="text-center sm:text-left space-y-2 flex-grow">
                  {/* Display Name Editing */}
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    {isEditingName ? (
                      <>
                        <Input 
                          value={editableDisplayName} 
                          onChange={(e) => setEditableDisplayName(e.target.value)} 
                          className="text-2xl font-headline h-10"
                          placeholder="Your Name"
                        />
                        <Button size="icon" onClick={handleSaveName} className="bg-green-500 hover:bg-green-600"><Save className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => { setIsEditingName(false); setEditableDisplayName(user.displayName || ""); }}>
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <CardTitle className="text-3xl font-headline text-primary-foreground dark:text-foreground">
                          {user.displayName || 'Mysterious Trainer'}
                        </CardTitle>
                        <Button size="icon" variant="ghost" onClick={() => {
                          setEditableDisplayName(user.displayName || '');
                          setIsEditingName(true);
                        }}>
                          <Pencil className="h-5 w-5" />
                        </Button>
                      </>
                    )}
                  </div>

                  {/* Bio Editing */}
                  <div className="flex items-center gap-2 mt-1 justify-center sm:justify-start">
                    {isEditingBio ? (
                      <div className="flex-grow">
                        <Textarea 
                          value={editableBio} 
                          onChange={(e) => setEditableBio(e.target.value)} 
                          placeholder="Your bio..." 
                          className="w-full text-base"
                          rows={2}
                        />
                        <div className="flex gap-2 mt-2 justify-center sm:justify-start">
                          <Button onClick={handleSaveBio} size="sm" className="bg-green-500 hover:bg-green-600"><Save className="mr-1.5 h-4 w-4" />Save Bio</Button>
                          <Button variant="ghost" size="sm" onClick={() => { setIsEditingBio(false); setEditableBio(currentBio); }}>Cancel</Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-md text-accent flex-grow italic">"{currentBio}"</p>
                        <Button size="icon" variant="ghost" onClick={() => {
                          setEditableBio(currentBio);
                          setIsEditingBio(true);
                        }}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                  
                  {/* Email Display & Toggle */}
                  {user.email && (
                    <div className="text-sm text-muted-foreground flex items-center justify-center sm:justify-start gap-1.5 pt-1">
                      <Mail className="h-4 w-4" />
                      <span>{showFullEmail ? user.email : maskEmail(user.email)}</span>
                      <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => setShowFullEmail(!showFullEmail)}>
                        {showFullEmail ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  )}

                  <p className="text-sm text-muted-foreground flex items-center justify-center sm:justify-start gap-1.5">
                    <BookOpen className="h-4 w-4" /> Total Pokémon Caught: {totalCollectedIncludingDuplicates}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex justify-center sm:justify-end">
              <Button 
                onClick={contextSignOut} 
                variant="outline" 
                className="w-full max-w-xs sm:w-auto border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </Button>
            </CardContent>
          </>
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
