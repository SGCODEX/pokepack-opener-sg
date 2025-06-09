"use client";
import { useState, useEffect, useCallback } from 'react';
import type { PokemonCard } from '@/lib/types'; // Assuming PokemonCard type is defined

const STORAGE_KEY = 'pokePackOpener_collectedCards';

export function usePokedex() {
  const [collectedCardIds, setCollectedCardIds] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // This effect runs only on the client after hydration
    try {
      const storedCards = localStorage.getItem(STORAGE_KEY);
      if (storedCards) {
        setCollectedCardIds(new Set(JSON.parse(storedCards)));
      }
    } catch (error) {
      console.error("Failed to load cards from localStorage", error);
      // Initialize with an empty set if localStorage is corrupt or unavailable
      setCollectedCardIds(new Set());
    }
    setIsLoaded(true);
  }, []);

  const addCardsToCollection = useCallback((cardIds: string[]) => {
    if (!isLoaded) return; // Ensure this only runs after initial load
    setCollectedCardIds(prevCollectedCardIds => {
      const newCollectedCardIds = new Set(prevCollectedCardIds);
      cardIds.forEach(id => newCollectedCardIds.add(id));
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(newCollectedCardIds)));
      } catch (error) {
        console.error("Failed to save cards to localStorage", error);
      }
      return newCollectedCardIds;
    });
  }, [isLoaded]);

  const isCollected = useCallback((cardId: string): boolean => {
    return collectedCardIds.has(cardId);
  }, [collectedCardIds]);

  const resetPokedex = useCallback(() => {
    if (!isLoaded) return;
    setCollectedCardIds(new Set());
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Failed to reset localStorage", error);
    }
  }, [isLoaded]);

  return { collectedCardIds, addCardsToCollection, isCollected, isLoaded, resetPokedex };
}
