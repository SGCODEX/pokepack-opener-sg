
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
  | 'Fairy';

export type CardRarity = 'Common' | 'Uncommon' | 'Rare' | 'Holo Rare';

export interface PokemonCard {
  id: string;
  name: string;
  image: string; // URL to image
  dataAiHint?: string; // For actual image generation hint
  rarity: CardRarity;
  type: PokemonType;
  hp: number;
  attacks: {
    name: string;
    damage: string;
    description: string;
  }[];
  weaknesses: {
    type: PokemonType;
    value: string;
  }[];
  resistances?: {
    type: PokemonType;
    value: string;
  }[];
  retreatCost: number;
  description: string; // A short flavor text or description
  series: string; // e.g., "Base Set", "Jungle"
  pokedexNumber?: number; // Optional Pokedex number for display
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
  };
  possibleCards: string[]; // Array of card IDs that can be in this pack
}
