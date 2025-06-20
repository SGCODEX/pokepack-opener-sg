
"use client";

import { useState, useEffect, useCallback } from 'react';
import type { PokemonCard, Team } from '@/lib/types';
import { getCardById } from '@/lib/pokemon-data';
import { useAuth } from '@/contexts/auth-context';
import { db } from '@/lib/firebase-config';
import { doc, getDoc, setDoc, deleteField } from 'firebase/firestore';

// No longer using TEAMS_STORAGE_KEY or local storage for active team ID
const TEAM_SIZE = 6;

interface TeamsFirestoreData {
  teams: Team[];
  activeTeamId: string | null;
}

export function useMyTeam() {
  const { user } = useAuth();
  const [teams, setTeams] = useState<Team[]>([]);
  const [activeTeamId, setActiveTeamId] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false); // Indicates if initial load attempt is complete

  // Load teams data from Firestore
  useEffect(() => {
    if (user) {
      setIsLoaded(false); // Set to false before fetching
      const userDocRef = doc(db, 'users', user.uid);
      getDoc(userDocRef).then(docSnap => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          const teamsData = userData.teamsData as TeamsFirestoreData | undefined;

          if (teamsData && Array.isArray(teamsData.teams)) {
            // Validate teams structure further if necessary
            const validTeams = teamsData.teams.filter(team => 
              typeof team.id === 'string' &&
              typeof team.name === 'string' &&
              Array.isArray(team.pokemonIds) &&
              team.pokemonIds.length === TEAM_SIZE &&
              team.pokemonIds.every(id => id === null || (typeof id === 'string' && getCardById(id)))
            );
            setTeams(validTeams);

            if (teamsData.activeTeamId && validTeams.find(t => t.id === teamsData.activeTeamId)) {
              setActiveTeamId(teamsData.activeTeamId);
            } else if (validTeams.length > 0) {
              setActiveTeamId(validTeams[0].id); // Default to first team if activeId is invalid or not set
            } else {
              setActiveTeamId(null);
            }
          } else {
            setTeams([]);
            setActiveTeamId(null);
          }
        } else {
          // New user or no teams data yet
          setTeams([]);
          setActiveTeamId(null);
        }
        setIsLoaded(true);
      }).catch(error => {
        console.error("Error loading teams data from Firestore:", error);
        setTeams([]);
        setActiveTeamId(null);
        setIsLoaded(true);
      });
    } else {
      // No user, reset states and mark as loaded
      setTeams([]);
      setActiveTeamId(null);
      setIsLoaded(true);
    }
  }, [user]);

  // Save teams data to Firestore when teams or activeTeamId changes
  useEffect(() => {
    if (user && isLoaded) { // Only save if user is present and initial load is done
      const userDocRef = doc(db, 'users', user.uid);
      const dataToSave: TeamsFirestoreData = { teams, activeTeamId };
      setDoc(userDocRef, { teamsData: dataToSave }, { merge: true })
        .catch(error => {
          console.error("Error saving teams data to Firestore:", error);
        });
    }
  }, [teams, activeTeamId, user, isLoaded]);

  const createTeam = useCallback((name?: string): string => {
    const newTeamId = Date.now().toString();
    const newTeam: Team = {
      id: newTeamId,
      name: name || `Team ${teams.length + 1}`,
      pokemonIds: Array(TEAM_SIZE).fill(null),
    };
    setTeams(prevTeams => [...prevTeams, newTeam]);
    setActiveTeamId(newTeamId); // Set as active immediately
    return newTeamId;
  }, [teams.length]);

  const deleteTeam = useCallback((teamId: string) => {
    setTeams(prevTeams => {
      const updatedTeams = prevTeams.filter(team => team.id !== teamId);
      if (activeTeamId === teamId) {
        setActiveTeamId(updatedTeams.length > 0 ? updatedTeams[0].id : null);
      }
      return updatedTeams;
    });
  }, [activeTeamId]); // Removed 'teams' from dependencies to avoid stale closure issues with setActiveTeamId

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
      return false; 
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
    setActiveTeamId, // Expose setActiveTeamId directly
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

