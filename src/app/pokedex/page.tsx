
"use client";

import { useState, useMemo, useEffect } from 'react';
import { allCards, allSeriesNames, getCardById } from '@/lib/pokemon-data';
import type { PokemonCard, CardRarity } from '@/lib/types';
import { CardComponent } from '@/components/card-component';
import { CardDetailModal } from '@/components/card-detail-modal';
import { usePokedex } from '@/hooks/use-pokedex';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Search, BookCopy, Layers } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const cardTypes = ["All", "Fire", "Water", "Grass", "Lightning", "Psychic", "Fighting", "Colorless", "Darkness", "Metal", "Dragon", "Fairy", "Trainer", "Energy"];

const baseSetRarities: string[] = ["All", "Common", "Uncommon", "Rare", "Holo Rare"];
const destinedRivalsRarities: string[] = [
  "All", "Common", "Uncommon", "Rare", 
  "Double Rare", "Ultra Rare", "Illustration Rare", 
  "Special Illustration Rare", "Hyper Rare"
];

export default function PokedexPage() {
  const { 
    collectedCardsMap,
    getCollectedCount, 
    isLoaded: pokedexLoaded, 
    resetPokedex,
  } = usePokedex();

  const [selectedCard, setSelectedCard] = useState<PokemonCard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterRarity, setFilterRarity] = useState('All');
  const [showCollectedOnly, setShowCollectedOnly] = useState(false);
  const [activeSeriesTab, setActiveSeriesTab] = useState<string>(allSeriesNames.length > 0 ? allSeriesNames[0] : 'Base Set');

  useEffect(() => {
    if (allSeriesNames.length > 0 && !allSeriesNames.includes(activeSeriesTab)) {
      setActiveSeriesTab(allSeriesNames[0]);
    } else if (allSeriesNames.length === 0) {
      setActiveSeriesTab('Base Set'); 
    }
  }, [allSeriesNames, activeSeriesTab]);

  const raritiesForFilter = useMemo(() => {
    if (activeSeriesTab === 'Destined Rivals') {
      return destinedRivalsRarities;
    }
    // Default to Base Set rarities or a more generic list if more series are added
    return baseSetRarities;
  }, [activeSeriesTab]);

  useEffect(() => {
    // If the current filterRarity is not valid for the new activeSeriesTab, reset it to "All"
    if (!raritiesForFilter.includes(filterRarity)) {
      setFilterRarity("All");
    }
  }, [raritiesForFilter, filterRarity]);


  const handleCardClick = (card: PokemonCard) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  const cardsInCurrentSeries = useMemo(() => {
    return allCards.filter(card => card.series === activeSeriesTab);
  }, [activeSeriesTab]);

  const filteredAndSortedCards = useMemo(() => {
    const filtered = cardsInCurrentSeries.filter(card => {
      const nameMatch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
      const typeMatch = filterType === 'All' || card.type === filterType;
      const rarityMatch = filterRarity === 'All' || card.rarity === filterRarity;
      const collectedMatch = !showCollectedOnly || getCollectedCount(card.id) > 0;
      return nameMatch && typeMatch && rarityMatch && collectedMatch;
    });
    return filtered; 
  }, [searchTerm, filterType, filterRarity, showCollectedOnly, getCollectedCount, cardsInCurrentSeries]);

  const totalCardsInSeries = cardsInCurrentSeries.length;

  const totalUniqueCollectedInSeries = useMemo(() => {
    return Object.keys(collectedCardsMap).filter(cardId => {
      const card = getCardById(cardId);
      return card && card.series === activeSeriesTab;
    }).length;
  }, [collectedCardsMap, activeSeriesTab]);

  const totalCollectedInSeriesIncludingDuplicates = useMemo(() => {
    let sum = 0;
    for (const [cardId, count] of Object.entries(collectedCardsMap)) {
      const card = getCardById(cardId);
      if (card && card.series === activeSeriesTab) {
        sum += count;
      }
    }
    return sum;
  }, [collectedCardsMap, activeSeriesTab]);


  const handleResetPokedex = () => {
    if (window.confirm('Are you sure you want to reset your Pokedex? This action cannot be undone and will clear ALL collected cards across ALL sets.')) {
      resetPokedex();
    }
  };

  if (!pokedexLoaded) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="ml-4 text-lg dark:text-foreground">Loading Pokedex...</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-8 flex flex-col flex-grow">
      <header className="text-center space-y-3">
        <h1 className="text-4xl font-headline font-bold text-primary-foreground dark:text-foreground">Pokédex</h1>
         <p className="text-lg text-muted-foreground dark:text-foreground/80">Browse your collection for {activeSeriesTab}.</p>
      </header>

      {allSeriesNames.length > 0 ? (
        <Tabs value={activeSeriesTab} onValueChange={setActiveSeriesTab} className="w-full">
          <TabsList className={`grid w-full grid-cols-${allSeriesNames.length} mb-4`}>
            {allSeriesNames.map(seriesName => (
              <TabsTrigger key={seriesName} value={seriesName}>{seriesName}</TabsTrigger>
            ))}
          </TabsList>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-4">
            <div className="bg-card text-card-foreground px-4 py-2 rounded-lg shadow-md border border-border flex items-center gap-2">
              <BookCopy className="h-5 w-5 text-primary" />
              <div>
                  <span className="text-lg font-semibold">{totalUniqueCollectedInSeries} / {totalCardsInSeries}</span>
                  <span className="text-sm text-muted-foreground ml-1">Unique Cards</span>
              </div>
            </div>
            <div className="bg-card text-card-foreground px-4 py-2 rounded-lg shadow-md border border-border flex items-center gap-2">
              <Layers className="h-5 w-5 text-accent" />
              <div>
                  <span className="text-lg font-semibold">{totalCollectedInSeriesIncludingDuplicates}</span>
                  <span className="text-sm text-muted-foreground ml-1">Total Cards</span>
              </div>
            </div>
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
                  <SelectTrigger className="w-full md:w-[180px]"> {/* Increased width for longer rarity names */}
                    <SelectValue placeholder="Filter by Rarity" />
                  </SelectTrigger>
                  <SelectContent>
                    {raritiesForFilter.map(rarity => <SelectItem key={rarity} value={rarity}>{rarity}</SelectItem>)}
                  </SelectContent>
                </Select>
            </div>
            <div className="flex items-center space-x-2 pt-2 md:pt-0">
              <Checkbox 
                id="showCollected" 
                checked={showCollectedOnly} 
                onCheckedChange={(checked) => setShowCollectedOnly(checked as boolean)}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <Label htmlFor="showCollected" className="text-sm text-foreground cursor-pointer">Show Collected Only</Label>
            </div>
          </div>
          
          {allSeriesNames.map(seriesName => (
            <TabsContent key={seriesName} value={seriesName}>
              {filteredAndSortedCards.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8 justify-items-center">
                  {filteredAndSortedCards.map((card) => {
                    const count = getCollectedCount(card.id);
                    return (
                      <CardComponent
                        key={card.id}
                        card={card}
                        onClick={() => handleCardClick(card)}
                        viewContext="pokedex"
                        pokedexNumber={card.pokedexNumber} 
                        collectedCount={count}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-10">
                  <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-xl text-muted-foreground">No cards match your current filters for {seriesName}.</p>
                  <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria.</p>
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

      {selectedCard && (
        <CardDetailModal
          card={selectedCard}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
      
      <div className="text-center mt-8">
        <Button 
          variant="destructive" 
          onClick={handleResetPokedex}
        >
          Reset All Pokedex Data
        </Button>
      </div>
    </div>
  );
}
