
"use client";

import { useState, useMemo, useEffect } from 'react';
import { allCards, allSeriesNames, getCardById } from '@/lib/pokemon-data';
import type { PokemonCard, CardRarity } from '@/lib/types';
import { CardComponent } from '@/components/card-component';
import { CardDetailModal } from '@/components/card-detail-modal';
import { usePokedex } from '@/hooks/use-pokedex';
import { useMyTeam } from '@/hooks/use-my-team';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Search, Trash2, Users, PlusCircle, MinusCircle, ShieldCheck } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const cardTypes = ["All", "Fire", "Water", "Grass", "Lightning", "Psychic", "Fighting", "Colorless", "Darkness", "Metal", "Dragon", "Fairy", "Trainer", "Energy"];

const baseSetRarities: string[] = ["All", "Common", "Uncommon", "Rare", "Holo Rare", "Ultra Rare"];
const destinedRivalsRarities: string[] = [
  "All", "Common", "Uncommon", "Rare", 
  "Double Rare", "Ultra Rare", "Illustration Rare", 
  "Special Illustration Rare", "Hyper Rare"
];
const generationsRarities: string[] = ["All", "Common", "Uncommon", "Rare", "Holo Rare", "Ultra Rare"];

export default function MyTeamPage() {
  const { collectedCardsMap, getCollectedCount, isLoaded: pokedexLoaded } = usePokedex();
  const { 
    teamSlotIds, 
    getTeamCards, 
    addCardToTeam, 
    removeCardFromSlot, 
    isCardInTeam, 
    isLoaded: teamLoaded, 
    teamSize,
    getTeamSlotCount,
    clearTeam
  } = useMyTeam();

  const [selectedCardForModal, setSelectedCardForModal] = useState<PokemonCard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterRarity, setFilterRarity] = useState('All');
  const [activeSeriesTab, setActiveSeriesTab] = useState<string>(allSeriesNames.length > 0 ? allSeriesNames[0] : 'Base Set');
  
  const currentTeamCards = useMemo(() => getTeamCards(), [getTeamCards, teamSlotIds]);
  const currentTeamCount = useMemo(() => getTeamSlotCount(), [getTeamSlotCount, teamSlotIds]);

  useEffect(() => {
    if (allSeriesNames.length > 0 && !allSeriesNames.includes(activeSeriesTab)) {
      setActiveSeriesTab(allSeriesNames[0]);
    } else if (allSeriesNames.length === 0) {
      setActiveSeriesTab('Base Set'); 
    }
  }, [allSeriesNames, activeSeriesTab]);

  const raritiesForFilter = useMemo(() => {
    if (activeSeriesTab === 'Destined Rivals') return destinedRivalsRarities;
    if (activeSeriesTab === 'Generations') return generationsRarities;
    return baseSetRarities;
  }, [activeSeriesTab]);

  useEffect(() => {
    if (!raritiesForFilter.includes(filterRarity)) {
      setFilterRarity("All");
    }
  }, [raritiesForFilter, filterRarity]);

  const handleCardClickForModal = (card: PokemonCard) => {
    setSelectedCardForModal(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCardForModal(null);
  };

  const collectedPokemonList = useMemo(() => {
    return allCards.filter(card => getCollectedCount(card.id) > 0);
  }, [getCollectedCount, collectedCardsMap]);

  const cardsInCurrentSeriesForSelection = useMemo(() => {
    return collectedPokemonList.filter(card => card.series === activeSeriesTab);
  }, [activeSeriesTab, collectedPokemonList]);

  const filteredAndSortedCardsForSelection = useMemo(() => {
    return cardsInCurrentSeriesForSelection.filter(card => {
      const nameMatch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
      const typeMatch = filterType === 'All' || card.type === filterType;
      const rarityMatch = filterRarity === 'All' || card.rarity === filterRarity;
      return nameMatch && typeMatch && rarityMatch;
    });
  }, [searchTerm, filterType, filterRarity, cardsInCurrentSeriesForSelection]);

  const handleClearTeam = () => {
    if (window.confirm('Are you sure you want to clear your team?')) {
      clearTeam();
    }
  };

  if (!pokedexLoaded || !teamLoaded) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(217,91%,60%)]"></div>
        <p className="ml-4 text-lg dark:text-foreground">Loading Team Data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 flex flex-col flex-grow">
      <header className="text-center space-y-3">
        <h1 className="text-4xl font-headline font-bold text-primary-foreground dark:text-foreground">My Pokémon Team</h1>
        <p className="text-lg text-muted-foreground dark:text-foreground/80">Select up to 6 of your collected Pokémon.</p>
      </header>

      {/* Team Display Section */}
      <section className="p-4 bg-card rounded-lg shadow-xl border border-border">
        <h2 className="text-2xl font-headline font-semibold text-center mb-4">Current Team ({currentTeamCount}/{teamSize})</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-4">
          {currentTeamCards.map((card, index) => (
            <div key={`team-slot-${index}`} className="relative group aspect-[240/336] border-2 border-dashed border-muted rounded-lg flex items-center justify-center bg-background/50">
              {card ? (
                <>
                  <CardComponent 
                    card={card} 
                    onClick={() => handleCardClickForModal(card)} 
                    className="w-full h-full" 
                    showDetails={false} 
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 z-10 opacity-80 group-hover:opacity-100 transition-opacity h-7 w-7"
                    onClick={() => removeCardFromSlot(index)}
                    aria-label="Remove from team"
                  >
                    <MinusCircle className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <div className="text-center text-muted-foreground p-2">
                  <Users className="h-10 w-10 mx-auto mb-1" />
                  <p className="text-xs">Empty Slot</p>
                </div>
              )}
            </div>
          ))}
        </div>
        {currentTeamCount > 0 && (
          <Button onClick={handleClearTeam} variant="outline" className="w-full sm:w-auto mx-auto block">
            <Trash2 className="mr-2 h-4 w-4" /> Clear Entire Team
          </Button>
        )}
      </section>

      <Separator />

      {/* Pokémon Selection Section */}
      <section>
        <h2 className="text-2xl font-headline font-semibold text-center mb-6">Select from Your Collected Pokémon</h2>
        {allSeriesNames.length > 0 ? (
          <Tabs value={activeSeriesTab} onValueChange={setActiveSeriesTab} className="w-full">
            <div className="w-full overflow-x-auto flex justify-center mb-4">
              <TabsList>
                {allSeriesNames.map(seriesName => (
                  <TabsTrigger key={seriesName} value={seriesName}>{seriesName}</TabsTrigger>
                ))}
              </TabsList>
            </div>

            <div className="p-4 bg-card rounded-lg shadow space-y-4 md:flex md:items-end md:justify-between md:space-y-0 md:space-x-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                  type="text"
                  placeholder="Search by name..."
                  className="pl-10 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:flex gap-2">
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-full md:w-[150px]">
                      <SelectValue placeholder="Filter by Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {cardTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                    </SelectContent>
                  </Select>

                  <Select value={filterRarity} onValueChange={setFilterRarity}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Filter by Rarity" />
                    </SelectTrigger>
                    <SelectContent>
                      {raritiesForFilter.map(rarity => <SelectItem key={rarity} value={rarity}>{rarity}</SelectItem>)}
                    </SelectContent>
                  </Select>
              </div>
            </div>
            
            {allSeriesNames.map(seriesName => (
              <TabsContent key={`select-${seriesName}`} value={seriesName}>
                {filteredAndSortedCardsForSelection.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-8 justify-items-center">
                    {filteredAndSortedCardsForSelection.map((card) => {
                      const collected = getCollectedCount(card.id);
                      const inTeam = isCardInTeam(card.id);
                      const teamFull = currentTeamCount >= teamSize;
                      return (
                        <div key={`select-${card.id}`} className="flex flex-col items-center gap-2">
                          <CardComponent
                            card={card}
                            onClick={() => handleCardClickForModal(card)}
                            viewContext="pokedex"
                            pokedexNumber={card.pokedexNumber} 
                            collectedCount={collected}
                          />
                          {inTeam ? (
                            <Button variant="outline" disabled className="w-full text-xs sm:text-sm">
                              <ShieldCheck className="mr-2 h-4 w-4 text-green-500" /> In Team
                            </Button>
                          ) : teamFull ? (
                            <Button variant="outline" disabled className="w-full text-xs sm:text-sm">Team Full</Button>
                          ) : (
                            <Button 
                              variant="outline" 
                              onClick={() => addCardToTeam(card.id)} 
                              className="w-full text-xs sm:text-sm hover:bg-primary hover:text-primary-foreground"
                            >
                              <PlusCircle className="mr-2 h-4 w-4" /> Add to Team
                            </Button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-xl text-muted-foreground">No collected cards match your filters for {seriesName}.</p>
                    <p className="text-sm text-muted-foreground">Collect more cards or try adjusting filters.</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        ) : (
           <div className="text-center py-10">
              <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground">No Pokémon series available for display.</p>
            </div>
        )}
      </section>

      {selectedCardForModal && (
        <CardDetailModal
          card={selectedCardForModal}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
