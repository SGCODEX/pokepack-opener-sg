
"use client";
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { db } from '@/lib/firebase-config';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

export function usePokedex() {
  const { user, loading: authLoading } = useAuth();
  const [collectedCardIds, setCollectedCardIds] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false); // Tracks if Pokedex data for the user is loaded

  // Fetch initial data and subscribe to changes
  useEffect(() => {
    if (authLoading) {
      setIsLoaded(false); // If auth is loading, pokedex is not yet loaded
      return;
    }

    if (user) {
      setIsLoaded(false); // Set to false while fetching user-specific data
      const userPokedexRef = doc(db, 'users', user.uid, 'pokedex', 'collectedCards');
      
      const unsubscribe = onSnapshot(userPokedexRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setCollectedCardIds(new Set(data?.ids || []));
        } else {
          // No data yet for this user, initialize empty
          setCollectedCardIds(new Set());
        }
        setIsLoaded(true);
      }, (error) => {
        console.error("Error fetching Pokedex data: ", error);
        setCollectedCardIds(new Set()); // Fallback to empty on error
        setIsLoaded(true); // Consider loaded even on error to unblock UI
      });

      return () => unsubscribe(); // Cleanup subscription on unmount or user change
    } else {
      // No user logged in
      setCollectedCardIds(new Set()); // Reset if user logs out
      setIsLoaded(true); // Consider loaded as there's no user data to fetch
    }
  }, [user, authLoading]);

  const addCardsToCollection = useCallback(async (cardIds: string[]) => {
    if (!user || !isLoaded) return; // Only proceed if user is logged in and initial data is loaded

    const newCollectedCardIds = new Set(collectedCardIds);
    cardIds.forEach(id => newCollectedCardIds.add(id));
    
    const userPokedexRef = doc(db, 'users', user.uid, 'pokedex', 'collectedCards');
    try {
      await setDoc(userPokedexRef, { ids: Array.from(newCollectedCardIds) }, { merge: true });
      // setCollectedCardIds will be updated by the onSnapshot listener
    } catch (error) {
      console.error("Failed to save cards to Firestore: ", error);
      // Optionally, revert optimistic update or show error
    }
  }, [user, collectedCardIds, isLoaded]);

  const isCollected = useCallback((cardId: string): boolean => {
    return collectedCardIds.has(cardId);
  }, [collectedCardIds]);

  const resetPokedex = useCallback(async () => {
    if (!user || !isLoaded) return;

    const userPokedexRef = doc(db, 'users', user.uid, 'pokedex', 'collectedCards');
    try {
      await setDoc(userPokedexRef, { ids: [] }); // Set to empty array
      // setCollectedCardIds will be updated by the onSnapshot listener
    } catch (error) {
      console.error("Failed to reset Pokedex in Firestore: ", error);
    }
  }, [user, isLoaded]);

  // Return authLoading as part of isLoaded status: Pokedex isn't truly loaded if auth state is unknown.
  const pokedexFullyLoaded = isLoaded && !authLoading;

  return { 
    collectedCardIds, 
    addCardsToCollection, 
    isCollected, 
    isLoaded: pokedexFullyLoaded, 
    resetPokedex 
  };
}
