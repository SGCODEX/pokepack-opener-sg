
"use client";

import { useState, useEffect, useCallback } from 'react';
import type { PokemonCard } from '@/lib/types';
import { getCardById } from '@/lib/pokemon-data';

const TEAM_STORAGE_KEY = 'pokemon_team_slots_v1';
const TEAM_SIZE = 6;

export function useMyTeam() {
  const [teamSlotIds, setTeamSlotIds] = useState<(string | null)[]>(Array(TEAM_SIZE).fill(null));
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(TEAM_STORAGE_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData) as (string | null)[];
        if (Array.isArray(parsedData) && parsedData.length === TEAM_SIZE) {
          // Validate that all stored IDs are actual card IDs or null
          const validatedData = parsedData.map(id => id && getCardById(id) ? id : null);
          setTeamSlotIds(validatedData);
        } else {
          setTeamSlotIds(Array(TEAM_SIZE).fill(null));
        }
      }
    } catch (error) {
      console.error("Error loading team data from localStorage:", error);
      setTeamSlotIds(Array(TEAM_SIZE).fill(null));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(teamSlotIds));
      } catch (error) {
        console.error("Error saving team data to localStorage:", error);
      }
    }
  }, [teamSlotIds, isLoaded]);

  const addCardToTeam = useCallback((cardId: string): boolean => {
    if (teamSlotIds.includes(cardId)) {
      return false; // Card already in team
    }
    const emptySlotIndex = teamSlotIds.findIndex(id => id === null);
    if (emptySlotIndex !== -1) {
      setTeamSlotIds(prevSlots => {
        const newSlots = [...prevSlots];
        newSlots[emptySlotIndex] = cardId;
        return newSlots;
      });
      return true;
    }
    return false; // Team is full
  }, [teamSlotIds]);

  const removeCardFromSlot = useCallback((slotIndex: number) => {
    if (slotIndex < 0 || slotIndex >= TEAM_SIZE) return;
    setTeamSlotIds(prevSlots => {
      const newSlots = [...prevSlots];
      newSlots[slotIndex] = null;
      return newSlots;
    });
  }, []);

  const isCardInTeam = useCallback((cardId: string): boolean => {
    return teamSlotIds.includes(cardId);
  }, [teamSlotIds]);

  const getTeamCards = useCallback((): (PokemonCard | null)[] => {
    return teamSlotIds.map(id => (id ? getCardById(id) || null : null));
  }, [teamSlotIds]);

  const getTeamSlotCount = useCallback((): number => {
    return teamSlotIds.filter(id => id !== null).length;
  }, [teamSlotIds]);

  const clearTeam = useCallback(() => {
    setTeamSlotIds(Array(TEAM_SIZE).fill(null));
  }, []);

  return {
    teamSlotIds,
    getTeamCards,
    addCardToTeam,
    removeCardFromSlot,
    isCardInTeam,
    isLoaded,
    teamSize: TEAM_SIZE,
    getTeamSlotCount,
    clearTeam,
  };
}
