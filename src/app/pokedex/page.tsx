
"use client";

import { useState, useMemo } from 'react';
import { allCards } from '@/lib/pokemon-data';
import type { PokemonCard } from '@/lib/types';
import { CardComponent } from '@/components/card-component';
import { CardDetailModal } from '@/components/card-detail-modal';
import { usePokedex } from '@/hooks/use-pokedex';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, Search } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const cardTypes = ["All", "Fire", "Water", "Grass", "Lightning", "Psychic", "Fighting", "Colorless", "Darkness", "Metal", "Dragon", "Fairy"];
const rarities = ["All", "Common", "Uncommon", "Rare", "Holo Rare"];

export default function PokedexPage() {
  const { collectedCardIds, isCollected, isLoaded, resetPokedex } = usePokedex();
  const [selectedCard, setSelectedCard] = useState<PokemonCard | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterRarity, setFilterRarity] = useState('All');
  const [showCollectedOnly, setShowCollectedOnly] = useState(false);

  const handleCardClick = (card: PokemonCard) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  const filteredAndSortedCards = useMemo(() => {
    // Assign Pokedex numbers before filtering and sorting if not already present
    // This ensures consistent numbering based on the *full* `allCards` list.
    // The `pokemon-data.ts` now pre-assigns these, so this is mainly a safeguard or for dynamic scenarios.
    const cardsWithPokedexNumbers = allCards.map((card, index) => ({
      ...card,
      pokedexDisplayNumber: card.pokedexNumber || index + 1,
    }));

    const filtered = cardsWithPokedexNumbers.filter(card => {
      const nameMatch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
      const typeMatch = filterType === 'All' || card.type === filterType;
      const rarityMatch = filterRarity === 'All' || card.rarity === filterRarity;
      const collectedMatch = !showCollectedOnly || isCollected(card.id);
      return nameMatch && typeMatch && rarityMatch && collectedMatch;
    });
    
    // Sort by the pre-assigned Pokedex number for display consistency
    return filtered.sort((a, b) => (a.pokedexDisplayNumber || 0) - (b.pokedexDisplayNumber || 0));
  }, [searchTerm, filterType, filterRarity, showCollectedOnly, isCollected]);


  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="ml-4 text-lg">Loading Pokedex...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-headline font-bold text-primary-foreground mb-2">Pokédex</h1>
        <p className="text-lg text-muted-foreground">Browse your collection and discover all available Pokémon cards.</p>
        <p className="text-sm text-muted-foreground mt-1">You have collected {collectedCardIds.size} out of {allCards.length} cards.</p>
      </header>

      <div className="p-4 bg-card rounded-lg shadow space-y-4 md:flex md:items-end md:justify-between md:space-y-0 md:space-x-4">
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
              <SelectTrigger className="w-full md:w-[150px]">
                <SelectValue placeholder="Filter by Rarity" />
              </SelectTrigger>
              <SelectContent>
                {rarities.map(rarity => <SelectItem key={rarity} value={rarity}>{rarity}</SelectItem>)}
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
      
      {filteredAndSortedCards.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-8 justify-items-center">
          {filteredAndSortedCards.map((card) => (
            <CardComponent
              key={card.id}
              card={card}
              onClick={() => handleCardClick(card)}
              isCollected={isCollected(card.id)}
              viewContext="pokedex"
              pokedexNumber={card.pokedexDisplayNumber} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-xl text-muted-foreground">No cards match your current filters.</p>
          <p className="text-sm text-muted-foreground">Try adjusting your search or filter criteria.</p>
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
        <Button variant="destructive" onClick={() => {
          if (confirm('Are you sure you want to reset your Pokedex? This action cannot be undone.')) {
            resetPokedex();
          }
        }}>
          Reset Pokedex Data
        </Button>
      </div>
    </div>
  );
}
