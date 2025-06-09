
export type PokemonType =
  | 'Fire'
  | 'Water'
  | 'Grass'
  | 'Lightning'
  | 'Psychic'
  | 'Fighting'
  | 'Colorless'
  | 'Darkness'
  | 'Metal'
  | 'Dragon'
  | 'Fairy'
  | 'Trainer' // Added for Trainer cards
  | 'Energy'; // Added for Energy cards

export type CardRarity = 'Common' | 'Uncommon' | 'Rare' | 'Holo Rare';

export interface PokemonCard {
  id: string;
  name: string;
  image: string; // URL to image
  dataAiHint?: string; // For actual image generation hint
  rarity: CardRarity;
  type: PokemonType;
  series: string; // e.g., "Base Set", "Jungle"
  pokedexNumber?: number | string; // Pokedex number or card number like "80/102" for Trainers/Energy
  // Removed: hp, attacks, weaknesses, resistances, retreatCost, description
}

export interface PokemonPack {
  id: string;
  name: string;
  series: string;
  image: string; // URL to pack image
  dataAiHint?: string;
  cardsPerPack: number; // Total cards in one pack opening
  rarityDistribution: {
    common: number;
    uncommon: number;
    rareSlot: number; // Number of cards that can be rare or holo rare
    // Potentially add energy slot if we want to guarantee energy cards
  };
  possibleCards: string[]; // Array of card IDs that can be in this pack
}
