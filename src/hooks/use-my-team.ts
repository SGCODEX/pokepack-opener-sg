
"use client";

import { useState, useEffect, useCallback } from 'react';
import type { PokemonCard, Team } from '@/lib/types';
import { getCardById } from '@/lib/pokemon-data';

const TEAMS_STORAGE_KEY = 'pokemon_teams_v2'; // Updated key for new structure
const TEAM_SIZE = 6;

export function useMyTeam() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [activeTeamId, setActiveTeamId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(TEAMS_STORAGE_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData) as Team[];
        if (Array.isArray(parsedData) && parsedData.every(team => 
          typeof team.id === 'string' &&
          typeof team.name === 'string' &&
          Array.isArray(team.pokemonIds) &&
          team.pokemonIds.length === TEAM_SIZE &&
          team.pokemonIds.every(id => id === null || (typeof id === 'string' && getCardById(id)))
        )) {
          setTeams(parsedData);
          if (parsedData.length > 0) {
            // Try to restore active team id if it exists, otherwise set to first
            const storedActiveId = localStorage.getItem(`${TEAMS_STORAGE_KEY}_active`);
            if (storedActiveId && parsedData.find(t => t.id === storedActiveId)) {
              setActiveTeamId(storedActiveId);
            } else {
              setActiveTeamId(parsedData[0].id);
            }
          }
        } else {
          setTeams([]); // Invalid data structure
        }
      }
    } catch (error) {
      console.error("Error loading teams data from localStorage:", error);
      setTeams([]);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(TEAMS_STORAGE_KEY, JSON.stringify(teams));
        if (activeTeamId) {
          localStorage.setItem(`${TEAMS_STORAGE_KEY}_active`, activeTeamId);
        } else {
          localStorage.removeItem(`${TEAMS_STORAGE_KEY}_active`);
        }
      } catch (error) {
        console.error("Error saving teams data to localStorage:", error);
      }
    }
  }, [teams, activeTeamId, isLoaded]);

  const createTeam = useCallback((name?: string): string => {
    const newTeamId = Date.now().toString();
    const newTeam: Team = {
      id: newTeamId,
      name: name || `Team ${teams.length + 1}`,
      pokemonIds: Array(TEAM_SIZE).fill(null),
    };
    setTeams(prevTeams => [...prevTeams, newTeam]);
    setActiveTeamId(newTeamId);
    return newTeamId;
  }, [teams.length]);

  const deleteTeam = useCallback((teamId: string) => {
    setTeams(prevTeams => prevTeams.filter(team => team.id !== teamId));
    if (activeTeamId === teamId) {
      setActiveTeamId(teams.length > 1 ? teams.find(t => t.id !== teamId)?.[0].id ?? null : null);
    }
  }, [activeTeamId, teams]);

  const renameTeam = useCallback((teamId: string, newName: string) => {
    setTeams(prevTeams =>
      prevTeams.map(team =>
        team.id === teamId ? { ...team, name: newName } : team
      )
    );
  }, []);

  const duplicateTeam = useCallback((teamId: string): string | null => {
    const teamToDuplicate = teams.find(team => team.id === teamId);
    if (!teamToDuplicate) return null;

    const newTeamId = Date.now().toString();
    const duplicatedTeam: Team = {
      ...teamToDuplicate,
      id: newTeamId,
      name: `${teamToDuplicate.name} (Copy)`,
    };
    setTeams(prevTeams => [...prevTeams, duplicatedTeam]);
    setActiveTeamId(newTeamId);
    return newTeamId;
  }, [teams]);

  const getActiveTeam = useCallback((): Team | undefined => {
    return teams.find(team => team.id === activeTeamId);
  }, [teams, activeTeamId]);

  const addCardToActiveTeam = useCallback((cardId: string): boolean => {
    const currentActiveTeam = getActiveTeam();
    if (!currentActiveTeam || currentActiveTeam.pokemonIds.includes(cardId)) {
      return false; // No active team or card already in team
    }
    const emptySlotIndex = currentActiveTeam.pokemonIds.findIndex(id => id === null);
    if (emptySlotIndex !== -1) {
      setTeams(prevTeams =>
        prevTeams.map(team =>
          team.id === activeTeamId
            ? {
                ...team,
                pokemonIds: team.pokemonIds.map((id, index) =>
                  index === emptySlotIndex ? cardId : id
                ),
              }
            : team
        )
      );
      return true;
    }
    return false; // Team is full
  }, [getActiveTeam, activeTeamId]);

  const removeCardFromActiveTeamSlot = useCallback((slotIndex: number) => {
    if (slotIndex < 0 || slotIndex >= TEAM_SIZE) return;
    setTeams(prevTeams =>
      prevTeams.map(team =>
        team.id === activeTeamId
          ? {
              ...team,
              pokemonIds: team.pokemonIds.map((id, index) =>
                index === slotIndex ? null : id
              ),
            }
          : team
      )
    );
  }, [activeTeamId]);

  const isCardInActiveTeam = useCallback((cardId: string): boolean => {
    const currentActiveTeam = getActiveTeam();
    return currentActiveTeam ? currentActiveTeam.pokemonIds.includes(cardId) : false;
  }, [getActiveTeam]);

  const getActiveTeamSlotCount = useCallback((): number => {
    const currentActiveTeam = getActiveTeam();
    return currentActiveTeam ? currentActiveTeam.pokemonIds.filter(id => id !== null).length : 0;
  }, [getActiveTeam]);
  
  const getActiveTeamCards = useCallback((): (PokemonCard | null)[] => {
    const currentActiveTeam = getActiveTeam();
    if (!currentActiveTeam) return Array(TEAM_SIZE).fill(null);
    return currentActiveTeam.pokemonIds.map(id => (id ? getCardById(id) || null : null));
  }, [getActiveTeam]);

  const clearActiveTeam = useCallback(() => {
    setTeams(prevTeams =>
      prevTeams.map(team =>
        team.id === activeTeamId
          ? { ...team, pokemonIds: Array(TEAM_SIZE).fill(null) }
          : team
      )
    );
  }, [activeTeamId]);


  return {
    teams,
    activeTeamId,
    setActiveTeamId,
    getActiveTeam,
    getActiveTeamCards,
    createTeam,
    deleteTeam,
    renameTeam,
    duplicateTeam,
    addCardToActiveTeam,
    removeCardFromActiveTeamSlot,
    isCardInActiveTeam,
    getActiveTeamSlotCount,
    clearActiveTeam,
    isLoaded,
    teamSize: TEAM_SIZE,
  };
}
