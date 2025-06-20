
"use client";
import { useState, useEffect, useCallback, useMemo } from 'react';
import { allCards } from '@/lib/pokemon-data'; 
import { useAuth } from '@/contexts/auth-context';
import { db } from '@/lib/firebase-config';
import { doc, getDoc, setDoc, deleteField } from 'firebase/firestore';

// No longer using POKEDEX_STORAGE_KEY

export function usePokedex() {
  const { user } = useAuth();
  const [collectedCardsMap, setCollectedCardsMap] = useState<Record<string, number>>({});
  const [isLoaded, setIsLoaded] = useState(false); // Indicates if initial load attempt is complete

  // Load Pokedex data from Firestore
  useEffect(() => {
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      getDoc(userDocRef).then(docSnap => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data && typeof data.pokedexData === 'object' && data.pokedexData !== null) {
            setCollectedCardsMap(data.pokedexData);
          } else {
            setCollectedCardsMap({}); // Initialize if field is missing or not an object
          }
        } else {
          // New user or no Pokedex data yet, initialize as empty
          setCollectedCardsMap({});
          // Optionally, you could write initial empty data here,
          // but saving on change will handle it.
        }
        setIsLoaded(true);
      }).catch(error => {
        console.error("Error loading Pokedex data from Firestore:", error);
        setCollectedCardsMap({}); // Fallback on error
        setIsLoaded(true);
      });
    } else {
      // No user, reset and mark as loaded (nothing to load)
      setCollectedCardsMap({});
      setIsLoaded(true); 
    }
  }, [user]);

  // Save Pokedex data to Firestore when collectedCardsMap changes
  useEffect(() => {
    if (user && isLoaded) { // Only save if user is present and initial load is done
      const userDocRef = doc(db, 'users', user.uid);
      // Using setDoc with merge:true to avoid overwriting other potential user data
      setDoc(userDocRef, { pokedexData: collectedCardsMap }, { merge: true })
        .catch(error => {
          console.error("Error saving Pokedex data to Firestore:", error);
        });
    }
  }, [collectedCardsMap, user, isLoaded]);

  const addCardsToCollection = useCallback((cardIds: string[]) => {
    setCollectedCardsMap(prevMap => {
      const newMap = { ...prevMap };
      cardIds.forEach(id => {
        newMap[id] = (newMap[id] || 0) + 1;
      });
      return newMap;
    });
  }, []);

  const getCollectedCount = useCallback((cardId: string): number => {
    return collectedCardsMap[cardId] || 0;
  }, [collectedCardsMap]);

  const resetPokedex = useCallback(async () => {
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      try {
        // To remove the pokedexData field, we set it to deleteField()
        await setDoc(userDocRef, { pokedexData: deleteField() }, { merge: true });
        setCollectedCardsMap({}); // Reset local state
      } catch (error) {
        console.error("Error resetting Pokedex data in Firestore:", error);
      }
    } else {
      setCollectedCardsMap({}); // If no user, just reset local state
    }
  }, [user]);

  const totalUniqueCollected = Object.keys(collectedCardsMap).length;

  const totalCollectedIncludingDuplicates = useMemo(() => {
    return Object.values(collectedCardsMap).reduce((sum, count) => sum + count, 0);
  }, [collectedCardsMap]);

  return {
    collectedCardsMap,
    addCardsToCollection,
    getCollectedCount,
    isLoaded,
    resetPokedex,
    totalCards: allCards.length,
    totalUniqueCollected,
    totalCollectedIncludingDuplicates,
  };
}
