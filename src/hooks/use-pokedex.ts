
"use client";
import { useState, useEffect, useCallback } from 'react';
import type { PokemonCard } from '@/lib/types'; // Assuming this type is still relevant
import { allCards } from '@/lib/pokemon-data'; // To get total card count

const POKEDEX_STORAGE_KEY = 'collected_pokemon_cards';

export function usePokedex() {
  const [collectedCardIds, setCollectedCardIds] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false); // Tracks if Pokedex data from localStorage is loaded

  // Load from localStorage on initial mount
  useEffect(() => {
    try {
      const storedData = localStorage.getItem(POKEDEX_STORAGE_KEY);
      if (storedData) {
        setCollectedCardIds(new Set(JSON.parse(storedData)));
      }
    } catch (error) {
      console.error("Error loading Pokedex data from localStorage:", error);
      // Initialize with an empty set if there's an error or no data
      setCollectedCardIds(new Set());
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever collectedCardIds changes
  useEffect(() => {
    if (isLoaded) { // Only save after initial load to prevent overwriting with empty set
      try {
        localStorage.setItem(POKEDEX_STORAGE_KEY, JSON.stringify(Array.from(collectedCardIds)));
      } catch (error) {
        console.error("Error saving Pokedex data to localStorage:", error);
      }
    }
  }, [collectedCardIds, isLoaded]);

  const addCardsToCollection = useCallback((cardIds: string[]) => {
    setCollectedCardIds(prevIds => {
      const newIds = new Set(prevIds);
      cardIds.forEach(id => newIds.add(id));
      return newIds;
    });
  }, []);

  const isCollected = useCallback((cardId: string): boolean => {
    return collectedCardIds.has(cardId);
  }, [collectedCardIds]);

  const resetPokedex = useCallback(() => {
    setCollectedCardIds(new Set());
    try {
      localStorage.removeItem(POKEDEX_STORAGE_KEY);
    } catch (error) {
      console.error("Error removing Pokedex data from localStorage:", error);
    }
  }, []);

  return {
    collectedCardIds,
    addCardsToCollection,
    isCollected,
    isLoaded, // Pokedex is considered loaded once we've attempted to read from localStorage
    resetPokedex,
    totalCards: allCards.length, // Expose total cards count for UI
  };
}
