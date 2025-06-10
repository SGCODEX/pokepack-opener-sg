
"use client";
import { useState, useEffect, useCallback, useMemo } from 'react';
import { allCards } from '@/lib/pokemon-data'; 

const POKEDEX_STORAGE_KEY = 'collected_pokemon_cards_map'; // Updated key

export function usePokedex() {
  const [collectedCardsMap, setCollectedCardsMap] = useState<Record<string, number>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(POKEDEX_STORAGE_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (typeof parsedData === 'object' && parsedData !== null) {
          setCollectedCardsMap(parsedData);
        } else {
          setCollectedCardsMap({}); // Fallback for invalid data
        }
      }
    } catch (error) {
      console.error("Error loading Pokedex data from localStorage:", error);
      setCollectedCardsMap({});
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(POKEDEX_STORAGE_KEY, JSON.stringify(collectedCardsMap));
      } catch (error) {
        console.error("Error saving Pokedex data to localStorage:", error);
      }
    }
  }, [collectedCardsMap, isLoaded]);

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

  const resetPokedex = useCallback(() => {
    setCollectedCardsMap({});
    try {
      localStorage.removeItem(POKEDEX_STORAGE_KEY);
    } catch (error) {
      console.error("Error removing Pokedex data from localStorage:", error);
    }
  }, []);

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
